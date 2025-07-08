import NavbarData from "./Navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import { getCurrentUser } from "@/actions/getCurrentUser";

const Header = async() =>{
    const session = await getServerSession(authOptions)
    const currentUser = await getCurrentUser()
return(
 <NavbarData email={session?.user.email} name={session?.user.name} currentRole={currentUser?.role ?? "USER"} />
)}
export default Header;