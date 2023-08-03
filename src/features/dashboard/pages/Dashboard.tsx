import toast from "react-hot-toast";

const Dashboard = () => {
  return (
    <div className="container mx-auto p-2">
      <h1 className="text-4xl sm:text-primary">Dashboard</h1>
      <button
        className="rounded-md bg-primary px-4 py-2 text-on-primary"
        onClick={() => toast.success("Hello toast!")}
      >
        test toast
      </button>
    </div>
  );
};
export default Dashboard;
