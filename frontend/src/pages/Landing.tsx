import Hero from "@/components/landing/Hero";
import TopTodaySection from "@/components/landing/TopTodaySection";
import TopWeekSection from "@/components/landing/TopWeekSection";

const Landing = () => {
  return (
    <>
      <div className="px-5">
        <Hero />
        <TopTodaySection />
        <TopWeekSection />
      </div>
    </>
  );
};

export default Landing;
