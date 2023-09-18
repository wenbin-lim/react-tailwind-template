/*
  https://tailwindui.com/components/application-ui/data-display/description-lists
*/
import { useParams } from "react-router-dom";
import { useGetOneVcard } from "../data/hooks";
import { useEffect, useState } from "react";
import QRCode from "qrcode";

const ScreenRestriction = () => {
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

  useEffect(() => {
    generate();
  }, [id]);

  if (data) {
    return (
      <div className="absolute inset-0 z-50 flex flex hidden h-full items-center justify-center bg-white p-32 text-center sm:block">
        <p>
          Virtual Cards are best viewed on mobile devices and vertical screens.
        </p>
        <p>Please scan the following QR code on your mobile device:</p>
        {!!qr && (
          <img
            src={qr}
            width={160}
            height={160}
            alt="qr code"
            className="m-auto h-40 w-40"
          />
        )}
        <p>
          Or if you are already on your mobile device, please turn it to
          vertical
        </p>
      </div>
    );
  }
};
export default ScreenRestriction;
