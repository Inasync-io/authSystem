import { useCallback, useEffect, useState, ChangeEvent } from "react";

export interface LoginForm {
  name: string;
  identifier: string;
  password: string;
  confirmPassword: string;
}

export type LoginErrors = Partial<Record<keyof LoginForm, string>>;

const initialFormData: LoginForm = {
  name: "",
  identifier: "",
  password: "",
  confirmPassword: "",
};

// const useAuthForm = () => {
const useAuthForm = (
  requiredFields: (keyof LoginForm)[] = ["identifier", "password"]
) => {
  const [formData, setFormData] = useState<LoginForm>({ ...initialFormData });
  const [errors, setErrors] = useState<LoginErrors>({});
  const [rememberMe, setRememberMe] = useState(false);
  const [apiErr, setApiErr] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedIdentifier = localStorage.getItem("identifier");
    const storedPassword = localStorage.getItem("password");
    // const storedConfirmPassword = localStorage.getItem("password");

    if (storedIdentifier && storedPassword) {
       setFormData({
      name: "", 
      identifier: storedIdentifier,
      password: storedPassword,
      confirmPassword: storedPassword, 
    });
      setRememberMe(true);
    }
  }, []);

  const validateField = (
    name: keyof LoginForm,
    value: string
  ): string | null => {
    const validators: Record<
      keyof LoginForm,
      (value: string) => string | null
    > = {
      name: (value) =>
        !value.trim()
          ? "Name is required"
          : value.length < 3
          ? "Name must be at least 3 characters"
          : value.length > 20
          ? "Name must not exceed 20 characters"
          : null,
      identifier: (value) =>
        !value.trim()
          ? "Email or phone is required"
          : /^[\w.-]+@[\w-]+\.[\w-]{2,4}$/.test(value) || /^\d{10}$/.test(value)
          ? null
          : "Enter a valid email or 10-digit phone number",

      password: (value) =>
        !value
          ? "Password is required"
          : value.length < 6
          ? "Password must be at least 6 characters"
          : value.length > 12
          ? "Password must not exceed 12 characters"
          : null,
      confirmPassword: (value) =>
        !value
          ? "ConfirmPassword is required"
          : value !== formData.password
          ? "Passwords do not match"
          : null,
    };

    // return validators[name](value);
    return validators[name]?.(value) || null;
  };

  const handleChange = useCallback(
    (fieldName: keyof LoginForm, event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;

      setFormData((prev) => ({ ...prev, [name]: value }));

      // const error = validateField(name as keyof LoginForm, value);
      // setErrors((prev) => ({ ...prev, [name]: error || "" }));

      if (name === "identifier" || name === "password") {
        if (rememberMe) {
          localStorage.setItem("identifier", formData.identifier);
          localStorage.setItem("password", formData.password);
        }
      }
    },
    [formData, rememberMe]
  );

  //   const validateForm = (): LoginErrors => {
  //     const newErrors: LoginErrors = {};
  //     for (const field in formData) {
  //       const key = field as keyof LoginForm;
  //       const error = validateField(key, formData[key]);
  //       if (error) newErrors[key] = error;
  //     }
  //     return newErrors;
  //   };

  const validateForm = (): LoginErrors => {
    const newErrors: LoginErrors = {};
    requiredFields.forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });
    return newErrors;
  };

  const handleChecked = (e: ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked);
  };

  return {
    formData,
    setFormData,
    errors,
    setErrors,
    rememberMe,
    setRememberMe,
    handleChecked,
    handleChange,
    validateForm,
    initialFormData,
    apiErr,
    setApiErr,
    isLoading,
    setIsLoading,
  };
};

export default useAuthForm;
