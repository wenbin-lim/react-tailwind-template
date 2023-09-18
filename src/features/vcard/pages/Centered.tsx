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
import TopBar from "../components/TopBar";
import BottomBar from "../components/BottomBar";
import ScreenRestriction from "../components/ScreenRestriction";

const Centered = () => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const { id } = useParams();

  // fetch data
  const { data } = useGetOneVcard({
    id: id || "",
    enabled: !!id,
  });

  if (data) {
    return (
      <div className="flex h-full w-full flex-col overflow-hidden bg-[rgb(var(--vcard-primary-color))]">
        {data.company && (
          <link
            rel="stylesheet"
            href={`${BASE_URL}/api/${data.company}/stylesheet.css`}
          />
        )}
        {/* head */}
        <TopBar />
        {/* body */}
        <div className="w-full flex-1 p-5">
          <div className="flex justify-center pb-4">
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

          <h1 className="font-vcard justify-center text-center text-2xl font-semibold text-[rgb(var(--vcard-font-primary-color))]">
            {data.first_name} {data.last_name}
          </h1>
          <p className="font-vcard justify-center text-center text-sm text-[rgb(var(--vcard-font-primary-color))]">
            {data.job_title}
          </p>
          <p className="font-vcard line-clamp-6 justify-center pt-3 text-center text-sm text-[rgb(var(--vcard-font-primary-color))]">
            {data.description}
          </p>

          <div className="flex justify-center gap-2 pt-4 text-center">
            {data.website === "" || data.website === undefined ? (
              <p className="hidden">nil</p>
            ) : (
              <a
                href={data.website}
                className="xs:h-20 xs:w-20 xs:rounded-2xl flex items-center justify-center rounded-xl bg-[rgb(var(--vcard-font-secondary-color))]/20 p-3"
              >
                <ExternalLinkSVG
                  className="xxs:h-9 xxs:w-9 xs:h-10 xs:w-10 h-7 w-7 text-[rgb(var(--vcard-font-secondary-color))]"
                  height="40px"
                />
              </a>
            )}
            {data.phone === "" || data.phone === undefined ? (
              <p className="hidden">nil</p>
            ) : (
              <a
                href={`https://wa.me/${data.phone}`}
                className=" xs:h-20 xs:w-20 xs:rounded-2xl flex items-center justify-center rounded-xl bg-[rgb(var(--vcard-font-secondary-color))]/20 p-3"
              >
                <WhatsappSVG
                  className="xxs:h-9 xxs:w-9 xs:h-10 xs:w-10 h-7 w-7 text-[rgb(var(--vcard-font-secondary-color))]"
                  height="40px"
                />
              </a>
            )}
            {data.email === "" || data.email === undefined ? (
              <p className="hidden">nil</p>
            ) : (
              <a
                href={`mailto:${data.email}`}
                className="xs:h-20 xs:w-20 xs:rounded-2xl flex items-center justify-center rounded-xl bg-[rgb(var(--vcard-font-secondary-color))]/20 p-3"
              >
                <EnvelopeSVG
                  className="xxs:h-9 xxs:w-9 xs:h-10 xs:w-10 h-7 w-7 text-[rgb(var(--vcard-font-secondary-color))]"
                  height="40px"
                />
              </a>
            )}
            {data.linkedin === "" || data.linkedin === undefined ? (
              <p className="hidden">nil</p>
            ) : (
              <a
                href={data.linkedin}
                className="xs:h-20 xs:w-20 xs:rounded-2xl flex items-center justify-center rounded-xl bg-[rgb(var(--vcard-font-secondary-color))]/20 p-3"
              >
                <LinkedinSVG
                  className="xxs:h-9 xxs:w-9 xs:h-10 xs:w-10 h-7 w-7 text-[rgb(var(--vcard-font-secondary-color))]"
                  height="40px"
                />
              </a>
            )}
          </div>
        </div>
        {/* footer */}
        <BottomBar />
        {/* screen size restriction */}
        <ScreenRestriction />
      </div>
    );
  }

  return <DetailLoader />;
};
export default Centered;
