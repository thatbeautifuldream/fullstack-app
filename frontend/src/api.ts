import { DefaultApi, Configuration } from "./generated-client";

const api = new DefaultApi(
  new Configuration({
    basePath: "http://localhost:3000",
  })
);

export default api;
