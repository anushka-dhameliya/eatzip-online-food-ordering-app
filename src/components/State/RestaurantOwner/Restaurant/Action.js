import axios from "axios";
import {
    CREATE_MENU_CATEGORY_FAILURE,
    CREATE_MENU_CATEGORY_REQUEST,
    CREATE_MENU_CATEGORY_SUCCESS,
    CREATE_OFFER_FAILURE, CREATE_OFFER_REQUEST,
    CREATE_OFFER_SUCCESS,
    CREATE_RESTAURANT_FAILURE,
    CREATE_RESTAURANT_REQUEST,
    CREATE_RESTAURANT_SUCCESS,
    DELETE_MENU_CATEGORY_FAILURE,
    DELETE_MENU_CATEGORY_REQUEST,
    DELETE_MENU_CATEGORY_SUCCESS,
    DELETE_OFFER_FAILURE,
    DELETE_OFFER_REQUEST,
    DELETE_OFFER_SUCCESS,
    GET_ALL_MENU_CATEGORIES_FOR_RESTAURANT_FAILURE,
    GET_ALL_MENU_CATEGORIES_FOR_RESTAURANT_REQUEST,
    GET_ALL_MENU_CATEGORIES_FOR_RESTAURANT_SUCCESS,
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
    GET_RESTAURANT_BY_USER_ID_FAILURE,
    GET_RESTAURANT_BY_USER_ID_REQUEST,
    GET_RESTAURANT_BY_USER_ID_SUCCESS,
    UPDATE_MENU_CATEGORY_FAILURE,
    UPDATE_MENU_CATEGORY_REQUEST,
    UPDATE_MENU_CATEGORY_SUCCESS,
    UPDATE_OFFER_FAILURE,
    UPDATE_OFFER_REQUEST,
    UPDATE_OFFER_SUCCESS,
    UPDATE_RESTAURANT_FAILURE,
    UPDATE_RESTAURANT_REQUEST,
    UPDATE_RESTAURANT_STATUS_FAILURE,
    UPDATE_RESTAURANT_STATUS_REQUEST,
    UPDATE_RESTAURANT_STATUS_SUCCESS,
    UPDATE_RESTAURANT_SUCCESS
} from "./ActionType";
import { api } from "../../../config/api";
import { errorAlert, saveAlert, successAlert } from "../../../config/alert";


//restaurant
export const registerRestaurant = (reqData) => async (dispatch) => {
    dispatch({ type: CREATE_RESTAURANT_REQUEST });
    try {
        var jwtToken = localStorage.getItem('jwtToken');
        const { data } = await api.post(`api/admin/restaurants`, reqData.restaurantData, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });

        successAlert("Restaurant Registred Sunccessfully.");

        dispatch({ type: CREATE_RESTAURANT_SUCCESS, payload: data });
        localStorage.removeItem("Restaurant_Registration");
        reqData.navigate("/admin/restaurant");
        console.log("Register Restaurant Success", data);
    }
    catch (error) {
        dispatch({ type: CREATE_RESTAURANT_FAILURE, payload: error });
        console.log("error", error);
        errorAlert(error.response.data.message);
    }
}

export const getRestaurantById = ({ jwtToken, restaurantId }) => async (dispatch) => {
    dispatch({ type: GET_RESTAURANT_BY_ID_REQUEST });
    try {
        const { data } = await api.get(`api/admin/restaurants/${restaurantId}`, {
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

export const getRestaurantByUserId = ({ jwtToken }) => async (dispatch) => {
    dispatch({ type: GET_RESTAURANT_BY_USER_ID_REQUEST });
    try {
        const { data } = await api.get(`api/admin/restaurants/user`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });

        dispatch({ type: GET_RESTAURANT_BY_USER_ID_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: GET_RESTAURANT_BY_USER_ID_FAILURE, payload: error });
        console.log("error", error);
    }
}

export const updateRestaurant = ({ jwtToken, restaurantId, restaurantData }) => async (dispatch) => {
    dispatch({ type: UPDATE_RESTAURANT_REQUEST });
    try {
        const { data } = await api.put(`api/admin/restaurants/${restaurantId}`, restaurantData, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });

        successAlert("Restaurant Details updated Successfully.");

        dispatch({ type: UPDATE_RESTAURANT_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: UPDATE_RESTAURANT_FAILURE, payload: error });
        console.log("error", error);
        errorAlert(error.response.data.message);
    }
}

export const updateRestaurantStatus = ({ jwtToken, restaurantId }) => async (dispatch) => {
    dispatch({ type: UPDATE_RESTAURANT_STATUS_REQUEST });
    try {
        const { data } = await api.put(`api/admin/restaurants/${restaurantId}/status`, {}, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });

        saveAlert("Restaurant status changed Successfully.");

        dispatch({ type: UPDATE_RESTAURANT_STATUS_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: UPDATE_RESTAURANT_STATUS_FAILURE, payload: error });
        console.log("error", error);
        errorAlert(error.response.data.message);
    }
}


//offer
export const createOffer = ({ jwtToken, offerData }) => async (dispatch) => {
    dispatch({ type: CREATE_OFFER_REQUEST });
    try {
        const { data } = await api.post(`api/admin/offer`, offerData, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });

        successAlert("Offer created Successfully.");

        dispatch({ type: CREATE_OFFER_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: CREATE_OFFER_FAILURE, payload: error });
        console.log("error", error);
        errorAlert(error.response.data.message);
    }
}

