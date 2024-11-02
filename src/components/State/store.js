import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { authReducer } from "./Authentication/Reducer";
import { thunk } from "redux-thunk";
import { restaurantReducer } from "./RestaurantOwner/Restaurant/Reducer";
import menuReducer from "./RestaurantOwner/Menu/Reducer";
import { orderCustomerReducer } from "./Customer/Order/Reducer";
import notificationReducer from "./Notification/Reducer";
import cartReducer from "./Customer/Cart/Reducer";
import restaurantCustomerReducer from "./Customer/Restaurant/Reducer";
import menuCustomerReducer from "./Customer/Menu/Reducer";
import orderReducer from "./RestaurantOwner/Order/Reducer";
import homeReducer from "./Home/Reducer";
import addressCustomerReducer from "./Customer/Address/Reducer";

const rootReducer = combineReducers({
    auth : authReducer,
    home: homeReducer,
    restaurant : restaurantReducer,
    restaurantCustomer : restaurantCustomerReducer,
    menu : menuReducer,
    menuCustomer : menuCustomerReducer,
    cart: cartReducer,
    order : orderReducer,
    orderCustomer : orderCustomerReducer,
    notification: notificationReducer,
    addressCustomer : addressCustomerReducer
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));