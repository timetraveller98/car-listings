"use client";
import { verifyEmail } from "@/actions/authentication/emailverify";
import { Button, CircularProgress } from "@mui/material";
import { User } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
interface Props {
  users: User[];
}
const Manage: React.FC<Props> = ({ users }) => {
  const router = useRouter();
  const params = useParams();
  const userNew = users.filter((item) => item.membershipId === params.id);
  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
    setLoading(true);
    try {
      const { success, message } = await verifyEmail({
        membershipId: userNew[0].membershipId,
        emailVerified: true,
      });

      if (success) {
        toast.success("Successfully Verified");
        router.push("/login");
      } else {
        toast.error(message || "An unexpected error occurred.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to verify email.");
    } finally {
      setLoading(false);
    }
  };
  return userNew[0].emailVerified ? (
    <div className="text-success my-5 text-center">
      <h1>You are verified User</h1>
    </div>
  ) : (
    <div className="flex align-items-center justify-center my-5">
      <Button
        variant="contained"
        color="primary"
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : "Verify"}
      </Button>
    </div>
  );
};

export default Manage;
