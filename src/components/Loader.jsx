import { Triangle } from "react-loader-spinner"

const Loader = () => {
  return (
    <div className="w-[100vw] h-[100vh] grid justify-center text-center items-center " style={{background:' #031731 '}} >
        <Triangle
      height="80"
      width="80"
      color="#4FC0D0"
      ariaLabel="triangle-loading"
      wrapperStyle={{}}
      wrapperClassName=""
      visible={true}
    />
      </div>
  )
}

export default Loader