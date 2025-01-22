import React from "react";
import { getMembers } from "../actions/memberActions";
import MemberCard from "./MemberCard";
import { fetchCurrentUserIds } from "../actions/likeActions";

const MembersPage: React.FC = async () => {
  const members = await getMembers();
  const likeIds = await fetchCurrentUserIds();

  return (
    <div className="mt-10 grid grid-cols-3 md:grid-cols-6 xl-grid-cols-6 gap-8">
      {members?.map((member) => (
        <MemberCard key={member.id} member={member} likeIds={likeIds} />
      ))}
    </div>
  );
};

export default MembersPage;
