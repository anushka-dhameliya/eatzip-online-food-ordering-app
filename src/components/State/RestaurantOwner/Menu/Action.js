
import { errorAlert, saveAlert } from "../../../config/alert";
import { api } from "../../../config/api";
import {
    CREATE_ADD_ON_ITEM_FAILURE,
    CREATE_ADD_ON_ITEM_REQUEST,
    CREATE_ADD_ON_ITEM_SUCCESS,
    CREATE_MENU_ITEM_FAILURE,
    CREATE_MENU_ITEM_REQUEST,
    CREATE_MENU_ITEM_SUCCESS,
    DELETE_ADD_ON_ITEM_FAILURE,
    DELETE_ADD_ON_ITEM_REQUEST,
    DELETE_ADD_ON_ITEM_SUCCESS,
    DELETE_MENU_ITEM_FAILURE,
    DELETE_MENU_ITEM_REQUEST,
    DELETE_MENU_ITEM_SUCCESS,
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
    GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS,
    UPDATE_ADD_ON_ITEM_FAILURE,
    UPDATE_ADD_ON_ITEM_REQUEST,
    UPDATE_ADD_ON_ITEM_STATUS_FAILURE,
    UPDATE_ADD_ON_ITEM_STATUS_REQUEST,
    UPDATE_ADD_ON_ITEM_STATUS_SUCCESS,
    UPDATE_ADD_ON_ITEM_SUCCESS,
    UPDATE_MENU_ITEM_FAILURE,
    UPDATE_MENU_ITEM_REQUEST,
    UPDATE_MENU_ITEM_SUCCESS
} from "./ActionType";

//menu-items
export const createMenuItem = ({ jwtToken, menuItemData }) => async (dispatch) => {
    dispatch({ type: CREATE_MENU_ITEM_REQUEST });
    try {
        const { data } = await api.post(`api/admin/menuItems`, menuItemData, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });

        saveAlert("Menu-Item created Successfully.");

        dispatch({ type: CREATE_MENU_ITEM_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: CREATE_MENU_ITEM_FAILURE, payload: error });
        console.log("error", error);
        errorAlert(error.response.data.message);
    }
}

export const updateMenuItem = ({ jwtToken, menuItemId, menuItemData }) => async (dispatch) => {
    dispatch({ type: UPDATE_MENU_ITEM_REQUEST });
    try {
        const { data } = await api.put(`api/admin/menuItems/${menuItemId}`, menuItemData, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });

        saveAlert("Menu-Item updated Successfully.");

        dispatch({ type: UPDATE_MENU_ITEM_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: UPDATE_MENU_ITEM_FAILURE, payload: error });
        console.log("error", error);
        errorAlert(error.response.data.message);
    }
}

export const deleteMenuItem = ({ jwtToken, menuItemId }) => async (dispatch) => {
    dispatch({ type: DELETE_MENU_ITEM_REQUEST });
    try {
        const { data } = await api.delete(`api/admin/menuItems/${menuItemId}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });

        saveAlert("Menu-Item deleted Successfully.");

        dispatch({ type: DELETE_MENU_ITEM_SUCCESS, payload: menuItemId });
    }
    catch (error) {
        dispatch({ type: DELETE_MENU_ITEM_FAILURE, payload: error });
        console.log("error", error);
        errorAlert(error.response.data.message);
    }
}

export const getMenuItemsByRestaurantId = ({ jwtToken, restaurantId }) => async (dispatch) => {
    dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST });
    try {
        const { data } = await api.get(`api/admin/menuItems/restaurant/${restaurantId}`, {
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
        const { data } = await api.get(`api/admin/menuItems/${menuItemId}`, {
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


//add-ons-items
export const createAddOnItem = ({ jwtToken, addOnItemData }) => async (dispatch) => {
    dispatch({ type: CREATE_ADD_ON_ITEM_REQUEST });
    try {
        const { data } = await api.post(`api/admin/addOnItems`, addOnItemData, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });

        saveAlert("Add-On-Item created Successfully.");

        dispatch({ type: CREATE_ADD_ON_ITEM_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: CREATE_ADD_ON_ITEM_FAILURE, payload: error });
        console.log("error", error);
        errorAlert(error.response.data.message);
    }
}

export const updateAddOnItem = ({ jwtToken, addOnItemId, addOnItemData }) => async (dispatch) => {
    dispatch({ type: UPDATE_ADD_ON_ITEM_REQUEST });
    try {
        const { data } = await api.put(`api/admin/addOnItems/${addOnItemId}`, addOnItemData, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });

        saveAlert("Add-On-Item updated Successfully.");

        dispatch({ type: UPDATE_ADD_ON_ITEM_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: UPDATE_ADD_ON_ITEM_FAILURE, payload: error });
        console.log("error", error);
        errorAlert(error.response.data.message);
    }
}

export const updateAddOnItemStatus = ({ jwtToken, addOnItemId }) => async (dispatch) => {
    dispatch({ type: UPDATE_ADD_ON_ITEM_STATUS_REQUEST });
    try {
        const { data } = await api.put(`api/admin/addOnItems/status/${addOnItemId}`, {}, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });

        saveAlert("Add-On-Item updated Successfully.");

        dispatch({ type: UPDATE_ADD_ON_ITEM_STATUS_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: UPDATE_ADD_ON_ITEM_STATUS_FAILURE, payload: error });
        console.log("error", error);
        errorAlert(error.response.data.message);
    }
}

export const deleteAddOnItem = ({ jwtToken, addOnItemId }) => async (dispatch) => {
    dispatch({ type: DELETE_ADD_ON_ITEM_REQUEST });
    try {
        const { data } = await api.delete(`api/admin/addOnItems/${addOnItemId}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });

        saveAlert("Add-On-Item deleted Successfully.");

        dispatch({ type: DELETE_ADD_ON_ITEM_SUCCESS, payload: addOnItemId });
    }
    catch (error) {
        dispatch({ type: DELETE_ADD_ON_ITEM_FAILURE, payload: error });
        console.log("error", error);
        errorAlert(error.response.data.message);
    }
}

export const getAddOnItemsByRestaurantId = ({ jwtToken, restaurantId }) => async (dispatch) => {
    dispatch({ type: GET_ADD_ON_ITEMS_BY_RESTAURANT_ID_REQUEST });
    try {
        const { data } = await api.get(`api/admin/addOnItems/restaurant/${restaurantId}`, {
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
        const { data } = await api.get(`api/admin/addOnItems/${addOnItemId}`, {
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