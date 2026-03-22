import { Suspense } from "react";
import Loader from "../global/Loader";
import SectionTitle from "../global/SectionTitle";
import MoviesGrid from "./MoviesGrid";

const TopWeekSection = () => {
  return (
    <section className="my-20">
      <SectionTitle text="Top 10 Movies This Week" />
      <Suspense fallback={<Loader />}>
        <MoviesGrid period="week" />
      </Suspense>
    </section>
  );
};

export default TopWeekSection;
