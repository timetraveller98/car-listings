import { IconType } from "react-icons";

interface StatusProps{
    text:string;
    icon : IconType;
    bg:string;
    color:string
}

const Status:React.FC<StatusProps> = ({text,icon:Icon,bg,color}) => {
    return (
    <div className={`${bg} ${color} rounded d-flex align-items-center justify-content-center px-3 my-2 py-2`} 
        style={{ width: "100px", height: "30px" }}>
     {text} 
     <Icon size={15} className="ms-1" />
   </div>
   );
}
 
export default Status;