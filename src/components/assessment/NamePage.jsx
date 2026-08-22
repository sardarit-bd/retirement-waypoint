import AssessmentShell from "./AssessmentShell";

const glassCard = "rounded-[32px] border border-white/15 bg-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-2xl";

const NamePage = ({
  user,
  errors,
  onUserChange,
  onBack,
  onContinue,
  validateName,
  totalSteps = 7,
}) => {
  return (
    <AssessmentShell>
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 mt-13">
          <div className="h-1 rounded-full bg-white/15">
            <div
              className="h-1 rounded-full bg-[#C9A84C] transition-all duration-500"
              style={{ width: `${Math.round((1 / totalSteps) * 100)}%` }}
            />
          </div>

          <div className="mt-2 flex justify-between text-xs text-white/50">
            <span>Getting started</span>
            <span>Step 1 of {totalSteps}</span>
          </div>
        </div>

        <div className={`${glassCard} p-6 sm:p-8`}>
          <h2 className="mb-2 text-2xl font-semibold text-white">
            Before we begin
          </h2>

          <p className="mb-7 text-sm leading-7 text-white/65">
            Your responses are confidential and used only to deliver your
            personalized results.
          </p>

          <label className="mb-2 block text-sm font-semibold text-white/70">
            Your Name (To be added to your report)
          </label>
          <input
            className={`mb-1 w-full rounded-xl border bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:ring-2 ${
              errors.name
                ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
                : "border-white/10 focus:border-[#C9A84C] focus:ring-[#C9A84C]/20"
            }`}
            placeholder="Your name"
            value={user.name}
            onChange={(e) => {
              const value = e.target.value;
              onUserChange({ ...user, name: value });
            }}
            onBlur={() => {
              if (validateName) {
                validateName(user.name);
              }
            }}
          />
          {errors.name ? (
            <p className="mb-5 text-xs font-medium text-red-300">{errors.name}</p>
          ) : (
            <div className="mb-5" />
          )}

          <div className="flex items-center justify-between gap-3">
            <button
              onClick={onBack}
              className="cursor-pointer rounded-xl border border-white/15 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/15"
            >
              Back
            </button>

            <button
              onClick={onContinue}
              className="cursor-pointer rounded-xl bg-[#C9A84C] px-5 py-2.5 text-sm font-semibold text-[#1B2B4B] shadow-lg transition hover:-translate-y-0.5 hover:bg-[#D6B45A]"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </AssessmentShell>
  );
};

export default NamePage;
