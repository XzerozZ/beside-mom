"use client";

import { useState } from "react";
import Sidebar from "../components/SideBarAdmin";
import AllMomInfoPage from "../components/allmominfopage";
export default function AdminPage() {
  const [selectedItem, setSelectedItem] = useState("1"); // Default selected item

  const renderContent = () => {
    switch (selectedItem) {
      case "1":
        return <AllMomInfoPage />;
      case "2":
        return <div className="text-black">Content 2</div>;
      case "3":
        return <div className="text-black">Content 3</div>;
      case "4":
        return <div className="text-black">Content 4</div>;
      case "5":
        return <div className="text-black">Content 5</div>;
      case "6":
        return <div className="text-black">Content 6</div>;
      case "7":
        return <div className="text-black">Content 7</div>;
      default:
        return <div>Select an item from sidebar</div>;
    }
  };

  return (
    <div className="flex bg-gray-100">
      <Sidebar onItemSelect={setSelectedItem} selectedItem={selectedItem} />
      <div className="flex-1 p-6">{renderContent()}</div>
    </div>
  );
}
