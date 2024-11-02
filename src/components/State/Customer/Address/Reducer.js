import { 
    CREATE_ADDRESS_FAILURE,
    CREATE_ADDRESS_REQUEST, 
    CREATE_ADDRESS_SUCCESS, 
    GET_USER_ADDRESSES_FAILURE, 
    GET_USER_ADDRESSES_REQUEST, 
    GET_USER_ADDRESSES_SUCCESS
} from "./ActionType";

const initialState = {
    usersAddress: [],
    isLoading: false,
    error: null,
    success: null
}

export const addressCustomerReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_ADDRESS_REQUEST:
        case GET_USER_ADDRESSES_REQUEST:
            return { ...state, isLoading: true, error: null, success: null };

        case CREATE_ADDRESS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                order: action.payload,
                usersAddress: [...state.usersAddress, action.payload],
                success: "Create Address Success"
            };

        case GET_USER_ADDRESSES_SUCCESS:
            return { ...state, isLoading: false, usersAddress: action.payload, success: "Get All Address By User Id Success" };

        case CREATE_ADDRESS_FAILURE:
        case GET_USER_ADDRESSES_FAILURE:
            return { ...state, isLoading: false, error: action.payload, success: null };

        default:
            return state;
    }
};

export default addressCustomerReducer;