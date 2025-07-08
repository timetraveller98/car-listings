"use client";
import { Suspense } from "react";
import Login from "./Login";

const LoginForm = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Login />
    </Suspense>
  );
};

export default LoginForm;
