import SectionTitle from "../global/SectionTitle";
import MoviesGrid from "./MoviesGrid";

const TopWeekSection = () => {
  return (
    <section className="my-20">
      <SectionTitle text="Top Movies This Week" />
      <MoviesGrid period="week" />
    </section>
  );
};

export default TopWeekSection;
