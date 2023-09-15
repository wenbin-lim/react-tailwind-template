import Spinner from "./Spinner";

const PageLoader = () => {
  return (
    <div className="fixed z-[9999] flex h-screen w-screen place-items-center">
      <Spinner />
    </div>
  );
};
export default PageLoader;
