import MainBanner from "@/components/MainBanner/MainBanner";
import MainInfo from "@/components/MainInfo/MainInfo";
import Top100 from "@/components/Top100/Top100";

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
    </>
  );
}