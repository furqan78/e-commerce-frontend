import axios from "axios";
import { appLevelConstant, authHeaders } from "../../app/constant";
import { apis } from "../../app/constants/api-endpoints";

export function createOrder(order) {
  return new Promise(async (resolve, reject) => {
    axios.post(
      apis.BASE_URL + apis.API_USER_ORDERS,
      JSON.stringify(order),
      { headers: authHeaders.headers },
    ).then(async (res) => {
      const data = res.data;
      resolve({ data });
    }, (error) => {
      reject([]);
    });
  });
}


export function fetchAllOrders(page, status, cancelToken) {
  return axios.get(
    apis.BASE_URL + apis.API_USER_ORDERS + `?page=${page}${status !== appLevelConstant.ALL_ORDER_STATUS ? `&status=${status}` : ''}`,
    {
      headers: authHeaders.headers,
      cancelToken: cancelToken.token,
    },
  )
    .then(async (res) => res.data)
    .catch(error => {
      if (axios.isCancel(error)) {
        console.log('Request canceled', error.message);
        throw new Error('Request canceled');
      } else {
        throw error;
      }
    });
}
