import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import PasswordInput from "./PasswordInput";

export default function SignUpForm({
  updateStep,
  action,
}: {
  updateStep: (step: number) => void;
  action: string;
}) {
  // Using password input component instead of managing state here
  // const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative flex flex-col justify-center  py-10 px-5 z-20 h-full">
      <div className="flex flex-col justify-center gap-2 h-1/5">
        <h2 className="text-3xl font-medium">Hey there!</h2>
        <span className="font-normal">
          {action === "sign-in"
            ? "Sign in to your account"
            : "Sign up to Ridenow"}
        </span>
      </div>
      <div className="h-4/5">
        <div className=" flex  flex-col justify-around items-center rounded-3xl p-4 gap-4 bg-gray-50 min-h-3/6">
          <div className="space-y-2 w-full text-gray-400">
            <Label className="text-xs" htmlFor="email">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="placeholder:text-xs h-10 placeholder:text-gray-400"
            />
          </div>
          <PasswordInput label="password" placeholder="enter your password" />
          {action === "sign-up" && (
            <PasswordInput
              label="confirm password"
              placeholder="confirm your password"
            />
          )}
          <Button onClick={() => updateStep(3)} className="!p-5">
            <ArrowRight />
            <span>{action === "sign-in" ? "Sign in" : "Sign up"}</span>{" "}
          </Button>
        </div>
        <div
          className={`${
            action === "sign-in" ? "mt-7" : "mt-3"
          } space-y-5 h-1/5`}
        >
          <div className="flex text-xs text-primary-dark gap-1 font-medium  flex-col items-center justify-between">
            {action === "sign-in" ? (
              <Link href={"/welcome/1"}>Don&apos;t have an account? Sign up</Link>
            ) : (
              <span>or</span>
            )}
            <span>{action === "sign-in" ? "or" : ""} Sign up with:</span>
          </div>
          <div className="flex justify-center text-sm gap-3">
            <Button className="w-1/3 border border-primary" variant="outline">
              <div>
                <Image
                  src="/google.png"
                  alt="google"
                  height={200}
                  width={200}
                />
              </div>
              <span>Google</span>
            </Button>
            <Button className="bg-black w-1/3">
              <div className="size-4">
                <Image
                  src="/iphone.png"
                  alt="apple"
                  height={200}
                  width={200}
                  className="size-full"
                />
              </div>
              <span>Apple</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
