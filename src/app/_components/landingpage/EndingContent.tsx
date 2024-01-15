
import Image from "next/image";

const EndingContent = () => {

  return (
    <div className="w-full">
      <div id="about" className="bg-amber-300">
        <div className="flex items-center">
          <div className="flex-1"> 
            <Image
              src="https://utfs.io/f/e13ca9b7-7a92-45e3-8ae0-3313eeacadef-mxjulx.jpeg"
              alt="Cute dogs close to each other in a lavendar field."
              width={300}
              height={250}
              layout="responsive"/>
          </div>
          <div className="flex-1 px-4">
            <h1 className="sm:text-center font-extrabold text-yellow-900 text-4xl lg:text-4xl p-4">
            Lets work together!
            </h1>
            <p className="text-xl px-4 text-center text-amber-800">
            {`We're looking for pet owners who want to enrich their dogs lives.`}
            </p>  
            <p className="text-xl px-4 text-center text-amber-800">
            {`Find your dog's soulmate with PetPals.`}
            </p>  
          </div>
      </div>
    </div>
  </div>
  )
};

export default EndingContent;