import { loginFormSchema } from "@/src/features/login-form/model/loginFormSchema";
import { prisma } from "@/src/shared/lib/prisma";
import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

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

  const accessToken = jwt.sign(
    { userId: user.id },
    process.env.JWT_ACCESS_SECRET!,
    {
      expiresIn: "15m",
    },
  );

  const refreshToken = jwt.sign(
    { userId: user.id },
    process.env.JWT_REFRESH_SECRET!,
    {
      expiresIn: "7d",
    },
  );

  const response = NextResponse.json({
    message: "Вход выполнен успешно",
    user: {
      id: user.id,
      firstName: user.firstName,
      email: user.email,
    },
  });

  response.cookies.set("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 15,
    path: "/",
  });

  response.cookies.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return response;
}
