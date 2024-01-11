/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use client';

import axios from "axios";
import toast from "react-hot-toast";

import type { FieldValues, SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

import { useCallback, useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation";

import Button from "~/app/_components/inputs/Button";
import Input from "~/app/_components/inputs/Input";

import AuthSocialButton from "./AuthSocialButton";
import {BsDiscord, BsGoogle} from 'react-icons/bs';


type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();

  const [variant, setVariant] = useState<Variant>('LOGIN');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=> {
    if(session.status === 'authenticated'){
      router.push('/swipe')
    }
  }, [session?.status, router]);

  const toggleVariant = useCallback(()=>{
    if(variant === 'LOGIN') {
        setVariant('REGISTER')
    }  else setVariant('LOGIN')
  }, [variant]);

  const {
    register, 
    handleSubmit, 
    formState: {
    errors }
  } = useForm<FieldValues>({
    defaultValues: {
        name: '',
        email: '',
        password: '',
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = async(data) => {
    setIsLoading(true);

    if(variant === 'REGISTER') {
      //Axios Register
      axios.post('/api/register', data)
      .then(async()=> {
        await signIn('credentials', data);
      })
      .catch(()=> toast.error("Something went wrong!"))
      .finally(()=> {
        setIsLoading(false);
        router.push('/form')
      });
    };
    
    if(variant === 'LOGIN') {
      //NextAuth signin
      await signIn('credentials', {
        ...data, 
        redirect: false
      })
      .then((callback)=>{
        if(callback?.error) {
          toast.error('Invalid credentials');
        };

        if(callback?.ok && !callback?.error) {
          toast.success('Logged in!')}
          router.push('/')
      })
      .finally(()=> {
        setIsLoading(false);
      })
    }
  };

  const socialAction = async(action: string) => {
    setIsLoading(true);

    //NextAuth signin
    await signIn(action, {
      redirect: false,
    })
    .then((callback)=>{
      if(callback?.error) {
        toast.error('Invalid credentials')
      }

      if(callback?.ok && !callback?.error){
        toast.success('Logged in!')
      }
    })
    .finally(()=> {
      setIsLoading(false);

      if(variant === 'REGISTER'){
        router.push('/form');
      }
    })
  }

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
           {variant === 'REGISTER' && (
              <Input id="name" label="Name" register={register} errors={errors} disabled={isLoading}/>
            )}
           <Input id="email" label="Email address" register={register} errors={errors} disabled={isLoading}/>
           <Input id="password" label="Password" register={register} errors={errors} disabled={isLoading}/>
           <Button
             disabled={isLoading}
             fullWidth
             type="submit"
           >
            {variant === 'LOGIN' ? 'Sign in' : 'Register'}
           </Button>
          </form>

          <div className="mt-6">
          <div className="relative">
            <div 
              className="
                absolute 
                inset-0 
                flex 
                items-center
              ">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <AuthSocialButton icon={BsDiscord} onClick={()=> socialAction('github')}/>
            <AuthSocialButton icon={BsGoogle} onClick={()=> socialAction('google')}/>
          </div>

          <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
             <div>
                {variant === 'LOGIN' ? 'New to Messenger?': 'Already have an account?'}
             </div>
             <div onClick={toggleVariant} className="unerline cursor-pointer">
                {variant === 'LOGIN' ? 'Create an account' : 'Login'}
             </div>
          </div>
          </div>
        </div>
    </div>
  )
};

export default AuthForm;