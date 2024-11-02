import axios from "axios";
import {
    FILTER_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE,
    FILTER_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST,
    FILTER_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS,
    FILTER_RESTAURANTS_FAILURE,
    FILTER_RESTAURANTS_REQUEST,
    FILTER_RESTAURANTS_SUCCESS,
    GET_ADD_ON_ITEM_BY_ID_FAILURE,
    GET_ADD_ON_ITEM_BY_ID_REQUEST,
    GET_ADD_ON_ITEM_BY_ID_SUCCESS,
    GET_ADD_ON_ITEMS_BY_RESTAURANT_ID_FAILURE,
    GET_ADD_ON_ITEMS_BY_RESTAURANT_ID_REQUEST,
    GET_ADD_ON_ITEMS_BY_RESTAURANT_ID_SUCCESS,
    GET_ALL_MENU_CATEGORIES_FOR_RESTAURANT_FAILURE,
    GET_ALL_MENU_CATEGORIES_FOR_RESTAURANT_REQUEST,
    GET_ALL_MENU_CATEGORIES_FOR_RESTAURANT_SUCCESS,
    GET_ALL_RESTAURANTS_FAILURE,
    GET_ALL_RESTAURANTS_REQUEST,
    GET_ALL_RESTAURANTS_SUCCESS,
    GET_MENU_BY_RESTAURANT_ID_FAILURE,
    GET_MENU_BY_RESTAURANT_ID_REQUEST,
    GET_MENU_BY_RESTAURANT_ID_SUCCESS,
    GET_MENU_CATEGORY_BY_ID_FAILURE,
    GET_MENU_CATEGORY_BY_ID_REQUEST,
    GET_MENU_CATEGORY_BY_ID_SUCCESS,
    GET_MENU_ITEM_BY_ID_FAILURE,
    GET_MENU_ITEM_BY_ID_REQUEST,
    GET_MENU_ITEM_BY_ID_SUCCESS,
    GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE,
    GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST,
    GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS,
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
import { api } from "../../config/api";


//restaurant
export const getAllRestaurants = () => async (dispatch) => {
    dispatch({ type: GET_ALL_RESTAURANTS_REQUEST });
    try {
        const { data } = await api.get(`/restaurants`);

        dispatch({ type: GET_ALL_RESTAURANTS_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: GET_ALL_RESTAURANTS_FAILURE, payload: error });
        console.log("error", error);
    }
}

export const getRestaurantById = ({ restaurantId }) => async (dispatch) => {
    dispatch({ type: GET_RESTAURANT_BY_ID_REQUEST });
    try {
        const { data } = await api.get(`/restaurants/${restaurantId}`);

        dispatch({ type: GET_RESTAURANT_BY_ID_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: GET_RESTAURANT_BY_ID_FAILURE, payload: error });
        console.log("error", error);
    }
}

export const filterRestarants = ({name, open, isVegetarian, city, pinCode, category}) => async (dispatch) => {
    dispatch({ type: FILTER_RESTAURANTS_REQUEST });
    try {
        const { data } = await api.get(`/restaurants/filter?name=${name}&open=${open}&isVegetarian=${isVegetarian}&city=${city}&pinCode=${pinCode}&category=${category}`);

        localStorage.setItem('showSearchResult','true');
        dispatch({ type: FILTER_RESTAURANTS_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: FILTER_RESTAURANTS_FAILURE, payload: error });
        console.log("error", error);
    }
}


//offer
export const getOffersForRestaurant = ({ restaurantId }) => async (dispatch) => {
    dispatch({ type: GET_OFFERS_BY_RESTAURANT_ID_REQUEST });
    try {
        const { data } = await api.get(`/offers/restaurant/${restaurantId}`);

        dispatch({ type: GET_OFFERS_BY_RESTAURANT_ID_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: GET_OFFERS_BY_RESTAURANT_ID_FAILURE, payload: error });
        console.log("error", error);
    }
}

export const getOfferById = ({ offerId }) => async (dispatch) => {
    dispatch({ type: GET_OFFER_BY_ID_REQUEST });
    try {
        
        const { data } = await api.get(`/offers/${offerId}`);

        dispatch({ type: GET_OFFER_BY_ID_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: GET_OFFER_BY_ID_FAILURE, payload: error });
        console.log("error", error);
    }
}


//menu-category
export const getAllMenuCategoriesForRestaurant = ({ restaurantId }) => async (dispatch) => {
    dispatch({ type: GET_ALL_MENU_CATEGORIES_FOR_RESTAURANT_REQUEST });
    try {
        const { data } = await api.get(`/menuCategory/restaurant/${restaurantId}`);

        dispatch({ type: GET_ALL_MENU_CATEGORIES_FOR_RESTAURANT_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: GET_ALL_MENU_CATEGORIES_FOR_RESTAURANT_FAILURE, payload: error });
        console.log("error", error);
    }
}

export const getMenuCategoryById = ({ menuCategoryId }) => async (dispatch) => {
    dispatch({ type: GET_MENU_CATEGORY_BY_ID_REQUEST });
    try {
        const { data } = await api.get(`/menuCategory/${menuCategoryId}`);

        dispatch({ type: GET_MENU_CATEGORY_BY_ID_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: GET_MENU_CATEGORY_BY_ID_FAILURE, payload: error });
        console.log("error", error);
    }
}

//menu-items
export const getMenuItemsByRestaurantId = ({ restaurantId }) => async (dispatch) => {
    dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST });
    try {
        const { data } = await api.get(`/menuItems/restaurant/${restaurantId}`);

        dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE, payload: error });
        console.log("error", error);
    }
}

