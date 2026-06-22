/*
 * 할 일 목록 페이지
 * 진행 중인 할 일과 완료된 할 일을 나누어 표시
 */

"use client";

import { useEffect, useState } from "react";
import { getTodos } from "@/lib/api";
import { TodoItem as TodoItemType } from "@/types";
import TodoInput from "@/components/TodoInput";
import TodoItem from "@/components/TodoItem";
import Image from "next/image";

export default function Home() {
  const [todos, setTodos] = useState<TodoItemType[]>([]);

  /* 할 일 목록 불러오기 */
  useEffect(() => {
    const fetchTodos = async () => {
      const data = await getTodos();
      setTodos(data);
    };
    fetchTodos();
  }, []);

  const fetchTodosCallback = async () => {
    const data = await getTodos();
    setTodos(data);
  };

  const todoList = todos.filter((item) => !item.isCompleted);
  const doneList = todos.filter((item) => item.isCompleted);

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10">
      {/* 할 일 입력 */}
      <TodoInput onAdd={fetchTodosCallback} />

      <div className="mt-10 flex flex-col lg:flex-row gap-6">
        {/* 진행 중 섹션 */}
        <section className="flex-1">
          <Image
            src="/images/badge-todo.svg"
            alt="TO DO"
            width={101}
            height={36}
            className="mb-4"
          />
          {todoList.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-4">
              <Image
                src="/images/empty-todo.svg"
                alt="할 일 없음"
                width={240}
                height={240}
              />
              <p className="text-slate-400 text-sm font-medium text-center">
                할 일이 없어요.
                <br />
                TODO를 새롭게 추가해주세요!
              </p>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {todoList.map((item) => (
                <TodoItem
                  key={item.id}
                  item={item}
                  onToggle={fetchTodosCallback}
                />
              ))}
            </ul>
          )}
        </section>

        {/* 완료 섹션 */}
        <section className="flex-1">
          <Image
            src="/images/badge-done.svg"
            alt="DONE"
            width={97}
            height={36}
            className="mb-4"
          />
          {doneList.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-4">
              <Image
                src="/images/empty-done.svg"
                alt="완료 없음"
                width={240}
                height={240}
              />
              <p className="text-slate-400 text-sm font-medium text-center">
                아직 다 한 일이 없어요.
                <br />
                해야 할 일을 체크해보세요!
              </p>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {doneList.map((item) => (
                <TodoItem
                  key={item.id}
                  item={item}
                  onToggle={fetchTodosCallback}
                />
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
