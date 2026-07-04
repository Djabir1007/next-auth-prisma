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

export const LoginForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const handlePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <form className={formClassName}>
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
      </div>

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
