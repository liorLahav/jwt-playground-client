import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import AuthOptions from "./AuthOptions";

type FieldProps = {
  name: string;
  type?: string;
};

const Field = React.forwardRef<HTMLInputElement, FieldProps>(
  (
    { name, type },
    ref
  ) => {
    return (
      <div className="flex flex-col w-full max-w-sm mb-5">
        <label className="mb-2 text-lg font-medium text-blue-800 capitalize">
          {name}
        </label>
        <input
          ref={ref}
          name={name}
          className="border border-blue-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-blue-50"
          type={type ?? "text"}
        />
      </div>
    );
  }
);

Field.displayName = "Field";

const Login = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    console.log(`username ${username} , password ${password}`);
    
    // Simulate login - set a fake JWT token
    if (username && password) {
      localStorage.setItem('token', 'fake-jwt-token');
      navigate('/');
    }
    
    if (usernameRef.current) {
      usernameRef.current.value = "";
    }
    if (passwordRef.current){
        passwordRef.current.value = "";
    }
  };

  return (
    <div className="w-[90%] flex flex-row items-center justify-center space-x-8">
      <form
        onSubmit={onSubmit}
        className="w-[40%] bg-gradient-to-br from-blue-50 to-indigo-100 p-10 rounded-xl shadow-lg flex flex-col items-center"
      >
        <h2 className="text-3xl font-bold mb-8 text-blue-900">Login</h2>

        <Field ref={usernameRef} name="username" />
        <Field ref={passwordRef} name="password" type="password" />

        <button
          type="submit"
          className="bg-blue-500 text-white font-semibold py-2 px-6 rounded hover:bg-blue-600 transition duration-300 mt-4 border border-blue-300"
        >
          Login
        </button>
      </form>
      <AuthOptions />
    </div>
  );
};

export default Login;
