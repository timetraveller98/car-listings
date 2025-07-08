

interface AdminHeadingProps{
    title:string,
    center?:boolean
}

const AdminHeading:React.FC<AdminHeadingProps> = ({title,center}) => {
    return ( 
        <div className={center?'text-center':'text-start'}>
            <h1 className="fw-bold fs-4 my-4 text-primary">{title}</h1>
        </div>
     );
}
 
export default AdminHeading;