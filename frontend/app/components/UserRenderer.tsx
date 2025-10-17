import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

const UserRenderer = ({ user }: { user: { username: string; image: string } }) => {
  const { username } = user;
  const session = useSession()
  console.log("The session is ::::: ", session)
  return (
    <div className="flex items-center gap-3">
      <div className="font-medium">{username}</div>
      <div>
        <Image
          src={ "https://cdn-icons-png.freepik.com/512/0/93.png"}
          alt="user"
          width={30}
          height={50}
          className="rounded-full"
          unoptimized
        />
      </div>
    </div>
  );
};

export default UserRenderer;
