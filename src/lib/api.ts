import { TodoItem } from "@/types";

const BASE_URL = "https://assignment-todolist-api.vercel.app/api";
const TENANT_ID = "ayeongrhim";

// 할 일 목록 조회
export async function getTodos(): Promise<TodoItem[]> {
  const res = await fetch(`${BASE_URL}/${TENANT_ID}/items`);
  return res.json();
}

// 할 일 단건 조회
export async function getTodoById(itemId: number): Promise<TodoItem> {
  const res = await fetch(`${BASE_URL}/${TENANT_ID}/items/${itemId}`);
  return res.json();
}

// 할 일 추가
export async function createTodo(name: string): Promise<TodoItem> {
  const res = await fetch(`${BASE_URL}/${TENANT_ID}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  return res.json();
}

// 할 일 수정
export async function updateTodo(
  itemId: number,
  data: Partial<Pick<TodoItem, "name" | "memo" | "imageUrl" | "isCompleted">>,
): Promise<TodoItem> {
  const res = await fetch(`${BASE_URL}/${TENANT_ID}/items/${itemId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

// 할 일 삭제
export async function deleteTodo(itemId: number): Promise<void> {
  await fetch(`${BASE_URL}/${TENANT_ID}/items/${itemId}`, {
    method: "DELETE",
  });
}

// 이미지 업로드
export async function uploadImage(file: File): Promise<{ url: string }> {
  const formData = new FormData();
  formData.append("image", file);
  const res = await fetch(`${BASE_URL}/${TENANT_ID}/images/upload`, {
    method: "POST",
    body: formData,
  });
  return res.json();
}
