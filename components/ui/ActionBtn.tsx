'use client'

import { IconType } from "react-icons"; 

interface ActionBtnProps{
icon:IconType;
onClick : (e:React.MouseEvent<HTMLButtonElement>)=>void;
disabled?:boolean
}

const ActionBtn:React.FC<ActionBtnProps> = ({icon:Icon,onClick,disabled}) => {
    return ( <button onClick={onClick} disabled={disabled} style={{width:'35px',height:"25px"}} className={`border rounded d-flex justify-content-center align-items-enter my-2 text-white ${disabled && "opacity-50"}`} ><Icon size={22} /></button> );
}
 
export default ActionBtn;