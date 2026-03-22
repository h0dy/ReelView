import { Suspense } from "react";
import Loader from "../global/Loader";
import SectionTitle from "../global/SectionTitle";
import MoviesGrid from "./MoviesGrid";

const TopTodaySection = () => {
  return (
    <section className="my-20">
      <SectionTitle text="Top Movies Today" />
      <Suspense fallback={<Loader />}>
        <MoviesGrid />
      </Suspense>
    </section>
  );
};

export default TopTodaySection;
