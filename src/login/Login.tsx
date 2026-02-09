import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useLogin } from "@/hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

// Define your form data type
export type LoginInputs = {
  userName: string;
  password: string;
  storedLocation: "cookies" | "localStorage" | "httponly";
  alg: null | "HS256";
  exp: true | false;
  sameSite: "none" | "lax" | "strict";
  secure: true | false;
  httpOnly: true | false;
};

const Login = () => {
  const { register, handleSubmit, reset, watch } = useForm<LoginInputs>();
  const storedLocation = watch("storedLocation");
  const navigate = useNavigate();
  const { loginUser } = useLogin();
  const queryClient = useQueryClient();

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    const user = await loginUser(data);
    console.log("Login response user:", user);

    if (!user) {
      alert("Login failed");
      return;
    }

    console.log(user)

    queryClient.invalidateQueries();
    navigate("/");
    reset();
  };

  return (
    <div className="w-[90%] flex flex-col items-center mt-10">
      {/* Single form containing both sections */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col items-center"
      >
        <div className="flex flex-row justify-center w-full space-x-10 h-110">
          {/* Username/Password */}
          <div className="w-[40%] bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl shadow-lg flex flex-col">
            <div className="text-2xl font-bold mb-6 text-gray-800 text-center">Login</div>

            <div className="flex flex-col w-full mb-5">
              <label className="mb-2 text-lg font-medium text-gray-700">Username</label>
              <input
                {...register("userName", { required: true })}
                type="text"
                placeholder="Enter username"
                className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-100 bg-gray-50"
              />
            </div>

            <div className="flex flex-col w-full mb-5">
              <label className="mb-2 text-lg font-medium text-gray-700">Password</label>
              <input
                {...register("password", { required: true })}
                type="password"
                placeholder="Enter password"
                className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-100 bg-gray-50"
              />
            </div>
          </div>

          {/* JWT Authentication Options */}
          <div className="w-[40%] bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl shadow-lg flex flex-col">
            <div className="text-2xl font-bold mb-4 text-blue-900">JWT Authentication Options</div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-blue-800">Storage Location</label>
              <select
                {...register("storedLocation")}
                className="mt-1 block w-full border border-blue-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-blue-50"
              >
                <option value="localStorage">Local Storage</option>
                <option value="cookies">Cookies</option>
              </select>
            </div>

            {storedLocation === "cookies" && (
              <>
                <div className="mb-2">
                  <label className="block text-sm font-medium text-blue-800">SameSite</label>
                  <select
                    {...register("sameSite")}
                    className="mt-1 block w-full border border-blue-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-blue-50"
                  >
                    <option value="none">None</option>
                    <option value="lax">Lax</option>
                    <option value="strict">Strict</option>
                  </select>
                </div>

                <div className="flex items-center mt-2">
                  <input {...register("secure")} type="checkbox" className="mr-2" />
                  <label className="text-sm font-medium text-blue-800">Secure</label>
                </div>

                <div className="flex items-center mt-2">
                  <input {...register("httpOnly")} type="checkbox" className="mr-2" />
                  <label className="text-sm font-medium text-blue-800">HTTP Only</label>
                </div>
              </>
            )}

            <div className="flex items-center mt-4">
              <input {...register("exp")} type="checkbox" className="mr-2" />
              <label className="text-sm font-medium text-blue-800">Include Expiration</label>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-blue-800">Algorithm</label>
              <input
                type="text"
                value="HS256"
                disabled
                className="mt-1 block w-full border border-gray-300 rounded p-2 bg-gray-100 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Login button centered below both sections */}
        <button
          type="submit"
          className="cursor-pointer mt-6 bg-gradient-to-br from-orange-50 to-blue-50 text-gray-800 font-semibold py-2 px-6 rounded hover:bg-gray-200 transition duration-300 border border-gray-300"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
