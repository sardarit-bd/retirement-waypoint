import { Loader2, ShieldCheck } from "lucide-react";
import AssessmentShell from "./AssessmentShell";

const glassCard = "rounded-[32px] border border-white/15 bg-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-2xl";

const EmailPage = ({
  user,
  errors,
  onUserChange,
  onBack,
  onSubmit,
  isSubmitting,
  validateEmail,
  totalSteps = 7,
}) => {
  return (
    <AssessmentShell>
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 mt-13">
          <div className="h-1 rounded-full bg-white/15">
            <div
              className="h-1 rounded-full bg-[#C9A84C] transition-all duration-500"
              style={{ width: "100%" }}
            />
          </div>

          <div className="mt-2 flex justify-between text-xs text-white/50">
            <span>Final step</span>
            <span>Step {totalSteps} of {totalSteps}</span>
          </div>
        </div>

        <div className={`${glassCard} p-6 sm:p-8`}>
          <h2 className="mb-3 text-2xl font-semibold text-white">
            Before You View Your Report
          </h2>

          <p className="mb-6 text-sm leading-7 text-white/70">
            Email Address (Optional): If you would like a customized report that integrates your survey items and reflections, along with observations from Dr. Allen, please include your e-mail address. You will receive a narrative report that provides insights into how to move forward in your retirement journey. In addition, you will also be able to re-take the survey to measure changes in your profile over time.
          </p>

          <label className="mb-2 block text-sm font-semibold text-white/70">
            Email address (Optional)
          </label>
          <input
            className={`mb-1 w-full rounded-xl border bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:ring-2 ${
              errors.email
                ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
                : "border-white/10 focus:border-[#C9A84C] focus:ring-[#C9A84C]/20"
            }`}
            placeholder="you@example.com"
            type="email"
            value={user.email}
            onChange={(e) => {
              const value = e.target.value;
              onUserChange({ ...user, email: value });
            }}
            onBlur={() => {
              if (validateEmail && user.email) {
                validateEmail(user.email);
              }
            }}
          />
          {errors.email ? (
            <p className="mb-5 text-xs font-medium text-red-300">{errors.email}</p>
          ) : (
            <div className="mb-5" />
          )}

          <div className="mb-7 flex gap-2 rounded-2xl border border-[#C9A84C]/20 bg-[#C9A84C]/10 p-4 text-sm leading-6 text-white/65">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#C9A84C]" />
            <p>
              Your information is never shared or sold. Dr. David Allen may
              follow up with resources tailored to your results.
            </p>
          </div>

          <div className="flex items-center justify-between gap-3">
            <button
              onClick={onBack}
              disabled={isSubmitting}
              className="cursor-pointer rounded-xl border border-white/15 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/15 disabled:opacity-40"
            >
              Back
            </button>

            <button
              onClick={onSubmit}
              disabled={isSubmitting}
              className="cursor-pointer rounded-xl bg-[#C9A84C] px-5 py-2.5 text-sm font-semibold text-[#1B2B4B] shadow-lg transition hover:-translate-y-0.5 hover:bg-[#D6B45A] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="inline h-4 w-4 mr-2 animate-spin" />
                  Generating Report...
                </>
              ) : (
                "View Report"
              )}
            </button>
          </div>
        </div>
      </div>
    </AssessmentShell>
  );
};

export default EmailPage;
