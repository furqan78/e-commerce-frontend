import { apis } from "../../app/constants/api-endpoints";
import { appLevelConstant, authHeaders, headers } from "../../app/constant";
import axios from "axios";

export function createUser(userData) {
  return new Promise(async (resolve, reject) => {
    fetch(apis.BASE_URL + apis.API_USER_ACCOUNT_CREATION, {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: headers,
    }
    ).then(async (res) => {
      const data = await res.json();
      if (data && data.token) {
        resolve(data);
      } else {
        reject({ message: appLevelConstant.EMAIL_ALREADY_EXISTS })
      }
    }, (error) => {
      reject([]);
    });
  });
}

export function checkUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    axios.post(
      apis.BASE_URL + apis.API_LOGIN_GET_TOKEN, 
      JSON.stringify(loginInfo),
      {headers},
    ).then((res) => {
      if (res && res.data && res.data.data && res.data.data.token) {
        resolve(res.data.data);
      } else {
        reject({ message: appLevelConstant.INVALID_CREDENTIAL })
      }
    }, (error) => {
      reject({ message: appLevelConstant.INVALID_CREDENTIAL });
    });
  });
}

