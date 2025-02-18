'use client'

import { useState } from 'react'
import Image from 'next/image'

interface MenuItem {
  id: number
  label: string
  icon?: string
}

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState(1)
  const profileImageUrl = "https://th.bing.com/th/id/OIP.GKAbRpYzDlJa139WC8xPtwHaIC?rs=1&pid=ImgDetMain"

  const menuItems: MenuItem[] = [
    { id: 1, label: 'ข้อมูลคุณแม่' },
    { id: 2, label: 'ข้อมูลเรื่องเล่าจากคุณแม่' },
    { id: 3, label: 'ข้อมูลการดูแลทารก' },
    { id: 4, label: 'ข้อมูลคำถามที่พบบ่อย' },
    { id: 5, label: 'ข้อมูลติดต่อกับพยาบาล' },
  ]

  return (
    <div className="w-64 bg-white shadow-md h-screen">
      {/* Profile Section */}
      <div className="p-4 border-b">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full overflow-hidden">
            <img
              src={profileImageUrl}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="mt-2 text-xl font-semibold">Admin Name</h2>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="mt-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveMenu(item.id)}
            className={`w-full px-4 py-3 text-left hover:bg-gray-100 transition-colors ${
              activeMenu === item.id ? 'bg-blue-50 text-blue-600' : ''
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  )
}

export default Sidebar