export const getMenuItemById = ({ menuItemId }) => async (dispatch) => {
    dispatch({ type: GET_MENU_ITEM_BY_ID_REQUEST });
    try {
        const { data } = await api.get(`/menuItems/${menuItemId}`);

        dispatch({ type: GET_MENU_ITEM_BY_ID_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: GET_MENU_ITEM_BY_ID_FAILURE, payload: error });
        console.log("error", error);
    }
}

export const filterMenuItemsByRestaurantId = ({ restaurantId, name, isVegetarian, category }) => async (dispatch) => {
    dispatch({ type: FILTER_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST });
    try {
        const { data } = await api.get(`/menuItems/filter?restaurantId=${restaurantId}&name=${name}&isVegetarian=${isVegetarian}&category=${category}`
        );

        dispatch({ type: FILTER_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: FILTER_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE, payload: error });
        console.log("error", error);
    }
}

export const getMenuByRestaurantId = ({ restaurantId }) => async (dispatch) => {
    dispatch({ type: GET_MENU_BY_RESTAURANT_ID_REQUEST });
    try {
        const { data } = await api.get(`/restaurant/${restaurantId}/menu`);

        dispatch({ type: GET_MENU_BY_RESTAURANT_ID_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: GET_MENU_BY_RESTAURANT_ID_FAILURE, payload: error });
        console.log("error", error);
    }
}



//add-ons-items
export const getAddOnItemsByRestaurantId = ({ restaurantId }) => async (dispatch) => {
    dispatch({ type: GET_ADD_ON_ITEMS_BY_RESTAURANT_ID_REQUEST });
    try {
        const { data } = await api.get(`/addOnItems/restaurant/${restaurantId}`);

        dispatch({ type: GET_ADD_ON_ITEMS_BY_RESTAURANT_ID_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: GET_ADD_ON_ITEMS_BY_RESTAURANT_ID_FAILURE, payload: error });
        console.log("error", error);
    }
}

export const getAddOnItemById = ({ addOnItemId }) => async (dispatch) => {
    dispatch({ type: GET_ADD_ON_ITEM_BY_ID_REQUEST });
    try {
        const { data } = await api.get(`/addOnItems/${addOnItemId}`);

        dispatch({ type: GET_ADD_ON_ITEM_BY_ID_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: GET_ADD_ON_ITEM_BY_ID_FAILURE, payload: error });
        console.log("error", error);
    }
}