exports.getMovieByName = async (title) => {
    const res = await fetch(`http://localhost:8080/api/movie?title=${title}`, {
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