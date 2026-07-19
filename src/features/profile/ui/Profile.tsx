type ProfileProps = {
  user: {
    firstName: string;
    email: string;
  };
};

export const Profile = ({ user }: ProfileProps) => {
  const userInitial = user.firstName[0].toUpperCase();

  return (
    <article className="mx-auto max-w-[520px] rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <header className="mb-6 flex items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="flex size-14 items-center justify-center rounded-full bg-slate-900 text-xl font-semibold text-white">
            {userInitial}
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              {user.firstName}
            </h2>
            <p className="text-sm text-slate-500">Личный кабинет</p>
          </div>
        </div>

        <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
          Активен
        </span>
      </header>

      <div className="mb-6 flex flex-col gap-4">
        <div>
          <p className="mb-1 text-sm text-slate-500">Имя пользователя</p>
          <p className="font-medium text-slate-900">{user.firstName}</p>
        </div>

        <div>
          <p className="mb-1 text-sm text-slate-500">Email</p>
          <p className="font-medium text-slate-900">{user.email}</p>
        </div>
      </div>

      <footer className="flex justify-end border-t border-slate-200 pt-6">
        <button
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
          type="button"
        >
          Выйти из аккаунта
        </button>
      </footer>
    </article>
  );
};
