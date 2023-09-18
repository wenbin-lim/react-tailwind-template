/*
  https://tailwindui.com/components/application-ui/data-display/description-lists
*/
import { useParams } from "react-router-dom";
import { useGetOneVcard } from "../data/hooks";

import LeftBrief from "./LeftBrief";
import Centered from "./Centered";
import LeftExpand from "./LeftExpand";

const Show = () => {
  const { id } = useParams();

  // fetch data
  const { data } = useGetOneVcard({
    id: id || "",
    enabled: !!id,
  });

  if (data && data.card_template == "1") {
    return <Centered />;
  } else if (data && data.card_template == "2") {
    return <LeftExpand />;
  } else if (data && data.card_template == "3") {
    return <LeftBrief />;
  }
};

export default Show;
