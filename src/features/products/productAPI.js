import axios from "axios";
import { apis } from "../../app/constants/api-endpoints";
import { authHeaders, headers } from "../../app/constant";

// A mock function to mimic making an async request for data
export function fetchAllProducts(reqObj) {
  const query = `?page=${reqObj.page}&limit=12${reqObj?.search ? "&search=" + reqObj?.search : ""}`
  return new Promise(async (resolve, reject) => {
    axios({
      url: apis.BASE_URL + apis.API_FETCH_ALL_PRODUCTS + query,
      method: "GET",
      headers: authHeaders.headers,
    }).then((res) => {
      const data = res.data.data;
      resolve({ data });
    }).catch((error) => {
      reject([]);
    });
  });
}

export async function getAllProducts(reqObj, limit = 12) {
  // Initialize URLSearchParams
  const params = new URLSearchParams();

  // Set default page value
  params.set('page', reqObj?.page || 1);

  // Add optional parameters if they exist
  if (limit) params.set('limit', limit);
  if (reqObj?.search) params.set('search', reqObj.search);
  if (reqObj?.sort) params.set('sort', reqObj.sort);
  if (reqObj?.ratings) params.set('ratingGreater', reqObj.ratings);
  if (reqObj?.categories) params.set('categories', reqObj.categories);
  if (reqObj?.price) params.set('price', reqObj.price);
  if (reqObj?.size) params.set('size', reqObj.size);

  // Construct the full URL with query parameters
  const url = `${apis.BASE_URL}${apis.API_FETCH_ALL_PRODUCTS}?${params.toString()}`;

  try {
    const res = await axios.get(url, { headers: headers });
    return res.data.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Request canceled', error.message);
      throw new Error('Request canceled');
    } else {
      throw error;
    }
  }
}


export async function addProduct(reqObj) {
  try {
    const res = await axios.post(
      apis.BASE_URL + apis.API_ADMIN_PRODUCT,
      JSON.stringify(reqObj),
      { headers: authHeaders.headers });
    return res.data.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Request canceled', error.message);
      throw new Error('Request canceled');
    } else {
      throw error;
    }
  }
}

export async function uploadFiles(reqObj) {
  try {
    const res = await axios.post(
      apis.BASE_URL + apis.API_UPLOAD_FILES,
      reqObj,
      { headers: authHeaders.formDataHeaders });
    return res.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Request canceled', error.message);
      throw new Error('Request canceled');
    } else {
      throw error;
    }
  }
}

export async function deleteFiles(reqObj) {
  try {
    const res = await axios.delete(
      apis.BASE_URL + apis.API_UPLOAD_FILES, {
      headers: authHeaders.headers,
      data: reqObj,
    });
    return res.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Request canceled', error.message);
      throw new Error('Request canceled');
    } else {
      throw error;
    }
  }
}

export function addBanner(reqObj) {
  return new Promise(async (resolve, reject) => {
    axios.post(
      apis.BASE_URL + apis.API_BANNERS,
      JSON.stringify(reqObj),
      { headers: authHeaders.headers },
    ).then((res) => {
      const data = res.data.data;
      resolve({ data });
    }).catch((error) => {
      reject([]);
    });
  });
}

export async function getBanners(position) {
  try {
    const res = await axios.get(
      apis.BASE_URL + apis.API_BANNERS + `${position ? "?position=" + position : ""}`,
      { headers: headers });
    return res.data.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Request canceled', error.message);
      throw new Error('Request canceled');
    } else {
      throw error;
    }
  }
}

export async function updateProduct(reqObj, productId) {
  try {
    const res = await axios.put(
      apis.BASE_URL + apis.API_ADMIN_PRODUCT + `/${productId}`,
      JSON.stringify(reqObj),
      { headers: authHeaders.headers });
    return res.data.data;
  } catch (error) {
    throw error;
  }
}

export function fetchProductById(id) {
  return new Promise(async (resolve, reject) => {
    axios({
      url: apis.BASE_URL + apis.API_FETCH_ALL_PRODUCTS + `/${id}`,
      method: "GET",
      headers: authHeaders.headers,
    }).then((res) => {
      const data = res.data.data;
      resolve({ data });
    }, (error) => {
      reject([]);
    });
  });
}

export async function getProductById(id) {
  try {
    const res = await axios({
      url: apis.BASE_URL + apis.API_FETCH_ALL_PRODUCTS + `/${id}`,
      method: "GET",
      headers: authHeaders.headers,
    });
    return res.data.data;
  } catch (error) {
    throw error;
  }
}

export function fetchAllBrands() {
  return new Promise(async (resolve, reject) => {
    fetch("http://localhost:8000/brands").then((res) => {
      const data = res.json();
      resolve({ data });
    }, (error) => {
      reject([]);
    });
  });
}

export function fetchAllCategories() {
  return new Promise(async (resolve, reject) => {
    fetch("http://localhost:8000/categories").then((res) => {
      const data = res.json();
      resolve({ data });
    }, (error) => {
      reject([]);
    });
  });
}

export function fetchProductsByFilters(filter, sort, pagination) {
  let querString = "";
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length > 0) {
      const lastCategoryValue = categoryValues[categoryValues.length - 1];
      if (filter[key]) {
        querString += `${key}=${lastCategoryValue}&`;
      }
    }
  }

  for (let key in sort) {
    querString += `${key}=${sort[key]}&`;
  }

  for (let key in pagination) {
    querString += `${key}=${pagination[key]}&`;
  }

  return new Promise(async (resolve) => {
    let response = await fetch(`http://localhost:8000/products?${querString}`);
    let data = await response.json();
    const totalItems = data.items;
    if (typeof (data) === Array) {
      resolve({ data: { products: data, totalItems: totalItems } });
    } else {
      data = data.data;
      resolve({ data: { products: data, totalItems: totalItems } })
    }
  });
}

export const rateProducts = async (reqObj) => {
  try {
    const res = await axios.post(
      apis.BASE_URL + apis.API_RATE_PRODUCT,
      JSON.stringify(reqObj),
      { headers: authHeaders.headers });
    return res.data.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Request canceled', error.message);
      throw new Error('Request canceled');
    } else {
      throw error;
    }
  }
}

export const checkRatingEligibility = async (userId, productId) => {
  try {
    const res = await axios.get(
      apis.BASE_URL + apis.API_CHECK_REVIEW_ELIGIBILITY + `?userId=${userId}&productId=${productId}`,
      { headers: authHeaders.headers });
    return res.data.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Request canceled', error.message);
      throw new Error('Request canceled');
    } else {
      throw error;
    }
  }
}