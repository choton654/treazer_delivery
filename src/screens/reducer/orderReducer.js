export const initialState = {
  order: null,
  error: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "GET_RESTAURENTS_ORDERS":
      return {
        ...state,
        orders: action.payload,
      };

    case "ORDER_ERROR":
      return {
        ...state,
        error: action.payload,
      };
  }
};
