// Have the use state variables 

import type { UserStore } from "../interfaces/componentTypes";
import { useState } from "react";
//Have a function that returns everything. 
const useUserStore = (): UserStore => {
    const [userEmail, setUserEmail] = useState("");
    
    return {
        userEmail,
        setUserEmail,
    };
}

export default useUserStore;