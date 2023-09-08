import PocketBase from "pocketbase";

const backend = new PocketBase(import.meta.env.VITE_API_URL).autoCancellation(
  false,
);

export default backend;
