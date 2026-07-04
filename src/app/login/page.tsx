import { LoginForm } from "@/src/features/login-form/ui/LoginForm";
import { Container } from "@/src/shared/ui/container/Container";

const LoginPage = () => {
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
