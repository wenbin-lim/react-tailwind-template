import PocketBase from "pocketbase";

const backend = new PocketBase(import.meta.env.VITE_API_URL);

export default backend;
