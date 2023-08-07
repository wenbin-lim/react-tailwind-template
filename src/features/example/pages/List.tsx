import { Button } from "@src/components";
import { useQuery } from "@tanstack/react-query";
import { getFullList, getOne } from "@src/lib/dataProvider";

type ExampleType = {
  id: string;
  name: string;
};

const List = () => {
  const { data, error } = useQuery({
    queryKey: ["examples"],
    queryFn: () =>
      getOne<ExampleType>({
        collectionName: "examples",
        id: "123",
      }),
    meta: {
      showErrorToast: true,
    },
  });

  return (
    <>
      <pre>{JSON.stringify(error, null, 2)}</pre>
    </>
  );
};
export default List;
