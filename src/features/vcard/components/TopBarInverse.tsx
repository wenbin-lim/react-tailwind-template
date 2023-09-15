/*
  https://tailwindui.com/components/application-ui/data-display/description-lists
*/
import { useParams } from "react-router-dom";
import { useGetOneVcard } from "../data/hooks";
import { RWebShare } from "react-web-share";
import { useState } from "react";
import Popup from "./ClientWrapperForReactPopup";
import QRCode from "qrcode";

import { ReactComponent as ShareLinkSVG } from "../icons/link.svg";
import { ReactComponent as QrSVG } from "../icons/qr.svg";
import { getPbImageUrl } from "@src/utils/pocketbase";

const TopBar = () => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const { id } = useParams();

  // fetch data
  const { data } = useGetOneVcard({
    id: id || "",
    enabled: !!id,
  });

  const [qr, setQr] = useState<string>("");
  const getVcardUrl = () => `${BASE_URL}/v/${id}`;

  const generate = () => {
    if (!!id) {
      QRCode.toDataURL(getVcardUrl()).then(setQr);
    }
  };

  if (data) {
    return (
      <div className="flex h-20 w-full overflow-hidden p-5">
        {data.company && (
          <link
            rel="stylesheet"
            href={`${BASE_URL}/api/${data.company}/stylesheet.css`}
          />
        )}
        <div className="flex w-1/2 items-center justify-start">
          <img
            src={getPbImageUrl({
              collection: "vcard",
              recordId: data.id,
              fileName: data.logo,
            })}
            width={56}
            height={56}
            alt="Logo"
            className="h-14 w-auto"
          />
        </div>
        <div className="flex w-1/2 justify-end">
          <RWebShare
            data={{
              text: "Web Share for Vcard",
              url: getVcardUrl(),
              title: "Share this Vcard on your socials",
            }}
          >
            <a className="mr-1 rounded-full bg-[rgb(var(--vcard-font-secondary-color))]/20 p-1.5 pr-2">
              <ShareLinkSVG
                height="24px"
                width="24px"
                className="text-[rgb(var(--vcard-font-secondary-color))]"
              />
            </a>
          </RWebShare>
          <Popup
            aria-describedby="1"
            trigger={
              <a className="rounded-full bg-[rgb(var(--vcard-font-secondary-color))]/20 p-1.5">
                <QrSVG
                  height="27px"
                  width="27px"
                  className="text-[rgb(var(--vcard-font-secondary-color))]"
                />
              </a>
            }
            position="left top"
            onOpen={generate}
          >
            <div className="flex justify-center">
              {!!qr && (
                <img
                  src={qr}
                  width={160}
                  height={160}
                  alt="qr code"
                  className="h-40 w-40"
                />
              )}
            </div>
          </Popup>
        </div>
      </div>
    );
  }
};
export default TopBar;
