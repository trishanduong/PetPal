export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <section>
        <div className="flex min-h-screen flex-col items-center bg-gradient-to-t from-amber-100 via-amber-150 to-amber-300">
         {children}
        </div>
      </section>
    )
  }