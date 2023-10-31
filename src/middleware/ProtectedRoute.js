import React from 'react';
import { useHistory } from 'react-router-dom';
import { API_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";

let _App_Apis = {
  getUsers: async () => {
    try {
      let { data } = await axios.get(`${API_URL}/users/info`);
      return data;
    } catch (error) {
      throw error;
    }
  }
}

const ProtectedRoute = ({ children }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  let checkAccount = React.useCallback(async () => {
    try {
      let data=await _App_Apis.getUsers();
      dispatch({
        type: "SET_AUTH",
        data: {
          isAuthenticated:true,
          account:data.result.payload
        }
      });
      history.push("/kasir");
    } catch (error) {
      let message = "";
      if (!error.response) {
        message = error.message;
      } else if (error.response.data) {
        message = error.response.data.message;
      }
      dispatch({
        type: "SET_AUTH",
        message,
        data: {
          isAuthenticated:false,
          account: null
        }
      });
      history.push("/login");
    }
  }, [dispatch,history]);

  React.useEffect(() => {
    checkAccount();
  }, [checkAccount]);

  return children;
};

export default ProtectedRoute;
