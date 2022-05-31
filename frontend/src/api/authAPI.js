exports.logIn = async (username, password) => {
  const res = await fetch(`http://localhost:8080/api/auth/signin`, {
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
};

exports.signUp = async (username, password) => {
  const res = await fetch(`http://localhost:8080/api/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  if (res.status === 200) {
    return res.json();
  }
  throw new Error(res.statusText);
};
