import { useNavigate } from "react-router-dom";
import { ReactComponent as CompanyLogo } from "@root/assets/up_logo_icon.svg";

interface Props {}
const SignupPage = ({}: Props) => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-full flex-1">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <CompanyLogo className="mx-auto h-24 w-auto" />
            <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Create a new account
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              Already have an account?{" "}
              <a
                onClick={() => navigate("/login")}
                className="cursor-pointer font-semibold leading-6 text-primary-600 hover:text-primary-500"
              >
                Log in now
              </a>
            </p>
          </div>

          <div className="mt-10">
            <div>
              <form action="#" method="POST" className="space-y-4">
                <div>
                  <label htmlFor="username" className="input-label">
                    Username
                  </label>
                  <div className="mt-2">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      autoComplete="username"
                      required
                      className="input"
                    />
                  </div>
                </div>

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
                  <label htmlFor="password" className="input-label">
                    Password
                  </label>
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
                  <label htmlFor="passwordConfirm" className="input-label">
                    Confirm Password
                  </label>
                  <div className="mt-2">
                    <input
                      id="passwordConfirm"
                      name="passwordConfirm"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="input"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="checkbox"
                    />
                    <label htmlFor="remember-me" className="input-label ml-3">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm leading-6">
                    <a className="cursor-pointer font-semibold leading-6 text-primary-600 hover:text-primary-500">
                      Forgot password?
                    </a>
                  </div>
                </div>

                <div className="pt-8">
                  <button
                    type="submit"
                    className="btn  flex w-full justify-center bg-primary text-on-primary"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
          alt=""
        />
      </div>
    </div>
  );
};
export default SignupPage;
