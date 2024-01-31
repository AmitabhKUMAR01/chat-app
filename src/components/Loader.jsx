import { Triangle } from "react-loader-spinner"

const Loader = () => {
  return (
    <div className="w-[100vw] h-[100vh] grid justify-center text-center items-center " style={{background:' transparent'}} >
        <Triangle
      height="80"
      width="80"
      color="black"
      ariaLabel="triangle-loading"
      wrapperStyle={{}}
      wrapperClassName=""
      visible={true}
    />
      </div>
  )
}

export default Loader