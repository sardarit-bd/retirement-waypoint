const DomainProgress = ({ domain, current, total, progressPercent }) => {
  return (
    <div className="mb-6">
      <div className="h-1 rounded-full bg-white/15">
        <div
          className="h-1 rounded-full bg-[#C9A84C] transition-all duration-500"
          style={{
            width: `${Math.max(progressPercent, 8)}%`,
          }}
        />
      </div>

      <div className="mt-2 flex flex-wrap justify-between gap-2 text-xs text-white/50">
        <span>{domain.label}</span>
        <span>
          Domain {current + 1} of {total}
        </span>
      </div>
    </div>
  );
};

export default DomainProgress;