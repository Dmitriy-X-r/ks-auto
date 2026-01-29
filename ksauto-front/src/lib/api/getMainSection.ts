import "server-only";
import {getMainSection} from "@/lib/api/mainSection";

type CarTypeItem = { url: string; text: string; img: string };
type PopularBrandItem = { url: string; name: string };

export type MainSectionsData = {
    offersCount: number;
    offersWord: string;
    offersUrl: string;
    carTypes: CarTypeItem[];
    popularBrands: PopularBrandItem[];
    brandsAllUrl: string;
};

export async function getMainSections(): Promise<MainSectionsData> {
    const data = await getMainSection();



    const block1 = data?.result?.block1 ?? {};
    const block2 = data?.result?.block2 ?? {};
    const block3 = data?.result?.block3 ?? {};

    const countStr = block1.count ?? "0";
    const offersCount =
        parseInt(String(countStr).replace(/\s/g, ""), 10) || 0;

    const carTypes = [
        {
            url: block2.title_url1,
            text: block2.title_url1_text,
            img: block2.title_url1_img,
        },
        {
            url: block2.title_url2,
            text: block2.title_url2_text,
            img: block2.title_url2_img,
        },
        {
            url: block2.title_url3,
            text: block2.title_url3_text,
            img: block2.title_url3_img,
        },
        {
            url: block2.title_url4,
            text: block2.title_url4_text,
            img: block2.title_url4_img,
        },
    ].filter((x) => x.url && x.text && x.img);

    return {
        offersCount,
        offersWord: block1.count_text || "предложений",
        offersUrl: block1.title_url1 || "/catalog/cars/",
        carTypes,
        popularBrands: Array.isArray(block3.list) ? block3.list : [],
        brandsAllUrl: block3.all || "/catalog/cars/?showfilter=Y",
    };
}
