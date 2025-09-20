import React from "react";
import { Button } from "../ui/button";

export default function VerifyAccount({
  updateStep,
}: {
  updateStep: (step: number) => void;
}) {
  return (
    <div className="py-10 px-5">
      <div>
        <h2 className="text-2xl">Verify your account</h2>
        <p>
          Enter the 4-digit code sent to johndoe@gmail.com and verify your
          account
        </p>
      </div>
      <div>
        <Button>Verify account</Button>
      </div>
    </div>
  );
}
