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

const initialState = {
    menuItems: [],
    addOnItems: [],
    isLoading: false,
    error: null,
    success: null
}

export const menuReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_MENU_ITEM_REQUEST:
        case UPDATE_MENU_ITEM_REQUEST:
        case DELETE_MENU_ITEM_REQUEST:
        case GET_MENU_ITEM_BY_ID_REQUEST:
        case GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST:
        case CREATE_ADD_ON_ITEM_REQUEST:
        case UPDATE_ADD_ON_ITEM_REQUEST:
        case UPDATE_ADD_ON_ITEM_STATUS_REQUEST:
        case DELETE_ADD_ON_ITEM_REQUEST:
        case GET_ADD_ON_ITEM_BY_ID_REQUEST:
        case GET_ADD_ON_ITEMS_BY_RESTAURANT_ID_REQUEST:
            return { ...state, isLoading: true, error: null, success: null };

        case CREATE_MENU_ITEM_SUCCESS:
            return { ...state, isLoading: false, menuItems: [...state.menuItems, action.payload], success: "Menu-Item Create Success" };

        case GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS:
            return { ...state, isLoading: false, menuItems: action.payload, success: "Get Menu-Items for Restaurant Success" };

        case UPDATE_MENU_ITEM_SUCCESS:
            return {
                ...state,
                isLoading: false,
                menuItems: state.menuItems.map((item) => item.id === action.payload.id ? action.payload : item),
                success: "Update Menu-Item Success"
            };

        case DELETE_MENU_ITEM_SUCCESS:
            return {
                ...state,
                isLoading: false,
                menuItems: state.menuItems.filter((item) => item.id !== action.payload),
                success: "Delete Menu-Item Success"
            };

        case CREATE_ADD_ON_ITEM_SUCCESS:
            return { ...state, isLoading: false, addOnItems: [...state.addOnItems, action.payload], success: "AddOn-Item Create Success" };

        case GET_ADD_ON_ITEMS_BY_RESTAURANT_ID_SUCCESS:
            return { ...state, isLoading: false, addOnItems: action.payload, success: "Get AddOn-Items for Restaurant Success" };


        case UPDATE_ADD_ON_ITEM_SUCCESS:
        case UPDATE_ADD_ON_ITEM_STATUS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                addOnItems: state.addOnItems.map((item) => item.id === action.payload.id ? action.payload : item),
                success: "Update AddOn-Item Success"
            };

        case DELETE_ADD_ON_ITEM_SUCCESS:
            return {
                ...state,
                isLoading: false,
                addOnItems: state.addOnItems.filter((item) => item.id !== action.payload),
                success: "Delete Menu-Item Success"
            };

        case CREATE_MENU_ITEM_FAILURE:
        case UPDATE_MENU_ITEM_FAILURE:
        case DELETE_MENU_ITEM_FAILURE:
        case GET_MENU_ITEM_BY_ID_FAILURE:
        case GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE:
        case CREATE_ADD_ON_ITEM_FAILURE:
        case UPDATE_ADD_ON_ITEM_FAILURE:
        case UPDATE_ADD_ON_ITEM_STATUS_FAILURE:
        case DELETE_ADD_ON_ITEM_FAILURE:
        case GET_ADD_ON_ITEM_BY_ID_FAILURE:
        case GET_ADD_ON_ITEMS_BY_RESTAURANT_ID_FAILURE:
            return { ...state, isLoading: false, error: action.payload, success: null };

        default:
            return state;
    }
};

export default menuReducer;