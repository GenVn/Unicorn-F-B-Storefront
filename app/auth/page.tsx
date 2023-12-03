import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import SignInUpForm from "@/components/sign-in-up-form";

export default function AuthenticationPage() {
  // const handleFormSubmit = async (formData: FormData) => {
  //   "use server";
  //   const res = await fetch("https://onebots.onrender.com/v1/auth/sign-in-up", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ phone: "0385431058" }),
  //   });
  //   const data = await res.json();
  //   console.log(data);
  // };
  return (
    <main className="w-full flex justify-center min-h-screen">
      <section className="w-full max-w-md h-screen p-4 flex flex-col">
        <div className="flex items-start">
          <Button variant={"outline"} className="px-2 rounded-full">
            <ArrowLeft />
          </Button>
        </div>

        <div className="w-full flex justify-center">
          <Image
            src={"/Logo.png"}
            width={200}
            height={200}
            alt="Unicorn F&B Icon"
          />
        </div>

        <SignInUpForm />
      </section>
    </main>
  );
}
