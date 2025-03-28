export async function getUsers() {
    const response = await fetch("/api/admin/users", { method: "GET", credentials: "include" });
    const data = await response.json();
    return data;
}

export async function banUsers() {
    const response = await fetch("/api/admin/users", { method: "POST", credentials: "include" });
    const data = await response.json();
    return data;
}