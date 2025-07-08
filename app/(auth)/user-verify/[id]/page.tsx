import { db } from "@/libs/db";
import Manage from "./Manage";
const Dynamic = async () => {
  const users = await db.user.findMany()
  return (
    <Manage
      users={users}
    />
  );
};

export default Dynamic;
