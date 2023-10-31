import React from "react";

// stores
import { useDispatch, useSelector } from "react-redux";
import {SET_LOADING} from "../stores/users/functions";
// stores

function Login(){
    const store_account = useSelector((state) => state.users.account);
    console.log(store_account,"account");
    let dispatch=useDispatch();

    let [logins,set_logins]=React.useState({
        'username':"",
        'password':""
    });

    const LoginApp=(e)=>{
        e.preventDefault();
        dispatch(SET_LOADING(true));
    }
    
    return (
        <div>
            <form>
                <input type="text" onChange={(e)=>{set_logins({...logins,username:e.target.value})}} />
                <input type="password" onChange={(e)=>{set_logins({...logins,password:e.target.value})}} />
                <button type="button" onClick={LoginApp}>
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;