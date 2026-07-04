"use client";

import { useState } from "react";
import Link from "next/link";

import {
  formClassName,
  fieldClassName,
  labelClassName,
  inputClassName,
  buttonClassName,
} from "@/src/shared/ui/form/form.styles";

import { EyeIcon } from "@/src/shared/ui/icons/EyeIcon";

export const RegisterForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const handlePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible((prev) => !prev);
  };

  return (
    <form className={formClassName}>
      <div className={fieldClassName}>
        <label className={labelClassName} htmlFor="firstName">
          Имя
        </label>
        <input
          className={inputClassName}
          type="text"
          id="firstName"
          name="firstName"
          autoComplete="given-name"
        />
      </div>

      <div className={fieldClassName}>
        <label className={labelClassName} htmlFor="email">
          Email
        </label>
        <input
          className={inputClassName}
          type="email"
          id="email"
          name="email"
          autoComplete="email"
        />
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
            name="password"
            autoComplete="new-password"
          />
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2"
            type="button"
            onClick={handlePasswordVisibility}
          >
            <EyeIcon />
          </button>
        </div>
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
            name="confirmPassword"
            autoComplete="new-password"
          />
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2"
            type="button"
            onClick={handleConfirmPasswordVisibility}
          >
            <EyeIcon />
          </button>
        </div>
      </div>

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
