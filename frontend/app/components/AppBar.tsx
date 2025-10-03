"use client";
import React, { useEffect, useState } from "react";
import LinkButton from "./Buttons/LinkButton";
import { useRouter, usePathname } from "next/navigation";
import PrimaryButton from "./Buttons/PrimaryButton";
import { fetchUser } from "../utils/userData";
import UserRenderer from "./UserRenderer";

const AppBar = () => {
  const [user, setUser] = useState<any>(null);
  const [auth, setAuth] = useState(0);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const getUser = async () => {
      const userData = await fetchUser();
      setUser(userData);
    };
    getUser();
  }, []);

  console.log("the value of auth is : ", auth);

  return (
    <div className="flex border-b-2 justify-between items-center p-5 h-12">
      <div className="text-2xl font-bold text-amber-600">
        <div className="flex">
          <div className="text-black font-extrabold">_</div>
          <div onClick={() => router.push("/")} className="shadow-xs cursor-pointer">
            Zapier
          </div>
        </div>
      </div>

      <div className="flex gap-5 font-light text-sm">
        {user ? (
          <UserRenderer user={user}></UserRenderer>
        ) : (
          auth === 0 && (
            <>
              <LinkButton onclick={() => router.push("/contact")} auth={auth} setAuth={setAuth}>
                Contact Sales
              </LinkButton>

              {pathname !== "/login" && (
                <LinkButton onclick={() => router.push("/login")} auth={auth} setAuth={setAuth}>
                  Log-In
                </LinkButton>
              )}

              {pathname !== "/signup" && (
                <PrimaryButton onClick={() => router.push("/signup")} width={{ x: 5, y: 1 }}>
                  Sign-Up
                </PrimaryButton>
              )}
            </>
          )
        )}
      </div>
    </div>
  );
};

export default AppBar;
