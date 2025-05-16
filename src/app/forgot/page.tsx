"use client";

import { FormEvent } from "react";
import useAuthForm from "../../hooks/useAuthForm";
import FormInput from "../../Components/FormInput";
import Link from "next/link";
import toast from "react-hot-toast";
import { ax_user_forgotPassword } from "../../lib/api/authRes";

const forgotPage = () => {
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
  } = useAuthForm(['identifier']);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setApiErr("");

    const validationErrors = validateForm();

    console.log("Validation Errors:", validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    setErrors({});

    try {
        const res = await ax_user_forgotPassword(formData);
      
        console.log("Forgot Password Response:", res);
      
        if (res?.success) {
          toast.success("Reset instructions sent successfully.");
          setFormData(initialFormData);
        } else {
          toast.error(res?.message || "Request Failed");
          setApiErr(res?.data?.description || "Unknown error occurred");
        }
      } catch (error: any) {
        console.error("Unexpected forgot password error:", error);
        setApiErr("Something went wrong. Please try again.");
        toast.error("Something went wrong.");
      }      

    setIsLoading(false);
  };
  return (
    <div>
      <div className="flex justify-center items-center min-h-screen">
        <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-4">
          <h1 className="text-2xl font-bold text-center text-gray-800">
            Forgot something
          </h1>
          <p className="text-sm text-gray-400">
            Enter your email below to receive password reset instructions.
          </p>
          <p className="text-sm text-gray-400">
            Didn’t receive instructions?{" "}
            <Link href="//" className="text-indigo-600 hover:underline">
              Try different method.
            </Link>
          </p>
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

          <div className="text-center text-red-500 text-sm">{apiErr}</div>
          <button className="w-full py-2 font-semibold text-white bg-indigo-400">
            {/* Confirm */}
            {isLoading ? "Loading..." : "Confirm"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default forgotPage;
