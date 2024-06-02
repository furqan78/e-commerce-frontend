import axios from "axios";
import { jwtDecode } from "jwt-decode";
import moment from "moment";

export const setItemInLocalStorage = (key, data) => {
    localStorage.setItem(key, data);
}

export const getItemFromLocalStorage = (key) => {
    return localStorage.getItem(key);
}

export const getFormatedDate = (dateString) => {
    let date = new Date(dateString);
    /* Date format you have */
    let dateMDY = moment(date).format("MMM DD, YYYY");
    /* Date converted to MM-DD-YYYY format */
    return dateMDY;
}

export const decodeJwtToken = (token) => {
    const decodedToken = jwtDecode(token);
    return decodedToken;
}

export const getImageLink = (imageId) => {
 return `https://drive.google.com/thumbnail?id=${imageId}&sz=w1000`;
}

export const getImageIdFromURL = (url) => {
    const id = url?.match(/id=([^&]+)/);
    if (id && id[1]) {
        return id[1];
      } else {
        return "ID not found";
      }
}

export const createCancelToken = () => {
    const source = axios.CancelToken.source();
    return source;
  };