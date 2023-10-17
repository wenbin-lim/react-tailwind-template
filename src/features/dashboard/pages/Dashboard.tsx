import { useToast } from "@src/components/toast/use-toast";
const Dashboard = () => {
  const { toast } = useToast();

  return (
    <div className="p-container">
      <h1 className="text-4xl">Dashboard</h1>
      <button
        onClick={() => {
          toast({
            description: "test",
          });
        }}
      >
        test
      </button>

      <div
        style={{
          height: "2000px",
          width: "100px",
          backgroundColor: "red",
        }}
      >
        test
      </div>
    </div>
  );
};
export default Dashboard;
