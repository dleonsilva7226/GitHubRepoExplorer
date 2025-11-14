import type { AuthApiResponse } from "../interfaces/ComponentTypes";

//registers a new user by sending a POST request to the server with the user's details
const authenticationApi = (): AuthApiResponse => {
    const endpointPrefix: string = "http://localhost:8000";

    const registerUser = async (email: string, password: string): Promise<boolean | undefined> => {
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
        return true;
    }

    //logs in a user by sending a POST request to the server with the user's credentials
    const loginUser = async (email: string, password: string): Promise<boolean | undefined> => {
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

    return {
        registerUser,
        loginUser,
    };

}

export default authenticationApi;