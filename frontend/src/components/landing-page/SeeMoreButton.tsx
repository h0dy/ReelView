import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const SeeMoreButton = ({ period }: { period: string }) => {
  return (
    <Link
      to={`/movies/top?period=${period}`}
      className="inline-flex items-center gap-1.5 text-xs font-medium tracking-widest uppercase text-foreground/80 border-foreground/50  px-3.5 py-1.5 transition-all duration-150 hover:text-foreground hover:border-foreground/80  group border-0 border-b"
    >
      See more
      <ArrowRight
        size={16}
        className="transition-transform duration-150 group-hover:translate-x-0.5"
      />
    </Link>
  );
};

export default SeeMoreButton;
