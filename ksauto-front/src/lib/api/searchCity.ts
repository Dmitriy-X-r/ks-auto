import { API_BASE_URL, API_HOOK, API_VERSION_PARAMS } from './config'

export type SearchCityResponse = {
    result: string[]
}

export async function fetchCities(): Promise<string[]> {
    const res = await fetch(
        `${API_BASE_URL}/rest/204/${API_HOOK}/search.city?${API_VERSION_PARAMS}`,
        {
            cache: 'no-store', // важно для городов
        }
    )

    if (!res.ok) {
        throw new Error('Failed to fetch cities')
    }

    const data: SearchCityResponse = await res.json()
    return data.result
}