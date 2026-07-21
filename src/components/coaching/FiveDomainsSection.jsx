import React from "react";

function FiveDomainsSection({ domains }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {domains.map((domain) => {
        const Icon = domain.icon;
        return (
          <div
            key={domain.id}
            className={`group relative flex flex-col overflow-hidden rounded-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
              domain.featured
                ? "border border-[#C9A84C]/30 hover:border-[#C9A84C]/70 hover:shadow-[#C9A84C]/20"
                : "border border-white/10 hover:border-[#C9A84C]/50 hover:shadow-[#C9A84C]/10"
            }`}
          >
            {/* Top Header Area */}
            <div
              className={`relative overflow-hidden px-5 pb-4 pt-6 ${
                domain.featured ? "bg-[#C9A84C]/10" : "bg-[#1B2B4B]/80"
              }`}
            >
              {/* Decorative circle top-right */}
              <div
                className={`absolute -right-8 -top-8 h-24 w-24 rounded-full ${
                  domain.featured ? "bg-[#C9A84C]/10" : "bg-[#C9A84C]/5"
                }`}
              ></div>

              {/* Icon */}
              <div className="mb-3">
                <Icon className="h-8 w-8 text-[#C9A84C]" />
              </div>

              {/* Category label */}
              <div className="mb-3 text-xs font-semibold tracking-[0.2em] text-[#C9A84C] uppercase">
                FIVE DOMAINS
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold leading-tight text-white">
                {domain.title}
              </h3>

              {/* Italic subtitle */}
              <p className="mt-1 italic text-white/50 text-sm">
                {domain.subtitle}
              </p>
            </div>

            {/* Bottom Content Area */}
            <div className="flex flex-1 bg-[#04103A] px-5 pb-6 pt-4">
              <p className="text-sm leading-relaxed text-white/60">
                {domain.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default FiveDomainsSection;
