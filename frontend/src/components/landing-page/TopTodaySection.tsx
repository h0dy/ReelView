import SectionTitle from "../global/SectionTitle";
import MoviesGrid from "./MoviesGrid";
import SeeMoreButton from "./SeeMoreButton";

const TopTodaySection = () => {
  return (
    <section className="my-20">
      <div className="flex justify-between items-end">
        <SectionTitle text="Top Movies Today" />
        <SeeMoreButton period="day" />
      </div>
      <MoviesGrid />
    </section>
  );
};

export default TopTodaySection;
