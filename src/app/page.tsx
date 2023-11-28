

const Hero = () => {
  return (
    <section className="bg-white dark:bg-yellow-500">
      <div className="grid max-w-screen-2xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
              <h1 className="max-w-2xl ml-5 mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-amber-900">The ultimate doggy playdate app.</h1>
              <p className="max-w-2xl ml-6 mt-3 mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-amber-800">Help your dog find their soul playmate!</p>
              <a href="#" className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                  Get started
                  <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
              </a>
              <a href="#" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                  Speak to Sales
              </a> 
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
              <img src="https://utfs.io/f/f5bebfed-eee4-42d8-b4f4-72db7eda56b7-lymynx.png" alt="mockup" />
              <div className="bg-yellow-300 rounded-lg w-4/6"></div>
          </div>                
      </div>
    </section>

  )
}
export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center bg-amber-200">
      <Hero></Hero>
    </main>
  );
}