"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { registerSchema, RegisterFormData } from "@/lib/schema";
import { registerAction } from "@/app/actions/register";

export default function RegisterForm() {
  const [serverMessage, setServerMessage] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const {
    register,         // đăng ký input với form (Uncontrolled)
    handleSubmit,     // bọc hàm submit
    formState: { errors, isSubmitting }, // lấy lỗi và trạng thái
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema), // kết nối Zod
  });

  const onSubmit = async (data: RegisterFormData) => {
    setServerMessage(null);
    const result = await registerAction(data);
    setServerMessage(result);
    if (result.success) reset(); // clear form nếu thành công
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-2xl p-8 w-full max-w-md shadow-xl">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          Đăng ký thành viên
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">

          {/* Field: Tên */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Họ và tên</label>
            <input
              {...register("name")}   // register thay cho value + onChange thủ công
              type="text"
              placeholder="Nguyễn Văn A"
              className={`w-full px-4 py-2 rounded-lg bg-gray-700 text-white border 
                ${errors.name ? "border-red-500" : "border-gray-600"} 
                focus:outline-none focus:border-blue-500`}
            />
            {/* Hiển thị lỗi ngay lập tức (real-time sau blur) */}
            {errors.name && (
              <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Field: Email */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              {...register("email")}
              type="email"
              placeholder="example@email.com"
              className={`w-full px-4 py-2 rounded-lg bg-gray-700 text-white border 
                ${errors.email ? "border-red-500" : "border-gray-600"} 
                focus:outline-none focus:border-blue-500`}
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Field: Mật khẩu */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Mật khẩu</label>
            <input
              {...register("password")}
              type="password"
              placeholder="Tối thiểu 8 ký tự, 1 chữ hoa, 1 số"
              className={`w-full px-4 py-2 rounded-lg bg-gray-700 text-white border 
                ${errors.password ? "border-red-500" : "border-gray-600"} 
                focus:outline-none focus:border-blue-500`}
            />
            {errors.password && (
              <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Field: Xác nhận mật khẩu */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Xác nhận mật khẩu</label>
            <input
              {...register("confirmPassword")}
              type="password"
              placeholder="Nhập lại mật khẩu"
              className={`w-full px-4 py-2 rounded-lg bg-gray-700 text-white border 
                ${errors.confirmPassword ? "border-red-500" : "border-gray-600"} 
                focus:outline-none focus:border-blue-500`}
            />
            {errors.confirmPassword && (
              <p className="text-red-400 text-xs mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Thông báo từ Server */}
          {serverMessage && (
            <div className={`p-3 rounded-lg text-sm text-center font-medium
              ${serverMessage.success 
                ? "bg-green-900 text-green-300 border border-green-700" 
                : "bg-red-900 text-red-300 border border-red-700"}`}>
              {serverMessage.message}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 
              disabled:opacity-50 disabled:cursor-not-allowed
              text-white font-semibold transition-colors"
          >
            {isSubmitting ? "Đang xử lý..." : "Đăng ký"}
          </button>

        </form>
      </div>
    </div>
  );
}