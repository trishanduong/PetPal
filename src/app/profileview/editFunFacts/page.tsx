
'use client'

import { api } from "~/trpc/react";

import EditFunFactsForm from "~/app/_components/editform/EditFunFactsForm";
import EditContents from "~/app/_components/editform/EditContents";
import LoadingModal from "~/app/_components/LoadingModal";

export default function EditFunFacts(){
  const {data: promptsQuery, isLoading, error} = api.prompt.getAllPrompts.useQuery();
  
  if(isLoading) return <LoadingModal />
  if (error) return <div>An error occurred: {error.message}</div>;
  
  return (
    <div>
      <EditContents/>
      {!isLoading && <EditFunFactsForm promptsQuery={promptsQuery}/>}
    </div>
  )
}