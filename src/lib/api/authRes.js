import { APICall } from ".";

// APICall.interceptors.response.use(
//     (response) => response,
//     (error) => {
//       const message = error?.response?.data?.message || "Something went wrong";
//       console.error("API Error:", message);
//       return Promise.reject(new Error(message));
//     }
//   );

export const ax_user_signup = async (payload) => {
  try {
    const res = await APICall.post("/api/signup", payload, {
      headers: { "Content-Type": "application/json" },
    });

    // console.log("res - " + JSON.stringify(res.data));

    if (
      res.data.code === 200 ||
      res.data.code === 201 ||
      res.data.code === 400
    ) {
      return res.data;
    } else if (!res.data.success) {
      return res.data;
    }
    return null;
  } catch (e) {
    console.log("e.response.data: ", e.response ? e.response.data : e.message);

    if (e.response?.data.code !== 200 || e.response.data.code !== 201)
      return e.response;
    else return null;
  }
};

export const ax_user_varify = async (payload) => {  
  try {
    const identifier = payload.identifier;

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
    const isPhone = /^\d{10}$/.test(identifier);
    
    // console.log("payload", payload);

    const endpoint = isEmail
      ? "/api/verify-email"
      : isPhone
      ? "/api/verify-phone"
      : null;

      // console.log("end- ", endpoint);
    if (!endpoint) {
      throw new Error("Invalid identifier");
    }
    const res = await APICall.post(endpoint, payload, {
      headers: { "Content-Type": "application/json" },
    });

    if (res.data.code === 200 || res.data.code === 201) {
      return res.data;
    } else if (!res.data.success) {
      return res.data;
    }
  } catch (error) {
    console.error("Error verifying user:", error);
    throw error;
  }
};

export const ax_user_login = async (payload) => {
  try {
    const res = await APICall.post("/api/login", payload, {
      headers: { "content-type": "application/json" },
    });

    // console.log('payload - ' + JSON.stringify(payload));

    // console.log("res - " + JSON.stringify(res.data));

    if (res.data.code === 200 || res.data.code === 201) {
      return res.data;
    } else if (!res.data.success) {
      return res.data;
    }
    return null;
    // if (res.data.success) {
    //   return res.data;  // Return data if login is successful
    // } else {
    //   return res.data;  // Return error message if success is false
    // }
  } catch (e) {
    console.log("e.response.data: ", e.response ? e.response.data : e.message);

    if (e.response?.data.code !== 200 || e.response.data.code !== 201)
      return e.response;
    else return null;
  }
};

export const ax_user_logout = async () => {
  try {
    const res = await APICall.post(
      "/api/logout",
      {},
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    // console.log("res - " + JSON.stringify(res.data));

    if (res.data.code === 200 || res.data.code === 201) {
      return res.data;
    } else if (!res.data.success) {
      return res.data;
    }
    return null;
  } catch (e) {
    console.log("e.response.data: ", e.response ? e.response.data : e.message);

    if (e.response?.data.code !== 200 || e.response.data.code !== 201)
      return e.response;
    else return null;
  }
};

export const ax_user_forgotPassword = async (payload) => {
  try {
    const res = await APICall.post("/api/forgot-password", payload, {
      headers: { "Content-Type": "application/json" },
    });

    // console.log("res - " + JSON.stringify(res.data));

    if (res.data.code === 200 || res.data.code === 201) {
      return res.data;
    } else if (!res.data.success) {
      return res.data;
    }
    return null;
  } catch (e) {
    console.log("e.response.data: ", e.response ? e.response.data : e.message);

    if (e.response?.data.code !== 200 || e.response.data.code !== 201)
      return e.response;
    else return null;
  }
};
