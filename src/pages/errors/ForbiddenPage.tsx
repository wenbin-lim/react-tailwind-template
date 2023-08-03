import { useNavigate } from "react-router-dom";
import { Button } from "@src/components";

type ForbiddenPageProps = {
  redirectTo?: string;
};

const ForbiddenPage = ({ redirectTo = "/" }: ForbiddenPageProps) => {
  const navigate = useNavigate();

  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-primary">403</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Forbidden
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Sorry, you do not have sufficient rights to view this page.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button
            className="w-full bg-primary text-on-primary"
            onClick={() => navigate(redirectTo)}
          >
            Go back
          </Button>
        </div>
      </div>
    </main>
  );
};

export default ForbiddenPage;
