
if(!process.env.NEXT_PUBLIC_API_DOMAIN)
throw new Error("API doesn't support API DOMAIN.");

export const API_ENDPOINTS={
    news: `${process.env.NEXT_PUBLIC_API_DOMAIN}/get.news`,
    top100: `${process.env.NEXT_PUBLIC_API_DOMAIN}/get.top100`,
    get_mano: `${process.env.NEXT_PUBLIC_API_DOMAIN}/get.mango_phone`,
}