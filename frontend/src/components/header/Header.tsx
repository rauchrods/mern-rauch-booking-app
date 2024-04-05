import "./Header.scss";
import Button from "../button/Button";
import { useNavigate, Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { useQueryClient, useMutation } from "react-query";
import * as apiClient from "../../api-client";

const Header = () => {
  const { isLoggedIn, showToast } = useAppContext();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const mutation = useMutation(apiClient.logOutUser, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({ message: "logged out successfully", type: "SUCCESS" });
      navigate("/");
    },

    onError: async (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleSignOut = () => {
    mutation.mutate();
  };

  return (
    <div className="header">
      <h2 onClick={() => navigate("")}>RauchBookings.com</h2>
      <span className="right_sec">
        {isLoggedIn ? (
          <>
            <Link to={"/my-bookings"}>My Bookings</Link>
            <Link to={"/my-hotels"}>My Hotels</Link>
            <Button onClick={handleSignOut}>Sign Out</Button>
          </>
        ) : (
          <Button onClick={() => navigate("/sign-in")}>Sign In</Button>
        )}
      </span>
    </div>
  );
};

export default Header;
