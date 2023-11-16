import './Select.css'

export default function Select({label,option,...rest}){
    return (
        <div className='selectWrapper'>
            <p className='label' >{label}</p>
            <select className='select' {...rest}>
                <option>=== PILIH ===</option>
                {
                (option)
                    ?
                    option.map(function(item,index){
                        return (
                            <option value={item.nama} key={index}>{item.nama}</option>
                        )
                    }) : (
                        <option >Sedang mengambil data...</option>
                    )
                }
            </select>
        </div>
    )
}