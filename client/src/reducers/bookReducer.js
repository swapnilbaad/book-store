import {
  GET_BOOKS,
  ADD_BOOKS,
  DELETE_BOOKS,
  BOOKS_LOADING
} from "../actions/types";
const initialState = {
  books: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_BOOKS:
      return {
        ...state,
        books: action.payload,
        loading: false
      };
    case DELETE_BOOKS:
      return {
        ...state,
        books: action.payload,
        loading: false
      };

    case ADD_BOOKS:
      return {
        ...state,
        books: [action.payload, ...state.books]
      };

    case BOOKS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
