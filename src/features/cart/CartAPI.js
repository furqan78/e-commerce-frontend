import axios from "axios";
import { authHeaders } from "../../app/constant";
import { apis } from "../../app/constants/api-endpoints";

export function addToCart(item) {
  return new Promise(async (resolve, reject) => {
    axios.post(
      apis.BASE_URL + apis.API_USER_CART_DETAIL,
      JSON.stringify(item),
      { headers: authHeaders.headers },
    ).then(async (res) => {
      const data = res.data.data;
      resolve({ data });
    }, (error) => {
      reject([]);
    });
  });
}

export function fetchItemsByUserId(userId) {
  return new Promise(async (resolve, reject) => {
  axios({
    method: 'GET',
    headers: authHeaders.headers,
    url: apis.BASE_URL + apis.API_USER_CART_DETAIL + "/" + userId
  }).then((res) => {
    const data = res.data;
    resolve({data});
   }, (error) => {
    reject([]);
   });
  });
}

export function updateCart(update) {
  return new Promise(async (resolve, reject) => {
    fetch(apis.BASE_URL + apis.API_USER_CART_DETAIL + "/" + update.id, {
      method: 'PUT',
      body: JSON.stringify(update),
      headers: authHeaders.headers,
    }
    ).then(async (res) => {
      const data = await res.json();
      resolve({ data });
    }, (error) => {
      reject([]);
    });
  });
}

export function removeItemsFromCart(itemId) {
  return new Promise(async (resolve, reject) => {
    fetch(apis.BASE_URL + apis.API_USER_CART_DETAIL + "/" + itemId, {
      method: 'DELETE',
      headers: authHeaders.headers,
    }
    ).then(async (res) => {
      const data = await res.json();
      resolve({ data });
    }, (error) => {
      reject([]);
    });
  });
}

