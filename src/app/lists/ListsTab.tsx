"use client";

import { Tab, Tabs } from "@nextui-org/react";
import { Member } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Key, useTransition } from "react";
import MemberCard from "../members/MemberCard";
import LoadingComponent from "@/components/LoadingComponent";

type Props = {
  members: Member[];
  likeIds: string[];
};

const ListsTab: React.FC<Props> = ({ likeIds, members }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const [isPending, startTransition] = useTransition();

  const tabs = [
    { id: "source", label: "Members I have liked" },
    { id: "target", label: "Members that liked me" },
    { id: "mutial", label: "Mutual likes" },
  ];

  const handleTabChange = (key: Key) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      params.set("type", key.toString());
      router.replace(`${pathName}?${params.toString()}`);
    });
  };

  return (
    <div className="flex flex-col w-full mt-10 gap-5">
      <Tabs
        aria-label="Liek tabs"
        items={tabs}
        color="secondary"
        onSelectionChange={(key) => handleTabChange(key)}
      >
        {(item) => (
          <Tab key={item.id} title={item.label}>
            {isPending ? (
              <LoadingComponent />
            ) : (
              <>
                {members.length > 0 ? (
                  <div className="grid grid-cols-3 md:grid-cols-6 xl-grid-cols-6 gap-8">
                    {members.map((member) => (
                      <MemberCard
                        key={member.id}
                        member={member}
                        likeIds={likeIds}
                      />
                    ))}
                  </div>
                ) : (
                  <div>No members for this filter</div>
                )}
              </>
            )}
          </Tab>
        )}
      </Tabs>
    </div>
  );
};

export default ListsTab;
