import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkUser, createUser } from './AuthAPI';
import { setItemInLocalStorage } from '../../app/constants/common-function';
import { appLevelConstant } from '../../app/constant';

const initialState = {
  loggedInUser: null,
  status: 'idle',
  userError: null
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const createUserAsync = createAsyncThunk(
  'user/createUser',
  async (userData) => {
    const response = await createUser(userData);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const checkUserAsync = createAsyncThunk(
  'user/checkUser',
  async (loginInfo) => {
    const response = await checkUser(loginInfo);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const counterSlice = createSlice({
  name: 'auth',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      state.value += 1;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
        setItemInLocalStorage(appLevelConstant.TOKEN_KEY, action.payload.token);
        setItemInLocalStorage(appLevelConstant.USER_INFO_KEY, JSON.stringify(action.payload.userInfo));
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.userError = action.error;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
        setItemInLocalStorage(appLevelConstant.TOKEN_KEY, action.payload.token);
        setItemInLocalStorage(appLevelConstant.USER_INFO_KEY, JSON.stringify(action.payload.userInfo));
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.userError = action.error;
        state.loggedInUser = null;
      });
  },
});

export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectUserError = (state) => state.auth.userError;

export default counterSlice.reducer;
