"use client";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import PasswordInput from "./PasswordInput";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useMutation } from "@/hooks/useMutation";

export const signUpData = {
  user_type: "",
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  password: "",
  confirm_password: "",
};

export default function SignUpForm({
  updateStep,
  action,
}: {
  updateStep: (step: number) => void;
  action: string;
}) {
  const [formData, setFormData] = useState(signUpData);
  const [passwordError, setPasswordError] = useState(false);
  // const signUpMutate = useMutation({
  //   endpoint: endpoints.auth.signup,
  //   method: "POST",
  // });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(formData);
    // signUpMutate(formData);

    setFormData(signUpData);
  }

  return (
    <div className="relative flex flex-col justify-center gap-5  py-10 px-5 z-20 h-full">
      <div className="flex flex-col justify-center gap-2 h-1/5">
        <h2 className="text-3xl font-medium">Hey there!</h2>
        <span className="font-normal">
          {action === "sign-in"
            ? "Sign in to your account"
            : "Sign up to Ridenow"}
        </span>
      </div>
      <div className="h-4/5">
        <form
          onSubmit={handleSubmit}
          className=" flex  flex-col justify-around items-center rounded-3xl px-5 py-8 gap-5 bg-gray-50 min-h-3/6"
        >
          <div className="space-y-2 w-full text-gray-400">
            <Label className="text-xs" htmlFor="email">
              Role
            </Label>
            <Select
              value={formData.user_type}
              onValueChange={(val) =>
                setFormData((prev) => ({ ...prev, user_type: val }))
              }
            >
              <SelectTrigger className="w-full h-10 text-xs! text-gray-400">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Roles</SelectLabel>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="driver">Driver</SelectItem>
                  <SelectItem value="rider">Rider</SelectItem>
                  <SelectItem value="vendor">Vendor</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 w-full text-gray-400">
            <Label className="text-xs" htmlFor="email">
              First Name
            </Label>
            <Input
              value={formData.firstName}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, firstName: e.target.value }))
              }
              type="text"
              id="firstName"
              placeholder="Enter First Name"
              className="placeholder:text-xs h-10 placeholder:text-gray-400"
            />
          </div>
          <div className="space-y-2 w-full text-gray-400">
            <Label className="text-xs" htmlFor="email">
              Last Name
            </Label>
            <Input
              value={formData.lastName}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, lastName: e.target.value }))
              }
              type="text"
              id="lastName"
              placeholder="Enter Last Name"
              className="placeholder:text-xs h-10 placeholder:text-gray-400"
            />
          </div>
          <div className="space-y-2 w-full text-gray-400">
            <Label className="text-xs" htmlFor="email">
              Phone
            </Label>
            <Input
              value={formData.phone}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, phone: e.target.value }))
              }
              type="tel"
              id="phone"
              placeholder="Enter Phone Number"
              className="placeholder:text-xs h-10 placeholder:text-gray-400"
            />
          </div>
          <div className="space-y-2 w-full text-gray-400">
            <Label className="text-xs" htmlFor="email">
              Email
            </Label>
            <Input
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              type="email"
              id="email"
              placeholder="Enter your email"
              className="placeholder:text-xs h-10 placeholder:text-gray-400"
            />
          </div>
          <PasswordInput
            value={formData.password}
            handleChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
            label="password"
            placeholder="enter your password"
          />
          {action === "sign-up" && (
            <PasswordInput
              handleChange={(e) =>
                setFormData((prev) => {
                  const password = e.target.value;
                  if (prev.password !== e.target.value) {
                    setPasswordError(true);
                    return prev;
                  } else {
                    setPasswordError(false);
                    return { ...prev, password, confirm_password: password };
                  }
                })
              }
              label="confirm password"
              placeholder="confirm your password"
            />
          )}
          {passwordError && (
            <span className="text-red-500 text-xs w-full font-medium ">
              Confirm password must match the password.
            </span>
          )}
          <Button type="submit" className="!p-5">
            <ArrowRight />
            <span>{action === "sign-in" ? "Sign in" : "Sign up"}</span>{" "}
          </Button>
        </form>
        <div
          className={`${
            action === "sign-in" ? "mt-7" : "mt-3"
          } space-y-5 h-1/5`}
        >
          <div className="flex text-xs text-primary-dark gap-1 font-medium  flex-col items-center justify-between">
            {action === "sign-in" ? (
              <Link href={"/welcome/1"}>
                Don&apos;t have an account? Sign up
              </Link>
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
// onClick={() => updateStep(3)}
