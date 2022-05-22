exports.whoami = async () => {
    const res = await fetch('http://localhost:8080/api/auth/whoami', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token')
        },
    });
    if (res.status === 200) {
        return res.json();
    }
    throw new Error(res.statusText);
    }

exports.getUserById = async (id) => {
    const res = await fetch(`http://localhost:8080/api/user?id=${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token')
        },
    });
    if (res.status === 200) {
        return res.json();
    }
    throw new Error(res.statusText);
}

exports.getUserByName = async (username) => {
    const res = await fetch(`http://localhost:8080/api/user?username=${username}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token')
        },
    });
    if (res.status === 200) {
        return res.json();
    }
    throw new Error(res.statusText);
}

exports.updateUser = async (id, user) => {
    const res = await fetch(`http://localhost:8080/api/user/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token')
        },
        body: JSON.stringify(user)
    });
    if (res.status === 200) {
        return res.json();
    }
    throw new Error(res.statusText);
}