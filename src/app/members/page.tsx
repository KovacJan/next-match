import Link from "next/link";
import React from "react";

const MembersPage: React.FC = () => {
  return (
    <div>
      <h3 className="text-3xl">This will be the members page</h3>
      <Link href="/">Go back to home</Link>
    </div>
  );
};

export default MembersPage;