export const updateOffer = ({ jwtToken, offerId, offerData }) => async (dispatch) => {
    dispatch({ type: UPDATE_OFFER_REQUEST });
    try {
        const { data } = await api.put(`api/admin/offer/${offerId}`, offerData, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });

        saveAlert("Offer updated Successfully.");

        dispatch({ type: UPDATE_OFFER_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: UPDATE_OFFER_FAILURE, payload: error });
        console.log("error", error);
        errorAlert(error.response.data.message);
    }
}

export const deleteOffer = ({ jwtToken, offerId }) => async (dispatch) => {
    dispatch({ type: DELETE_OFFER_REQUEST });
    try {
        const { data } = await api.delete(`api/admin/offer/${offerId}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });

        saveAlert("Offer deleted Successfully.");

        dispatch({ type: DELETE_OFFER_SUCCESS, payload: offerId });
    }
    catch (error) {
        dispatch({ type: DELETE_OFFER_FAILURE, payload: error });
        console.log("error", error);
        errorAlert(error.response.data.message);
    }
}

export const getOffersForRestaurant = ({ jwtToken, restaurantId }) => async (dispatch) => {
    dispatch({ type: GET_OFFERS_BY_RESTAURANT_ID_REQUEST });
    try {
        const { data } = await api.get(`api/admin/offer/restaurant/${restaurantId}`, {
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

export const getOfferById = ({ jwtToken, offerId }) => async (dispatch) => {
    dispatch({ type: GET_OFFER_BY_ID_REQUEST });
    try {

        const { data } = await api.get(`api/admin/offer/${offerId}`, {
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
export const createMenuCategory = ({ jwtToken, categoryData }) => async (dispatch) => {
    dispatch({ type: CREATE_MENU_CATEGORY_REQUEST });
    try {
        const { data } = await api.post(`api/admin/menuCategory`, categoryData, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });

        successAlert("Menu Category created Successfully.");

        dispatch({ type: CREATE_MENU_CATEGORY_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: CREATE_MENU_CATEGORY_FAILURE, payload: error });
        console.log("error", error);
        errorAlert(error.response.data.message);
    }
}

export const updateMenuCategory = ({ jwtToken, menuCategoryId, categoryData }) => async (dispatch) => {
    dispatch({ type: UPDATE_MENU_CATEGORY_REQUEST });
    try {
        const { data } = await api.put(`api/admin/menuCategory/${menuCategoryId}`, categoryData, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });

        saveAlert("Menu Category updated Successfully.");

        dispatch({ type: UPDATE_MENU_CATEGORY_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: UPDATE_MENU_CATEGORY_FAILURE, payload: error });
        console.log("error", error);
        errorAlert(error.response.data.message);
    }
}

export const deleteMenuCategory = ({ jwtToken, menuCategoryId }) => async (dispatch) => {
    dispatch({ type: DELETE_MENU_CATEGORY_REQUEST });
    try {
        const { data } = await api.delete(`api/admin/menuCategory/${menuCategoryId}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });

        saveAlert("Menu Category deleted Successfully.");

        dispatch({ type: DELETE_MENU_CATEGORY_SUCCESS, payload: menuCategoryId });
    }
    catch (error) {
        dispatch({ type: DELETE_MENU_CATEGORY_FAILURE, payload: error });
        console.log("error", error);
        errorAlert(error.response.data.message);
    }
}

export const getAllMenuCategoriesForRestaurant = ({ jwtToken, restaurantId }) => async (dispatch) => {
    dispatch({ type: GET_ALL_MENU_CATEGORIES_FOR_RESTAURANT_REQUEST });
    try {
        const { data } = await api.get(`api/admin/menuCategory/restaurant/${restaurantId}`, {
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
        const { data } = await api.get(`api/admin/menuCategory/${menuCategoryId}`, {
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