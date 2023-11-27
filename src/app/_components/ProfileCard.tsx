import Image from 'next/image';

export const ProfileCard = () => {
  return (
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow mt-6 p-3 dark:bg-amber-800 dark:border-amber-700 drop-shadow-md">
        <div className="flex flex-col items-center pb-10 drop-shadow-lg">
        <div className="relative mb-3 w-48 h-48 rounded-full shadow-lg overflow-hidden drop-shadow-md"> {/* Adjust the w-24 h-24 to the size you want */}
          <Image
            src="https://utfs.io/f/29867864-0d39-4367-a5be-9c1fbdf08d5d-1xbwre.jpeg"
            alt="Profile image"
            layout="fill"
            objectFit="cover" // This will cover the area of the div, and the image will be cropped if not a square
            className="rounded-full border-4 border-amber-300" // This will ensure the image itself is also rounded if the parent div is rounded
          />
          </div>
          <h5 className="mb-1 text-3xl font-medium text-amber-900 dark:text-white drop-shadow-md">{`${'Astro'.toUpperCase()}`}</h5>
          <span className="text-sm text-gray-500 dark:text-amber-400">3 years old | 5 miles away</span>
          <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-amber-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#pitbull</span>
            <span className="inline-block bg-amber-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#large</span>
            <span className="inline-block bg-amber-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#neutered</span>
          </div>
        </div>
    </div>
  );
};

export default ProfileCard;
