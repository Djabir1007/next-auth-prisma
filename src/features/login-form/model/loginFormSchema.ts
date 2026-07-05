import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email("Введите корректный email"),
  password: z.string().min(5, "Пароль должен содержать минимум 5 символов"),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;
