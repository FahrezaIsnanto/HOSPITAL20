import './Input.css'

export default function Input({label,...rest}){
    return (
        <div className='inputWrapper'>
            <p className='label' >{label}</p>
            <input className='input' {...rest}/>
        </div>
    )
}