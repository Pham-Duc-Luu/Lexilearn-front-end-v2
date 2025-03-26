import { z } from "zod";

// export interface SignInRequestDto {
//   user_email: string;
//   user_password: string;
// }

// export interface SignUpRequestDto {
//   user_name: string;
//   user_email: string;
//   user_password: string;
//   user_avatar: string;
//   user_thumbnail: string;
//   userAuthProvider: "GOOGLE";
//   email: string;
// }

export interface AuthResponseDto {
  refresh_token: string;
  access_token: string;
}
export interface GoogleTokenRequestDto {
  token: string;
}

export type SignInRequestDto = z.infer<typeof signInSchema>;

export const signInSchema = z.object({
  user_email: z.string().email({ message: "Invalid email format." }),
  user_password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
});

export type SignUpRequestDto = z.infer<typeof signUpSchema>;

export const signUpSchema = z.object({
  user_email: z.string().email({ message: "Invalid email format." }),
  user_name: z
    .string()
    .max(20, { message: "your name is too long" })
    .min(8, { message: "your name is too short" }),
  user_password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
});

export type ResetPasswordResquestDto = z.infer<typeof resetPasswordSchema>;

export const resetPasswordSchema = z.object({
  otp: z.string().length(6, { message: "invalid opt" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
  email: z.string().email({ message: "Invalid email format." }),
});
