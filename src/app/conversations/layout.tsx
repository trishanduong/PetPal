import SideBar from "./components/Sidebar"

export default async function ConversationsLayout({
  children
}: {
  children: React.ReactNode
}) {

  return (
    <SideBar>
      <div className="h-full">
        {children}
      </div>
    </SideBar>
  )
}