import { RegisterForm } from "@/src/features/register-form/ui/RegisterForm";
import { Container } from "@/src/shared/ui/container/Container";

const RegisterPage = () => {
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
