/*
  https://tailwindui.com/components/application-ui/data-display/description-lists
*/
import { useParams } from "react-router-dom";
import { useGetOneVcard } from "../data/hooks";
import { getPbImageUrl } from "@src/utils/pocketbase";

import { DetailLoader } from "@src/components/loaders";

import { ReactComponent as ExternalLinkSVG } from "../icons/externalLink.svg";
import { ReactComponent as WhatsappSVG } from "../icons/whatsapp.svg";
import { ReactComponent as EnvelopeSVG } from "../icons/envelope.svg";
import { ReactComponent as LinkedinSVG } from "../icons/linkedin.svg";
import TopBar from "../components/TopBarInverse";
import BottomBar from "../components/BottomBar";
import ScreenRestriction from "../components/ScreenRestriction";

const LeftExpand = () => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const { id } = useParams();

  // fetch data
  const { data } = useGetOneVcard({
    id: id || "",
    enabled: !!id,
  });

  if (data) {
    return (
      <div className="flex h-full w-full flex-col overflow-hidden bg-[rgb(var(--vcard-secondary-color))]">
        {data.company && (
          <link
            rel="stylesheet"
            href={`${BASE_URL}/api/${data.company}/stylesheet.css`}
          />
        )}
        <TopBar />
        <div className="flex h-full flex-col rounded-t-3xl bg-[rgb(var(--vcard-primary-color))]">
          <div className="w-full flex-1 p-5">
            <div className="pb-4 ">
              <img
                src={getPbImageUrl({
                  collection: "vcard",
                  recordId: data.id,
                  fileName: data.avatar,
                })}
                width={128}
                height={128}
                alt="profile image"
                className="h-32 w-32 rounded-full"
              />
            </div>
            <h1 className="font-vcard text-2xl font-semibold text-[rgb(var(--vcard-font-primary-color))]">
              {data.first_name} {data.last_name}
            </h1>
            <p className="font-vcard text-sm text-[rgb(var(--vcard-font-primary-color))]">
              {data.job_title}
            </p>
            <p className="font-vcard line-clamp-4 pt-3 text-sm text-[rgb(var(--vcard-font-primary-color))]">
              {data.description}
            </p>

            <div className="pt-1">
              {data.phone === "" || data.phone === undefined ? (
                <p className="hidden">nil</p>
              ) : (
                <a
                  href={`https://wa.me/${data.phone}`}
                  className="grid grid-cols-3 items-center justify-between py-1 pt-3 align-middle"
                >
                  <p className="font-vcard col-span-2 overflow-hidden truncate text-sm text-[rgb(var(--vcard-font-primary-color))]">
                    {data.prettyPhone}
                  </p>
                  <WhatsappSVG
                    className="justify-self-end text-[rgb(var(--vcard-font-primary-color))]"
                    height="30px"
                    width="30px"
                  />
                </a>
              )}
              {data.email === "" || data.email === undefined ? (
                <p className="hidden">nil</p>
              ) : (
                <a
                  href={`mailto:${data.email}`}
                  className="grid grid-cols-3 items-center justify-between py-1 align-middle"
                >
                  <p className="font-vcard col-span-2 overflow-hidden truncate text-sm text-[rgb(var(--vcard-font-primary-color))]">
                    {data.email}
                  </p>
                  <EnvelopeSVG
                    className="justify-self-end text-[rgb(var(--vcard-font-primary-color))]"
                    height="30px"
                    width="30px"
                  />
                </a>
              )}
              {data.website === "" || data.website === undefined ? (
                <p className="hidden">nil</p>
              ) : (
                <a
                  href={data.website}
                  className="grid grid-cols-3 items-center justify-between py-1 align-middle"
                >
                  <p className="font-vcard col-span-2 overflow-hidden truncate text-sm text-[rgb(var(--vcard-font-primary-color))]">
                    {data.website}
                  </p>
                  <ExternalLinkSVG
                    className="justify-self-end text-[rgb(var(--vcard-font-primary-color))]"
                    height="30px"
                    width="30px"
                  />
                </a>
              )}
              {data.linkedin === "" || data.linkedin === undefined ? (
                <p className="hidden">nil</p>
              ) : (
                <a
                  href={data.linkedin}
                  className=" grid grid-cols-3 items-center justify-between py-1 align-middle"
                >
                  <p className="font-vcard col-span-2 overflow-hidden truncate text-sm text-[rgb(var(--vcard-font-primary-color))]">
                    {data.linkedin}
                  </p>
                  <LinkedinSVG
                    className="justify-self-end text-[rgb(var(--vcard-font-primary-color))]"
                    height="30px"
                    width="30px"
                  />
                </a>
              )}
            </div>
          </div>
          <BottomBar />
        </div>

        <ScreenRestriction />
      </div>
    );
  }

  return <DetailLoader />;
};
export default LeftExpand;
