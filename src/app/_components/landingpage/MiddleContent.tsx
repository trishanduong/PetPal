
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
          <div className="m-4"> 
            <div className="lg:flex lg:items-center bg-amber-200 justify-around py-6">
              <div className="lg:w-1/2 flex flex-col tracking-tighter">
                <h1 className="sm:text-center font-extrabold text-yellow-900 text-4xl lg:text-4xl p-4">
                  Where Dogs Find Their Best Pals.
                </h1>
                <p className="text-xl p-4 ml-5 text-center text-yellow-700">
                  {`We developed algorithms to match your dog to their ideal playmate.
                    Filter dog profiles according to your preferences!`}
                </p>
              </div>
              <div className="lg:w-1/2 flex justify-center lg:flex-end lg:pr-5">
                <Image
                  src="https://utfs.io/f/e13ca9b7-7a92-45e3-8ae0-3313eeacadef-mxjulx.jpeg" 
                  alt="Descriptive text for the image"
                  width={500} 
                  height={300} 
                  layout="intrinsic" 
                  className="rounded-md my-4 hover:scale-110 transition translate"
                />
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

// lg:block lg:flex-row lg:items-center lg:justify-end lg:space-x-reverse lg:space-x-4
export default MiddleContent;
  
