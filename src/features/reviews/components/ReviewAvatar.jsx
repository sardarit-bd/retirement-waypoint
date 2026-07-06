"use client";

export const ReviewAvatar = ({ name, initial, imageUrl }) => {
  if (imageUrl) {
    return (
      <div className="h-10 w-10 rounded-full overflow-hidden flex-shrink-0">
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className="h-10 w-10 rounded-full bg-[#C9A84C]/20 flex items-center justify-center flex-shrink-0">
      <span className="text-sm font-semibold text-[#1B2B4B]">
        {initial}
      </span>
    </div>
  );
};