
import { FormFields, LoginFields, ResetFields } from './validation';
import axios from 'axios';



export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
});
export const registration = async (data: FormFields) => {
    try {
        const response = await axiosInstance.post('/auth', data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
            throw new Error(errorMessage);
        }
        throw error;
    }
};
export const login = async (data: LoginFields) => {
    try {
        const response = await axiosInstance.post('/auth/login', data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
            throw new Error(errorMessage);
        }
        throw error;
    }
};
export const Forget = async (data: LoginFields) => {
    try {
        const response = await axiosInstance.post('/auth/forgetPassword', data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || 'Forget Password. Please try again.';
            throw new Error(errorMessage);
        }
        throw error;
    }
};
export const Reset = async (data: ResetFields, header: string) => {
    try {
        const response = await axiosInstance.post('/auth/resetPassword', data, {
            headers: {
                header
            }
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || 'Reset Password. Please try again.';
            throw new Error(errorMessage);
        }
        throw error;
    }
};


