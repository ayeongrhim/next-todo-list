/*
 * 할 일 입력 컴포넌트
 * 텍스트 입력 후 버튼 클릭 또는 엔터로 할 일 추가
 */

"use client";

import Image from "next/image";
import { useState } from "react";
import { createTodo } from "@/lib/api";

interface TodoInputProps {
  onAdd: () => void; // 추가 후 목록 새로고침을 위한 콜백
}

export default function TodoInput({ onAdd }: TodoInputProps) {
  const [value, setValue] = useState("");

  const handleSubmit = async () => {
    if (!value.trim()) return;
    await createTodo(value.trim());
    setValue("");
    onAdd();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="flex gap-4 w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="할 일을 입력해주세요"
        className="flex-1 h-[56px] rounded-3xl border-2 border-slate-900 bg-slate-100 px-6 text-slate-900 placeholder:text-slate-500 outline-none shadow-[2px_3.5px_0_0_#0F172A]"
      />
      {/* 데스크탑/태블릿 버튼 */}
      <button
        onClick={handleSubmit}
        className="hidden sm:flex h-[56px] px-6 items-center gap-2 rounded-3xl border-2 border-slate-900 bg-violet-600 font-bold text-white hover:bg-violet-700 transition shadow-[2px_3.5px_0_0_#0F172A] cursor-pointer"
      >
        <Image
          src="/images/ic-plus-white.svg"
          alt="추가"
          width={16}
          height={16}
        />
        추가하기
      </button>
      {/* 모바일 버튼 */}
      <button
        onClick={handleSubmit}
        className="flex sm:hidden w-[56px] h-[56px] items-center justify-center rounded-full border-2 border-slate-900 bg-violet-600 font-bold text-white hover:bg-violet-700 transition shadow-[2px_3.5px_0_0_#0F172A] cursor-pointer"
      >
        <Image
          src="/images/ic-plus-white.svg"
          alt="추가"
          width={16}
          height={16}
        />
      </button>
    </div>
  );
}
