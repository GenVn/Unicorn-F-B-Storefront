import PinForm from "@/components/create-pin-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BadgePlus } from "lucide-react";

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
          <h2 className="font-bold text-3xl">Cài đặt mã PIN</h2>
          <span className="font-semibold text-gray-500">
            Cài đặt mã PIN cho tài khoản của bạn để nhận các lợi ích tích cực
            dưới đây:
          </span>
          <div className="flex gap-4 font-semibold">
            <BadgePlus className="text-green-500" />
            <p>Bảo mật tài khoản của bạn tốt hơn</p>
          </div>
          <div className="flex gap-4 font-semibold">
            <BadgePlus className="text-green-500" />
            <p>Dễ nhớ hơn mật khẩu</p>
          </div>
        </div>
        <PinForm />
      </section>
    </main>
  );
}
