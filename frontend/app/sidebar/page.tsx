"use client";
import React, { useState } from 'react';

const Page = () => {
  const [open, setOpen] = useState(false);
  console.log(open);

  return (
    <div onClick={() => setOpen(e => !e)}>
      hiii
    </div>
  );
};

export default Page;
