import { useEffect } from "react";
import { useState } from "react";

const apiStatus = {
  loading: "loading",
  complete: "complete",
  error: "error"
};

export const GetApiEffect = (service, params) => {
  const [status, setStatus] = useState(apiStatus.loading);
  const [data, setData] = useState(null);

  useEffect(() => {

    service(params).then(data => {
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