export function BookPlaceholder({ title, className = '' }) {
  return (
    <div 
      className={`flex h-full w-full items-center justify-center bg-gradient-to-br from-[#1B2B4B]/5 to-[#1B2B4B]/10 ${className}`}
    >
      <span className="text-lg font-bold text-[#1B2B4B]/30">
        {title?.charAt(0) || '?'}
      </span>
    </div>
  );
}