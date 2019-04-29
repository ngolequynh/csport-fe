import axios from "axios";

export const AxiosInstance = axios.create({
    // `baseURL` will be prepended to `url` unless `url` is absolute.
    // It can be convenient to set `baseURL` for an instance of axios to pass relative URLs
    // to methods of that instance.
    baseURL: process.env.LOCAL_HOST_URL,

    // `headers` are custom headers to be sent
    headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") },

    // `withCredentials` indicates whether or not cross-site Access-Control requests
    // should be made using credentials
    withCredentials: true,
});

export default AxiosInstance;
