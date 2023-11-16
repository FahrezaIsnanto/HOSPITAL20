import './Input.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Input({label,...rest}){
    return (
        <div className='inputWrapper'>
            <p className='label' >{label}</p>
            <DatePicker className='input' {...rest}/>
        </div>
    )
}