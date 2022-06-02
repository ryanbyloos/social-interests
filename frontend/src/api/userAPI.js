import { API_HOST } from "../config";

/**
 * @description Get info of logged user from the API endpoint
 * @returns {Promise<any>}
 */
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

/**
 * @description Get a user by its id from the API endpoint
 * @param {String} id
 * @returns {Promise<any>}
 */
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

/**
 * @description Get a user by its username from the API endpoint
 * @param {String} username
 * @returns {Promise<any>}
 */
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

/**
 * @description Get a list of all users from the API endpoint
 * @returns {Promise<any>}
 */
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

/**
 * @description Update a user in the API endpoint
 * @param {String} id
 * @param {String} user
 * @returns {Promise<any>}
 */
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

/**
 * @description Delete a user in the API endpoint
 * @param {String} id
 * @returns {Promise<any>}
 */
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

/**
 * @description Add a friend to a user in the API endpoint
 * @param {String} id
 * @param {String} friendId
 * @returns {Promise<any>}
 */
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

/**
 * @description Remove a friend from a user in the API endpoint
 * @param {String} id
 * @param {String} friendId
 * @returns {Promise<any>}
 */
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

/**
 * @description Get wether a user is a friend of another user using the API endpoint
 * @param {String} id
 * @param {String} friendId
 * @returns {Promise<any>}
 */
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

/**
 * @description Get the similarity between two users using the API endpoint
 * @param {String} id
 * @param {String} friendId
 * @returns {Promise<any>}
 */
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

/**
 * @description Get the ten most similar users to a user using the API endpoint
 * @param {String} id
 * @returns {Promise<any>}
 */
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

/**
 * @description Add a book to a user using the API endpoint
 * @param {String} id
 * @param {String} bookId
 * @returns {Promise<any>}
 */
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

/**
 * @description Remove a book from a user using the API endpoint
 * @param {String} id
 * @param {String} bookId
 * @returns {Promise<any>}
 */
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

/**
 * @description Get wether a user has a book using the API endpoint
 * @param {String} id
 * @param {String} bookId
 * @returns {Promise<any>}
 */
export async function hasBook(id, bookId) {
  return fetch(`${API_HOST}/api/user/${id}/books/${bookId}`, {
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

/**
 * @description Add a movie to a user using the API endpoint
 * @param {String} id
 * @param {String} movieId
 * @returns {Promise<any>}
 */
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

/**
 * @description Remove a movie from a user using the API endpoint
 * @param {String} id
 * @param {String} movieId
 * @returns {Promise<any>}
 */
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

/**
 * @description Get wether a user has a movie using the API endpoint
 * @param {String} id
 * @param {String} movieId
 * @returns {Promise<any>}
 */
export async function hasMovie(id, movieId) {
  return fetch(`${API_HOST}/api/user/${id}/movies/${movieId}`, {
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
