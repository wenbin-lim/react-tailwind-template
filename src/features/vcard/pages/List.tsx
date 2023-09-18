/* 
  https://tailwindui.com/components/application-ui/lists/tables
*/
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetPaginatedListVcard, useDeleteOneVcard } from "../data/hooks";

import { ListLoader } from "@src/components/loaders";
import { ListHeader } from "@src/components/ui";
import { Button, MoreActionsDropdown } from "@src/components/buttons";
import { Pagination } from "@src/components/pagination";

import toast from "react-hot-toast";
import swal, { swalWarnDeleteOption } from "@src/lib/swal";

const List = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  // fetch paginated data
  const { data } = useGetPaginatedListVcard(page, 12);

  // delete
  const deleteFn = useDeleteOneVcard();
  const onDelete = (id: string) => {
    swal.fire(swalWarnDeleteOption).then((result) => {
      if (result.isConfirmed) {
        deleteFn.mutate(id, {
          onSuccess: () => toast.success("Vcard deleted"),
        });
      }
    });
  };

  if (data) {
    return (
      <main className="grid h-full grid-rows-[1fr_auto]">
        <div className="px-4 py-4 sm:px-6 lg:px-8">
          {/* Header */}
          <ListHeader
            title="Vcard List"
            buttons={
              <Button
                className="bg-primary text-on-primary"
                onClick={() => navigate("new")}
              >
                New Vcard
              </Button>
            }
          />

          {/* Table */}
          <div className="-mx-4 mt-4 sm:-mx-0">
            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
              <thead>
                <tr className="text-left text-sm font-semibold">
                  <th scope="col" className="py-3.5 pl-4 pr-3 sm:pl-0">
                    Name
                  </th>
                  <th scope="col" className="hidden px-3 py-3.5 lg:table-cell">
                    Title
                  </th>
                  <th scope="col" className="hidden px-3 py-3.5 sm:table-cell">
                    Description
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">More...</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {data.items.map((item) => (
                  <tr key={item.id} className="text-sm">
                    <td className="w-full max-w-0 py-4 pl-4 pr-3 sm:w-auto sm:max-w-none sm:pl-0">
                      {item.name}
                    </td>
                    <td className="hidden px-3 py-4 lg:table-cell">
                      {item.title}
                    </td>
                    <td className="hidden px-3 py-4 sm:table-cell">
                      {/* {item.description} */} hello
                    </td>
                    <td className=" flex justify-end py-4 pl-3 pr-4 sm:pr-0">
                      <MoreActionsDropdown
                        actions={[
                          {
                            label: "View",
                            callback: () => navigate(`${item.id}`),
                          },
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
