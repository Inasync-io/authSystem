"use client";

import { FormEvent } from "react";
import FormInput from "../../Components/FormInput";
import useAuthForm from "../../hooks/useAuthForm";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ax_user_signup } from "../../lib/api/authRes";

const SignupPage = () => {
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
  } = useAuthForm([ "name", "identifier", "password", "confirmPassword"]);

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
      const res = await ax_user_signup(formData);
      console.log("Signup response:", res);

      if (res?.success) {
      toast.success(res.message || "Signup successful!");
      setFormData(initialFormData);

      router.push("/verify");
    } else if (res.data?.code === 409) {   
      toast.error(res.data?.message || "Email already exists");
      setApiErr(res.data?.description || "Email already exists");      
    } else {
      toast.error(res.data?.message || "Signup failed");
      setApiErr(res.data?.description || "Unknown error occurred");
    }
    } catch (error: any) {
      console.error("Signup error:", error);
      toast.error("Something went wrong.");
      setApiErr("Something went wrong. Please try again.");
    }

    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        action=""
        className="w-full max-w-xs space-y-4"
      >
        <h1 className="text-2xl font-bold text-center text-gray-800 font-poppins">
          SIGNUP
        </h1>
         <FormInput
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => handleChange("name", e)}
          error={errors.name}
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name}</p>
        )}

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
          placeholder="password"
          value={formData.password}
          onChange={(e) => handleChange("password", e)}
          error={errors.password}
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password}</p>
        )}

        <FormInput
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={(e) => handleChange("confirmPassword", e)}
          error={errors.confirmPassword}
        />
        {errors.confirmPassword && (
          <p className="text-sm text-red-500">{errors.confirmPassword}</p>
        )}

        <p className="text-xs text-gray-600">
          By continuing you agree to our{" "}
          <Link href="/" className="text-indigo-600 hover:underline">
            Terms and Privacy Policy
          </Link>
        </p>

        <div className="text-center text-red-500 text-sm">{apiErr}</div>
        <button className="w-full py-2 font-semibold text-white bg-indigo-400">
          {isLoading ? "Sign in..." : "SignUp"}
        </button>

        <div className="flex flex-row gap-1 justify-center items-center text-gray-600">
          Don’t have an account yet?
          <Link href="/login" className="text-indigo-600 hover:underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
