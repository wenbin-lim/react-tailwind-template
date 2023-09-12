/* 
  https://tailwindui.com/components/application-ui/lists/tables
*/
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useGetPaginatedListExample, useDeleteOneExample } from "../data";

import { ListLoader } from "@src/components/loaders";
import { MenuDropdown, Pagination } from "@src/components/ui";

import toast from "react-hot-toast";
import swal, { swalWarnDeleteOption } from "@src/lib/swal";

const List = () => {
  const navigate = useNavigate();

  // fetch paginated data
  const [page, setPage] = useState(1);
  const { data } = useGetPaginatedListExample(page, 12);

  // delete
  const deleteFn = useDeleteOneExample();
  const onDelete = (id: string) => {
    swal.fire(swalWarnDeleteOption).then((result) => {
      if (result.isConfirmed) {
        deleteFn.mutate(id, {
          onSuccess: () => toast.success("Deleted!"),
        });
      }
    });
  };

  if (data) {
    return (
      <main className="flex flex-col">
        <div className="flex-1 p-4 sm:px-6 lg:px-8">
          <header className="flex place-items-center">
            <h2 className="text-2xl font-bold">Title</h2>
            <button
              className="btn ml-auto bg-primary text-on-primary md:btn-lg"
              onClick={() => navigate("new")}
            >
              New
            </button>
          </header>

          {/* Table */}
          <section className="-mx-4 mt-4 sm:-mx-0">
            <table className="min-w-full">
              <thead className="border-b border-gray-300 dark:border-gray-700">
                <tr className="text-left text-sm font-semibold">
                  <th scope="col" className="py-3 pl-4 pr-3 sm:pl-0">
                    Name
                  </th>
                  {/* <th scope="col" className="p-3">
                    unused
                  </th> */}
                  <th scope="col" className="py-3 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">More...</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {data.items.map((item) => (
                  <tr key={item.id} className="text-sm">
                    <td className="py-3 pl-4 pr-3 sm:pl-0">{item.name}</td>
                    {/* <td className="p-3">unused</td> */}
                    <td className="flex justify-end py-3 pl-3 pr-4 sm:pr-0">
                      <MenuDropdown
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
          </section>
        </div>

        <footer className="border-t border-gray-300 p-4 dark:border-gray-700 sm:px-6">
          <Pagination
            page={data.page}
            perPage={data.perPage}
            totalItems={data.totalItems}
            totalPages={data.totalPages}
            setPage={setPage}
          />
        </footer>
      </main>
    );
  }

  return <ListLoader />;
};
export default List;