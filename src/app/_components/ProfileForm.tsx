'use client'

import { useUser } from '@clerk/nextjs';
import { api } from '~/trpc/react';

const initialState = {
    message: null,
};


export function SubmitButton() {
 
  return (
    <button type="submit" className='bg-slate-700 text-white'>
      Add
    </button>
  )
}

export function ProfileForm() {
    const profile = api.post.hello.useQuery({text: "Trisha"});
    console.log('profile', profile.data)

    return (
      <div>
        <form className="mt-4">
          <div>
            {/* <div>
              <label htmlFor="profilepicture">{`Upload a profile picture `}</label>
              <input type="file" id="todo" name="todo" required />
            </div> */}
            <div>
              <label htmlFor="name">{`What's your name? `}</label>
              <input type="text" id="todo" name="todo" required />
            </div>
          </div>
        {/* <label htmlFor="todo">{`Upload a profile picture `}</label>
        <input type="text" id="todo" name="todo" required /> */}
        <SubmitButton/>
      </form>
      </div>
    )
  }