import { useNavigate } from "react-router-dom";
import { ReactComponent as CompanyLogo } from "@root/assets/up_logo_icon.svg";

interface Props {}
const LoginPage = ({}: Props) => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <CompanyLogo className="mx-auto h-24 w-auto" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
          <div>
            <label htmlFor="email" className="input-label">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="input"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="input-label">
                Password
              </label>
              <div className="text-sm">
                <a className="cursor-pointer font-semibold text-primary-600 hover:text-primary-500">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="input"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="btn flex w-full justify-center bg-primary text-on-primary"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{" "}
          <a
            onClick={() => navigate("/signup")}
            className="cursor-pointer font-semibold leading-6 text-primary-600 hover:text-primary-500"
          >
            Sign up now
          </a>
        </p>
      </div>
    </div>
  );
};
export default LoginPage;
