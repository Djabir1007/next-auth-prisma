"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  type RegisterFormValues,
  registerFormSchema,
} from "../model/registerFormSchema";

import {
  formClassName,
  fieldClassName,
  labelClassName,
  inputClassName,
  buttonClassName,
  errorClassName,
} from "@/src/shared/ui/form/form.styles";

import { EyeIcon } from "@/src/shared/ui/icons/EyeIcon";
import { zodResolver } from "@hookform/resolvers/zod";

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const [serverError, setServerError] = useState<string>("");

  const handlePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible((prev) => !prev);
  };

  const router = useRouter();

  const onSubmit = async (data: RegisterFormValues) => {
    setServerError("");

    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {
      router.push("/login");
      return;
    }

    if (!response.ok) {
      setServerError(result.message);
      return;
    }
  };

  return (
    <form className={formClassName} onSubmit={handleSubmit(onSubmit)}>
      <div className={fieldClassName}>
        <label className={labelClassName} htmlFor="firstName">
          Имя
        </label>
        <input
          className={inputClassName}
          type="text"
          id="firstName"
          {...register("firstName")}
          autoComplete="given-name"
        />
        {errors.firstName && (
          <span className={errorClassName}>{errors.firstName.message}</span>
        )}
      </div>

      <div className={fieldClassName}>
        <label className={labelClassName} htmlFor="email">
          Email
        </label>
        <input
          className={inputClassName}
          type="email"
          id="email"
          {...register("email")}
          autoComplete="email"
        />
        {errors.email && (
          <span className={errorClassName}>{errors.email.message}</span>
        )}
      </div>

      <div className={fieldClassName}>
        <label className={labelClassName} htmlFor="password">
          Пароль
        </label>
        <div className="relative">
          <input
            className={`${inputClassName} pr-10`}
            type={isPasswordVisible ? "text" : "password"}
            id="password"
            {...register("password")}
            autoComplete="new-password"
          />
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2"
            type="button"
            onClick={handlePasswordVisibility}
            aria-label="Показать пароль"
          >
            <EyeIcon />
          </button>
        </div>
        {errors.password && (
          <span className={errorClassName}>{errors.password.message}</span>
        )}
      </div>

      <div className={fieldClassName}>
        <label className={labelClassName} htmlFor="confirmPassword">
          Повторите пароль
        </label>
        <div className="relative">
          <input
            className={`${inputClassName} pr-10`}
            type={isConfirmPasswordVisible ? "text" : "password"}
            id="confirmPassword"
            {...register("confirmPassword")}
            autoComplete="new-password"
          />
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2"
            type="button"
            onClick={handleConfirmPasswordVisibility}
            aria-label="Показать пароль"
          >
            <EyeIcon />
          </button>
        </div>
        {errors.confirmPassword && (
          <span className={errorClassName}>
            {errors.confirmPassword.message}
          </span>
        )}
      </div>

      {serverError && <span className={errorClassName}>{serverError}</span>}

      <button className={buttonClassName} type="submit">
        Зарегистрироваться
      </button>
      <p className="text-center text-sm">
        Уже есть аккаунт?{" "}
        <Link className="font-medium text-slate-900 underline" href="/login">
          Войти
        </Link>
      </p>
    </form>
  );
};
