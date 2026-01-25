import MainBanner from "@/components/MainBanner/MainBanner";
import MainInfo from "@/components/MainInfo/MainInfo";
import {Top100Section} from "@/components/catalog/Top100/Top100";
import LatestArrivals from "@/components/LatestArrivals/LatestArrivals";
import NewsSection from "@/components/news/news-section/NewsSection";
import {getTop100} from "@/lib/api/top100";

export default async function HomePage() {
    const cars = await getTop100({ nPageSize: 10 });
  return (
    <>
      <MainBanner
        href="https://t.me/carsplus_sales"
        target="_blank"
        noIndex={true}
        imageAlt="Рекламный баннер"
      />
      <MainInfo />
      <Top100Section items={cars}/>
      <LatestArrivals />
      <NewsSection />
    </>
  );
}