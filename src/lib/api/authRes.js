import { APICall } from ".";

// APICall.interceptors.response.use(
//     (response) => response,
//     (error) => {
//       const message = error?.response?.data?.message || "Something went wrong";
//       console.error("API Error:", message);
//       return Promise.reject(new Error(message));
//     }
//   );

export const ax_user_login = async (payload) => {
  try {
    const res = await APICall.post("/api/login", payload, {
      headers: { "content-type": "application/json" },
    });

    console.log("res - " + JSON.stringify(res.data));

    if (
      res.data.code === 200 ||
      res.data.code === 201 ||
      res.data.code === 409
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

export const ax_user_signup = async (payload) => {
  try {
    const res = await APICall.post("auth/signup", payload, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("res - " + JSON.stringify(res.data));

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
