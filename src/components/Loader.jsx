import { Triangle } from "react-loader-spinner"

const Loader = () => {
  return (
    <div className='absolute z-50 top-[40%] left-[40%]'>
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