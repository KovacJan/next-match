import React from "react";
import ListsTab from "./ListsTab";
import { fetchCurrentUserIds, fetchLikedMembers } from "../actions/likeActions";

const ListsPage: React.FC<{
  searchParams: { type: string };
}> = async ({ searchParams }: { searchParams: { type: string } }) => {
  const likeIds = await fetchCurrentUserIds();
  const members = await fetchLikedMembers(searchParams.type);

  return (
    <div>
      <ListsTab members={members} likeIds={likeIds} />
    </div>
  );
};

export default ListsPage;
