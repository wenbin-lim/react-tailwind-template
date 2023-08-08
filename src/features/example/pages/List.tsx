/* 
  https://tailwindui.com/components/application-ui/lists/tables
*/
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetPaginatedListExample, useDeleteOneExample } from "../data/hooks";

import { ListLoader } from "@src/components/loaders";
import { Button, MoreActionsDropdown } from "@src/components/buttons";
import { Pagination } from "@src/components/pagination";

import toast from "react-hot-toast";
import swal, { swalWarnDeleteOption } from "@src/lib/swal";

const List = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  // fetch paginated data
  const { data } = useGetPaginatedListExample(page, 12);

  // delete
  const deleteFn = useDeleteOneExample();
  const onDelete = (id: string) => {
    swal.fire(swalWarnDeleteOption).then((result) => {
      if (result.isConfirmed) {
        deleteFn.mutate(id, {
          onSuccess: () => toast.success("Example deleted"),
        });
      }
    });
  };

  if (data) {
    return (
      <main className="grid grid-rows-[1fr_auto] bg-background text-on-background">
        <div className="px-4 py-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold leading-6">Examples</h1>
            <Button
              className="bg-primary text-on-primary"
              onClick={() => navigate("new")}
            >
              Add example
            </Button>
          </div>

          {/* Table */}
          <div className="-mx-4 mt-4 sm:-mx-0">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr className="text-left text-sm font-semibold text-on-background">
                  <th scope="col" className="py-3.5 pl-4 pr-3 sm:pl-0">
                    Name
                  </th>
                  <th scope="col" className="hidden px-3 py-3.5 lg:table-cell">
                    Title
                  </th>
                  <th scope="col" className="hidden px-3 py-3.5 sm:table-cell">
                    Email
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">More...</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.items.map((item) => (
                  <tr key={item.id} className="text-sm">
                    <td className="w-full max-w-0 py-4 pl-4 pr-3 sm:w-auto sm:max-w-none sm:pl-0">
                      {item.name}
                    </td>
                    <td className="hidden px-3 py-4 lg:table-cell">
                      {item.title}
                    </td>
                    <td className="hidden px-3 py-4 sm:table-cell">
                      {item.description}
                    </td>
                    <td className=" flex justify-end py-4 pl-3 pr-4 sm:pr-0">
                      <MoreActionsDropdown
                        actions={[
                          {
                            label: "Edit",
                            callback: () => navigate(`${item.id}/edit`),
                          },
                          {
                            label: "Delete",
                            callback: () => onDelete(item.id),
                          },
                        ]}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <Pagination
          page={data.page}
          perPage={data.perPage}
          totalItems={data.totalItems}
          totalPages={data.totalPages}
          setPage={setPage}
        />
      </main>
    );
  }

  return <ListLoader />;
};
export default List;
