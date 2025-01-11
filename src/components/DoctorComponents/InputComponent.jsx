

const InputComponent = (props) => {

    const handleChange = (value) => {

    }

    return (
        <>
            <input type="text" name={props.name} value={props.value} onChange={handleChange} className="border border-slate-500 h-[2.25rem] w-[14.25rem]" />
        </>
    )
}

export default InputComponent;