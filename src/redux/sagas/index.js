import { takeLatest, all, put } from "redux-saga/effects";
import { Types } from "../actionCreators";
import actionCreators from "../actionCreators";

import { auth, login, destroyAuth, updateProfile, createProfile } from "./auth";
import { getRuns, createRun, removeRun } from "./runs";
import { getUsers, removeUser, getUser, updateUser } from "./users";

import Api from "../../service/Api";

export default function* rootSaga() {

  //ou variável de ambiente

  const devURL = "http://localhost:3001",
    prodURL = "http://api.dominino.com",
    baseURL = process.env.NODE_ENV === "development" ? devURL : prodURL;

  const api = new Api(baseURL);

  yield all([
    takeLatest(Types.SIGNIN_REQUEST, login({ api })),
    takeLatest(Types.AUTH_REQUEST, auth({ api })),
    takeLatest(Types.GET_RUNS_REQUEST, getRuns),
    takeLatest(Types.CREATE_RUN_REQUEST, createRun),
    takeLatest(Types.DESTROY_AUTH_REQUEST, destroyAuth),
    takeLatest(Types.UPDATE_PROFILE_REQUEST, updateProfile({ api })),
    takeLatest(Types.CREATE_PROFILE_REQUEST, createProfile({ api })),
    takeLatest(Types.REMOVE_RUN_REQUEST, removeRun),
    takeLatest(Types.GET_USERS_REQUEST, getUsers({ api })),
    takeLatest(Types.REMOVE_USER_REQUEST, removeUser({ api })),
    takeLatest(Types.GET_USER_REQUEST, getUser({ api })),
    takeLatest(Types.UPDATE_USER_REQUEST, updateUser({ api })),

    put(actionCreators.authRequest())
  ]);
}
