import { API_HOST } from "../config";

/**
 * @description Get a list of books from the API endpoint
 * @param {String} title
 * @returns {Promise<any>}
 */
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

/**
 * @description Get all books using the API endpoint
 * @param {String} id
 * @returns {Promise<any>}
 */
export async function getBooks(id) {
  const res = await fetch(`${API_HOST}/api/book?id=${id}`, {
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
