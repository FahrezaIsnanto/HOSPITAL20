import "./ButtonPrimary.css";

export default function ButtonPrimary({text,...rest}){
    return  <a className="buttonPrimary" {...rest}>{text}</a>
}