import axios from "axios";
import { GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, UPDATE_USER_DETAILS_FAILURE, UPDATE_USER_DETAILS_REQUEST, UPDATE_USER_DETAILS_SUCCESS } from "./ActionType"
import { api, API_URL } from "../../config/api";
import { errorAlert, saveAlert, successAlert } from "../../config/alert";

export const registerUser = (reqData) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });
    try {
        const { data } = await axios.post(`${API_URL}auth/signup`, reqData.userData);

        successAlert("Registration Sucessful.");

        if (data.role === "ROLE_RESTAURANT_OWNER")
            localStorage.setItem("Restaurant_Registration", "false");

        reqData.navigate("/account/login");

        dispatch({ type: REGISTER_SUCCESS, payload: data.jwtToken });
        console.log("Register Success", data);
    }
    catch (error) {
        dispatch({ type: REGISTER_FAILURE, payload: error });
        console.log("error", error);
        errorAlert(error.response.data.message);
    }
}

export const loginUser = (reqData) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
        const { data } = await axios.post(`${API_URL}auth/signin`, reqData.userData);


        if (data.jwtToken)
            localStorage.setItem("jwtToken", data.jwtToken);

        if (data.role)
            localStorage.setItem("role", data.role);

        //role-wise navigation
        if (data.role === "ROLE_RESTAURANT_OWNER") {
            //check if restaurant owner is first time logging in, allow restaurant registration
            let Restaurant_Registration = localStorage.getItem("Restaurant_Registration");
            if (Restaurant_Registration === 'false') {
                reqData.navigate("/account/restaurantRegister");
            }
            else
                reqData.navigate("/admin/restaurant");
        }
        else
            reqData.navigate("/");

        window.location.reload();

        saveAlert("Login Sucessful.");

        dispatch({ type: LOGIN_SUCCESS, payload: data.jwtToken });
        console.log("Login Success", data);
    }
    catch (error) {
        dispatch({ type: LOGIN_FAILURE, payload: error });
        console.log("error", error);
        //alert(error.response.data.message);
        errorAlert(error.response.data.message);
    }
}

export const getUser = (jwtToken) => async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST });
    try {
        const { data } = await api.get(`api/users/profile`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });

        dispatch({ type: GET_USER_SUCCESS, payload: data });
        console.log("User profile", data);
    }
    catch (error) {
        dispatch({ type: GET_USER_FAILURE, payload: error });
        console.log("error", error);
        //errorAlert(error.response.data.message);
    }
}

export const logout = () => async (dispatch) => {
    //dispatch({type : LOGOUT});
    try {
        localStorage.clear();
        dispatch({ type: LOGOUT });
        console.log("Logout Success");
    }
    catch (error) {
        console.log("error", error);
        errorAlert(error.response.data.message);
    }
}

export const updateUserDetails = ({ jwtToken, userDetails }) => async (dispatch) => {
    dispatch({ type: UPDATE_USER_DETAILS_REQUEST });
    try {
        const { data } = await api.put(`api/users`, userDetails, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });

        saveAlert("User Details saved Successfully.");

        dispatch({ type: UPDATE_USER_DETAILS_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: UPDATE_USER_DETAILS_FAILURE, payload: error });
        console.log("error", error);
        errorAlert(error.response.data.message);
    }
}