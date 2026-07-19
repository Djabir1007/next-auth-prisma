"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";

import {
  type LoginFormValues,
  loginFormSchema,
} from "../model/loginFormSchema";

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
import { useRouter } from "next/navigation";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const [serverError, setServerError] = useState<string>("");

  const router = useRouter();

  const handlePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const onSubmit = async (data: LoginFormValues) => {
    setServerError("");

    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {
      router.replace("profile");
    }

    if (!response.ok) {
      setServerError(result.message);
      return;
    }
  };

  return (
    <form className={formClassName} onSubmit={handleSubmit(onSubmit)}>
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
            autoComplete="current-password"
          />
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2"
            type="button"
            aria-label="Показать пароль"
            onClick={handlePasswordVisibility}
          >
            <EyeIcon />
          </button>
        </div>
        {errors.password && (
          <span className={errorClassName}>{errors.password.message}</span>
        )}
      </div>
      {serverError && <span className={errorClassName}>{serverError}</span>}

      <button className={buttonClassName} type="submit">
        Войти
      </button>
      <p className="text-center text-sm">
        Нет аккаунта?{" "}
        <Link className="font-medium text-slate-900 underline" href="/register">
          Зарегистрироваться
        </Link>
      </p>
    </form>
  );
};
