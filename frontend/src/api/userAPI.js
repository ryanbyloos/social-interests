exports.whoami = async () => {
  const res = await fetch("http://localhost:8080/api/auth/whoami", {
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
};

exports.getUserById = async (id) => {
  const res = await fetch(`http://localhost:8080/api/user?id=${id}`, {
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
};

exports.getUserByName = async (username) => {
  const res = await fetch(
    `http://localhost:8080/api/user?username=${username}`,
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
};

exports.getAllUsers = async () => {
  const res = await fetch(`http://localhost:8080/api/user`, {
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
};

exports.updateUser = async (id, user) => {
  const res = await fetch(`http://localhost:8080/api/user/${id}`, {
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
};

exports.deleteUser = async (id) => {
  const res = await fetch(`http://localhost:8080/api/user/${id}`, {
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
};

exports.addFriend = async (id, friendId) => {
  if (id !== friendId) {
    const res = await fetch(`http://localhost:8080/api/user/${id}/friends/`, {
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
};

exports.hasFriend = (id, friendId) => {
  fetch(`http://localhost:8080/api/user/${id}/friends/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem("token"),
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        const id = data[i];
        console.log(id);
        if (id === friendId) {
          return true;
        }
      }
      return false;
    })
    .catch((err) => {
      console.log(err);
    });
};
