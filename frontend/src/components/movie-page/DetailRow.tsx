const DetailRow = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex justify-between items-start py-2.5 border-b border-border/50 text-sm">
      <span className="text-muted-foreground shrink-0 mr-4">{label}</span>
      <span className="text-right font-medium">{value}</span>
    </div>
  );
};

export default DetailRow;
