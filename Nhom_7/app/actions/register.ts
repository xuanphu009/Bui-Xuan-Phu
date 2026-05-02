"use server";

import { registerSchema } from "@/lib/schema";

export async function registerAction(formData: unknown) {
  // Double Validation tại Server
  const result = registerSchema.safeParse(formData);

  if (!result.success) {
    return {
      success: false,
      message: "Dữ liệu không hợp lệ: " + result.error.issues[0].message,
    };
  }

  const { name, email, password } = result.data;

  // TODO: Lưu vào database ở đây
  console.log("Đăng ký thành công:", { name, email, password });

  // Trả về object thay vì throw Error
  return {
    success: true,
    message: `Đăng ký thành công! Chào mừng ${name}`,
  };
}