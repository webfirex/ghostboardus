
export function GetLocalData(key: string) {
    if (typeof window !== "undefined") {
        const storedValue = localStorage.getItem(key);
        return storedValue
    } else {
        return null
    }
}

export function SaveLocalData(key: string, value: string) {
    if (typeof window !== "undefined") {
        const storedValue = localStorage.setItem(key, value);
        return storedValue
    } else {
        return null
    }
}