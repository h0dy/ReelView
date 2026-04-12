import Hero from "@/components/landing-page/Hero";
import TopTodaySection from "@/components/landing-page/TopTodaySection";
import TopWeekSection from "@/components/landing-page/TopWeekSection";

const Landing = () => {
  return (
    <div className="px-5">
      <Hero />
      <TopTodaySection />
      <TopWeekSection />
    </div>
  );
};

export default Landing;
