import { useForm } from "react-hook-form";
import "./LoginPage.scss";
import Button from "../../components/button/Button";
import * as apiClient from "../../api-client";
import { useMutation, useQueryClient } from "react-query";
import { useAppContext } from "../../context/AppContext";
import { Link, useNavigate } from "react-router-dom";

export type LoginFormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const mutation = useMutation(apiClient.loginUser, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({ message: "user logged in successfully", type: "SUCCESS" });
      navigate("/");
    },

    onError: async (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div className="login_in_page">
      <form className="log-in-form " onSubmit={onSubmit}>
        <h2>Login</h2>
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
            autoComplete={"suggest"}
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
        <Button type="submit" className="sign-in-button">
          Login
        </Button>
        <span className="redirect-link">
          New User? <Link to={"/sign-in"}>Click here to Register</Link>
        </span>
      </form>
    </div>
  );
};

export default LoginPage;
