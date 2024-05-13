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