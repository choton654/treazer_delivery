export const initialState = {
  user: null,
  isLogin: localStorage.getItem("token") ? true : false,
  deliveryBoys: null,
  notification: [],
  error: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_USER":
      return {
        ...state,
        user: action.payload,
        isLogin: true,
      };
    case "USER_PROFILE":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT_USER":
      return {
        ...state,
        isLogin: false,
        user: null,
      };
    case "GET_DELIVERY_BOY_BY_ADMIN":
      return {
        ...state,
        deliveryBoys: action.payload,
      };
    // case "SET_USER_ROLE":
    //   return {
    //     ...state,
    //     userRole: "resturant-owner",
    //   };
    // case "EDIT_USER":
    //   return {
    //     ...state,
    //     user: action.payload,
    //   };
    // case "ADD_ADDRESS":
    //   return {
    //     ...state,
    //     user: action.payload,
    //   };
    case "USER_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "SET_NOTIFICATION":
      return {
        ...state,
        notification: ["Notified"],
      };
    default:
      break;
  }
};
