import axios from "axios";
import { appLevelConstant, authHeaders } from "../../app/constant";
import { apis } from "../../app/constants/api-endpoints";

export async function createOrder(order) {
  try {
    const res = await axios.post(
      apis.BASE_URL + apis.API_USER_ORDERS,
      JSON.stringify(order),
      { headers: authHeaders.headers });
    return await res.data.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Request canceled', error.message);
      throw new Error('Request canceled');
    } else {
      throw error;
    }
  }
}


export async function fetchAllOrders(page, status, cancelToken) {
  try {
    const res = await axios.get(
      apis.BASE_URL + apis.API_USER_ORDERS + `?page=${page}${status !== appLevelConstant.ALL_ORDER_STATUS ? `&status=${status}` : ''}`,
      {
        headers: authHeaders.headers,
        cancelToken: cancelToken.token,
      });
    return await res.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Request canceled', error.message);
      throw new Error('Request canceled');
    } else {
      throw error;
    }
  }
}
