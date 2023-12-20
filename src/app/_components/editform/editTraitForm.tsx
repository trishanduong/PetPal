
'use client'
import type { FC } from 'react';
import {useForm, type SubmitHandler, Controller} from 'react-hook-form';

import { useRouter } from 'next/navigation';
import { api } from '~/trpc/react';

type TraitsFormProps = {
  traitsId: string,
}

type FormInputs = {
    species: string,
    children: string,
    neutered: string,
    weight: number,
    size: string,
    energyLevel: number,

    traitsId: string,
  };
  

const EditTraitsForm: FC<TraitsFormProps> = ({traitsId}) => {
    const router = useRouter();
    const { handleSubmit, control} = useForm<FormInputs>();
    const updateTraits = api.traits.updateTraits.useMutation();
    const {data: traits, isLoading, error} = api.traits.getTraitsById.useQuery({traitsId});
    if(isLoading) return <div>Loading...</div>
    if (error) return <div>An error occurred: {error.message}</div>;
    console.log('traitsId', traitsId)

    const onSubmit: SubmitHandler<FormInputs> = async (data: FormInputs) => {
        const {species, children, neutered, weight, size, energyLevel} = data;
        const convertedWeight = Number(weight);
        const convertedEnergyLevel = Number(energyLevel);
        console.log('type weight:', typeof convertedWeight);
        await updateTraits.mutateAsync({species, children, neutered, size, weight: convertedWeight, energyLevel: convertedEnergyLevel, traitsId});
        router.push('/profileview')
    }

      
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
                <label>What is your breed?</label>
                <Controller 
                  control = {control}
                  name="species"
                  defaultValue={traits.species ?? 'Mixed'}
                  render={({field})=> (
                    <input type="text" {...field} className='block w-full rounded-md border-0 px-2.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 ' />
                  )}
                />
                
                <label>On a scale of 1 to 5, what is your energy level?</label>
                <Controller
                  control={control}
                  name="energyLevel"
                  defaultValue={traits.energyLevel ?? 1}
                  render={({ field }) => (
                    <input type="number" {...field} className='block w-full rounded-md border-0 px-2.5 py-1.5 text-gray-900' />
                  )}
                />

                <div className="flex justify-between">

                <div className='flex flex-col'>
                    <label>Weight: </label>
                    <Controller 
                        control={control}
                        name="weight"
                        defaultValue={traits.weight ?? 0}
                        render={({field})=> (
                          <input type="number" {...field} className='block w-full rounded-md border-0 px-2.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600'/>
                        )}
                    />
                </div>
                
                <div className='flex flex-col'>
                    <label>Any children?</label>
                    <Controller
                        control = {control}
                        name="children"
                        defaultValue={traits.children ?? 'No children'}
                        render={({field})=>(
                            <select {...field} className='block w-full rounded-md border-0 px-1 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600'>
                                <option value="has children">Has children</option>
                                <option value="no children">No children</option>
                            </select>
                        )}
                    />
                </div>

                <div className='flex flex-col'>
                    <label>Neutered?</label>
                    <Controller
                      control={control}
                      name="neutered"
                      defaultValue={traits.neutered ?? 'not neutered'}
                      render={({field})=>(
                        <select {...field} className='block w-full rounded-md border-0 px-1.5 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600'>
                            <option value="neutered">Neutered</option>
                            <option value="no neutered">Not neutered</option>
                        </select>
                      )}
                    />
                </div>
                </div>
                
                <label>Size: </label>
                <Controller
                  control={control}
                  name="size"
                  defaultValue={traits.size ?? 'small'}
                  render={({field})=>(
                    <select {...field} className='block w-full rounded-md border-0 px-1 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600'>
                        <option value="small">SMALL: 2 to 22 lbs</option>
                        <option value="medium">MEDIUM: 24 to 57 lbs</option>
                        <option value="large">LARGE: 59 to 99 lbs</option>
                        <option value="xlarge">XLARGE: 100+ lbs</option>
                    </select>
                  )}
                />
                <div className="flex justify-center">
                <input type="submit" value="SAVE" className="bg-stone-500 text-white font-bold uppercase text-sm px-5 py-3 rounded-full shadow hover:bg-stone-600 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 w-2/4"/>
                </div>
            </form>
        </div>
    )
}

export default EditTraitsForm;