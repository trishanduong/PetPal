export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <section className="bg-amber-200">
        <div className="flex min-h-screen flex-col max-w-3xl mx-auto px-4">
         {children}
        </div>
      </section>
    )
  }