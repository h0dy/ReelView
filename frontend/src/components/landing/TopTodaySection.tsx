import SectionTitle from "../global/SectionTitle";
import MoviesGrid from "./MoviesGrid";

const TopTodaySection = () => {
  return (
    <section className="my-20">
      <SectionTitle text="Top Movies Today" />
      <MoviesGrid />
    </section>
  );
};

export default TopTodaySection;
