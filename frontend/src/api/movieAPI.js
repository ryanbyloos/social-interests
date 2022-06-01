import { API_HOST } from "./userAPI";

export async function getMovieByName(title) {
  const res = await fetch(`${API_HOST}/api/movie?title=${title}`, {
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
