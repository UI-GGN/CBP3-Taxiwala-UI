import { useEffect } from "react";
import { useState } from "react";
import { getUserDetailsFromToken } from "../../utils/userValidation";

const apiStatus = {
  onhold: "onhold",
  loading: "loading",
  complete: "complete",
  error: "error"
};

export const GetApiEffect = (service, params?) => {
  const [status, setStatus] = useState(apiStatus.loading);
  const [data, setData] = useState(null);

  useEffect(() => {
    const userdetail = getUserDetailsFromToken();
    service({
      id: userdetail.employeeId
    }).then(data => {
      console.log(data);
      setData(data);
      setStatus(apiStatus.complete);
    }).catch(error => {
      setStatus(apiStatus.error);
    });
  }, []);

  return [
    status === apiStatus.loading,
    status === apiStatus.error,
    data
  ];
};

export const PostService = (service) => {
  const [status, setStatus] = useState(apiStatus.onhold);
  const [data, setData] = useState(null);

  const postApi = (body, successDelegate?) =>{
    setStatus(apiStatus.loading);
    service(body).then(data => {
      setData(data);
      setStatus(apiStatus.complete);
      successDelegate(data);
    }).catch(error => {
      setStatus(apiStatus.error);
    });
  };

  return {
    postApi: postApi,
    data,
    isLoading: status === apiStatus.loading,
    isError: status === apiStatus.error
  };
};