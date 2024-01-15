import Image from "next/legacy/image"

const Testimonial = () => {

    return (
      <div className="flex flex-col p-8 bg-yellow-400">
        <svg className="w-10 h-10 mx-auto mb-3 text-amber-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fillRule="inherit" viewBox="0 0 18 14">
           <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
        </svg>
        <blockquote className="self-center ">
          <p className="text-2xl italic font-bold text-center text-gray-900 dark:text-teal-800">{`"Petpals is just awesome. My dogs have never been more happy and social! Perfect choice to for you spend less time planning and more time for them to play."`}</p>
        </blockquote>
        <div className="flex items-center justify-center mt-6 space-x-3 rtl:space-x-reverse">
          <Image className="w-6 h-6 rounded-full" height={24} width={24} src='/placeholder.jpg' alt="profile picture" />
          <div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-500 dark:divide-gray-700">
            <p className="pe-3 font-medium text-teal-600">Steven Quach</p>
            <p className="ps-3 text-sm text-amber-900">Pet Owner</p>
          </div>
        </div>
      </div>
    )
  }

  export default Testimonial;