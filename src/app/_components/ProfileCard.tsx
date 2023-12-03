import type { FC } from 'react';
import Image from 'next/image';

type ProfileCardProps = {
  userId: string,
  name: string,
  age: number,
  bio: string,
  profilePic: string | null,
  sex: string,
  city: string | null,
}

const ProfileCard: FC<ProfileCardProps> = ({name, age, profilePic, city}) => {
  return (
      <div className="float-right  bg-yellow-700 rounded-lg shadow mt-3 p-3 px-6 drop-shadow-md">
        <div className="flex flex-col items-center pb-10 drop-shadow-lg">
        <div className="relative mb-3 w-48 h-48 px-5 rounded-full shadow-lg overflow-hidden drop-shadow-md"> {/* Adjust the w-24 h-24 to the size you want */}
          <Image
            src={profilePic ?? 'https://utfs.io/f/c4fa08ea-9589-4d9d-861e-758b50b65731-8lwivt.jpg'}
            alt={`${name}'s profile picture`}
            layout="fill"
            objectFit="cover" // This will cover the area of the div, and the image will be cropped if not a square
            className="rounded-full border-4 border-amber-300" // This will ensure the image itself is also rounded if the parent div is rounded
          />
          </div>
          <h5 className="mb-1 text-3xl font-medium text-amber-900 dark:text-white drop-shadow-md">{`${name}`}</h5>
          <span className="text-sm text-gray-500 dark:text-amber-400">{age} years old | {`${city?.toLowerCase()}`}</span>
        </div>
    </div>
  );
};

export default ProfileCard;
