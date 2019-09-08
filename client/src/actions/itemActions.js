import { GET_BOOKS, ADD_BOOKS, DELETE_BOOKS, BOOKS_LOADING } from "./types";
import axios from "axios";
import { tokenConfig } from "./authActions";

import { returnErrors } from "./errorActions";

export const getBooks = () => dispatch => {
  dispatch(setBooksLoading());
  axios
    .get("/api/books")
    .then(res =>
      dispatch({
        type: GET_BOOKS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteBooks = id => (dispatch, getState) => {
  axios
    .put(`/api/books/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_BOOKS,
        payload: id
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addBooks = book => (dispatch, getState) => {
  axios
    .post("/api/books", book, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_BOOKS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setBooksLoading = () => {
  return {
    type: BOOKS_LOADING
  };
};
