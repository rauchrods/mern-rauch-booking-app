import { useForm } from "react-hook-form";
import Button from "../../components/button/Button";
import "./SignInPage.scss";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../../api-client";
import { useAppContext } from "../../context/AppContext";
import { Link, useNavigate } from "react-router-dom";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignInPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClient.regiserUser, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({ message: "Registration successful", type: "SUCCESS" });
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div className="sign_up_page">
      <form onSubmit={onSubmit} className="sign-in-form">
        <h2>Create an Account</h2>

        <div className="fn-ln-container">
          <div>
            <label htmlFor="fni">First Name</label>
            <input
              type="text"
              id="fni"
              {...register("firstName", { required: "FirstName is required" })}
            ></input>
            {errors.firstName && (
              <span className="err-msg">{errors.firstName.message}</span>
            )}
          </div>
          <div>
            <label htmlFor="lni">Last Name</label>
            <input
              type="text"
              id="lni"
              {...register("lastName", { required: "LastName is required" })}
            ></input>
            {errors.lastName && (
              <span className="err-msg">{errors.lastName.message}</span>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="emaili">Email</label>
          <input
            type="email"
            id="emaili"
            {...register("email", {
              required: "email-id is required",
              validate: (value) => {
                if (
                  !value.match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                  )
                ) {
                  return "Enter a valid email id";
                }
              },
            })}
          ></input>
          {errors.email && (
            <span className="err-msg">{errors.email.message}</span>
          )}
        </div>

        <div>
          <label htmlFor="passwordi">Password</label>
          <input
            type="password"
            id="passwordi"
            autoComplete="suggest"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be atleast 6 characters",
              },
            })}
          ></input>
          {errors.password && (
            <span className="err-msg">{errors.password.message}</span>
          )}
        </div>

        <div>
          <label htmlFor="cnfpasswordi">confirm Password</label>
          <input
            type="password"
            id="cnfpasswordi"
            {...register("confirmPassword", {
              validate: (value) => {
                if (!value) {
                  return "This Field is required";
                } else if (watch("password") !== value) {
                  return "Password does not match";
                }
              },
            })}
          ></input>
          {errors.confirmPassword && (
            <span className="err-msg">{errors.confirmPassword.message}</span>
          )}
        </div>

        <Button type="submit" className="sign-in-button">
          Create Account
        </Button>

        <span className="redirect-link">
          Existing User? <Link to={"/log-in"}>Click here to Login</Link>
        </span>
      </form>
    </div>
  );
};

export default SignInPage;
