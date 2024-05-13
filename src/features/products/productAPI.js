import axios from "axios";
import { apis } from "../../app/constants/api-endpoints";
import { getItemFromLocalStorage } from "../../app/constants/common-function";
import { appLevelConstant, authHeaders } from "../../app/constant";

// A mock function to mimic making an async request for data
export function fetchAllProducts(reqObj) {
  console.log('calling data')
  return new Promise(async (resolve, reject) => {
  axios({
    url: apis.BASE_URL + apis.API_FETCH_ALL_PRODUCTS + `?page=${reqObj.page}&limit=10`,
    method: "GET",
    headers: authHeaders.headers,
  }).then((res) => {
    const data = res.data.data;
    resolve({data});
   }).catch((error) => {
    reject([]);
   });
  });
}

export function fetchProductById(id) {
  return new Promise(async (resolve, reject) => {
    axios({
      url: apis.BASE_URL + apis.API_FETCH_ALL_PRODUCTS + `/${id}`,
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

export function fetchAllBrands() {
  return new Promise(async (resolve, reject) => {
  fetch("http://localhost:8000/brands").then((res) => {
    const data = res.json();
    resolve({data});
   }, (error) => {
    reject([]);
   });
  });
}

export function fetchAllCategories() {
  return new Promise(async (resolve, reject) => {
  fetch("http://localhost:8000/categories").then((res) => {
    const data = res.json();
    resolve({data});
   }, (error) => {
    reject([]);
   });
  });
}

export function fetchProductsByFilters(filter, sort, pagination) {
  let querString = "";
  for(let key in filter){
    const categoryValues = filter[key];
    if(categoryValues.length>0){
      const lastCategoryValue = categoryValues[categoryValues.length-1];
      if(filter[key]){
        querString += `${key}=${lastCategoryValue}&`;
      }
    }
  }

  for(let key in sort){
    querString += `${key}=${sort[key]}&`;
  }

  for(let key in pagination){
    querString += `${key}=${pagination[key]}&`;
  }

  return new Promise(async (resolve) => {
   let response = await fetch(`http://localhost:8000/products?${querString}`);
   let data = await response.json();
   const totalItems = data.items;
   if(typeof(data) === Array){
     resolve({data:{products:data, totalItems: totalItems}});
   }else{
    data = data.data;
    resolve({data:{products:data, totalItems: totalItems}})
   }
  });
}
