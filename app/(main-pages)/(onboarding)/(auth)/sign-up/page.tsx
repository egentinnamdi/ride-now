"use client";
import SignUpForm from "@/components/onboarding/SignUpForm";
import TypeOfUser from "@/components/onboarding/TypeOfUser";
import VerifyAccount from "@/components/onboarding/VerifyAccount";
import React, { useState } from "react";

export default function SignUp() {
  const [step, setStep] = useState(1);

  function updateStep(step: number) {
    setStep(step);
  }
  return (
    <>
      {step === 1 && <TypeOfUser updateStep={updateStep} />}
      {step === 2 && <SignUpForm action="sign-up" updateStep={updateStep} />}
      {step === 3 && <VerifyAccount updateStep={updateStep} />}
    </>
  );
}
