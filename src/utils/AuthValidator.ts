import { useLocation } from "react-router-dom";

const AuthValidator = (authCode: string): boolean => {
  const location = useLocation();
  console.log(authCode, location);
  return false;
};

export default AuthValidator;
