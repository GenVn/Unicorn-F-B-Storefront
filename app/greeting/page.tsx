"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function GreetingPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = [
    {
      image: "/Free_shipping.png",
      title: "Miễn Phí Giao Hàng",
      description: (
        <span className="text-center h-20">
          Ăn uống thoả thích không lo phí ship!{" "}
          <p>Unicorn F&B miễn phí giao hàng cho đơn hàng từ</p>
          <p className="font-bold">30 nghìn đồng</p>
        </span>
      ),
    },
    {
      image: "/Free_shipping.png",
      title: "Dễ Dàng Sử Dụng",
      description: (
        <span className="text-center h-20">
          <p> Ứng dụng được thiết kế để bạn không cần suy nghĩ</p>
          <p>khi sử dụng. Nào, let's party!</p>
        </span>
      ),
    },
  ];
  const handleSignUp = () => {
    router.push("/auth");
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <main className="w-full flex justify-center min-h-screen">
      <section className="w-full max-w-md min-h-screen p-4">
        <div className="w-full h-full flex items-center flex-col justify-between">
          <div className="flex w-full justify-end">
            <Button
              onClick={() => {
                router.push("/groups");
              }}
              variant={"ghost"}
              className=""
            >
              Bỏ qua
            </Button>
          </div>
          <div className="w-[250px] h-[250px] relative">
            <Image
              className="rounded-full"
              src={slides[currentIndex].image}
              fill={true}
              alt={`Slide image ${slides[currentIndex].title}`}
            />
          </div>
          <div className="flex items-center gap-4">
            <div
              onClick={() => {
                setCurrentIndex(0);
              }}
              className="w-[18px] h-[18px] rounded-full outline outline-1 outline-black 
              flex items-center justify-center cursor-pointer"
            >
              {currentIndex === 0 ? (
                <div className="w-3 h-3 rounded-full bg-black transition-all"></div>
              ) : null}
            </div>
            <div
              onClick={() => {
                setCurrentIndex(1);
              }}
              className="w-[18px] h-[18px] rounded-full outline outline-1 outline-black 
              flex items-center justify-center cursor-pointer"
            >
              {currentIndex === 1 ? (
                <div className="w-3 h-3 rounded-full bg-black transition-all"></div>
              ) : null}
            </div>
          </div>
          <h2 className="font-bold text-2xl">{slides[currentIndex].title}</h2>
          {slides[currentIndex].description}
          <div className="w-full flex flex-col gap-4">
            {currentIndex === 0 ? (
              <Button
                onClick={handleSignUp}
                className="py-6"
                variant={"outline"}
              >
                Đăng Ký
              </Button>
            ) : (
              <Button
                onClick={handleSignUp}
                className="py-6 invisible"
                variant={"outline"}
              >
                Đăng Ký
              </Button>
            )}
            {currentIndex === 0 ? (
              <Button
                onClick={handleNext}
                className="py-6 bg-green-500 hover:bg-green-600"
              >
                Tiếp Tục
              </Button>
            ) : (
              <Button
                onClick={handleSignUp}
                className="py-6 bg-green-500 hover:bg-green-600"
              >
                Đăng Ký
              </Button>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
