
type propsType = {
  percent: number,
}
export default function FormProgressBar(props: propsType) {

  
  return (
    <div className="relative pt-1 max-w-4xl">
      <div className="mb-2">
      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-amber-600 bg-amber-300">
        PROFILE IN PROGRESS
      </span>
      </div>
      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-amber-400 w-full">
        <div style={{ width: `${props.percent}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-amber-500"></div>
      </div>
    </div>
  )
}