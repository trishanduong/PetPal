import Link from "next/link";

const EditContents = () => {
  return (
    <div className=" p-4 rounded-lg">
        <h1 className="text-xl mb-2 text-amber-900 font-extrabold self-start">EDIT PROFILE</h1>
        <div>
         <ul className='flex'>
            <li>
              <Link href="/profileview/edit" className='p-2 bg-yellow-400 rounded-md font-bold'>Profile</Link>
                </li>
            <li>
              <Link href="/profileview/editaboutme" className='p-2 bg-yellow-400 rounded-md font-bold'>About Me</Link>
            </li>
            <li>
              <Link href="/profileview/editFunFacts" className='p-2 bg-yellow-400 rounded-md font-bold'>Fun Facts</Link>
            </li>
          </ul>
        </div>
    </div>
  )
}

export default EditContents;