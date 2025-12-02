import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { User, Mail, Lock, Phone, MapPin, Loader2, Eye, EyeOff, UserPlus, Shield } from "lucide-react";

function Register() {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();

    const password = watch("password");

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const response = await axios.post("http://localhost:8000/api/auth/register", data, {
                withCredentials: true,
            });

            if (response.data.success || response.status === 201) {
                toast.success(response.data.message || "Registration successful!");
                if(response.data.role === "Admin") {
                    navigate("/admin");
                } else {
                    navigate("/");
                }
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Registration failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-900 to-black px-4 sm:px-6 lg:px-8 py-12 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-96 h-96 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-96 h-96 bg-slate-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
            </div>

            <div className="max-w-2xl w-full space-y-8 bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/20 relative z-10">
                <div className="text-center">
                    <div className="mx-auto h-16 w-16 bg-gradient-to-tr from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg mb-6 transform rotate-3 hover:rotate-0 transition-all duration-300">
                        <UserPlus className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">
                        Create Account
                    </h2>
                    <p className="mt-2 text-sm text-gray-300">
                        Join us and start shopping today
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                        <div className="group sm:col-span-2">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1 pl-1">
                                Full Name
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
                                </div>
                                <input
                                    id="name"
                                    type="text"
                                    autoComplete="name"
                                    className={`appearance-none block w-full pl-10 pr-3 py-3 bg-gray-900/50 border ${errors.name ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20" : "border-gray-600 focus:border-purple-500 focus:ring-purple-500/20"
                                        } rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-4 sm:text-sm transition-all duration-300`}
                                    placeholder="John Doe"
                                    {...register("name", {
                                        required: "Full name is required",
                                        minLength: {
                                            value: 2,
                                            message: "Name must be at least 2 characters"
                                        }
                                    })}
                                />
                            </div>
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-400 pl-1">{errors.name.message}</p>
                            )}
                        </div>

                        <div className="group sm:col-span-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1 pl-1">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    className={`appearance-none block w-full pl-10 pr-3 py-3 bg-gray-900/50 border ${errors.email ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20" : "border-gray-600 focus:border-purple-500 focus:ring-purple-500/20"
                                        } rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-4 sm:text-sm transition-all duration-300`}
                                    placeholder="you@example.com"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address"
                                        }
                                    })}
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-400 pl-1">{errors.email.message}</p>
                            )}
                        </div>

                        <div className="group sm:col-span-2">
                            <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-1 pl-1">
                                Account Type
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Shield className="h-5 w-5 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
                                </div>
                                <select
                                    id="role"
                                    className={`appearance-none block w-full pl-10 pr-10 py-3 bg-gray-900/50 border ${errors.role ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20" : "border-gray-600 focus:border-purple-500 focus:ring-purple-500/20"
                                        } rounded-xl text-gray-100 focus:outline-none focus:ring-4 sm:text-sm transition-all duration-300 cursor-pointer`}
                                    {...register("role", {
                                        required: "Please select an account type"
                                    })}
                                >
                                    <option value="" className="bg-gray-900 text-gray-400">Select account type</option>
                                    <option value="User" className="bg-gray-900 text-gray-100">User</option>
                                    <option value="Admin" className="bg-gray-900 text-gray-100">Admin</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                            {errors.role && (
                                <p className="mt-1 text-sm text-red-400 pl-1">{errors.role.message}</p>
                            )}
                        </div>

                        <div className="group">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1 pl-1">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
                                </div>
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="new-password"
                                    className={`appearance-none block w-full pl-10 pr-10 py-3 bg-gray-900/50 border ${errors.password ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20" : "border-gray-600 focus:border-purple-500 focus:ring-purple-500/20"
                                        } rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-4 sm:text-sm transition-all duration-300`}
                                    placeholder="••••••••"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message: "Password must be at least 6 characters"
                                        }
                                    })}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-300 transition-colors" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-300 transition-colors" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-400 pl-1">{errors.password.message}</p>
                            )}
                        </div>

                        <div className="group">
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1 pl-1">
                                Phone Number
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Phone className="h-5 w-5 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
                                </div>
                                <input
                                    id="phone"
                                    type="tel"
                                    autoComplete="tel"
                                    className={`appearance-none block w-full pl-10 pr-3 py-3 bg-gray-900/50 border ${errors.phone ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20" : "border-gray-600 focus:border-purple-500 focus:ring-purple-500/20"
                                        } rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-4 sm:text-sm transition-all duration-300`}
                                    placeholder="+1 (555) 000-0000"
                                    {...register("phone", {
                                        required: "Phone number is required",
                                        pattern: {
                                            value: /^\+?[1-9]\d{1,14}$/,
                                            message: "Invalid phone number"
                                        }
                                    })}
                                />
                            </div>
                            {errors.phone && (
                                <p className="mt-1 text-sm text-red-400 pl-1">{errors.phone.message}</p>
                            )}
                        </div>

                        <div className="group sm:col-span-2">
                            <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-1 pl-1">
                                Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MapPin className="h-5 w-5 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
                                </div>
                                <textarea
                                    id="address"
                                    rows={3}
                                    className={`appearance-none block w-full pl-10 pr-3 py-3 bg-gray-900/50 border ${errors.address ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20" : "border-gray-600 focus:border-purple-500 focus:ring-purple-500/20"
                                        } rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-4 sm:text-sm transition-all duration-300`}
                                    placeholder="123 Main St, City, Country"
                                    {...register("address", {
                                        required: "Address is required",
                                        minLength: {
                                            value: 10,
                                            message: "Address must be at least 10 characters"
                                        }
                                    })}
                                />
                            </div>
                            {errors.address && (
                                <p className="mt-1 text-sm text-red-400 pl-1">{errors.address.message}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transform hover:-translate-y-0.5"
                        >
                            {isLoading ? (
                                <Loader2 className="animate-spin h-5 w-5" />
                            ) : (
                                "Create Account"
                            )}
                        </button>
                    </div>

                    <div className="text-center mt-4">
                        <p className="text-sm text-gray-400">
                            Already have an account?{" "}
                            <Link to="/login" className="font-medium text-blue-400 hover:text-blue-300 transition-colors">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
