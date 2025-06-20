import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { useForm } from "react-hook-form";
import { LoginFields, Loginschema } from "./validation";
import { login } from "./api";
import { zodResolver } from "@hookform/resolvers/zod";

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  // const { login } = useAuth();
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginFields>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(Loginschema),
  });

  const onSubmit = async (data: LoginFields) => {
    setIsLoading(true);
    try {
      console.log(data, "data");

      const response = await login(data);
      if (response) {
        navigate(`${window.location.pathname.includes("signup") ? "/" : -1}`);
        setIsLoading(false);
      }
      const token = response?.data?.response?.token;
      localStorage.setItem("authUser", token);
      const refreshToken = response?.data?.response?.refresh_token;
      localStorage.setItem("refreshToken", refreshToken);

      const User = response?.data?.response?.user;
      setUser(User);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        setIsLoading(false);
      } else {
        setError("An unexpected error occurred");
      }
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
            {t("auth.login.title")}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {t("auth.login.subtitle")}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {error && (
            <div className="bg-error-50 border border-error-500 text-error-900 px-4 py-3 rounded-md">
              {error}
            </div>
          )}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              {t("auth.login.email")}
            </label>
            <input
              id="email"
              {...register("email")}
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input mt-1"
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1 absolute">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                {t("auth.login.password")}
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-primary-600 hover:text-primary-500"
              >
                {t("auth.login.forgotPassword")}
              </Link>
            </div>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              {...register("password")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input mt-1"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1 absolute">
                {errors.password.message}
              </p>
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
                t("auth.login.loginButton")
              )}
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            {t("auth.login.noAccount")}{" "}
            <Link
              to="/register"
              className="text-primary-600 hover:text-primary-500 font-medium"
            >
              {t("auth.login.register")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
