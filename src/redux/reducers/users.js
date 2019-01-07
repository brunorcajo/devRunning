import { createReducer } from "reduxsauce";
import { Types } from "../actionCreators";

export const INITIAL_STATE = {
  isLoading: false,
  data: [],
  error: false,
  saved: false,
  user: {}
};

export const getUsersRequest = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isLoading: true
  };
};

export const getUsersSuccess = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isLoading: false,
    saved: true,
    data: action.users
  };
};

export const getUsersFailure = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isLoading: false,
    data: [],
    error: true,
    saved: false
  };
};

//REMOVE
export const removeUserRequest = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isSaving: false
  };
};

export const removeUserSuccess = (state = INITIAL_STATE, action) => {
  const runs = [...state.data];
  const id = action.id;
  const indexToDelete = runs.findIndex(run => run.id === id);

  runs.splice(indexToDelete, 1);

  return {
    ...state,
    isSaving: false,
    data: runs
  };
};

export const removeUserFailure = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isSaving: false
  };
};

export const removeUserReset = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    saved: false
  };
};

//Singular
export const getUserRequest = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    saved: false,
    isLoading: true
  };
};

export const getUserSuccess = (state = INITIAL_STATE, action) => {
    debugger
  return {
    ...state,
    isLoading: false,
    saved: false,
    user: action.user
  };
};

export const getUserFailure = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isLoading: false,
    saved: false,
    data: [],
    error: true
  };
};

//Update
export const updateUserRequest = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    saved: false
  };
};

export const updateUserSuccess = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    saved: true,
    user: action.user
  };
};

export const updateUserFailure = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    saved: false
  };
};

export const updateUserReset = (state = INITIAL_STATE, action) => {
  console.log(action);
  return {
    ...state,
    saved: false
  };
};

export const HANDLERS = {
  [Types.GET_USERS_REQUEST]: getUsersRequest,
  [Types.GET_USERS_SUCCESS]: getUsersSuccess,
  [Types.GET_USERS_FAILURE]: getUsersFailure,
  //Remove
  [Types.REMOVE_USER_REQUEST]: removeUserRequest,
  [Types.REMOVE_USER_SUCCESS]: removeUserSuccess,
  [Types.REMOVE_USER_FAILURE]: removeUserFailure,
  [Types.REMOVE_USER_RESET]: removeUserReset,

  [Types.GET_USER_REQUEST]: getUserRequest,
  [Types.GET_USER_SUCCESS]: getUserSuccess,
  [Types.GET_USER_FAILURE]: getUserFailure,

  [Types.UPDATE_USER_RESET]: updateUserReset,
  [Types.UPDATE_USER_REQUEST]: updateUserRequest,
  [Types.UPDATE_USER_SUCCESS]: updateUserSuccess,
  [Types.UPDATE_USER_FAILURE]: updateUserFailure
};

export default createReducer(INITIAL_STATE, HANDLERS);
