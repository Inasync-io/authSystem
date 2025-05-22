"use client";

import { FormEvent, useState, useEffect, useRef } from "react";
import FormInput from "../../Components/FormInput";
import useAuthForm from "../../hooks/useAuthForm";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { ax_user_varify } from "../../lib/api/authRes";
import { log } from "console";
// import Link from "next/link";
const CODE_LENGTH = 6;
const VerifyPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const identifier = searchParams.get("identifier") || "";
  const [codeDigits, setCodeDigits] = useState(Array(CODE_LENGTH).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const {
    formData,
    setFormData,
    errors,
    setErrors,
    // handleChange,
    handleChecked,
    validateForm,
    initialFormData,
    apiErr,
    setApiErr,
    isLoading,
    setIsLoading,
  } = useAuthForm(["code"]);

  console.log("formData", formData);
  

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const newDigits = [...codeDigits];
    newDigits[index] = value;
    setCodeDigits(newDigits);

    if (value && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !codeDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  useEffect(() => {
    const code = codeDigits.join("");
    setFormData((prev) => ({ ...prev, code, identifier }));
    console.log("code - ", code);
  }, [codeDigits]);

  const handleSubmit = async (e: FormEvent) => {
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
      const res = await ax_user_varify(formData);

      if (res?.success) {
        toast.success(res.message || "Verification successful!");
        setFormData(initialFormData);

        router.push("/login");
      }
    } catch (e) {
      toast.error("Verification failed. Please try again.");
    }
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
        {/* <FormInput
          type="text"
          name="code"
          value={formData.code}
          onChange={(e) => handleChange("code", e)}
          placeholder="Enter verification code"
        /> */}

        <div className="w-full flex justify-between">
          {codeDigits.map((digit, index) => (
            <FormInput
              key={index}
              type="text"
              name={`code-${index}`}
              value={digit}
              maxLength={1}
              placeholder=""
              inputRef={(el) => {
                inputRefs.current[index] = el;
              }}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              // style={{ textAlign: "center" }}
              error={errors.code}
              variant="code"
            />
          ))}
        </div>
        {errors.code && <p className="text-sm text-red-500">{errors.code}</p>}
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
