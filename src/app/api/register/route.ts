import { registerFormSchema } from "@/src/features/register-form/model/registerFormSchema";
import { prisma } from "@/src/shared/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  const body = await request.json();

  const validationResult = registerFormSchema.safeParse(body);

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

  const existingUser = await prisma.user.findUnique({
    where: {
      email: validatedData.email,
    },
  });

  if (existingUser) {
    return Response.json(
      {
        message: "Пользователь с таким email уже существует!",
      },
      { status: 409 },
    );
  }

  const hashedPassword = await bcrypt.hash(validatedData.password, 10);

  const createdUser = await prisma.user.create({
    data: {
      firstName: validatedData.firstName,
      email: validatedData.email,
      password: hashedPassword,
    },
  });

  return Response.json(
    {
      message: "Пользователь успешно создан",
      user: {
        id: createdUser.id,
        firstName: createdUser.firstName,
        email: createdUser.email,
      },
    },
    { status: 201 },
  );
}
