import { Button } from "@material-ui/core";
import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>This is Home</div>
      <Button onClick={() => navigate("/login")}>Login</Button>
    </>
  );
};

export default Home;
