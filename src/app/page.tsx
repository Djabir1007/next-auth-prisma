import { Container } from "../shared/ui/container/Container";

const Home = () => {
  return (
    <main className="py-10">
      <Container>
        <h1 className="text-center">Next Auth Prisma</h1>
        <p className="text-center">
          Проект с регистрацией, входом и профилем пользователя
        </p>
      </Container>
    </main>
  );
};

export default Home;
