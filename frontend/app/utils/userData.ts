

export const fetchUser = async () => {
    try {
        const res = await fetch("http://localhost:5000/api/v1/user/me", {
            method: "GET",
            credentials: "include",
        });
        if (!res.ok) throw new Error("Not authenticated");
        console.log(res);
        const data = await res.json();
        return data ;

    } catch (err) {
        console.log(err);
    }
};
