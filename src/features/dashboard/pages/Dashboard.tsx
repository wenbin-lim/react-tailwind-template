import toast from "react-hot-toast";

const Dashboard = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl">Dashboard</h1>
      <button
        className="mt-2 rounded-md bg-primary px-4 py-2 text-on-primary"
        onClick={() => toast.success("Hello toast!")}
      >
        test toast
      </button>
    </div>
  );
};
export default Dashboard;
