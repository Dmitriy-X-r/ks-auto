type FetchOptions = RequestInit & {
    params?: Record<string, string | number>
}

export async function apiFetch<T>(
    url: string,
    { params, ...options }: FetchOptions = {}
): Promise<T> {
    const query = params
        ? '?' +
        new URLSearchParams(
            Object.entries(params).map(([k, v]) => [k, String(v)])
        ).toString()
        : ''

    const res = await fetch(url + query, {
        ...options,
        next: { revalidate: 60 },
    })

    if (!res.ok) {
        throw new Error(`API error: ${res.status}`)
    }

    return res.json()
}
