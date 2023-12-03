"use client";

import { userPinSchema } from "@/lib/validation/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

interface PinFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof userPinSchema>;

export default function PinForm({ className, ...props }: PinFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userPinSchema),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [OTP, setOTP] = useState<string>("");

  const router = useRouter();
  const { toast } = useToast();
  useEffect(() => {
    setOTP(localStorage.getItem("OTP") as string);
    setPhoneNumber(localStorage.getItem("phoneNumber") as string);
  }, []);
  async function onSubmit(formData: FormData) {
    setIsLoading(true);
    const res = await fetch("https://onebots.onrender.com/v1/auth/create-pin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone: phoneNumber, otp: OTP, pin: formData.pin }),
    });
    const data: {
      phone: string;
      status: "SUCCESS" | "INVALID_PHONE";
    } = await res.json();
    setIsLoading(false);
    if (data.status === "SUCCESS") {
      router.push("/");
    }
  }
  return (
    <form
      className="w-full flex flex-col gap-4 flex-grow justify-between"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        {...register("pin")}
        type="text"
        placeholder="Nhập mã PIN của bạn"
        className="py-3 pl-4 w-full border border-black rounded-2xl placeholder:text-sm"
      ></input>
      {errors?.pin ? (
        <p className="px-1 text-sm text-red-600">{errors.pin.message}</p>
      ) : (
        <p className="px-1 text-sm text-red-600 invisible">pro</p>
      )}
      <div className="flex flex-col items-center">
        <Button
          variant={"ghost"}
          className="font-bold text-lg hover:bg-white text-gray-500"
        >
          Ẩn mã PIN
        </Button>
      </div>
      <div className="flex-grow w-full flex flex-col justify-end">
        <Button className="py-6 bg-green-500 hover:bg-green-600">
          Xác nhận
        </Button>
      </div>
    </form>
  );
}
