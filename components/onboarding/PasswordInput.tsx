import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Eye, EyeOff } from "lucide-react";

export default function PasswordInput({
  label,
  placeholder,
  handleChange,
  value,
}: {
  label: string;
  placeholder: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full relative space-y-2 text-gray-400">
      <Label className="text-xs capitalize" htmlFor="password">
        {label}
      </Label>
      <Input
        value={value}
        onChange={handleChange}
        type={showPassword ? "text" : "password"}
        id="password"
        placeholder={placeholder}
        className="placeholder:text-xs normal-case h-10 placeholder:text-gray-400"
      />
      <div
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute  right-3 top-1/2 pt-1.5"
      >
        {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
      </div>
    </div>
  );
}
