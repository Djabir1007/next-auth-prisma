import { RegisterForm } from "@/src/features/register-form/ui/RegisterForm";
import { Container } from "@/src/shared/ui/container/Container";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

const RegisterPage = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  let isAccessTokenValid = false;

  if (accessToken) {
    try {
      jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET!);
      isAccessTokenValid = true;
    } catch {
      isAccessTokenValid = false;
    }
  }

  if (isAccessTokenValid) {
    redirect("/profile");
  }

  return (
    <section className="py-10">
      <Container>
        <h1 className="mb-6 text-center text-2xl font-semibold">Регистрация</h1>
        <RegisterForm />
      </Container>
    </section>
  );
};

export default RegisterPage;
