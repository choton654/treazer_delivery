export const initialState = {
  orders: null,
  assignedOrders: null,
  pickupOrder: null,
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

    case "EMPTY_ORDER":
      return {
        ...state,
        orders: null,
        assignedOrders: null,
        pickupOrder: null,
        error: null,
      };
    case "ACCEPT_ORDER":
      return {
        ...state,
        orders: state.orders.filter(
          (order) => order._id.toString() !== action.payload._id.toString()
        ),
        assignedOrders: [...state.assignedOrders, action.payload],
      };
    case "ASSIGNED_ORDER":
      return {
        ...state,
        assignedOrders: action.payload,
      };
    case "PICKUP_ORDERS":
      return {
        ...state,
        assignedOrders: state.assignedOrders.map((order) => {
          if (order._id.toString() === action.payload._id.toString()) {
            order.isPickedup = true;
            return order;
          } else {
            return order;
          }
        }),
      };
    case "GET_ONE_PICKUP_ORDER":
      return {
        ...state,
        pickupOrder: action.payload,
      };
  }
};
