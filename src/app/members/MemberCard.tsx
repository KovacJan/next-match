'use client';

import React from "react";
import { Card, CardFooter, Link } from "@nextui-org/react";
import { Member } from "@prisma/client";
import { Image } from "@nextui-org/react";
import { calculateAge } from "@/lib/util";
import LikeButton from "@/components/LikeButton";

type Props = {
  member: Member;
  likeIds: string[];
};

const MemberCard: React.FC<Props> = ({ member, likeIds }: Props) => {
  const hasLiked = likeIds.includes(member.userId);

  const preventLinkAction = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <Card as={Link} href={`/members/${member.userId}`} fullWidth isPressable>
      <Image
        isZoomed
        alt={member.name}
        width={300}
        src={member.image || "/images/user.png"}
        className="aspect-square object-cover"
      />
      <div onClick={preventLinkAction}>
        <div className="absolute top-3 right-3 z-50">
          <LikeButton targetId={member.userId} hasLiked={hasLiked} />
        </div>
      </div>
      <CardFooter className="flex justify-start bg-dark-gradient overflow-hidden absolute bottom-0 z-10">
        <div className="flex flex-col text-white">
          <span className="font-semibold">
            {member.name}, {calculateAge(member.dateOfBirth)}
          </span>
          <span className="font-sm">{member.city}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default MemberCard;
