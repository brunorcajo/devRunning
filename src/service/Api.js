import axios from "axios";

const Api = base => {
  const client = axios.create({
    baseURL: base
  });

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        Authorization: "Bearer " + token
      }
    };
  };

  const get = endpoint => client.get(endpoint, getAuthHeader());
  const remove = endpoint => client.delete(endpoint, getAuthHeader());
  const update = (endpoint, data) => client.patch(endpoint, data, getAuthHeader());
  const create = (endpoint, data) => client.post(endpoint, data, getAuthHeader());
  const login = (endpoint, user) => client.post(endpoint, user);

  return {
    //user
    getUser: id => get(`/users/${id}`),
    getUsers: () => get(`/users`),
    removeUser: id => remove(`/users/${id}`),
    updateUser: data => update(`/users/${data.id}`, data),
    createUser: data => create(`/users`, data),
    //runs
    removeRun: id => remove(`/runs/${id}`),
    getRuns: admin => get(`/runs${admin}`),
    createRun: data => create(`/runs`, data),
    //auth
    login: user => login(`/users/login`, user)
  };
};

export default Api;
