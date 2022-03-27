import { FC, ReactNode, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import LoginScreen from "../../screen/Login";

interface AuthenticatedProps {
  children: ReactNode;
}

const Authenticated: FC<AuthenticatedProps> = (props: { children: any }) => {
  const { children } = props;
  const status = localStorage.getItem("token");

  if (!status) {
    window.location.href = "/login";
    return <LoginScreen />;
  }

  return <>{children}</>;
};

Authenticated.propTypes = {
  children: PropTypes.node,
};

export default Authenticated;
