import { API_HOST } from "./userAPI";

export async function getBookByName(title) {
  const res = await fetch(`${API_HOST}/api/book?title=${title}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem("token"),
    },
  });
  if (res.status === 200) {
    return res.json();
  }
  throw new Error(res.statusText);
}
