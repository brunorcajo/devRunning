import { createActions } from "reduxsauce";

export const { Types, Creators } = createActions({
  signinRequest: ["email", "passwd"],
  signinSuccess: ["user"],
  signinFailure: ["error"],

  authRequest: null,
  authSuccess: ["user"],
  authFailure: null,

  destroyAuthRequest: null,
  destroyAuthSuccess: null,
  teste: null, //teste

  getRunsRequest: ['admin'],
  getRunsSuccess: ["runs"],
  getRunsFailure: null,

  removeRunRequest: ["id"],
  removeRunSuccess: ["id"],
  removeRunFailure: ["error"],
  removeRunReset: null,

  createRunRequest: ["run"], //"friendly_name", "duration", "distance", "created"
  createRunSuccess: null,
  createRunFailure: ["error"],
  createRunReset: null,

  updateProfileReset: null,
  updateProfileRequest: ["user"],
  updateProfileSuccess: ["user"],
  updateProfileFailure: ["error"],

  updateUserReset: null,
  updateUserRequest: ["user"],
  updateUserSuccess: ["user"],
  updateUserFailure: ["error"],

  createProfileReset: null,
  createProfileRequest: ["user"],
  createProfileSuccess: ["user"],
  createProfileFailure: ["error"],

  getUsersRequest: null,
  getUsersSuccess: ["users"],
  getUsersFailure: null,
  //singular
  getUserRequest: ['id'],
  getUserSuccess: ["user"],
  getUserFailure: null,

  removeUserRequest: ["id"],
  removeUserSuccess: ["id"],
  removeUserFailure: ["error"],
  removeUserReset: null,
});

export default Creators;
