import axios from "axios";
import AxiosService from "./AxiosService";

const api = AxiosService.getAxiosInstance();

export async function getProfileInfo(token: string) {
    return api.get(
        `${process.env.EXPO_PUBLIC_API_URL}farmer/get-info`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
        .then(resp => {
            const responseBody = resp.data;
            const { success } = responseBody;
            if (success) {
                return responseBody;
            }
            const err = new Error('Invalid response');
            throw err;
        })
        .catch(err => {
            throw err;
        });
}

export async function updateProfile(token: string, firstName: string, lastName: string, contactNumber: string) {
    return axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}farmer/update-info`,
        {
            firstName,
            lastName,
            contactNumber
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
        .then(resp => {
            const responseBody = resp.data;
            const { success } = responseBody;
            if (success) {
                return responseBody.data;
            }
            const err = new Error('Invalid response');
            throw err;
        })
        .catch(err => {
            throw err;
        });
}