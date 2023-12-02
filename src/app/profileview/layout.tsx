export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <section>
        <div className="flex min-h-screen flex-col bg-amber-200">
         {children}
        </div>
      </section>
    )
  }