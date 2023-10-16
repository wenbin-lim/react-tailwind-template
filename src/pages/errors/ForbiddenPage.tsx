import { NavLink } from "react-router-dom";
import { Button } from "@src/components/ui/button";

type ForbiddenPageProps = {
  redirectTo?: string;
};

const ForbiddenPage = ({ redirectTo = "/" }: ForbiddenPageProps) => {
  return (
    <main className="grid min-h-screen place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-primary">403</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
          Forbidden
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Sorry, you do not have sufficient rights to view this page.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button asChild>
            <NavLink to={redirectTo} replace>
              Go back
            </NavLink>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default ForbiddenPage;
