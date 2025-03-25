import { createContext, useEffect, useState } from "react";
import { FEE_DETAILS } from "../utils/constants";

export const AuthContext = createContext();

function AuthContextProvider({children}){

    const [user, setUser] = useState(
        localStorage?.getItem("user") ? JSON.parse(localStorage?.getItem("user")) : null
    );
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(
        localStorage?.getItem("token") ? localStorage?.getItem("token") : null
    )
    const [feeDetails,setFeeDetails] = useState(FEE_DETAILS);
    const [task,setTask] = useState(null);
    const [queries,setQueries] = useState(
        localStorage?.getItem("queries") ? JSON.parse(localStorage?.getItem("queries")) : []
    );
    const [editTask,setEditTask] = useState(false);
   
    useEffect(()=>{
        token && localStorage.setItem("token",token);
        // setToken(localStorage.getItem("token"));
    },[token]);
    
    useEffect(()=>{
        user && localStorage.setItem("user",JSON.stringify(user));
        // setTeam(JSON.parse(localStorage.getItem("team")));
    },[user]);
    
    useEffect(()=>{
        queries && localStorage.setItem("queries",JSON.stringify(queries));
        // setTeam(JSON.parse(localStorage.getItem("team")));
    },[queries]);

    let values = {
        task, setTask,
        editTask, setEditTask,
        user, setUser,
        feeDetails, setFeeDetails,
        token, setToken,
        queries,setQueries,
        loading, setLoading
    }

    return <AuthContext.Provider value={values}>
        {children}
    </AuthContext.Provider>
}

export default AuthContextProvider;