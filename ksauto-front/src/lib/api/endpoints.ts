


if(!process.env.API_DOMAIN)
throw new Error("API doesn't support API DOMAIN.");

export const API_ENDPOINTS={
    news: `${process.env.API_DOMAIN}/get.news`,
}