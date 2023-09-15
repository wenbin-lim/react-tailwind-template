import { useEffect, useState } from "react";
import ReactPopup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const ClientWrapperForReactPopup = (props: any) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return props?.trigger ?? null;
  }

  return <ReactPopup {...props} />;
};

export default ClientWrapperForReactPopup;
