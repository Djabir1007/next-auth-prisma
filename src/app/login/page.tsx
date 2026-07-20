import { LoginForm } from "@/src/features/login-form/ui/LoginForm";
import { Container } from "@/src/shared/ui/container/Container";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

const LoginPage = async () => {
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
    <section>
      <Container>
        <h1 className="mb-6 text-center text-2xl font-semibold">
          Авторизируйтесь!
        </h1>
        <LoginForm />
      </Container>
    </section>
  );
};

export default LoginPage;
