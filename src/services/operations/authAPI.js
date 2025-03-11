import { apiConnector } from "../apiconnector";
import { authEndpoints } from "../apis";
import { toast } from 'react-hot-toast';

const {
    LOGIN_API,
    FETCH_ALL_EMPLOYEE_TASKS_API,
    FETCH_COMPLETE_TASK_DETAILS_API,
    FETCH_TEAM_MEMBERS_API
} = authEndpoints;

export async function login(formData,navigate,setUser,setToken){
    let toastId = toast.loading("Logging In")
    try {
        
        const response = await apiConnector(
            "POST",
            LOGIN_API,
            formData
        );

        if(!response?.data?.success){
            throw new Error(response?.data?.message);
        }

        // console.log("LOGIN_API_RESPONSE:",response);
        setUser(response?.data?.data?.user);
        setToken(response?.data?.data?.token);
        
        toast.dismiss(toastId);
        navigate('/dashboard/profile');
        toast.success(response?.data?.message);       
        
    } catch (err) {
        console.log("LOGIN_API_ERROR:",err);
        toast.dismiss(toastId);
        toast.error(err?.response?.data?.message || err?.message);
    }
}

export function logout(navigate,setUser,setToken){
    setToken(null);
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    toast.success("Logged Out");
    navigate("/");
}


export const fetchAllEmployeeTasks = async(token)=>{
    let toastId = toast.loading("fetching");
    try {
        const response = await apiConnector(
            "GET",
            FETCH_ALL_EMPLOYEE_TASKS_API,
            null,
            {
                "Authorization":`Bearer ${token}`
            }
        )

        if(!response?.data?.success){
            throw new Error(response?.data?.message);
        }

        // console.log("FETCH_ALL_EMPLOYEE_TASKS_API_RESPONSE:",response);
        toast.dismiss(toastId);
        // toast.success(response?.data?.message);
        return response?.data?.data;
        
    } catch (err) {
        console.log("FETCH_ALL_EMPLOYEE_TASKS_API_ERROR:",err);
        toast.dismiss(toastId);
        toast.error(err?.response?.data?.message || err?.message)
        return null;
    }
}

export const fetchTeamMembers = async(token,formData)=>{
    try {
        
        const response = await apiConnector(
            "POST",
            FETCH_TEAM_MEMBERS_API,
            formData,
            {
                "Authorization":`Bearer ${token}`
            }
        )

        if(!response?.data?.success){
            throw new Error(response?.data?.message);
        }

        // console.log("FETCH_TEAM_MEMBERS_API_RESPONSE:",response);
        // toast.success(response?.data?.message);
        return response?.data?.data;
        
    } catch (err) {
        console.log("FETCH_TEAM_MEMBERS_API_ERROR:",err);
        toast.error(err?.response?.data?.message || err?.message)
        return null;
    }
}

export const fetchCompleteTaskDetails = async(formData)=>{
    let toastId = toast.loading("fetching details");
    try {
        const response = await apiConnector(
            "POST",
            FETCH_COMPLETE_TASK_DETAILS_API,
            formData,
        );

        if(!response?.data?.success){
            throw new Error(response?.data?.message);
        }

        // console.log("FETCH_COMPLETE_TASK_DETAILS_API_RESPONSE",response);
        toast.dismiss(toastId);
        return response?.data?.data;

    } catch (err) {
        console.log("FETCH_COMPLETE_TASK_DETAILS_API_ERROR",err);
        toast.dismiss(toastId);
        toast.error(err?.response?.data?.message || err?.message);
        return null;
    }
}
