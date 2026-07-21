const ReflectionInput = ({ domain, value, onChange }) => {
  return (
    <div className="mt-7 rounded-2xl border border-white/10 bg-white/10 p-5">
      <label className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-white/40">
        Reflection Question
      </label>

      <p className="mb-3 text-sm italic leading-7 text-white/70">
        {domain.reflection?.question || domain.open || ''}
      </p>

      <textarea
        className="min-h-[110px] w-full resize-y rounded-xl border border-white/10 bg-white/10 p-4 text-sm leading-7 text-white outline-none transition placeholder:text-white/35 focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
        value={value || ""}
        placeholder="Share your thoughts here..."
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default ReflectionInput;