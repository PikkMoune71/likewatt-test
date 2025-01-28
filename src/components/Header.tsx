import React from "react";
import { Logo } from "./Logo";

export const Header = () => {
  return (
    <header
      style={{ height: 80 }}
      className="fixed inset-x-0 z-50 flex h-20 w-screen shadow-sm backdrop-blur-md"
    >
      <div className="mx-auto sm:flex w-full max-w-7xl items-center justify-between px-4 xs:column">
        <div className="flex justify-center items-center gap-1">
          <h1>
            <Logo />
          </h1>
        </div>
        <p className="text-center text-sm text-gray-500">
          Test technique pour le poste de Développeur Front-End
        </p>
      </div>
    </header>
  );
};
