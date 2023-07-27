import { useNavigate } from "react-router-dom";

interface Props {}
const NotFound = ({}: Props) => {
  const navigate = useNavigate();

  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-primary">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Sorry, we couldn&#39;t find the page you&#39;re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button
            onClick={() => navigate("/")}
            className="btn bg-primary text-on-primary"
          >
            Go back home
          </button>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
