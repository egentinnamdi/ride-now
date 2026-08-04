"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@/hooks/useMutation";
import { LoginRequestDto, SigninResponseDto } from "@/types/auth";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [signIn, setSignIn] = useState({ email: "", password: "" });
  const { mutate: signInMutate } = useMutation<
    SigninResponseDto,
    LoginRequestDto
  >("/auth/signin", {
    redirectTo: "/",
    successMsg: "Login successful...",
    storeInCache: true,
  });

  function handleSignIn() {
    console.log(signIn);
    const device_info = {
      platform: "android",
      version: "11",
      device_id: "device_123",
    };

    // Submit form
    signInMutate({ ...signIn, device_info });

    // Reset Form
    setSignIn({ email: "", password: "" });
  }

  return (
    <div className="relative flex flex-col justify-center lg:items-center  lg:h-screen py-10 px-5 z-20 h-full">
      <div className="flex flex-col justify-center lg:w-6/12 gap-2 h-1/5">
        <h2 className="text-3xl font-medium">Hey there!</h2>
        <span className="font-normal">Sign in as an Administrator</span>
      </div>
      <div className="h-4/5 lg:w-6/12 flex-1 ">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSignIn();
          }}
          className="bg-gray-50 flex lg:h-3/4  flex-col justify-around items-center rounded-3xl p-4 lg:p-10 h-3/6"
        >
          <div className="space-y-2 w-full text-gray-400">
            <Label htmlFor="email">Email</Label>
            <Input
              value={signIn.email}
              onChange={(e) =>
                setSignIn((prev) => ({ ...prev, email: e.target.value }))
              }
              type="email"
              id="email"
              placeholder="Enter your email"
              className="placeholder:text-sm h-10 lg:h-12 lg:text-sm! text-black placeholder:text-gray-400"
            />
          </div>
          <div className="w-full relative space-y-2 text-gray-400">
            <Label htmlFor="password">Password</Label>
            <Input
              value={signIn.password}
              onChange={(e) =>
                setSignIn((prev) => ({ ...prev, password: e.target.value }))
              }
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              className="placeholder:text-sm h-10 lg:h-12 lg:text-sm! text-black placeholder:text-gray-400"
            />
            <div
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute  right-3 top-1/2 pt-1.5"
            >
              {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </div>
          </div>
          <Button type="submit" className="!p-5 lg:w-full  lg:h-12">
            <ArrowRight />
            <span>Sign in</span>
          </Button>
        </form>
        {/* <div className="mt-7 space-y-5 h-1/5">
          <div className="flex text-xs text-primary-dark gap-1 font-medium  flex-col items-center justify-between">
            <Link href={"/welcome/1"}>Don&apos;t have an account? Sign up</Link>
            <span>or sign up with:</span>
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
        </div> */}
      </div>
    </div>
  );
}
