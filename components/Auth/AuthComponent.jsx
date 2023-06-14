import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { PasswordField } from "../Login/PasswordField";
import {
  validateEmailOrReturnError,
  validatePasswordOrReturnError,
} from "../../utils/auth";
import { useAuth } from "../../hooks/useAuth";

export default function AuthComponent({ isSignup = true }) {
  const router = useRouter();
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [orgError, setOrgError] = useState("");
  const { signup, login, isLoading } = useAuth();
  const [userFormValues, setUserFormValues] = useState({
    email: "",
    password: "",
    password_confirm: "",
    organization: "",
  });

  const { email, password, password_confirm, organization } = userFormValues;

  useEffect(() => {
    if (emailError) setEmailError("");
  }, [email]);

  useEffect(() => {
    if (passwordError) setPasswordError("");
  }, [password]);

  const handleChange = ({ target: { value, id } }) => {
    setUserFormValues({ ...userFormValues, [id]: value });
  };

  const validateEmail = (val) => {
    const validEmail = validateEmailOrReturnError(val);

    if (validEmail) {
      setEmailError(validEmail);
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (val) => {
    const validPassword = validatePasswordOrReturnError(val, false);
    if (typeof validPassword === "string") {
      setPasswordError(validPassword);
    } else {
      setPasswordError("");
    }
  };

  const isValid = () => {
    validateEmail(email);
    validatePassword(password);
    return passwordError === "" && emailError === "";
  };

  const handleWebSignup = async () => {
    if (isValid()) {
      await signup(
        userFormValues.email,
        userFormValues.password,
        userFormValues.password_confirm,
        userFormValues.organization
      );
    }

    userFormValues.email ? setPasswordError("") : setEmailError("Required");
    userFormValues.password
      ? setPasswordError("")
      : setPasswordError("Required");
  };

  const handleWebLogin = async () => {
    if (isValid()) {
      await login(userFormValues.email, userFormValues.password);
    }

    userFormValues.email ? setPasswordError("") : setEmailError("Required");
    userFormValues.password
      ? setPasswordError("")
      : setPasswordError("Required");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignup) {
      handleWebSignup();
    } else {
      handleWebLogin();
    }
  };

  return (
    <div>
      <div className="space-y-2">
        <div>
          <div className="space-y-2">
            <div className="input-label-text">E-mail</div>
            <input
              id="email"
              type="email"
              value={email}
              className="input-box"
              onChange={handleChange}
              onBlur={(e) => validateEmail(e.target.value)}
            />
          </div>

          <div className="text-sm text-primary-red h-5 mt-1">{emailError}</div>
        </div>
        <div>
          <div className="space-y-2">
            <div className="text-left input-label-text">Password</div>
            <PasswordField
              id="password"
              value={password}
              onChange={handleChange}
              // onBlur={(e) => validatePassword(e.target.value)}
            />
          </div>
          <div className="text-sm text-primary-red h-4 mt-1">
            {passwordError}
          </div>
        </div>
        {isSignup && (
          <div>
            <div>
              <div className="space-y-2">
                <div className="text-left input-label-text">
                  Confirm Password
                </div>
                <PasswordField
                  id="password_confirm"
                  value={password_confirm}
                  onChange={handleChange}
                />
              </div>
              <div className="text-sm text-primary-red h-4 mt-1">
                {passwordError}
              </div>
            </div>
            <div>
              <div className="space-y-2">
                <div className="input-label-text">Organization</div>
                <input
                  id="organization"
                  type="text"
                  value={organization}
                  className="input-box"
                  onChange={handleChange}
                />
              </div>

              <div className="text-sm text-primary-red h-5 mt-1">
                {orgError}
              </div>
            </div>
          </div>
        )}
      </div>
      <button
        className="flex items-center justify-center mt-4 solid py-3 bg-price-green w-full mx-auto rounded-xl font-semibold text-sm leading-3.5 text-black"
        onClick={handleSubmit}
      >
        <div>{isSignup ? "Sign Up" : "Log In"}</div>
        {isLoading && (
          <svg
            className="animate-spin  h-5 w-5 text-white ml-4 absolute"
            style={{ left: "54%" }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx={12}
              cy={12}
              r={10}
              stroke="currentColor"
              strokeWidth={4}
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
