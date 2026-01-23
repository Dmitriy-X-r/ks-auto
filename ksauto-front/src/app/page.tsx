import MainBanner from "@/components/MainBanner/MainBanner";
import MainInfo from "@/components/MainInfo/MainInfo";
import Top100 from "@/components/Top100/Top100";
import LatestArrivals from "@/components/LatestArrivals/LatestArrivals";
import NewsSection from "@/components/news/news-section/NewsSection";

export default function HomePage() {
  return (
    <>
      <MainBanner
        href="https://t.me/carsplus_sales"
        target="_blank"
        noIndex={true}
        imageAlt="Рекламный баннер"
      />
      <MainInfo />
      <Top100 />
      <LatestArrivals />
      <NewsSection />
    </>
  );
}