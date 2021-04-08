export const initialState = {
  user: null,
  isLogin: localStorage.getItem("token") ? true : false,
  userRole: "user",
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
      };
    case "SET_USER_ROLE":
      return {
        ...state,
        userRole: "resturant-owner",
      };
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
