import { db } from "@/libs/db";
import ManageCar from "./Manage";
interface StaticParam {
  id: string;
}
const Dynamic = () => {
  return (
    <div>
      <ManageCar />
    </div>
  );
};
export default Dynamic;

export async function generateStaticParams(): Promise<StaticParam[]> {
  const listings = await db.listing.findMany();
  return listings.map((item) => ({
    id: item.id.toString(),
  }));
}