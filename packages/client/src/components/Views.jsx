import { Text } from "@chakra-ui/layout";
import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { AccountContext } from "./AccountContext";
import Home from "./Home/Home";
import Login from "./Login/Login";
import SignUp from "./Login/SignUp";
import PrivateRoutes from "./PrivateRoutes";

const Views = () => {
  const { user } = useContext(AccountContext);
  return user.loggedIn === null ? (
    <Text>Loading...</Text>
  ) : (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<SignUp />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/home" element={<Home />} />
      </Route>
      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export default Views;
