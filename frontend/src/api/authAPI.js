import { API_HOST } from "../config";

/**
 * @description Post to the API endpoint to login the user
 * @param {String} username
 * @param {String} password
 * @returns {Promise<any>}
 */
export async function logIn(username, password) {
  const res = await fetch(`${API_HOST}/api/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  if (res.status === 200) {
    return res.json();
  } else if (res.status === 401) {
    alert("Nom d'utilisateur ou mot de passe incorrect");
    throw new Error("Nom d'utilisateur ou mot de passe incorrect");
  }
  throw new Error(res.statusText);
}

/**
 * @description Post to the API endpoint to register the user
 * @param {String} username
 * @param {String} password
 * @returns {Promise<any>}
 */
export async function signUp(username, password) {
  const res = await fetch(`${API_HOST}/api/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  if (res.status === 200) {
    return res.json();
  } else if (res.status === 409) {
    alert("Nom d'utilisateur déjà pris");
    throw new Error("Nom d'utilisateur déjà pris");
  }
  throw new Error(res.statusText);
}

/**
 * @description Get wether the user is an admin from the API endpoint
 * @returns {Promise<String>}
 */
export async function isAdmin() {
  const res = await fetch(`${API_HOST}/api/role/isadmin`, {
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
