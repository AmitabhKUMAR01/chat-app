import { Triangle } from "react-loader-spinner"

const Loader = () => {
  return (
    <div className='absolute z-50 top-[50%] left-[50%] ' style={{"transform": "translate(-50%, -50%)"}}>
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