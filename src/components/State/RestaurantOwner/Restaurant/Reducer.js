import {
    CREATE_MENU_CATEGORY_FAILURE,
    CREATE_MENU_CATEGORY_REQUEST,
    CREATE_MENU_CATEGORY_SUCCESS,
    CREATE_OFFER_FAILURE,
    CREATE_OFFER_REQUEST,
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

const initialState = {
    restaurants: [],
    usersRestaurant: null,
    restaurant: null,
    isLoading: false,
    error: null,
    success: null,
    restaurantOffers: [],
    menuCategories: []
}

export const restaurantReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_RESTAURANT_REQUEST:
        case UPDATE_RESTAURANT_REQUEST:
        case GET_RESTAURANT_BY_ID_REQUEST:
        case GET_RESTAURANT_BY_USER_ID_REQUEST:
        case UPDATE_RESTAURANT_STATUS_REQUEST:
        case CREATE_OFFER_REQUEST:
        case UPDATE_OFFER_REQUEST:
        case DELETE_OFFER_REQUEST:
        case GET_OFFER_BY_ID_REQUEST:
        case GET_OFFERS_BY_RESTAURANT_ID_REQUEST:
        case CREATE_MENU_CATEGORY_REQUEST:
        case UPDATE_MENU_CATEGORY_REQUEST:
        case DELETE_MENU_CATEGORY_REQUEST:
        case GET_MENU_CATEGORY_BY_ID_REQUEST:
        case GET_ALL_MENU_CATEGORIES_FOR_RESTAURANT_REQUEST:
            return { ...state, isLoading: true, error: null, success: null };

        case CREATE_RESTAURANT_SUCCESS:
            return { ...state, isLoading: false, usersRestaurant: action.payload, success: "Register Restaurant Success" };

        case GET_RESTAURANT_BY_USER_ID_SUCCESS:
        case UPDATE_RESTAURANT_SUCCESS:
        case UPDATE_RESTAURANT_STATUS_SUCCESS:
            return { ...state, isLoading: false, usersRestaurant: action.payload, success: "User Restaurant Success" };

        case GET_RESTAURANT_BY_ID_SUCCESS:
            return { ...state, isLoading: false, restaurant: action.payload, success: "Get Restaurant By Id Success" };

        case CREATE_OFFER_SUCCESS:
            return { ...state, isLoading: false, restaurantOffers: [...state.restaurantOffers, action.payload], success: "Offer Create Success" };

        case UPDATE_OFFER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                restaurantOffers: state.restaurantOffers.map((item) => item.id === action.payload.id ? action.payload : item),
                success: "Update Offer Success"
            };

        case DELETE_OFFER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                restaurantOffers: state.restaurantOffers.filter((item) => item.id !== action.payload),
                success: "Delete Offers Success"
            };

        case GET_OFFERS_BY_RESTAURANT_ID_SUCCESS:
            return { ...state, isLoading: false, restaurantOffers: action.payload, success: "Get Offers for Restaurant Success" };

        case CREATE_MENU_CATEGORY_SUCCESS:
            return { ...state, isLoading: false, menuCategories: [...state.menuCategories, action.payload], success: "Menu-Category Create Success" };

        case UPDATE_MENU_CATEGORY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                menuCategories: state.menuCategories.map((item) => item.id === action.payload.id ? action.payload : item),
                success: "Update Menu-Category Success"
            };

        case DELETE_MENU_CATEGORY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                menuCategories: state.menuCategories.filter((item) => item.id !== action.payload),
                success: "Delete Menu-Category Success"
            };

        case GET_ALL_MENU_CATEGORIES_FOR_RESTAURANT_SUCCESS:
            return { ...state, isLoading: false, menuCategories: action.payload, success: "Get Menu-Categories for Restaurant Success" };


        case CREATE_RESTAURANT_FAILURE:
        case UPDATE_RESTAURANT_FAILURE:
        case GET_RESTAURANT_BY_ID_FAILURE:
        case GET_RESTAURANT_BY_USER_ID_FAILURE:
        case UPDATE_RESTAURANT_STATUS_FAILURE:
        case CREATE_OFFER_FAILURE:
        case UPDATE_OFFER_FAILURE:
        case DELETE_OFFER_FAILURE:
        case GET_OFFER_BY_ID_FAILURE:
        case GET_OFFERS_BY_RESTAURANT_ID_FAILURE:
        case CREATE_MENU_CATEGORY_FAILURE:
        case UPDATE_MENU_CATEGORY_FAILURE:
        case DELETE_MENU_CATEGORY_FAILURE:
        case GET_MENU_CATEGORY_BY_ID_FAILURE:
            return { ...state, isLoading: false, error: action.payload, success: null };

        default:
            return state;
    }
};

export default restaurantReducer;