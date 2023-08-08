import jwt_decode from "jwt-decode";

export const isLoggedinUser = () => {
  const userToken = localStorage.getItem("usertoken");
  if (!userToken || userToken === "undefined" || userToken === undefined) {
    return false;
  }
  return true;
};

export const logout = () => {
  localStorage.removeItem("usertoken");
};

export const getUserDetailsFromToken = () => {
  const userToken = localStorage.getItem("usertoken");
  const userDecoded = jwt_decode(userToken);
  return userDecoded;
};