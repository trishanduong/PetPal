
import Image from "next/legacy/image";

const MiddleContent = () => {

  return (
    <div className="relative flex w-full bg-teal-500">
      <div
        className="w-full h-full" 
        style={{
          backgroundImage: `url('https://utfs.io/f/afc3607d-2be4-41d0-b6f8-f58dcf324f90-1jx1rj.png')`,
          backgroundRepeat: 'repeat',
          opacity: 70,
        }}>
          <div className="lg:block lg:flex-row lg:items-center lg:justify-end lg:space-x-reverse lg:space-x-4"> 
            <div className="flex-wrap lg:flex-shrink px-5 bg-amber-300 p-3 m-4 mb-3 rounded-3xl">
              <h1 className="text-center font-extrabold leading-none tracking-tight mr-3 text-yellow-900 md:text-2xl lg:text-3xl dark:text-teal-900 p-4">Where Dogs Find Their Best Pals.</h1>
              <p className="text-xl px-4 text-amber-800">
                  {`Where Dogs Find Their Best Pals.`}
              </p>
          </div>
          <div className="flex-shrink-0 my-4">
            <Image
                src="https://utfs.io/f/4b075ffb-b46d-4e92-9cd8-4d39f304f31f-tu5fy1.png" 
                alt="Descriptive text for the image"
                width={500} 
                height={300} 
                layout="intrinsic" 
                className="rounded-md my-4"
              />
          </div>
        </div>
      </div>
    </div>
  )
}


export default MiddleContent;
  
