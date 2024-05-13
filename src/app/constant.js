import { getItemFromLocalStorage } from "./constants/common-function";

export const ITEMS_PER_PAGE = 10;

export const appLevelConstant = {
    CONFIRM_PASSWORD_REQUIRED: 'Confirm password is required',
    PASSWORD_REQUIRED: 'Password is required',
    EMAIL_REQUIRED: 'Email is required',
    EMAIL_NOT_VALID: 'Email is not valid',
    EMAIL_ALREADY_EXISTS: 'Email already exists',
    PASSWORD_FORMAT: `- at least 8 characters \n
    - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number \n
    - Can contain special characters`,
    PASSWORD_NOT_MATCH: `Password doesn't match`,
    INVALID_CREDENTIAL: 'Invalid credentials',
    REQUIRED: 'Required',
    CASH_LABLE: 'cash',
    ONLINE_LABLE: 'online',
    DESIGNS_FOR_YOU_LABLE: 'Designs For You',
    RELATED_PRODUCT_LABLE: 'Related Products',
    BUSINESS_CARDS_LABLE: 'Business Cards',
    BUSINESS_CARDS_DESCRIPION: 'Check out these on-trend and high quality Business Cards templates for you Business',
    NEW_ARRIVALS_LABLE: 'New Arrivals',
    NEW_ARRIVALS_DESCRIPTION: 'Elevate your style and brand with our customizable products. Create standout designs that reflect your unique personality or promote your business with flair.',
    T_SHIRTS_LABLE: 'T-Shirts',
    T_SHIRTS_DESCRIPTION: '',
    COFFEE_MUG_LABLE: 'Coffee Mug',
    COFFEE_MUG_DESCRIPTION: '',
    CUSTOM_CAP_LABLE: 'Custom Cap',
    PILLOW_COVER_LABLE: 'Pillow Cover',
    PILLOW_DESCRIPTION: '',
    KEY_CHAIN_LABLE: 'Key Chain',
    KEY_CHAIN_DESCRIPTION: '',
    RUPEE_SYMBOL: '&#x20B9;',
    TOKEN_KEY: 'token',
    USER_INFO_KEY: 'userInfo',
}

export const regEx = {
    PASSWORD_REGEX: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gi,
    EMAIL_REGEX: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
}

export const headers = {
    "content-type": "application/json"
}

export const authHeaders = {
    headers: {
        "Content-Type": "application/json",
        "Authorization": getItemFromLocalStorage(appLevelConstant.TOKEN_KEY),
      }
}

export const productsClassification = [
    {
        lable: 'Trending Products',
        value: 'trending_products'
    },
    {
        lable: 'Popular Products',
        value: 'popular_products'
    },
    {
        lable: 'New Arrivals',
        value: 'new_arrivals'
    },
]

export const productCategorie = {
    NEW_ARRIVALS: 'new-arrivals',
    POPULAR_PRODUCTS: 'popular-products',
    TRENDING_PRODUCTS: 'trending-products',
    BUSINESS_CARDS: 'business-cards',
    T_SHIRTS: 't-shirts',
    COFFEE_MUG: 'coffee-mug',
    CUSTOM_CAP: 'custom-cap',
    KEY_CHAIN: 'key-chain',
    PILLOW: 'pillow-cover n'

}