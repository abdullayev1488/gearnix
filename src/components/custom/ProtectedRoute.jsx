import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import { setAuthOpen } from "@/redux/slice/uiSlice";
import toast from "react-hot-toast";

export const ProtectedRoute = ({ children }) => {
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!token) {
            navigate("/", { replace: true, state: { from: location } });
            dispatch(setAuthOpen(true));
            toast.error("You must be logged in to place an order.");
        }
    }, [token, navigate, dispatch, location]);

    if (!token) {
        return null;
    }

    return children;
};
