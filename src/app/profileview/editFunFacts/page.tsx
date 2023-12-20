
'use client'

import { api } from "~/trpc/react";

import EditFunFactsForm from "~/app/_components/EditFunFactsForm";
import EditContents from "~/app/_components/editform/EditContents";

export default function EditFunFacts(){
  const {data: promptsQuery, isLoading, error} = api.prompt.getAllPrompts.useQuery();
  
  if(isLoading) return <div>Loading...</div>
  if (error) return <div>An error occurred: {error.message}</div>;
  
  return (
    <div>
      <EditContents/>
      {!isLoading && <EditFunFactsForm promptsQuery={promptsQuery}/>}
    </div>
  )
}