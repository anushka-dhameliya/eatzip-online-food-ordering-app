import { GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, UPDATE_USER_DETAILS_FAILURE, UPDATE_USER_DETAILS_REQUEST, UPDATE_USER_DETAILS_SUCCESS } from "./ActionType"

const initialState = {
    user: null,
    isLoading: false,
    error: null,
    jwtToken: null,
    success: null
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case GET_USER_REQUEST:
        case UPDATE_USER_DETAILS_REQUEST:
            return { ...state, isLoading: true, error: null, success: null };

        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return { ...state, isLoading: false, jwtToken: action.payload, success: "Register Success" };

        case GET_USER_SUCCESS:
            return { ...state, isLoading: false, user: action.payload };

        case LOGOUT:
            return initialState;

        case UPDATE_USER_DETAILS_SUCCESS:
            return { ...state, isLoading: false, user: action.payload, success: "Update User Details Success" };

        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
        case GET_USER_FAILURE:
        case UPDATE_USER_DETAILS_FAILURE:
            return { ...state, isLoading: false, error: action.payload, success: null };

        default:
            return state;
    }
}