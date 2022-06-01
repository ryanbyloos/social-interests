import { API_HOST } from "./userAPI";

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
