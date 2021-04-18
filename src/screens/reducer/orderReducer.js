export const initialState = {
  orders: null,
  assignedOrders: [],
  pickupOrder: null,
  completedOrders: [],
  myBoysOrder: [],
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
        assignedOrders: [],
        pickupOrder: null,
        completedOrders: [],
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
    case "REJECT_ORDER":
      return {
        ...state,
        orders: [...state.orders, action.payload],
        assignedOrders: state.assignedOrders.filter((order) => {
          if (order._id.toString() !== action.payload._id.toString()) {
            return order;
          } else {
            return null;
          }
        }),
      };
    case "REJECT_NEW_ORDER":
      return {
        ...state,
        orders: state.orders.filter(
          (order) => order._id.toString() !== action.payload.toString()
        ),
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
    case "GET_COMPLETED_ORDERS":
      return {
        ...state,
        completedOrders: action.payload,
      };
    case "ORDER_DONE":
      return {
        ...state,
        pickupOrder: null,
        assignedOrders: state.assignedOrders.filter(
          (order) => order._id.toString() !== action.payload._id.toString()
        ),
      };
    case "MY_BOYS_COMPLETED_ORDERS":
      return {
        ...state,
        myBoysOrder: action.payload,
      };
  }
};
