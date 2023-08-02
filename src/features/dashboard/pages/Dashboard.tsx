import toast from "react-hot-toast";

const Dashboard = () => {
  return (
    <div className="container mx-auto p-2">
      <h1 className="text-4xl sm:text-primary">Dashboard</h1>
      <button onClick={() => toast("success", {})}>toast</button>
    </div>
  );
};
export default Dashboard;
