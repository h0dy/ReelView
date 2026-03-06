const SectionTitle = ({ text }: { text: string }) => {
  return (
    <div className="mt-5">
      <h2 className="capitalize text-2xl font-semibold">{text}</h2>
    </div>
  );
};

export default SectionTitle;
