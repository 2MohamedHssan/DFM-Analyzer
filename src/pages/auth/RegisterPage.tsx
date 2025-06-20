import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { registration } from "./api";
import { useForm } from "react-hook-form";
import { FormFields, signUpschema } from "./validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../contexts/AuthContext";

const RegisterPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(signUpschema),
    mode: "onChange",
    criteriaMode: "all",
  });

  const onSubmit = async (data: FormFields) => {
    console.log(data, "data");
    try {
      setIsLoading(true);
      console.log(data, "data");
      const response = await registration(data);
      if (response) {
        const token = response?.data?.token;
        const refreshToken = response?.data?.refresh_token;
        localStorage.setItem("authUser", token);
        localStorage.setItem("refreshToken", refreshToken);
        setUser({
          name: data.name,
          email: data.email,
        });
        navigate(`${window.location.pathname.includes("login") ? -1 : `/`}`);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <Link to="/">
            <img src="/Logo.png" className="mx-auto h-20" alt="" />
          </Link>
          <h2 className="text-3xl font-bold text-gray-900">
            {t("auth.register.title")}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {t("auth.register.subtitle")}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              {t("auth.register.name")}
            </label>
            <input
              id="name"
              {...register("name")}
              type="text"
              autoComplete="name"
              className="input mt-1"
              placeholder="John Doe"
            />
            {errors.name && (
              <p className="text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              {t("auth.register.email")}
            </label>
            <input
              id="email"
              {...register("email")}
              type="email"
              autoComplete="email"
              className="input mt-1"
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              {t("auth.register.password")}
            </label>
            <input
              id="password"
              {...register("password")}
              type="password"
              autoComplete="new-password"
              className="input mt-1"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-600">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              {t("auth.register.confirmPassword")}
            </label>
            <input
              id="confirmPassword"
              {...register("confirmPassword")}
              type="password"
              autoComplete="new-password"
              className="input mt-1"
              placeholder="••••••••"
            />
            {errors.confirmPassword && (
              <p className="text-red-600">{errors.confirmPassword.message}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary w-full"
            >
              {isLoading ? (
                <LoadingSpinner size="small" />
              ) : (
                t("auth.register.registerButton")
              )}
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            {t("auth.register.hasAccount")}{" "}
            <Link
              to="/login"
              className="text-primary-600 hover:text-primary-500 font-medium"
            >
              {t("auth.register.login")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
