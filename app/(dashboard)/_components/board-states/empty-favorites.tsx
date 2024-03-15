import Image from "next/image";
import React from "react";

export const EmptyFavorites = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center select-none">
      <Image
        src="/empty-favorites.svg"
        width={140}
        height={140}
        alt="empty search"
        draggable={false}
      />
      <h2 className="text-2xl font-semibold mt-6">No favorite boards!</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Try searching for something else
      </p>
    </div>
  );
};
