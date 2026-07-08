import { loginFormSchema } from "@/src/features/login-form/model/loginFormSchema";
import { prisma } from "@/src/shared/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  const body = await request.json();

  const validationResult = loginFormSchema.safeParse(body);

  if (!validationResult.success) {
    return Response.json(
      {
        message: "Некорректные данные",
        errors: validationResult.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const validatedData = validationResult.data;

  const user = await prisma.user.findUnique({
    where: {
      email: validatedData.email,
    },
  });

  if (!user) {
    return Response.json(
      {
        message: "Неверный email или пароль",
      },
      { status: 401 },
    );
  }

  const isPasswordValid = await bcrypt.compare(
    validatedData.password,
    user.password,
  );

  if (!isPasswordValid) {
    return Response.json(
      {
        message: "Неверный email или пароль",
      },
      { status: 401 },
    );
  }

  return Response.json({
    message: "Вход выполнен успешно",
    user: {
      id: user.id,
      firstName: user.firstName,
      email: user.email,
    },
  });
}
