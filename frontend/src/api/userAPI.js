export const API_HOST = process.env.API_HOST || "http://localhost:8080";

export async function whoami() {
  const res = await fetch(`${API_HOST}/api/auth/whoami`, {
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

export async function getUserById(id) {
  const res = await fetch(`${API_HOST}/api/user?id=${id}`, {
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

export async function getUserByName(username) {
  const res = await fetch(`${API_HOST}/api/user?username=${username}`, {
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

export async function getAllUsers() {
  const res = await fetch(`${API_HOST}/api/user`, {
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

export async function updateUser(id, user) {
  const res = await fetch(`${API_HOST}/api/user/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem("token"),
    },
    body: JSON.stringify(user),
  });
  if (res.status === 200) {
    return res.json();
  }
  throw new Error(res.statusText);
}

export async function deleteUser(id) {
  const res = await fetch(`${API_HOST}/api/user/${id}`, {
    method: "DELETE",
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

export async function addFriend(id, friendId) {
  if (id !== friendId) {
    const res = await fetch(`${API_HOST}/api/user/${id}/friends/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ _id: friendId }),
    });
    if (res.status === 200) {
      return res.json();
    }
    throw new Error(res.statusText);
  }
}

export async function removeFriend(id, friendId) {
  const res = await fetch(`${API_HOST}/api/user/${id}/friends/${friendId}`, {
    method: "DELETE",
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

export async function hasFriend(id, friendId) {
  return fetch(`${API_HOST}/api/user/${id}/friends/${friendId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem("token"),
    },
  })
    .then((res) => {
      return res.text();
    })
    .then((res) => {
      if (res === "true") {
        return true;
      }
      return false;
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function getSimilarity(id, friendId) {
  const res = await fetch(
    `${API_HOST}/api/user/similarity?id=${id}&friendId=${friendId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    }
  );
  if (res.status === 200) {
    return res.json();
  }
  throw new Error(res.statusText);
}

export async function getMostSimilar(id) {
  const res = await fetch(`${API_HOST}/api/user/mostsimilar?id=${id}`, {
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

export async function addBook(id, bookId) {
  const res = await fetch(`${API_HOST}/api/user/${id}/books/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem("token"),
    },
    body: JSON.stringify({ _id: bookId }),
  });
  if (res.status === 200) {
    return res.json();
  }
  throw new Error(res.statusText);
}

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

export async function removeBook(id, bookId) {
  const res = await fetch(`${API_HOST}/api/user/${id}/books/${bookId}`, {
    method: "DELETE",
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
  console.log("getMovies");
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

export async function addMovie(id, movieId) {
  const res = await fetch(`${API_HOST}/api/user/${id}/movies/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem("token"),
    },
    body: JSON.stringify({ _id: movieId }),
  });
  if (res.status === 200) {
    return res.json();
  }
  throw new Error(res.statusText);
}

export async function removeMovie(id, movieId) {
  const res = await fetch(`${API_HOST}/api/user/${id}/movies/${movieId}`, {
    method: "DELETE",
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
