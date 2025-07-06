import type { AuthApiResponse, UserVerifySuccessResponse, UserVerifyFailResponse } from "../interfaces/componentTypes";
import useAuthStore from "../store/authStore";

//registers a new user by sending a POST request to the server with the user's details
const authenticationApi = (): AuthApiResponse => {
    const endpointPrefix: string = "http://localhost:8000";

    const registerUser = async (email: string, password: string): Promise<void> => {
        const response = await fetch(`${endpointPrefix}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            console.log("error");
            throw new Error('Registration failed. Please try again.');
        }

        // Optionally, you can handle the response if needed
        const data = await response.json();

        if (!data.success) {
            console.log("reg fail");
            throw new Error('Registration failed. Please try again.');
        }
        
        localStorage.setItem("token", data.token); // Store the token if needed
        console.log('Registration successful:', data);
    }

    //logs in a user by sending a POST request to the server with the user's credentials
    const loginUser = async (email: string, password: string): Promise<boolean> => {
        const response = await fetch(`${endpointPrefix}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        
        if (!response.ok) {
            console.log("error");
            throw new Error('Login failed. Please check your credentials.');
        }

        // Optionally, you can handle the response if needed
        const data = await response.json();
        if (!data.token) {
            throw new Error('Login failed. No token received.');
        }

        localStorage.setItem("token", data.token);
        console.log("success");


        console.log('Login successful:', data);
        return true;
    }

    const verifyUser = async (token: string): Promise<UserVerifySuccessResponse | UserVerifyFailResponse> => {
        const response = await fetch (`${endpointPrefix}/auth/protect`, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            console.error('Token verification failed.');
            return {
                success: false,
                message: "token verification failed"
            }
        }
        const data: UserVerifySuccessResponse | UserVerifyFailResponse = await response.json();
        return data;
    }

    return {
        verifyUser,
        registerUser,
        loginUser,
    };

}

export default authenticationApi;