import axios from "axios";
import {
    GET_ALL_MENU_CATEGORIES_FOR_RESTAURANT_FAILURE,
    GET_ALL_MENU_CATEGORIES_FOR_RESTAURANT_REQUEST,
    GET_ALL_MENU_CATEGORIES_FOR_RESTAURANT_SUCCESS,
    GET_ALL_RESTAURANTS_FAILURE,
    GET_ALL_RESTAURANTS_REQUEST,
    GET_ALL_RESTAURANTS_SUCCESS,
    GET_AVIALABLE_OFFERS_BY_RESTAURANT_ID_FAILURE,
    GET_AVIALABLE_OFFERS_BY_RESTAURANT_ID_REQUEST,
    GET_AVIALABLE_OFFERS_BY_RESTAURANT_ID_SUCCESS,
    GET_MENU_CATEGORY_BY_ID_FAILURE,
    GET_MENU_CATEGORY_BY_ID_REQUEST,
    GET_MENU_CATEGORY_BY_ID_SUCCESS,
    GET_OFFER_BY_ID_FAILURE,
    GET_OFFER_BY_ID_REQUEST,
    GET_OFFER_BY_ID_SUCCESS,
    GET_OFFERS_BY_RESTAURANT_ID_FAILURE,
    GET_OFFERS_BY_RESTAURANT_ID_REQUEST,
    GET_OFFERS_BY_RESTAURANT_ID_SUCCESS,
    GET_RESTAURANT_BY_ID_FAILURE,
    GET_RESTAURANT_BY_ID_REQUEST,
    GET_RESTAURANT_BY_ID_SUCCESS,
} from "./ActionType";
import { api } from "../../../config/api";


//restaurant
export const getAllRestaurants = ({ jwtToken }) => async (dispatch) => {
    dispatch({ type: GET_ALL_RESTAURANTS_REQUEST });
    try {
        const { data } = await api.get(`api/restaurants`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });

        dispatch({ type: GET_ALL_RESTAURANTS_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: GET_ALL_RESTAURANTS_FAILURE, payload: error });
        console.log("error", error);
    }
}

export const getRestaurantById = ({ jwtToken, restaurantId }) => async (dispatch) => {
    dispatch({ type: GET_RESTAURANT_BY_ID_REQUEST });
    try {
        const { data } = await api.get(`api/restaurants/${restaurantId}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });

        dispatch({ type: GET_RESTAURANT_BY_ID_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: GET_RESTAURANT_BY_ID_FAILURE, payload: error });
        console.log("error", error);
    }
}


//offer
export const getOffersForRestaurant = ({ jwtToken, restaurantId }) => async (dispatch) => {
    dispatch({ type: GET_OFFERS_BY_RESTAURANT_ID_REQUEST });
    try {
        const { data } = await api.get(`api/offer/restaurant/${restaurantId}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });

        dispatch({ type: GET_OFFERS_BY_RESTAURANT_ID_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: GET_OFFERS_BY_RESTAURANT_ID_FAILURE, payload: error });
        console.log("error", error);
    }
}

export const getAvialableOffersForRestaurant = ({ jwtToken, restaurantId }) => async (dispatch) => {
    dispatch({ type: GET_AVIALABLE_OFFERS_BY_RESTAURANT_ID_REQUEST });
    try {
        const { data } = await api.get(`api/offer/availableOffers/restaurant/${restaurantId}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });

        dispatch({ type: GET_AVIALABLE_OFFERS_BY_RESTAURANT_ID_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: GET_AVIALABLE_OFFERS_BY_RESTAURANT_ID_FAILURE, payload: error });
        console.log("error", error);
    }
}

export const getOfferById = ({ jwtToken, offerId }) => async (dispatch) => {
    dispatch({ type: GET_OFFER_BY_ID_REQUEST });
    try {
        
        const { data } = await api.get(`api/offer/${offerId}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });

        dispatch({ type: GET_OFFER_BY_ID_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: GET_OFFER_BY_ID_FAILURE, payload: error });
        console.log("error", error);
    }
}


//menu-category
export const getAllMenuCategoriesForRestaurant = ({ jwtToken, restaurantId }) => async (dispatch) => {
    dispatch({ type: GET_ALL_MENU_CATEGORIES_FOR_RESTAURANT_REQUEST });
    try {
        const { data } = await api.get(`api/menuCategory/restaurant/${restaurantId}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });

        dispatch({ type: GET_ALL_MENU_CATEGORIES_FOR_RESTAURANT_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: GET_ALL_MENU_CATEGORIES_FOR_RESTAURANT_FAILURE, payload: error });
        console.log("error", error);
    }
}

export const getMenuCategoryById = ({ jwtToken, menuCategoryId }) => async (dispatch) => {
    dispatch({ type: GET_MENU_CATEGORY_BY_ID_REQUEST });
    try {
        const { data } = await api.get(`api/menuCategory/${menuCategoryId}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });

        dispatch({ type: GET_MENU_CATEGORY_BY_ID_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: GET_MENU_CATEGORY_BY_ID_FAILURE, payload: error });
        console.log("error", error);
    }
}