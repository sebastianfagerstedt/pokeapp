import axios from "axios";
import store from "./store";
import { setToken, clearToken } from "./slices/authSlice";
import jwtDecode from "jwt-decode";

const API_URL = "https://e7bf-83-254-235-176.ngrok.io";

//Axios instance
export const instance = axios.create({
  baseURL: `${API_URL}`,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const logoutInstance = axios.create({
  baseURL: `${API_URL}`,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const registerAPI = (data) => {
  return instance.post("/api/register/", data);
};

export const loginAPI = (data) => {
  return instance.post("/api/login/", data);
};

export const refreshTokenAPI = () => {
  return instance.post("/api/token/refresh/", {
    refresh: store.getState().auth.refreshToken,
  });
};

export const logoutAPI = () => {
  return logoutInstance.post("/api/logout/", {
    refreshToken: store.getState().auth.refreshToken,
  });
};

export const pokedexAPI = () => {
  return instance.get("/api/pokes/");
};

//Set a maximum number of consecutive refreshes
let refreshRetries = 0;
const maxRefreshRetries = 2;

// Default request interceptor
instance.interceptors.request.use(
  (config) => {
    // Reset refreshRetries to 0 each request
    refreshRetries = 0;

    // Fetch the access token from redux store
    const accessToken = store.getState().auth.accessToken;

    // If an access token is available, add it to the request headers
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Defualt response interceptor
instance.interceptors.response.use(
  (response) => {
    // Successful response (status code 2xx)
    // console.log("Success with status: ", response.status);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response) {
      // The request was made and the server responded with an error
      const { status, data, headers } = error.response;

      // Check if infinite loop appears
      if (refreshRetries !== 0) console.log("Retries: ", refreshRetries);

      // Unauthorized
      if (status === 401 && refreshRetries < maxRefreshRetries) {
        // originalRequest._retry = true;
        refreshRetries++;
        try {
          // Handle token expiration, reauthentication, or redirection to login page
          const refreshToken = store.getState().auth.refreshToken;
          const refreshTokenData = jwtDecode(refreshToken);
          const currentTime = Date.now() / 1000; // Current time in seconds

          // Check if refreshToken has expired
          if (refreshTokenData.exp > currentTime) {
            const result = await refreshTokenAPI();
            if (result) {
              store.dispatch(
                setToken({
                  accessToken: result.data.access,
                  refreshToken: result.data.refresh,
                  isAuthenticated: true,
                })
              );
              return instance(originalRequest);
            }
          } else {
            store.dispatch(clearToken());
          }
        } catch (error) {
          console.error("Error", error);
        }
        // Server error
      } else if (status === 503 || status === 404) {
        store.dispatch(clearToken());
        console.error("Server error");
      } else {
        // const logoutResult = await logoutAPI();
        store.dispatch(clearToken());
        console.error("Error with status: ", status);
      }
    } else if (error.request) {
      // The request was made, but no response was received (e.g., network error)
      console.error("Network error:", error.request);
    } else {
      // Something else happened while setting up the request
      console.error("Error:", error.message);
    }

    // Forward the error to the next `catch` block or promise rejection
    return Promise.reject(error);
  }
);
// Login interceptor

// Logout interceptors
logoutInstance.interceptors.request.use(
  (config) => {
    // Fetch the access token from redux store
    const accessToken = store.getState().auth.accessToken;

    // If an access token is available, add it to the request headers
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
logoutInstance.interceptors.response.use(
  (response) => {
    // Successful response (status code 2xx)
    console.log("Successful Logout");

    return response;
  },
  (error) => {
    // Forward the error to the next `catch` block or promise rejection
    const { status, data, headers } = error.response;
    console.error("Logout error: ", error);
    return Promise.reject(error);
  }
);
