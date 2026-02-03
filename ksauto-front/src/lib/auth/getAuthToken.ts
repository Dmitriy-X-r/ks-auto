export function getAuthToken(): string | null {
    if (typeof window === "undefined") return null;

    // временно
    return "384e0487a94110a0fb48b7949a251f33310f9dc2";
}