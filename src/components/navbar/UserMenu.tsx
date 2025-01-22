"use client";

import { signOutUser } from "@/app/actions/authActions";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Link,
} from "@nextui-org/react";
import { Session } from "next-auth";
import React from "react";

type Props = {
  user: Session["user"];
};

const UserMenu: React.FC<Props> = ({ user }: Props) => {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          color="secondary"
          name={user?.name || "user avatar"}
          size="sm"
          src={user?.image || "/images/user.png"}
        />
      </DropdownTrigger>
      <DropdownMenu variant="flat" aria-label="User actions menu">
        <DropdownSection showDivider>
          <DropdownItem
            isReadOnly
            as="span"
            className="h-14 flex flex-row"
            aria-label="User name"
            key={"signed-in"}
          >
            Signed in as {user?.name}
          </DropdownItem>
        </DropdownSection>
        <DropdownItem as={Link} href="/members/edit" key={"edit-profile"}>
          Edit profile
        </DropdownItem>
        <DropdownItem
          color="danger"
          onPress={async () => signOutUser()}
          key={"sign-out"}
        >
          Log out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserMenu;
