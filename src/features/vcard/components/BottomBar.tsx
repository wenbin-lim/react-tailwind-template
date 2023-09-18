/*
  https://tailwindui.com/components/application-ui/data-display/description-lists
*/
import { useParams } from "react-router-dom";
import { useGetOneVcard } from "../data/hooks";

import { ReactComponent as DownloadSVG } from "../icons/download.svg";
import { ReactComponent as PhoneSVG } from "../icons/phone.svg";

const BottomBar = () => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const { id } = useParams();

  // fetch data
  const { data } = useGetOneVcard({
    id: id || "",
    enabled: !!id,
  });

  function download() {
    const URL = `${BASE_URL}/api/vcard/${id}/download`;
    if (typeof window !== "undefined") {
      window.location.href = URL;
    }
  }

  if (data) {
    return (
      <div className="flex h-20 w-full overflow-hidden px-2 py-5">
        {data.company && (
          <link
            rel="stylesheet"
            href={`${BASE_URL}/api/${data.company}/stylesheet.css`}
          />
        )}
        <div className="grid w-full grid-cols-2 justify-stretch gap-2">
          <button
            onClick={() => download()}
            className=" flex h-10 items-center
                       justify-center rounded-full border-2 border-[rgb(var(--vcard-secondary-color))] bg-[rgb(var(--vcard-secondary-color))]"
          >
            <DownloadSVG
              className="text-[rgb(var(--vcard-font-secondary-color))]"
              height="20px"
            />
          </button>
          <button
            onClick={() => {
              window.location.href = `tel:${data.phone}`;
            }}
            className="flex h-10
                       items-center justify-center rounded-full border-2 border-[rgb(var(--vcard-secondary-color))]"
          >
            <PhoneSVG
              className="text-[rgb(var(--vcard-secondary-color))]"
              height="25px"
            />
          </button>
        </div>
      </div>
    );
  }
};
export default BottomBar;
