"use client";

import { userOTPSchema, userSignInUpSchema } from "@/lib/validation/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "./ui/button";
import { RotateCcw } from "lucide-react";
import { useToast } from "./ui/use-toast";

interface OTPFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof userOTPSchema>;

export default function OTPForm({ className, ...props }: OTPFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userSignInUpSchema),
  });
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [OTP, setOTP] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { toast } = useToast();
  useEffect(() => {
    setPhoneNumber(localStorage.getItem("phoneNumber") as string);
  }, []);
  async function submitOTP(otp: string, phone: string) {
    localStorage.setItem("OTP", otp);
    const res = await fetch(
      "https://onebots.onrender.com/v1/auth/validate-otp",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone: phone, otp: otp }),
      }
    );

    const data: {
      phone: string;
      status: "SUCCESS" | "INVALID_PHONE" | "INVALID_OTP" | "PHONE_NOT_FOUND";
    } = await res.json();
    setIsLoading(false);
    switch (data.status) {
      case "SUCCESS":
        router.push("/create-pin");
        break;
      case "INVALID_OTP":
        toast({
          title: "Sai mã OTP",
          description: "Mã OTP của bạn đã nhập sai. Hãy nhập lại",
          variant: "destructive",
        });
      default:
        break;
    }
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOTP(event.target.value);
    if (OTP.length === 4) {
      setIsLoading(true);
      submitOTP(OTP, phoneNumber);
    }
  };
  return (
    <form className="w-full flex flex-col gap-4">
      <div className="w-full flex gap-2 flex-col h-[150px]">
        <h2 className="font-bold text-3xl">Xác thực mã OTP</h2>
        <span className="font-semibold text-gray-500">
          Unicorn F&B đã gửi tin nhắn chứa mã OTP tới số điện thoại{" "}
          <p className="inline text-black">{phoneNumber}</p> Nhờ bạn kiểm tra
          tin nhắn và nhập mã OTP vào ô bên dưới:
        </span>
      </div>
      <input
        disabled={isLoading}
        onChange={handleChange}
        type="text"
        placeholder="Nhập mã OTP gồm 5 số"
        className="py-3 pl-4 w-full border border-black rounded-2xl placeholder:text-sm"
      ></input>
      <div className="flex flex-col items-center">
        <Button
          variant={"ghost"}
          className="font-bold text-lg hover:bg-white text-gray-500"
        >
          Gửi lại mã OTP
        </Button>
        <span className="text-green-400">(còn 30s)</span>
      </div>
    </form>
  );
}
