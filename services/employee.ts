
import AxiosService from "./AxiosService";

const api = AxiosService.getAxiosInstance();

export async function onboardEmployee(token: string, requestBody: any) {
    return api.post(
        `${process.env.EXPO_PUBLIC_API_URL}farmer/onboard-employee`,
        requestBody,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
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

export async function verifyOtpForOnboardedEmployee(token: string, requestBody: {
    otp: string,
    employeeEmail: string,
    employeeRole: string,
    firstName: string,
    lastName: string,
    contactNumber: string
}) {
    return api.post(
        `${process.env.EXPO_PUBLIC_API_URL}farmer/onboard-employee-verify-otp`,
        requestBody,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )
        .then(resp => {
            const responseBody = resp.data;
            if (responseBody.success) {
                return responseBody.data;
            }
            throw new Error('Invalid OTP');
        })
        .catch(err => {
            throw err;
        });
}

