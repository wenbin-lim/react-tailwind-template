import { useToast } from "@src/components/toast/use-toast";
const Dashboard = () => {
  const { toast } = useToast();

  return (
    <div className="p-4">
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
    </div>
  );
};
export default Dashboard;
