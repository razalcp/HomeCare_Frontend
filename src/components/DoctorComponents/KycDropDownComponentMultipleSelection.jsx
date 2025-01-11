import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import colourOptions from '../../../docs/colorData'
import { useState, useEffect } from 'react'

const KycDropDown = (props) => {
    //options is send as props while the component is used

    const [selected, setSelected] = useState([])

    useEffect(() => {
        console.log("state value", selected)

    }, [selected])

    const animatedComponent = makeAnimated()

    const handleChange = (e) => {

        for (let i = 0; i < e.length; i++) {
            setSelected([...selected, e[i].value])

        }

    }

    return (
        <>
            <Select
                onChange={handleChange}
                name={props.name}
                closeMenuOnSelect={false}
                component={animatedComponent}
                isMulti
                className="w-[14.25rem]"
                options={colourOptionsf11}

            />
        </>
    )

}


export default KycDropDown;










// const KycDropDown = (props) => {


//     return (
//         <>
//             <select name={props.name} value={props.value} className="border border-slate-500 h-[2.25rem] w-[14.25rem]">
//                 {/* <option value="">Choose an Option</option> */}
//                 <option value="">option 1</option>
//                 <option value="">option 2</option>
//                 <option value="">option 3</option>
//             </select>
//         </>
//     )
// }

// export default KycDropDown;