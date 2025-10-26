"use client";
import React from "react";
import AdminProfile from "../profile/AdminProfile";
import CommonButton from "./button/CommonButton";
import CommonHeader from "./header/CommonHeader";

const DashNavbar = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <div className=" w-full p-6 flex justify-between items-center bg-white  border-b-[1.73px] border-border h-16">
        <CommonHeader size="lg">Dashboard</CommonHeader>
        <CommonButton
          onClick={() => setOpen(true)}
          variant="secondary"
          size="md"
          className=" "
        >
          Admin Profile
        </CommonButton>
      </div>

      {open && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 z-10 flex items-center justify-center">
          <AdminProfile setIsOpen={setOpen} />
        </div>
      )}
    </>
  );
};

export default DashNavbar;
