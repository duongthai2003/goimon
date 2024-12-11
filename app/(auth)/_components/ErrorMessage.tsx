type Props = {
  title: string | undefined;
  className?: string;
};

export const ErrorMessage = ({ title, className }: Props) => {
  return (
    <div
      className={`mt-1 rounded-[8px] bg-[#FFF3F3] px-4 py-2 text-[13px] font-normal ${className}`}
    >
      <p className="text-destructive">{title}</p>
    </div>
  );
};
