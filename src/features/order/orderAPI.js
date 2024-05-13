import axios from "axios";
import { authHeaders } from "../../app/constant";
import { apis } from "../../app/constants/api-endpoints";

export function createOrder(order) {
  return new Promise(async (resolve, reject) => {
    axios.post(
      apis.BASE_URL + apis.API_USER_ORDERS, 
      JSON.stringify(order),
      {headers: authHeaders.headers},
    ).then(async (res) => {
      const data = res.data;
      resolve({ data });
    }, (error) => {
      reject([]);
    });
  });
}
