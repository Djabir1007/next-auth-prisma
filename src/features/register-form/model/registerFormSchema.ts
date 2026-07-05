import { z } from "zod";

export const registerFormSchema = z
  .object({
    firstName: z.string().min(2, "Имя должно содержать минимум 2 символа"),
    email: z.string().email("Введите корректный email"),
    password: z.string().min(5, "Пароль должен содержать минимум 5 символов"),
    confirmPassword: z.string().min(5, "Повторите пароль"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerFormSchema>;
