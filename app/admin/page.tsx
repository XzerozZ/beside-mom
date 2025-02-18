import Sidebar from '../components/SideBarAdmin'

export default function AdminPage() {
  return (
    <div className="flex bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        {/* Add your main content here */}
      </div>
    </div>
  )
}