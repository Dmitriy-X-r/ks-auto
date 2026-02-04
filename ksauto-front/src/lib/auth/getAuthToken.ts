export function getAuthToken(): string | null {
    if (typeof window === "undefined") return 'not_found';

    // временно
    return "57b62fbedf0ee1f7c50fe7eb99a10c9d27696ea2";
}