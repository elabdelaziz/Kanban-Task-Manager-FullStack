import React, { useState, Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import instance from "@/utils/axiosInstance";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useTypedDispatch } from "@/hooks/useRedux";
import { populateUserData } from "@/reducers/dataSlice";
import { LoginFormInput, loginUser } from "@/models/userData";

type Props = {
  setOpenLoginModal: Dispatch<SetStateAction<boolean>>;
};

const LoginModal = ({ setOpenLoginModal }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInput>();

  const dispatch = useTypedDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [, setToken] = useLocalStorage("token", null);

  const onSubmit = async (data: LoginFormInput) => {
    try {
      const response = await loginUser(data);
      const userData: any = response.data.data;
      setToken(userData.token);
      dispatch(populateUserData(userData.boards));
      // handle success
    } catch (error) {
      throw new Error("cannot login user");
    }
  };

  const handleFormSubmit = async (data: LoginFormInput) => {
    setIsLoading(true);
    await onSubmit(data);
    setIsLoading(false);
  };

  return (
    <>
      <div
        onClick={() => setOpenLoginModal(false)}
        className="absolute z-[3] overlay w-[100vw] h-[100vh] bg-black bg-opacity-[0.5]"
      ></div>
      <div className="absolute flex items-center justify-center w-[100vw] h-[100vh]">
        <div className="rounded-[10px] z-[4] flex flex-col [&>div]:mb-[1rem] [&>div>label]:mb-[0.5rem] p-[2rem] bg-white dark:bg-mainDark w-[100%] max-w-[30rem] max-h-[60rem] h-[fit]">
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="mb-10">
              <div className="flex justify-center">
                <img
                  alt=""
                  className="h-14 w-14"
                  src="https://ik.imagekit.io/pibjyepn7p9/Lilac_Navy_Simple_Line_Business_Logo_CGktk8RHK.png?ik-sdk-version=javascript-1.4.3&updatedAt=1649962071315"
                />
              </div>
              <h2 className="mt-6 text-center text-3xl font-extrabold dark:text-white text-gray-900">
                {"Login"}
              </h2>
              <p className="mt-2 text-center text-sm dark:text-white text-gray-600 mt-5">
                {"Don't have an account yet?"}
                <a
                  href={"linkUrl"}
                  className="font-medium  ml-[5px] text-purple-600 hover:text-purple-500"
                >
                  {"Register"}
                </a>
              </p>
            </div>
            {/* inputs  */}
            <div className="my-5">
              <label htmlFor={"labelFor"} className="sr-only">
                {"labelText"}
              </label>
              <input
                // onChange={"handleChange"}
                {...register("email", { required: "Email is required" })}
                type="email"
                className={
                  "rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                }
                placeholder={"Email"}
              />
            </div>
            <div className="my-5">
              <label htmlFor={"labelFor"} className="sr-only">
                {"labelText"}
              </label>
              <input
                // onChange={"handleChange"}
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: 8,
                })}
                className={
                  "rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                }
                placeholder={"Password"}
              />
              {/* {errors.password && <span>{errors.password.message}</span>} */}
              {errors.password && errors.password.type === "required" && (
                <span>Password is required</span>
              )}
              {errors.password && errors.password.type === "minLength" && (
                <span>Password must be at least 8 characters</span>
              )}
            </div>
            <button className="button" type="submit">
              {isLoading ? "Loading..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
