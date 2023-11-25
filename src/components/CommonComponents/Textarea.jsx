

const Textarea = ({value , onChange}) => {
  return (
    <textarea
        required
        maxLength={"1000"}
        placeholder="say something ..."
        onChange={onChange}
        value={value}
        className="h-[4rem] border-2 outline-none"
      >
        {" "}
      </textarea>
  )
}

export default Textarea