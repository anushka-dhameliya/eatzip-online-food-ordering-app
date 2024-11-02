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

const initialState = {
    restaurants: [],
    restaurant: null,
    isLoading: false,
    error: null,
    success: null,
    restaurantOffers: [],
    availableRestarantOffers: [],
    menuCategories: []
}

export const restaurantCustomerReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_RESTAURANTS_REQUEST:
        case GET_RESTAURANT_BY_ID_REQUEST:
        case GET_ALL_MENU_CATEGORIES_FOR_RESTAURANT_REQUEST:
        case GET_MENU_CATEGORY_BY_ID_REQUEST:
        case GET_OFFER_BY_ID_REQUEST:
        case GET_OFFERS_BY_RESTAURANT_ID_REQUEST:
        case GET_AVIALABLE_OFFERS_BY_RESTAURANT_ID_REQUEST:
            return { ...state, isLoading: true, error: null, success: null };

        case GET_ALL_RESTAURANTS_SUCCESS:
            return { ...state, isLoading: false, restaurants: action.payload, success: "Get All Restaurants Success" };

        case GET_RESTAURANT_BY_ID_SUCCESS:
            return { ...state, isLoading: false, restaurant: action.payload, success: "Get Restaurant By Id Success" };

        case GET_OFFERS_BY_RESTAURANT_ID_SUCCESS:
            return { ...state, isLoading: false, restaurantOffers: action.payload, success: "Get Offers for Restaurant Success" };

        case GET_AVIALABLE_OFFERS_BY_RESTAURANT_ID_SUCCESS:
            return { ...state, isLoading: false, availableRestarantOffers: action.payload, success: "Get Offers for Restaurant Success" };

        case GET_ALL_MENU_CATEGORIES_FOR_RESTAURANT_SUCCESS:
            return { ...state, isLoading: false, menuCategories: action.payload, success: "Get Menu-Categories for Restaurant Success" };

        case GET_ALL_RESTAURANTS_FAILURE:
        case GET_RESTAURANT_BY_ID_FAILURE:
        case GET_ALL_MENU_CATEGORIES_FOR_RESTAURANT_FAILURE:
        case GET_MENU_CATEGORY_BY_ID_FAILURE:
        case GET_OFFER_BY_ID_FAILURE:
        case GET_OFFERS_BY_RESTAURANT_ID_FAILURE:
        case GET_AVIALABLE_OFFERS_BY_RESTAURANT_ID_FAILURE:
            return { ...state, isLoading: false, error: action.payload, success: null };

        default:
            return state;
    }
};

export default restaurantCustomerReducer;