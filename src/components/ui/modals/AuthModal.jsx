import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthOpen } from "@/redux/slice/uiSlice";
import { setUser } from "@/redux/slice/authSlice";
import { useFormik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import toast from "react-hot-toast";
import api from "@/axios/axios";
import { Eye, EyeOff } from "lucide-react";

const registerSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

const loginSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(1, "Password is required"),
});

export const AuthModal = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.ui.authOpen);
    const [activeTab, setActiveTab] = useState("login");
    const [showPassword, setShowPassword] = useState(false);
    const [showRegisterPassword, setShowRegisterPassword] = useState(false);

    const closeModal = () => dispatch(setAuthOpen(false));

    useEffect(() => {
        if (!isOpen) {
            loginFormik.resetForm();
            registerFormik.resetForm();
        }
    }, [isOpen]);

    const registerFormik = useFormik({
        initialValues: { username: "", email: "", password: "" },
        validationSchema: toFormikValidationSchema(registerSchema),
        onSubmit: async (values, { setFieldError, resetForm }) => {
            try {
                const { data } = await api.post("/auth/register", values);
                if (data.success) {
                    resetForm();
                    setActiveTab("login");
                    toast.success("Registration successful! Please login with your email and password. 🎉", {
                        position: "bottom-right",
                    });
                }
            } catch (error) {
                const res = error.response?.data;
                if (res?.field) {
                    setFieldError(res.field, res.message);
                } else {
                    toast.error(res?.message || "Registration failed", {
                        position: "bottom-right",
                    });
                }
            }
        },
    });

    const loginFormik = useFormik({
        initialValues: { email: "", password: "" },
        validationSchema: toFormikValidationSchema(loginSchema),
        onSubmit: async (values, { setFieldError, resetForm }) => {
            try {
                const { data } = await api.post("/auth/login", values);
                if (data.success) {
                    dispatch(setUser({ user: data.data.user, token: data.data.token }));
                    resetForm();
                    closeModal();
                    toast.success("You have successfully logged in ✅", {
                        position: "bottom-right",
                    });
                }
            } catch (error) {
                const res = error.response?.data;
                if (res?.field) {
                    setFieldError(res.field, res.message);
                } else {
                    toast.error(res?.message || "Login failed", {
                        position: "bottom-right",
                    });
                }
            }
        },
    });

    const handleTabSwitch = (tab) => {
        setActiveTab(tab);
        registerFormik.resetForm();
        loginFormik.resetForm();
    };

    const inputClass = (formik, field) =>
        `w-full px-5 py-4 rounded-[12px] border text-[11px] font-medium focus:outline-none transition-all duration-300 placeholder:text-gray-400 ${formik.touched[field] && formik.errors[field]
            ? "border-red-400 bg-red-50/30 focus:border-red-500"
            : "border-gray-100 bg-gray-50/30 focus:border-black focus:bg-white"
        }`;

    return (
        <div
            onClick={closeModal}
            className={`fixed flex items-center justify-center inset-0 bg-black/50 backdrop-blur-sm z-[998] transition-all duration-300 ${isOpen
                ? "opacity-100 visible"
                : "opacity-0 invisible pointer-events-none"
                }`}
        >
            <div
                className="relative w-full max-w-[420px] bg-white rounded-[30px] p-8 md:p-10 shadow-2xl animate-in fade-in zoom-in duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={closeModal}
                    className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer text-gray-400 hover:text-black"
                >
                    ✕
                </button>

                <div className="flex bg-[#f3f3f3] p-2 rounded-full mb-8 font-poppins">
                    <button
                        onClick={() => handleTabSwitch("login")}
                        className={`flex-1 py-3 text-sm font-bold rounded-full transition-all cursor-pointer ${activeTab === "login"
                            ? "bg-white shadow-md text-black"
                            : "text-gray-500 hover:text-black"
                            }`}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => handleTabSwitch("register")}
                        className={`flex-1 py-3 text-sm font-bold rounded-full transition-all cursor-pointer ${activeTab === "register"
                            ? "bg-white shadow-md text-black"
                            : "text-gray-500 hover:text-black"
                            }`}
                    >
                        Register
                    </button>
                </div>

                {activeTab === "login" ? (
                    <div
                        className="animate-in slide-in-from-bottom-2 duration-500 font-poppins"
                        key="login"
                    >
                        <h2 className="text-[17px] font-bold mb-6 text-black">
                            Insert your account information:
                        </h2>
                        <form
                            className="space-y-5"
                            onSubmit={loginFormik.handleSubmit}
                        >
                            <div>
                                <label className="block text-[11px] font-bold mb-2 text-black">
                                    Email address{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="ENTER YOUR EMAIL"
                                    className={inputClass(loginFormik, "email")}
                                    value={loginFormik.values.email}
                                    onChange={loginFormik.handleChange}
                                    onBlur={loginFormik.handleBlur}
                                />
                                {loginFormik.touched.email &&
                                    loginFormik.errors.email && (
                                        <p className="text-red-500 text-[10px] mt-1 font-medium">
                                            {loginFormik.errors.email}
                                        </p>
                                    )}
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold mb-2 text-black">
                                    Password{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="PASSWORD"
                                        className={inputClass(
                                            loginFormik,
                                            "password"
                                        )}
                                        value={loginFormik.values.password}
                                        onChange={loginFormik.handleChange}
                                        onBlur={loginFormik.handleBlur}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black cursor-pointer transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                {loginFormik.touched.password &&
                                    loginFormik.errors.password && (
                                        <p className="text-red-500 text-[10px] mt-1 font-medium">
                                            {loginFormik.errors.password}
                                        </p>
                                    )}
                            </div>
                            <button
                                type="submit"
                                disabled={loginFormik.isSubmitting}
                                className="w-full bg-black text-white py-4 rounded-[12px] font-bold text-[14px] mt-4 hover:bg-zinc-800 transition-all duration-300 active:scale-[0.98] cursor-pointer shadow-lg hover:shadow-black/20 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {loginFormik.isSubmitting
                                    ? "Logging in..."
                                    : "Login"}
                            </button>
                        </form>
                    </div>
                ) : (
                    <div
                        className="animate-in slide-in-from-bottom-2 duration-500 font-poppins"
                        key="register"
                    >
                        <h2 className="text-[17px] font-bold mb-6 text-black">
                            Create your account:
                        </h2>
                        <form
                            className="space-y-5"
                            onSubmit={registerFormik.handleSubmit}
                        >
                            <div>
                                <label className="block text-[11px] font-bold mb-2 text-black">
                                    Username{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="USER NAME"
                                    className={inputClass(
                                        registerFormik,
                                        "username"
                                    )}
                                    value={registerFormik.values.username}
                                    onChange={registerFormik.handleChange}
                                    onBlur={registerFormik.handleBlur}
                                />
                                {registerFormik.touched.username &&
                                    registerFormik.errors.username && (
                                        <p className="text-red-500 text-[10px] mt-1 font-medium">
                                            {registerFormik.errors.username}
                                        </p>
                                    )}
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold mb-2 text-black">
                                    Email address{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="EMAIL"
                                    className={inputClass(
                                        registerFormik,
                                        "email"
                                    )}
                                    value={registerFormik.values.email}
                                    onChange={registerFormik.handleChange}
                                    onBlur={registerFormik.handleBlur}
                                />
                                {registerFormik.touched.email &&
                                    registerFormik.errors.email && (
                                        <p className="text-red-500 text-[10px] mt-1 font-medium">
                                            {registerFormik.errors.email}
                                        </p>
                                    )}
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold mb-2 text-black">
                                    Password{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={showRegisterPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="PASSWORD"
                                        className={inputClass(
                                            registerFormik,
                                            "password"
                                        )}
                                        value={registerFormik.values.password}
                                        onChange={registerFormik.handleChange}
                                        onBlur={registerFormik.handleBlur}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black cursor-pointer transition-colors"
                                    >
                                        {showRegisterPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                {registerFormik.touched.password &&
                                    registerFormik.errors.password && (
                                        <p className="text-red-500 text-[10px] mt-1 font-medium">
                                            {registerFormik.errors.password}
                                        </p>
                                    )}
                            </div>
                            <p className="text-[10px] text-gray-500 leading-[1.6] py-1 font-medium italic">
                                Your personal data will be used to support your
                                experience throughout this website, to manage
                                access to your account, and for other purposes
                                described in our privacy policy.
                            </p>
                            <button
                                type="submit"
                                disabled={registerFormik.isSubmitting}
                                className="w-full bg-black text-white py-4 rounded-[12px] font-bold text-[14px] mt-2 hover:bg-zinc-800 transition-all duration-300 active:scale-[0.98] cursor-pointer shadow-lg hover:shadow-black/20 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {registerFormik.isSubmitting
                                    ? "Registering..."
                                    : "Register"}
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};
