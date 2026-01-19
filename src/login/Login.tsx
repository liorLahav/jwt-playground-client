import React, { useRef } from "react";

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
        <label className="mb-2 text-lg font-medium text-gray-700 capitalize">
          {name}
        </label>
        <input
          ref={ref}
          name={name}
          className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-100 bg-gray-50"
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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(
      `username ${usernameRef.current?.value} , password ${passwordRef.current?.value}`
    );
    if (usernameRef.current) {
      usernameRef.current.value = "";
    }
    if (passwordRef.current){
        passwordRef.current.value = "";
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="w-[70%] bg-white p-10 rounded-xl shadow-lg flex flex-col items-center"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Login</h2>

      <Field ref={usernameRef} name="username" />
      <Field ref={passwordRef} name="password" type="password" />

      <button
        type="submit"
        className="bg-[#f5f5dc] text-gray-800 font-semibold py-2 px-6 rounded hover:bg-gray-200 transition duration-300 mt-4 border border-gray-300"
      >
        Login
      </button>
    </form>
  );
};

export default Login;
