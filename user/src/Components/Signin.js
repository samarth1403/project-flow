import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { loginUser } from "../features/userSlice";
import Input from "./ReusableComponents/Input";
import Spinner from "./ReusableComponents/Spinner";

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, res, userData } = useSelector((state) => {
    return state.user;
  });

  let schema = Yup.object().shape({
    email: Yup.string()
      .email("Email Should be Valid")
      .required("Email is Required"),
    password: Yup.string().required("Password is Required"),
  });

  useEffect(() => {
    if (userData !== undefined && res?.success) {
      navigate("/");
    }
  }, [userData, res]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values);
      dispatch(loginUser(values));
      formik.resetForm();
    },
  });
  return (
    <div className="flex flex-row flex-wrap justify-center items-start">
      <div className="flex flex-col flex-no-wrap justify-center items-center">
        <p className="font-roboto font-bold text-3xl p-6 mb-4">Log In</p>
        {isLoading && (
          <div className="flex justify-center my-8">
            <Spinner />
          </div>
        )}
        {!isLoading && (
          <form
            onSubmit={formik.handleSubmit}
            style={{
              background: "linear-gradient(180deg, #ACE7FF 0%, #53FFB8 100%)",
            }}
            className="flex flex-col flex-no-wrap justify-center items-center min-[320px]:w-[280px] sm:w-[360px] rounded-[25px] pt-6 mx-4"
          >
            <Input
              className=" min-[320px]:w-[250px] sm:w-[300px] h-[60px]  px-4 mx-4 my-4 border-0"
              id="email"
              type="text"
              placeholder="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange("email")}
              onBlur={formik.handleBlur("email")}
            />
            <div className="text-black font-bold text-lg">
              {formik.touched.email && formik.errors.email ? (
                <div>{formik.errors.email}</div>
              ) : null}
            </div>
            <Input
              className=" min-[320px]:w-[250px] sm:w-[300px] h-[60px]  px-4 mx-4 my-4"
              id="password"
              type="password"
              placeholder="Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange("password")}
              onBlur={formik.handleBlur("password")}
            />
            <div className="text-black font-bold text-lg">
              {formik.touched.password && formik.errors.password ? (
                <div>{formik.errors.password}</div>
              ) : null}
            </div>
            <div className="flex flex-row flex-no-wrap justify-between items-center">
              <button
                // style={{
                //   background:
                //     "linear-gradient(90deg, #4DD4FF 0%, #F5F5F5 100%)",
                // }}
                onClick={() => formik.resetForm()}
                type="button"
                style={{ boxShadow: "8px 8px 4px #0D103C" }}
                className="bg-[#fff] w-[100px] h-[60px] font-roboto font-bold  text-[#0D103C] text-xl rounded-[20px] px-4 mx-4 mt-4 mb-4"
              >
                Reset
              </button>
              <button
                // style={{
                //   background:
                //     "linear-gradient(90deg, #4DD4FF 0%, #F5F5F5 100%)",
                // }}
                type="submit"
                style={{ boxShadow: "8px 8px 4px #0D103C" }}
                className="bg-[#fff] w-[100px] h-[60px] font-roboto font-bold  text-[#0D103C] text-xl rounded-[20px] px-4 mx-4 mt-4 mb-4"
              >
                Log In
              </button>
            </div>
            <Link to="/signup">
              <p className="text-[#0D103C] font-roboto font-bold text-xl m-4">
                Create Account
              </p>
            </Link>
          </form>
        )}
      </div>
      {/* <div className="flex flex-col flex-no-wrap justify-center items-center">
        <p className="text-[#fff] font-roboto font-bold text-3xl mx-6 my-4">
          Create Account
        </p>
        <div
          style={{
            background: "linear-gradient(180deg, #FFEFEF 0%, #AE49FE 100%)",
          }}
          className="min-[320px]:w-[280px] sm:w-[360px] rounded-[25px] my-4 pt-6 flex flex-col flex-no-wrap justify-center items-center mx-4"
        >
          <p className="text-[#0D103C] font-roboto font-bold text-2xl m-4">
            Don't have an Account ?
          </p>
          <Link to="/sign-up-page">
            <button
              // style={{
              //   background:
              //     "linear-gradient(90deg, #4DD4FF 0%, #F5F5F5 100%)",
              // }}
              style={{ boxShadow: "8px 8px 4px #0D103C" }}
              className="bg-[#fff] h-[75px] font-roboto font-bold  text-[#0D103C] text-2xl rounded-[20px] px-4 mx-4 mt-4 mb-8"
            >
              Create Account
            </button>
          </Link>
        </div>
      </div> */}
    </div>
  );
};

export default Signin;
