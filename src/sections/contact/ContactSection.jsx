import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import toast from "react-hot-toast";
import api from "@/axios/axios";
import { Link } from "react-router";
import { contactSocials } from "@/const";

const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    subject: z.string().min(3, "Subject must be at least 3 characters"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

export const ContactSection = () => {
    const user = useSelector((state) => state.auth.user);

    const formik = useFormik({
        initialValues: {
            name: user?.username || "",
            email: user?.email || "",
            subject: "",
            message: "",
        },
        enableReinitialize: true,
        validationSchema: toFormikValidationSchema(contactSchema),
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            try {
                const { data } = await api.post("/contact", values);
                if (data.success) {
                    toast.success("Your message has been sent successfully! ✉️", {
                        position: "bottom-right",
                    });
                    resetForm({
                        values: {
                            name: user?.username || "",
                            email: user?.email || "",
                            subject: "",
                            message: "",
                        },
                    });
                }
            } catch (error) {
                toast.error(error.response?.data?.message || "Failed to send message", {
                    position: "bottom-right",
                });
            } finally {
                setSubmitting(false);
            }
        },
    });

    const inputClass = (field) =>
        `w-full px-5 py-4 bg-[#f9fafb] border rounded-lg outline-none focus:border-purple-500 transition-all font-poppins text-xs placeholder:text-gray-400 ${formik.touched[field] && formik.errors[field]
            ? "border-red-400 bg-red-50/30"
            : "border-[#e5e7eb]"
        }`;

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-16">

                    {/* Left Column: Form */}
                    <div className="flex-1">
                        <h2 className="text-[28px] md:text-[30px] font-orbitron font-bold text-gray-900 mb-4 tracking-wider">
                            GET IN TOUCH
                        </h2>
                        <p className="text-gray-600 font-poppins mb-10 text-sm md:text-base max-w-xl">
                            Please enter the details of your request. A member of our support staff will respond as soon as possible.
                        </p>

                        <form className="space-y-6" onSubmit={formik.handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Your Name"
                                        className={inputClass("name")}
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        readOnly={!!user}
                                    />
                                    {formik.touched.name && formik.errors.name && (
                                        <p className="text-red-500 text-[10px] mt-1 font-medium font-poppins">{formik.errors.name}</p>
                                    )}
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Your Email"
                                        className={inputClass("email")}
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        readOnly={!!user}
                                    />
                                    {formik.touched.email && formik.errors.email && (
                                        <p className="text-red-500 text-[10px] mt-1 font-medium font-poppins">{formik.errors.email}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <input
                                    type="text"
                                    name="subject"
                                    placeholder="Subject"
                                    className={inputClass("subject")}
                                    value={formik.values.subject}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.subject && formik.errors.subject && (
                                    <p className="text-red-500 text-[10px] mt-1 font-medium font-poppins">{formik.errors.subject}</p>
                                )}
                            </div>

                            <div>
                                <textarea
                                    rows="8"
                                    name="message"
                                    placeholder="Your Message"
                                    className={`${inputClass("message")} resize-none`}
                                    value={formik.values.message}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                ></textarea>
                                {formik.touched.message && formik.errors.message && (
                                    <p className="text-red-500 text-[10px] mt-1 font-medium font-poppins">{formik.errors.message}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={formik.isSubmitting}
                                className="inline-block cursor-pointer py-4 px-12 rounded-lg text-white font-poppins font-medium text-sm transition-all duration-300 hover:shadow-lg hover:scale-105 bg-gradient-to-r from-[#b851f5] to-[#f551b8] text-center disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {formik.isSubmitting ? "Sending..." : "Submit Now"}
                            </button>
                        </form>
                    </div>

                    {/* Right Column: Info */}
                    <div className="lg:w-[400px] space-y-10 pt-10 lg:pt-24">
                        <div className="space-y-6">
                            <p className="font-poppins text-sm text-gray-800 leading-relaxed">
                                <span className="font-bold">Address:</span> Bakı şəh. , Ayaz İsmayılov 8A, Biznes Mərkəzi 2-ci mərtəbə.
                            </p>

                            <p className="font-poppins text-sm text-gray-800 leading-relaxed">
                                <span className="font-bold">Email:</span>support@domain.com
                            </p>

                            <p className="font-poppins text-sm text-gray-800 leading-relaxed">
                                <span className="font-bold">Call Us:</span>+994 51 319 24 14
                            </p>

                            <p className="font-poppins text-sm text-gray-800 leading-relaxed">
                                <span className="font-bold">Opening time:</span> Our store has re-opened for shopping, exchanges every day <span className="font-bold">11am to 7pm</span>
                            </p>
                        </div>

                        {/* Social Icons */}
                        <div className="flex gap-3">
                            {contactSocials.map((social, id) => (
                                <Link
                                    key={id}
                                    to={social.path}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`w-10 h-10 rounded-md flex items-center justify-center text-white ${social.color} hover:scale-110 transition-transform shadow-sm`}
                                >
                                    <social.Icon size={18} />
                                </Link>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
