import axios from "axios";
import { authHeaders } from "../../app/constant";
import { apis } from "../../app/constants/api-endpoints";

export function fetchLoggedInUserOrders(reqObj) {
  return new Promise(async (resolve, reject) => {
    axios.get(
      apis.BASE_URL + apis.API_USER_ORDERS + `/${reqObj.user_id}?page=${reqObj.page}`,
      {headers: authHeaders.headers}
    ).then(async (res) => {
      const data = res.data;
      resolve({ data });
    }, (error) => {
      reject([]);
    });
  });
}

export function updateUser(userData) {
  return new Promise(async (resolve, reject) => {
    axios.put(
      apis.BASE_URL + apis.API_ADD_UPDATE_USER + "/" + userData.id, 
      userData, 
      {headers: authHeaders.headers},
    ).then((res) => {
      resolve(res.data);
    }, (error) => {
      reject([]);
    });
  });
}

export function fetchUserInfo(userId) {
  return new Promise(async (resolve, reject) => {
    axios({
      url: apis.BASE_URL + apis.API_ADD_UPDATE_USER + `/${userId}`,
      method: "GET",
      headers: authHeaders.headers,
    }).then((res) => {
    const data = res.data.data;
    resolve({data});
   }, (error) => {
    reject([]);
   });
  });
}