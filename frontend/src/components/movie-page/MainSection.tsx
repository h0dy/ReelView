import type { MovieDetail } from "@/types/movies";
import type { Review } from "@/types/reviews";
import { Separator } from "../ui/separator";
import MetaData from "./MetaData";
import Overview from "./Overview";
import Reviews from "./Reviews";

const MainSection = ({
  movie,
  reviews,
}: {
  movie: MovieDetail;
  reviews: Review[];
}) => {
  return (
    <div className="lg:col-span-2 space-y-6">
      <MetaData movie={movie} />
      <Separator />
      <Overview overview={movie.overview} />
      <Separator />
      <Reviews reviews={reviews} />
    </div>
  );
};

export default MainSection;
