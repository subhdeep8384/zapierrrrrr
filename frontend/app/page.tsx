"use client";
// import { useSession } from "next-auth/react";
import AppBar from "./components/AppBar";
import HeroSection from "./components/HeroSection";

export default function Home() {
  // const session = useSession() ;
  // console.log("SESSION IS ::::::::::::::::::::" , session)
  return (
   <div>
    
    <HeroSection/>
   </div>
  );
}
