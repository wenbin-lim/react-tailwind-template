import { useNavigate } from "react-router-dom";

type ForbiddenPageProps = {
  redirectTo?: string;
};

const ForbiddenPage = ({ redirectTo = "/" }: ForbiddenPageProps) => {
  const navigate = useNavigate();

  return (
    <main className="grid h-screen place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-primary">403</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
          Forbidden
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Sorry, you do not have sufficient rights to view this page.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button
            className="btn btn-lg bg-primary text-on-primary"
            onClick={() => navigate(redirectTo, { replace: true })}
          >
            Go back
          </button>
        </div>
      </div>
    </main>
  );
};

export default ForbiddenPage;
