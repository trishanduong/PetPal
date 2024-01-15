
import Image from "next/image";

const MiddleContent = () => {

  return (
    <div className="w-full">
      <div id="about" className="bg-amber-300">
        <div className="flex items-center">
        <div className="flex-1 px-4">
            <h1 className="sm:text-center font-extrabold text-yellow-900 text-4xl lg:text-4xl p-4">
              Where Dogs Find Their Best Pals.
            </h1>
            <p className="text-xl px-4 text-center text-amber-800">
            {`We developed algorithms to match your dog to their ideal playmate. Filter dog profiles according to your preferences!`}
            </p>  
          </div>
          <div className="flex-1"> 
            <Image
              src="https://utfs.io/f/5c669464-78b0-4e01-8529-d8b890ddab28-lmtmvp.webp"
              alt="Cute dogs."
              width={200}
              height={250}
              layout="responsive"/>
          </div>
      </div>
    </div>
  </div>
  )
};

export default MiddleContent;