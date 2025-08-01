import axios from 'axios';

const BASE_URL = "http://127.0.0.1:8000"

const login = async(data)=>{
    try {
        const response = await  axios.post(BASE_URL + '/api/auth/login/',data);
        return response;
    }
    catch(error){
        console.log("Login Failed",{error});
        throw error;
    }
}

const signup= async(data)=>{
    try {
        const response = await  axios.post(BASE_URL + '/api/auth/register/',data);
        return response;
    }
    catch(error){
        console.log("Signup Failed");
        console.error(error)
        throw error;
    }
}

const logout = async ()=>{
    try {
        const response = await  axios.post('/api/auth/logout/');
        return response;
    }
    catch(error){
        console.error("Logout Failed ",{error});
        throw error;
    }
}



export {
    login,
    signup,
    logout,
    
}
