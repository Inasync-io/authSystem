"use client";

import { FormEvent } from "react";
import FormInput from "../../Components/FormInput";
import useAuthForm from "../../hooks/useAuthForm";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
// import Link from "next/link";

const VerifyPage = () => {
  const router = useRouter();

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
  } = useAuthForm(["code"]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-4">
        <h1 className="text-2xl font-bold text-center text-gray-800 font-poppins">
          Email or Phone Verify
        </h1>
        <p className="text-sm text-center text-gray-500">
          Enter the verification code sent to your email
        </p>
        <FormInput
          type="text"
          name="code"
          value={formData.code}
          onChange={(e) => handleChange("code", e)}
          placeholder="Enter verification code"
        />
        <div className="text-center text-red-500 text-sm">{apiErr}</div>
        <button className="w-full py-2 font-semibold text-white bg-indigo-400">
          {isLoading ? "verifying..." : "verify"}
        </button>
      </form>
    </div>
  );
};

export default VerifyPage;
//         {errors.confirmPassword && (
//           <p className="text-sm text-red-500">{errors.confirmPassword}</p>
//         )}
