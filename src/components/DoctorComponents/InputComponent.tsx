

// const InputComponent = (props) => {
//     console.log(props)
//     const handleChange = (value) => {

//     }

//     return (
//         <>
//             <input type="text" name={props.name} value={props.value} style={props.style} onChange={handleChange} className="border border-slate-500 h-[2.25rem] w-[14.25rem]" />
//         </>
//     )
// }

// export default InputComponent;


////


// const InputComponent = (props) => {
//     const handleChange = (e) => {
//         console.log("City value:", e.target.value); // 
//         if (props.onChange) {
//             props.onChange(e);
//         }
//     };

//     return (
//         <input
//             type="text"
//             name={props.name}
//             value={props.value}
//             style={props.style}
//             onChange={handleChange}
//             className="border border-slate-500 h-[2.25rem] w-[14.25rem]"
//         />
//     );
// };

// export default InputComponent;



///////////////////////////////////////

const InputComponent = (props) => {
    const handleChange = (e) => {
        if (props.onChange) {
            props.onChange(e);
        }
    };
   

    return (
        <input
            type="text"
            name={props.name}
            value={props.value}
            style={props.style}
            onChange={handleChange}
            onBlur={props.onBlur}
            className={`border border-slate-500 h-[2.25rem] w-[14.25rem] ${props.error ? 'border-red-500' : ''
                }`}
        />
    );
};

export default InputComponent;
