
import AuthForm from "./components/AuthForm";

export default function Home() {
  return (
    <main>
      <div className="flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8 bg-yellow-400">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="font-bold text-slate-800 text-7xl pl-5 py-2 pr-30 text-center">
            PetPal 🐾
          </div>
        </div>
        <AuthForm/>
      </div>
    </main>
  )
}
