const Loader = ({ page = false }: { page?: boolean }) => {
  return (
    <div
      className={`flex items-center justify-center ${
        page ? "h-[80vh]" : "h-60"
      }`}
    >
      <div className="size-20 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent" />
    </div>
  );
};

export default Loader;
