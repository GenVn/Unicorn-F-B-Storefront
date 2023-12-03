"use client";

import { userSignInUpSchema } from "@/lib/validation/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "./ui/button";
import { RotateCcw } from "lucide-react";
import { useToast } from "./ui/use-toast";

interface SignInUpFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof userSignInUpSchema>;

export default function SignInUpForm({
  className,
  ...props
}: SignInUpFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userSignInUpSchema),
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  async function onSubmit(formData: FormData) {
    setIsLoading(true);
    const res = await fetch("https://onebots.onrender.com/v1/auth/sign-in-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone: formData.phone }),
    });
    const data: {
      phone: string;
      status: "SIGN_IN" | "SIGN_UP" | "INVALID_PHONE";
    } = await res.json();
    setIsLoading(false);
    if (data.status === "INVALID_PHONE") {
      toast({
        title: "Đã xảy ra lỗi.",
        description: "Đang gặp sự cố. Mời bạn thử lại sau.",
        variant: "destructive",
      });
    }
    if (data.status === "SIGN_UP") {
      localStorage.setItem("phoneNumber", data.phone);
      toast({
        title: "Đã gửi mã OTP",
        description: "Hãy kiểm tra email của ban.",
      });
      router.push("/otp");
    }
    if (data.status === "SIGN_IN") {
      localStorage.setItem("phoneNumber", data.phone);
      router.push("/pin");
    }
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-4 flex-grow justify-between"
    >
      <div className="w-full flex flex-col gap-2">
        <h2 className="font-bold text-2xl">Đăng ký/Đăng nhập</h2>
        <span className="font-semibold text-gray-400">
          Sử dụng số điện thoại của bạn để đăng ký/đăng nhập tài khoản để sử
          dụng dịch vụ
        </span>
        <div className="w-full relative mt-4">
          <span className="absolute m-2 py-2 px-3 text-sm bg-gray-100 rounded-xl">
            +84
          </span>
          <input
            {...register("phone")}
            disabled={isLoading}
            autoCorrect="off"
            type="text"
            placeholder="Số điện thoại của bạn"
            className="py-3 pl-16 w-full border border-black rounded-2xl placeholder:text-sm"
          ></input>
        </div>
        {errors?.phone ? (
          <p className="px-1 text-sm text-red-600">{errors.phone.message}</p>
        ) : null}
      </div>
      <div className="w-full space-y-2">
        <span className="text-center text-sm w-full font-medium text-gray-500">
          <p>Bằng việc nhấn nút Tiếp tục bạn đã đồng ý với</p>
          <Link
            href={"/policy"}
            className="text-green-400 hover:text-green-500"
          >
            Điều khoản dịch vụ & Chính sách bảo mật của{" "}
            <p className="inline text-gray-500">Unicorn F&B.</p>
          </Link>
        </span>
        <Button
          type="submit"
          className="w-full py-6 bg-green-500 hover:bg-green-600"
          disabled={isLoading}
        >
          {isLoading && <RotateCcw className="mr-2 h-4 w-4 animate-spin" />}
          Tiếp tục
        </Button>
      </div>
    </form>
  );
}
