import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING, UPDATE_ITEM } from './types';

export const getItems = () => dispatch => {
  dispatch(setItemsLoading());
  axios
    .get('/api/items')
    .then(res => {
      dispatch({
        type: GET_ITEMS,
        payload: res.data
      })}
    )
    .catch(err => `Error fetching items: ${err}`);
}
export const addItem = text => dispatch => {
  dispatch(setItemsLoading());
  axios
    .post('/api/items', text)
    .then(res => {
      dispatch({
        type: ADD_ITEM,
        payload: res.data.item
      })
    })
}
export const updateItem = id => dispatch => {
  dispatch(setItemsLoading());
  axios
    .put(`/api/items/${id}`)
    .then(res => {
      dispatch({
        type: UPDATE_ITEM,
        payload: id
      })
    })
}
export const deleteItem = (id) => dispatch => {
  dispatch(setItemsLoading());
  axios
    .delete(`/api/items/${id}`)
    .then(res => {
      dispatch({
        type: DELETE_ITEM,
        payload: id
      })
    })
}
export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  }
}