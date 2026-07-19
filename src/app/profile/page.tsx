import { Profile } from "@/src/features/profile/ui/Profile";
import { Container } from "@/src/shared/ui/container/Container";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { prisma } from "@/src/shared/lib/prisma";

type AccessTokenPayload = {
  userId: string;
};

const ProfilePage = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    redirect("/login");
  }

  let decoded: AccessTokenPayload;

  try {
    decoded = jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_SECRET!,
    ) as AccessTokenPayload;
  } catch {
    redirect("/login");
  }

  const userId = decoded.userId;

  const profileUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      firstName: true,
      email: true,
    },
  });

  if (!profileUser) {
    redirect("/login");
  }

  return (
    <section className="py-10">
      <Container>
        <h1 className="mb-6 text-center text-2xl font-semibold">Профиль</h1>
        <Profile user={profileUser} />
      </Container>
    </section>
  );
};

export default ProfilePage;
