import { useParams, useNavigate } from "react-router-dom";

import { useGetOneReservation } from "../data";

import { Button } from "@src/components/ui/button";
import { DetailLoader } from "@src/components/loaders";

const Show = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // fetch data
  const { data } = useGetOneReservation(id || "");

  if (data) {
    return (
      <article className="p-container flex h-full flex-col gap-y-6">
        <header>
          <h3 className="text-lg font-semibold">Detail</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            More information...
          </p>
        </header>

        <dl className="flex-1">
          <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-semibold leading-6">ID</dt>
            <dd className="mt-1 text-sm leading-6 text-muted-foreground sm:col-span-2 sm:mt-0">
              {data.id || "-"}
            </dd>
          </div>

          <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-semibold leading-6">Name</dt>
            <dd className="mt-1 text-sm leading-6 text-muted-foreground sm:col-span-2 sm:mt-0">
              {data.name || "-"}
            </dd>
          </div>
        </dl>

        <footer className="flex justify-end">
          <Button variant="outline" onClick={() => navigate("/reservations")}>
            Back
          </Button>
        </footer>
      </article>
    );
  }

  return <DetailLoader />;
};
export default Show;
