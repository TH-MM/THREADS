import { AxiosClient } from "../axios/axiosClient";
import { CSRF_URL, LOGIN_URL, LOGOUT_URL, REGISTER_URL, UPDATE_USER_URL } from "../urls";

export const userApi = {
    user: async () => {
        return await AxiosClient.get("api/user")
    },
    users: async () => {
        return await AxiosClient.get("api/users")
    },
    login: async (values) => {
        await AxiosClient.get(CSRF_URL);
        return await AxiosClient.post(LOGIN_URL , values);
    },
    register : async (values) => {
        await AxiosClient.get(CSRF_URL);
        return await AxiosClient.post(REGISTER_URL , values);
    },
    update : async (values) => {
        await AxiosClient.get(CSRF_URL);
        return await AxiosClient.post(UPDATE_USER_URL , values , {
            headers : {
                "Content-Type" : 'multipart/form-data'
            }
        });
    },
    logout : async () => {
        await AxiosClient.get(CSRF_URL);
        return await AxiosClient.post(LOGOUT_URL);
    }
}