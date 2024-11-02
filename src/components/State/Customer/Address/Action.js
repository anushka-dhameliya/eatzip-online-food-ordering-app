import { errorAlert, saveAlert } from "../../../config/alert";
import { api } from "../../../config/api";
import { 
    CREATE_ADDRESS_FAILURE, 
    CREATE_ADDRESS_REQUEST, 
    CREATE_ADDRESS_SUCCESS, 
    GET_USER_ADDRESSES_FAILURE, 
    GET_USER_ADDRESSES_REQUEST,
    GET_USER_ADDRESSES_SUCCESS
} from "./ActionType";

export const createAddress = ({ jwtToken, addressData }) => async (dispatch) => {
    dispatch({ type: CREATE_ADDRESS_REQUEST });
    try {
        const { data } = await api.post(`api/address`, addressData, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });

        saveAlert("Address Created Sucessfully.");

        dispatch({ type: CREATE_ADDRESS_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: CREATE_ADDRESS_FAILURE, payload: error });
        console.log("error", error);
        errorAlert(error.response.data.message);
    }
}

export const getUserAddresses = ({ jwtToken }) => async (dispatch) => {
    dispatch({ type: GET_USER_ADDRESSES_REQUEST });
    try {
        const { data } = await api.get(`api/address`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });

        dispatch({ type: GET_USER_ADDRESSES_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: GET_USER_ADDRESSES_FAILURE, payload: error });
        console.log("error", error);
    }
}