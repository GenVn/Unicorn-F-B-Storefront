import { Button } from "@/components/ui/button";

import { ArrowLeft, BadgePlus } from "lucide-react";
import Link from "next/link";

export default function OTPPage() {
  return (
    <main className="w-full flex justify-center min-h-screen">
      <section className="w-full max-w-md h-screen p-4 flex flex-col gap-4">
        <div className="flex items-start">
          <Button variant={"outline"} className="px-2 rounded-full">
            <ArrowLeft />
          </Button>
        </div>
        <div className="w-full flex gap-2 flex-col h-[150px]">
          <h2 className="font-bold text-3xl">Nhập mã PIN</h2>
          <span className="font-semibold text-gray-500">
            Nhập mã PIN tài khoản của bạn bên dưới để có thể đăng nhập và sử
            dụng dịch vụ.
          </span>
        </div>
        <input
          name="phoneNumber"
          type="text"
          placeholder="Nhập mã PIN của bạn"
          className="py-3 pl-4 w-full border border-black rounded-2xl placeholder:text-sm"
        ></input>
        <div className="flex flex-col items-center">
          <Button
            variant={"ghost"}
            className="font-bold text-lg hover:bg-white text-gray-500"
          >
            Hiện mã PIN
          </Button>
        </div>
        <div className="flex-grow w-full flex flex-col gap-4 justify-end">
          <span className="text-gray-500 mx-auto">
            Đã quên mã PIN của bạn?
            <Link href={"/reset-pin"} className="font-semibold text-black">
              {" "}
              Thiết lập lại mã PIN
            </Link>
          </span>
          <Button className="py-6 bg-green-500 hover:bg-green-600">
            Xác nhận
          </Button>
        </div>
      </section>
    </main>
  );
}
