import AxiosService from "./AxiosService";

const api = AxiosService.getAxiosInstance();

export async function getFieldTypes(token: string) {
    return api.get(
        `${process.env.EXPO_PUBLIC_API_URL}farmer/get-field-types`,
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

export async function getFields(token: string) {
    return api.get(
        `${process.env.EXPO_PUBLIC_API_URL}farmer/get-fields`,
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

export async function addField(token: string, requestBody: any) {
    return api.post(
        `${process.env.EXPO_PUBLIC_API_URL}farmer/add-field`,
        requestBody,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
        .then(resp => {
            const responseBody = resp.data;
            const { success } = responseBody;
            console.log('responseBody is', responseBody);

            if (success) {
                return responseBody.data;
            }
            throw new Error('Invalid response');
        })
        .catch(err => {

            throw err;
        });
}
