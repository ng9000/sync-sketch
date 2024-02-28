"use client";

import { EmptyBoards } from "./empty-boards";
import { EmptyFavorites } from "./empty-favorites";
import { EmptySearch } from "./empty-search";

interface BoardListProps {
  organizationId: string;
  query: {
    search?: string;
    favorite?: string;
  };
}

export const BoardList = ({ organizationId, query }: BoardListProps) => {
  const data = [];

  if (!data?.length && query.search) {
    return <EmptySearch />;
  }
  if (!data?.length && query.favorite) {
    return <EmptyFavorites />;
  }
  if (!data?.length) {
    return <EmptyBoards />;
  }
  return <div>BoardList</div>;
};
