export async function checkAuth() {
    const response = await fetch("/api/authCheck", { method: "GET", credentials: "include" });
    const data = await response.json();
    return data;
}

export async function checkAdminAuth() {
    const response = await fetch("/api/admin/authCheck", { method: "GET", credentials: "include" });
    const data = await response.json();
    return data;
}

export async function logoutUser() {
    await fetch("/api/logout", { method: "GET"});
    window.location.href = "/auth/login";
    return;
}

export async function logoutAdminUser() {
    await fetch("/api/admin/logout", { method: "GET"});
    window.location.href = "/auth/admin";
    return;
}