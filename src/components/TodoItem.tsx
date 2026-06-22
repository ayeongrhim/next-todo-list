/*
 * 할 일 항목 컴포넌트
 * 체크박스 클릭으로 완료/진행 중 상태 전환
 * 항목 클릭 시 상세 페이지로 이동
 */

"use client";

import { useRouter } from "next/navigation";
import { updateTodo } from "@/lib/api";
import { TodoItem as TodoItemType } from "@/types";
import Image from "next/image";

interface TodoItemProps {
  item: TodoItemType;
  onToggle: () => void; // 상태 변경 후 목록 새로고침을 위한 콜백
}

export default function TodoItem({ item, onToggle }: TodoItemProps) {
  const router = useRouter();

  /* 완료/진행 중 상태 토글 */
  const handleToggle = async (e: React.MouseEvent) => {
    e.stopPropagation(); // 항목 클릭 이벤트 방지
    await updateTodo(item.id, { isCompleted: !item.isCompleted });
    onToggle();
  };

  /* 상세 페이지로 이동 */
  const handleClick = () => {
    router.push(`/items/${item.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className={`flex items-center gap-4 w-full h-[50px] px-4 rounded-full border-2 border-slate-900 cursor-pointer
        ${item.isCompleted ? "bg-violet-100 line-through text-slate-400" : "bg-white text-slate-900"}`}
    >
      {/* 체크박스 버튼 */}
      <button
        onClick={handleToggle}
        className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
      >
        <Image
          src={
            item.isCompleted
              ? "/images/ic-checked.svg"
              : "/images/ic-unchecked.svg"
          }
          alt={item.isCompleted ? "완료" : "진행 중"}
          width={32}
          height={32}
        />
      </button>
      <span className="text-sm font-medium">{item.name}</span>
    </div>
  );
}
