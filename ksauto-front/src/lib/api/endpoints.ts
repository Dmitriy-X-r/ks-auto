
if(!process.env.NEXT_PUBLIC_API_DOMAIN)
throw new Error("API doesn't support API DOMAIN.");

export const API_ENDPOINTS={
    news: `${process.env.NEXT_PUBLIC_API_DOMAIN}/get.news`,
    top100: `${process.env.NEXT_PUBLIC_API_DOMAIN}/get.top100`,
    get_mano: `${process.env.NEXT_PUBLIC_API_DOMAIN}/get.mango_phone`,
    get_last_ads: `${process.env.NEXT_PUBLIC_API_DOMAIN}/get.last_ads`,
    header_menu: `${process.env.NEXT_PUBLIC_API_DOMAIN}/get.header_menu`,
    main_sections: `${process.env.NEXT_PUBLIC_API_DOMAIN}/get.main_sections`,
    info_before_report: `${process.env.NEXT_PUBLIC_API_DOMAIN}/get.info_before_report`,
}