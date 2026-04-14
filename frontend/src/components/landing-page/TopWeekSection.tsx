import SectionTitle from "../global/SectionTitle";
import MoviesGrid from "./MoviesGrid";
import SeeMoreButton from "./SeeMoreButton";

const TopWeekSection = () => {
  return (
    <section className="my-20">
      <div className="flex justify-between items-end">
        <SectionTitle text="Top Movies This Week" />
        <SeeMoreButton period="week" />
      </div>
      <MoviesGrid period="week" />
    </section>
  );
};

export default TopWeekSection;
