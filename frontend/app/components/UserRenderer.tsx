import React from "react";
import Image from "next/image";

const UserRenderer = ({ user }: { user: any }) => {
  const { username, image } = user;

  return (
    <div className="flex items-center gap-3">
      <div className="font-medium">{username}</div>
      <div>
        <Image
          src={image}
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
