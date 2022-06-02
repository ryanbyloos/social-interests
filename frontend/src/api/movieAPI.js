import { API_HOST } from "../config";

/**
 * @description Get a list of movies from the API endpoint
 * @param {String} title
 * @returns {Promise<any>}
 */
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

export async function getMovies(id) {
  const res = await fetch(`${API_HOST}/api/movie?id=${id}`, {
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
