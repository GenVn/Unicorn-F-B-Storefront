import * as z from "zod";
export const userSignInUpSchema = z.object({
  phone: z
    .string()
    .refine((value) => /(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(value), {
      message: "Số điện thoại không phù hợp. Hãy nhập lại!",
    }),
});

export const userOTPSchema = z.object({
  otp: z.string().refine((value) => /^[0-9]{5}$/.test(value), {
    message: "Mã OTP không phù hợp. Hãy nhập lại!",
  }),
});

export const userPinSchema = z.object({
  pin: z.string().refine((value) => /^\d{6}$/.test(value), {
    message: "Mã PIN không phù hợp hãy nhập lại!",
  }),
});
