
type ApiFetchOptions = RequestInit & {
    params?: Record<string, string | number | boolean | undefined>;
};

const basicAuth = Buffer
    .from(`${process.env.API_BASIC_LOGIN}:${process.env.API_BASIC_PASSWORD}`)
    .toString('base64');

export async function apiFetch<T>(
    url: string,
    options?: ApiFetchOptions
): Promise<T> {
    let finalUrl = url;

    if (options?.params) {
        const searchParams = new URLSearchParams();

        Object.entries(options.params).forEach(([key, value]) => {
            if (value !== undefined) {
                searchParams.append(key, String(value));
            }
        });

        finalUrl += `?${searchParams.toString()}`;
    }

    const res = await fetch(finalUrl, {
        ...options,
        headers: {
            ...options?.headers,
            Authorization: `Basic ${basicAuth}`,
        },
    });

    if (!res.ok) {
        throw new Error(`API error ${res.status}`);
    }

    return res.json();
}
