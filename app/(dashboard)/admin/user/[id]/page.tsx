import { getRoles } from "@/actions/getRole";
import ManageUser from "./Manage";
import { db } from "@/libs/db";
interface StaticParam {
  id: string;
}

const Dynamic = async () => {
  const { roles } = await getRoles();
  return (
    <div>
      <ManageUser roles={roles} />
    </div>
  );
};
export default Dynamic;

export async function generateStaticParams(): Promise<StaticParam[]> {
  const users = await db.user.findMany();
  return users.map((user) => ({
    id: user.id.toString(),
  }));
}