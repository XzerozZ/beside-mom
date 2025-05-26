import React from 'react';
import Navbar from '../component/navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col">
        <header className="fixed top-0 left-0 w-full">
          <Navbar />
        </header>
        <main className="mt-[112px] max-sm:mt-[112px]">
          {children}
        </main>
      </div>
    );
}