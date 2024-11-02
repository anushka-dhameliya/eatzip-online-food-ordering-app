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

const initialState = {
    menuItems: [],
    filteredMenuItems: [],
    addOnItems: [],
    isLoading: false,
    error: null,
    success: null
}

export const menuCustomerReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_MENU_ITEM_BY_ID_REQUEST:
        case GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST:
        case FILTER_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST:
        case GET_ADD_ON_ITEM_BY_ID_REQUEST:
        case GET_ADD_ON_ITEMS_BY_RESTAURANT_ID_REQUEST:
            return { ...state, isLoading: true, error: null, success: null };

        case GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS:
            return { ...state, isLoading: false, menuItems: action.payload, success: "Get Menu-Items for Restaurant Success" };

        case FILTER_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS:
            return { ...state, isLoading: false, filteredMenuItems: action.payload, success: "Filter Menu-Items for Restaurant Success" };

        case GET_ADD_ON_ITEMS_BY_RESTAURANT_ID_SUCCESS:
            return { ...state, isLoading: false, addOnItems: action.payload, success: "Get AddOn-Items for Restaurant Success" };


        case GET_MENU_ITEM_BY_ID_FAILURE:
        case GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE:
        case FILTER_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE:
        case GET_ADD_ON_ITEM_BY_ID_FAILURE:
        case GET_ADD_ON_ITEMS_BY_RESTAURANT_ID_FAILURE:
            return { ...state, isLoading: false, error: action.payload, success: null };

        default:
            return state;
    }
};

export default menuCustomerReducer;