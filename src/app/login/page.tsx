"use client";

import { FormEvent, useEffect, useState } from "react";
import useAuthForm from "../../hooks/useAuthForm";
import FormInput from "../../Components/FormInput";
import { ax_user_login } from "../../lib/api/authRes";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

const LoginPage = () => {
  const router = useRouter();
  // const [apiErr, setApiErr] = useState<string>("");
  // const [isLoading, setIsLoading] = useState(false);

  const {
    formData,
    setFormData,
    errors,
    setErrors,
    handleChange,
    handleChecked,
    validateForm,
    initialFormData,
    apiErr,
    setApiErr,
    isLoading,
    setIsLoading,
  } = useAuthForm(["identifier", "password"]);

  // console.log("formData", formData);
  
  useEffect(() => {
    const identifier = localStorage.getItem("identifier");
    const password = localStorage.getItem("password");

    if (identifier && password) {
      setFormData((prev) => ({
        ...prev,
        identifier,
        password,
        rememberMe: true,
      }));
    }
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setApiErr("");

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    setErrors({});

    try {
      const res = await ax_user_login(formData);

      console.log("Login Response:", res);

      if (res?.success) {
        if (formData.rememberMe) {
          localStorage.setItem("identifier", formData.identifier);
          localStorage.setItem("password", formData.password);
        } else {
          localStorage.removeItem("identifier");
          localStorage.removeItem("password");
        }
        toast.success("Login successful.");
        localStorage.setItem("auth_token", res.user._id);
        setFormData(initialFormData);
        // setRememberMe(false);

        console.log("cookies", document.cookie);
        router.push("/");
      } else {
        toast.error(res?.message || "Login Failed");
        // setApiErr(res?.message || "Login failed");
        setApiErr(res?.data.description || "Unknown error occurred");
      }
    } catch (error: any) {
      // Catch unexpected exceptions (like 500 errors or network issues)
      console.error("Unexpected login error:", error);
      setApiErr("Something went wrong. Please try again.");
      toast.error("Something went wrong.");
    }

    setIsLoading(false);
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-4">
        <h1 className="text-2xl font-bold text-center text-gray-800 font-poppins">
          LOGIN
        </h1>
        <FormInput
          type="text"
          name="identifier"
          placeholder="Email or phone"
          value={formData.identifier}
          onChange={(e) => handleChange("identifier", e)}
          error={errors.identifier}
        />
        {errors.identifier && (
          <p className="text-sm text-red-500">{errors.identifier}</p>
        )}

        <FormInput
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => handleChange("password", e)}
          error={errors.password}
        />

        {errors.password && (
          <p className="text-sm text-red-500">{errors.password}</p>
        )}

        <div className="flex items-center justify-between text-sm text-gray-600">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={(e) => handleChange("rememberMe", e)}
              className="h-4 w-4 mr-2 border-gray-300 focus:ring-indigo-400"
            />
            Remember me
          </label>
          <Link href="/forgot" className="text-indigo-600 hover:underline">
            Forgot?
          </Link>
        </div>

        <div className="text-center text-red-500 text-sm">{apiErr}</div>
        <button className="w-full py-2 font-semibold text-white bg-indigo-400">
          {/* LOGIN */}
          {isLoading ? "Logging in..." : "LOGIN"}
        </button>
        <div className="flex flex-row gap-1 justify-center items-center text-gray-600">
          Don’t have an account yet?
          <Link href="/signup" className="text-indigo-600 hover:underline">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;

// "use client";

// import {
//   ChangeEvent,
//   FormEvent,
//   useCallback,
//   useEffect,
//   useState,
// } from "react";
// import FormInput from "../../Components/FormInput";
// import { ax_user_login } from "../../lib/api/authRes";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import toast from "react-hot-toast";

// export interface LoginForm {
//   identifier: string;
//   password: string;
// }

// export type LoginErrors = Partial<Record<keyof LoginForm, string>>;

// const LoginPage = () => {
//   const initialFormData: LoginForm = {
//     identifier: "", // email or phone
//     password: "",
//   };

//   const router = useRouter();
//   const [formData, setFormData] = useState<LoginForm>({ ...initialFormData });
//   const [errors, setErrors] = useState<LoginErrors>({});
//   const [apiErr, setApiErr] = useState<string>("");

//   const [isLoading, setIsLoading] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);

//   useEffect(() => {
//     const storedIdentifier = localStorage.getItem("identifier");
//     const storedPassword = localStorage.getItem("password");

//     if (storedIdentifier && storedPassword) {
//       setFormData({
//         identifier: storedIdentifier,
//         password: storedPassword,
//       });
//       setRememberMe(true);
//     }
//   }, []);

//   const handleChange = useCallback(
//     (fieldName: keyof LoginForm, event: ChangeEvent<HTMLInputElement>) => {
//       const { name, value } = event.target;

//       setFormData((prev) => ({ ...prev, [name]: value }));

//       const error = validateField(name as keyof LoginForm, value);
//       setErrors((prev) => ({ ...prev, [name]: error || "" }));

//       if (name === "identifier" || name === "password") {
//         if (rememberMe) {
//           localStorage.setItem("identifier", formData.identifier);
//           localStorage.setItem("password", formData.password);
//         }
//       }
//     },
//     [formData, rememberMe]
//   );

//   const handleChecked = (e: ChangeEvent<HTMLInputElement>) => {
//     setRememberMe(e.target.checked);
//   };

//   const validateField = (
//     name: keyof LoginForm,
//     value: string
//   ): string | null => {
//     const validators: Record<
//       keyof LoginForm,
//       (value: string) => string | null
//     > = {
//       identifier: (value) =>
//         !value.trim()
//           ? "Email or phone is required"
//           : /^[\w.-]+@[\w-]+\.[\w-]{2,4}$/.test(value) || /^\d{10}$/.test(value)
//           ? null
//           : "Enter a valid email or 10-digit phone number",

//       password: (value) =>
//         !value
//           ? "Password is required"
//           : value.length < 6
//           ? "Password must be at least 6 characters"
//           : value.length > 12
//           ? "Password must not exceed 12 characters"
//           : null,
//     };

//     return validators[name](value);
//   };

//   const validateForm = (): LoginErrors => {
//     const newErrors: LoginErrors = {};
//     for (const field in formData) {
//       const key = field as keyof LoginForm;
//       const error = validateField(key, formData[key]);
//       if (error) newErrors[key] = error;
//     }
//     return newErrors;
//   };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setApiErr("");

//     const validationErrors = validateForm();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       setIsLoading(false);
//       return;
//     }

//     setErrors({});

//     try {
//       const res = await ax_user_login(formData);

//       console.log("Login Response:", res);

//       if (res?.success) {
//         if (rememberMe) {
//           localStorage.setItem("identifier", formData.identifier);
//           localStorage.setItem("password", formData.password);
//         } else {
//           localStorage.removeItem("identifier");
//           localStorage.removeItem("password");
//         }
//         toast.success("Login successful.");
//         localStorage.setItem("auth_token", res.user._id);
//         setFormData(initialFormData);
//         setRememberMe(false);

//         router.push("/");
//       } else {
//         toast.error(res?.message || "Login Failed");
//         // setApiErr(res?.message || "Login failed");
//         setApiErr(res?.data.description || "Unknown error occurred");
//       }
//     } catch (error: any) {
//       // Catch unexpected exceptions (like 500 errors or network issues)
//       console.error("Unexpected login error:", error);
//       setApiErr("Something went wrong. Please try again.");
//       toast.error("Something went wrong.");
//     }

//     setIsLoading(false);
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-white">
//       <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-4">
//         <h1 className="text-2xl font-bold text-center text-gray-800 font-poppins">
//           LOGIN
//         </h1>
//         <FormInput
//           type="text"
//           name="identifier"
//           placeholder="Email or phone"
//           value={formData.identifier}
//           onChange={(e) => handleChange("identifier", e)}
//           error={errors.identifier}
//         />
//         {errors.identifier && (
//           <p className="text-sm text-red-500">{errors.identifier}</p>
//         )}

//         <FormInput
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={(e) => handleChange("password", e)}
//           error={errors.password}
//         />

//         {errors.password && (
//           <p className="text-sm text-red-500">{errors.password}</p>
//         )}

//         <div className="flex items-center justify-between text-sm text-gray-600">
//           <label className="flex items-center">
//             <input
//               type="checkbox"
//               checked={rememberMe}
//               onChange={handleChecked}
//               className="h-4 w-4 mr-2 border-gray-300 focus:ring-indigo-400"
//             />
//             Remember me
//           </label>
//           <Link href="/forgot" className="text-indigo-600 hover:underline">
//             Forgot?
//           </Link>
//         </div>

//         <div className="text-center text-red-500 text-sm">{apiErr}</div>
//         <button className="w-full py-2 font-semibold text-white bg-indigo-400">
//           {/* LOGIN */}
//           {isLoading ? "Logging in..." : "LOGIN"}
//         </button>
//         <div className="flex flex-row gap-1 justify-center items-center text-gray-600">
//           Don’t have an account yet?
//           <Link href="/signup" className="text-indigo-600 hover:underline">
//             Sign up
//           </Link>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default LoginPage;

// // export default () => {
// //   return (
// //     <div className="text-center mt-10">
// //       <h1 className="text-3xl font-bold font-poppins">LOGIN</h1>
// //      </div>
// //   )
// // }
