import OTPForm from "@/components/otp-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function OTPPage() {
  return (
    <main className="w-full flex justify-center min-h-screen">
      <section className="w-full max-w-md h-screen p-4 flex flex-col gap-4">
        <div className="flex items-start">
          <Button variant={"outline"} className="px-2 rounded-full">
            <ArrowLeft />
          </Button>
        </div>
        <OTPForm />
      </section>
    </main>
  );
}
