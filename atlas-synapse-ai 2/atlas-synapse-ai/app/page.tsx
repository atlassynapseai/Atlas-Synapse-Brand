import dynamic from "next/dynamic";
import Navbar from "../components/Navbar";
import HomeHero from "../components/home/HomeHero";

const HomeMissionVision = dynamic(
  () => import("../components/home/HomeMissionVision"),
  {
    loading: () => <div className="min-h-[55vh]" aria-hidden />,
    ssr: true
  }
);

const HomeProblemBlast = dynamic(
  () => import("../components/home/HomeProblemBlast"),
  {
    loading: () => <div className="min-h-[50vh]" aria-hidden />,
    ssr: true
  }
);

const HomeOffering = dynamic(() => import("../components/home/HomeOffering"), {
  loading: () => <div className="min-h-[60vh]" aria-hidden />,
  ssr: true
});

const HomeCTA = dynamic(() => import("../components/home/HomeCTA"), {
  loading: () => <div className="min-h-[40vh]" aria-hidden />,
  ssr: true
});

export default function HomePage() {
  return (
    <>
      <Navbar />
      <HomeHero />
      <HomeMissionVision />
      <HomeProblemBlast />
      <HomeOffering />
      <HomeCTA />
    </>
  );
}
