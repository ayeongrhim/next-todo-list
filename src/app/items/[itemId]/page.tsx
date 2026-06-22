/*
 * 할 일 상세 페이지
 * 할 일 이름, 상태, 메모, 이미지 수정 가능
 * 수정 완료 또는 삭제 후 목록 페이지로 이동
 */

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getTodoById, updateTodo, deleteTodo, uploadImage } from "@/lib/api";
import { TodoItem } from "@/types";
import Image from "next/image";

export default function ItemDetail() {
  const { itemId } = useParams();
  const router = useRouter();

  const [todo, setTodo] = useState<TodoItem | null>(null);
  const [name, setName] = useState("");
  const [memo, setMemo] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const fetchTodo = async () => {
      const data = await getTodoById(Number(itemId));
      setTodo(data);
      setName(data.name);
      setMemo(data.memo ?? "");
      setImageUrl(data.imageUrl);
      setIsCompleted(data.isCompleted);
    };
    fetchTodo();
  }, [itemId]);

  /* 이미지 업로드 처리 */
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    /* 파일 이름 영어만 허용 */
    if (!/^[a-zA-Z0-9._-]+$/.test(file.name)) {
      alert("이미지 파일 이름은 영어로만 이루어져야 합니다.");
      return;
    }

    /* 파일 크기 5MB 이하 */
    if (file.size > 5 * 1024 * 1024) {
      alert("파일 크기는 5MB 이하여야 합니다.");
      return;
    }

    const result = await uploadImage(file);
    setImageUrl(result.url);
  };

  /* 수정 완료 */
  const handleUpdate = async () => {
    if (!todo) return;
    await updateTodo(todo.id, {
      name,
      memo,
      ...(imageUrl !== null && { imageUrl }),
      isCompleted,
    });
    router.push("/");
  };

  /* 삭제 */
  const handleDelete = async () => {
    if (!todo) return;
    await deleteTodo(todo.id);
    router.push("/");
  };

  if (!todo) return <div className="p-10 text-center">로딩 중...</div>;

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10">
      {/* 할 일 이름 + 상태 토글 */}
      <div
        onClick={() => setIsCompleted(!isCompleted)}
        className={`flex items-center justify-center gap-4 w-full h-[64px] px-6 rounded-2xl border-2 border-slate-900 cursor-pointer mb-6
    ${isCompleted ? "bg-violet-100" : "bg-white"}`}
      >
        <Image
          src={
            isCompleted ? "/images/ic-checked.svg" : "/images/ic-unchecked.svg"
          }
          alt={isCompleted ? "완료" : "진행 중"}
          width={32}
          height={32}
        />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onClick={(e) => e.stopPropagation()}
          className={`bg-transparent outline-none font-bold text-lg text-center underline
    ${isCompleted ? "line-through text-slate-900" : "text-slate-900"}`}
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* 이미지 업로드 */}
        <div className="lg:w-[384px] shrink-0">
          <label
            htmlFor="image-upload"
            className="relative flex items-center justify-center w-full aspect-square rounded-3xl border-2 border-dashed border-slate-300 bg-slate-100 cursor-pointer overflow-hidden"
          >
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt="첨부 이미지"
                fill
                className="object-cover"
              />
            ) : (
              <Image
                src="/images/img-placeholder.svg"
                alt="이미지 없음"
                width={64}
                height={64}
              />
            )}
            {/* 이미지 추가 버튼 */}
            <div className="absolute bottom-4 right-4 w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center">
              <Image
                src="/images/ic-plus-gray.svg"
                alt="이미지 추가"
                width={24}
                height={24}
              />
            </div>
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>

        {/* 메모 */}
        <div
          className="flex-1 rounded-3xl p-6 relative"
          style={{
            backgroundImage: "url('/images/memo-bg.svg')",
            backgroundSize: "cover",
          }}
        >
          {/* Memo 타이틀 상단 고정 */}
          <p className="text-center font-bold text-amber-800 mb-4">Memo</p>
          {/* 내용 영역 - 세로 가운데 정렬 */}
          <div className="flex items-center justify-center h-[calc(100%-40px)]">
            <textarea
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="메모를 입력해주세요"
              className="w-full bg-transparent outline-none resize-none text-slate-800 placeholder:text-slate-400 text-center"
            />
          </div>
        </div>
      </div>

      {/* 버튼 영역 */}
      <div className="flex justify-center lg:justify-end gap-4 mt-6">
        {/* 수정 완료 버튼 */}
        <button
          onClick={handleUpdate}
          className={`cursor-pointer flex items-center gap-2 h-[56px] px-6 rounded-full border-2 border-slate-900 font-bold text-slate-900 hover:opacity-90 transition shadow-[2px_3.5px_0_0_#0F172A]
    ${isCompleted ? "bg-lime-300" : "bg-slate-200"}`}
        >
          <Image src="/images/ic-check.svg" alt="완료" width={16} height={16} />
          수정 완료
        </button>
        {/* 삭제하기 버튼 */}
        <button
          onClick={handleDelete}
          className="cursor-pointer flex items-center gap-2 h-[56px] px-6 rounded-full border-2 border-slate-900 bg-rose-500 font-bold text-white hover:bg-rose-600 transition shadow-[2px_3.5px_0_0_#0F172A]"
        >
          <Image src="/images/ic-x.svg" alt="삭제" width={16} height={16} />
          삭제하기
        </button>
      </div>
    </div>
  );
}
