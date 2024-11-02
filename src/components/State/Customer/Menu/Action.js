import { api } from "../../config/api";
import {
    FILTER_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE,
    FILTER_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST,
    FILTER_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS,
    GET_ADD_ON_ITEM_BY_ID_FAILURE,
    GET_ADD_ON_ITEM_BY_ID_REQUEST,
    GET_ADD_ON_ITEM_BY_ID_SUCCESS,
    GET_ADD_ON_ITEMS_BY_RESTAURANT_ID_FAILURE,
    GET_ADD_ON_ITEMS_BY_RESTAURANT_ID_REQUEST,
    GET_ADD_ON_ITEMS_BY_RESTAURANT_ID_SUCCESS,
    GET_MENU_ITEM_BY_ID_FAILURE,
    GET_MENU_ITEM_BY_ID_REQUEST,
    GET_MENU_ITEM_BY_ID_SUCCESS,
    GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE,
    GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST,
    GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS
} from "./ActionType";

//menu-items
export const getMenuItemsByRestaurantId = ({ jwtToken, restaurantId }) => async (dispatch) => {
    dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST });
    try {
        const { data } = await api.get(`api/menuItems/restaurant/${restaurantId}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });

        dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE, payload: error });
        console.log("error", error);
    }
}

export const getMenuItemById = ({ jwtToken, menuItemId }) => async (dispatch) => {
    dispatch({ type: GET_MENU_ITEM_BY_ID_REQUEST });
    try {
        const { data } = await api.get(`api/menuItems/${menuItemId}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });

        dispatch({ type: GET_MENU_ITEM_BY_ID_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: GET_MENU_ITEM_BY_ID_FAILURE, payload: error });
        console.log("error", error);
    }
}

export const filterMenuItemsByRestaurantId = ({ jwtToken, restaurantId, name, isVegetarian, category }) => async (dispatch) => {
    dispatch({ type: FILTER_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST });
    try {
        const { data } = await api.get(`api/menuItems/filter?
            restaurantId=${restaurantId}
            &name=${name}
            &isVegetarian=${isVegetarian}
            &category=${category}`,
            {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            });

        dispatch({ type: FILTER_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: FILTER_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE, payload: error });
        console.log("error", error);
    }
}

//add-ons-items
export const getAddOnItemsByRestaurantId = ({ jwtToken, restaurantId }) => async (dispatch) => {
    dispatch({ type: GET_ADD_ON_ITEMS_BY_RESTAURANT_ID_REQUEST });
    try {
        const { data } = await api.get(`api/addOnItems/restaurant/${restaurantId}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });

        dispatch({ type: GET_ADD_ON_ITEMS_BY_RESTAURANT_ID_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: GET_ADD_ON_ITEMS_BY_RESTAURANT_ID_FAILURE, payload: error });
        console.log("error", error);
    }
}

export const getAddOnItemById = ({ jwtToken, addOnItemId }) => async (dispatch) => {
    dispatch({ type: GET_ADD_ON_ITEM_BY_ID_REQUEST });
    try {
        const { data } = await api.get(`api/addOnItems/${addOnItemId}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });

        dispatch({ type: GET_ADD_ON_ITEM_BY_ID_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: GET_ADD_ON_ITEM_BY_ID_FAILURE, payload: error });
        console.log("error", error);
    }
}