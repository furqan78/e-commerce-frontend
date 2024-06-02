import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLoggedInUserOrders, fetchUserInfo, updateUser } from './userAPI';
import { setItemInLocalStorage } from '../../app/constants/common-function';
import { appLevelConstant } from '../../app/constant';

const initialState = {
  userOrders: [],
  status: 'idle',
};

export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
  'user/fetchLoggedInUserOrders',
  async (reqObj) => {
    const response = await fetchLoggedInUserOrders(reqObj);
    return response.data;
  }
);

export const fetchUserInfoAsync = createAsyncThunk(
  'user/fetchUserInfoAsync',
  async (userId) => {
    const response = await fetchUserInfo(userId);
    return response.data;
  }
);

export const updateUserInfoAsync = createAsyncThunk(
  'user/updateUserInfoAsync',
  async (userData) => {
    const response = await updateUser(userData);
    setItemInLocalStorage(appLevelConstant.USER_INFO_KEY, JSON.stringify(response.data))
    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userOrders = action.payload;
      })
      .addCase(fetchUserInfoAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserInfoAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
      })
      .addCase(updateUserInfoAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserInfoAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
      });
  },
});

export const selectUserOrders = (state) => state.user.userOrders;
export const selectUserInfo = (state) => state.user.userInfo;

export default userSlice.reducer;
