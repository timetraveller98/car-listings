"use client";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { Col, Row, Container } from "react-bootstrap";
import Heading from "@/components/ui/Heading";
import { Role } from "@prisma/client";
import { useEffect, useState } from "react";
import {
  getUserById,
  updateUserById,
} from "@/actions/authentication/uodateUser";

interface Address {
  city: string;
  state: string;
  line1: string;
  line2?: string | null;
  postalCode: string;
}

interface UserProp {
  name: string;
  email: string;
  contact: string | null;
  membershipId?: string;
  referral?: string | null;
  role: Role;
  image?: string | null;
  address?: Address | null;
}

interface RoleProps {
  roles?: Role[];
}

const ManageUser: React.FC<RoleProps> = ({ roles }) => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<UserProp | null>();
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    contact: string;
    membershipId: string;
    referral: string;
    role: Role;
    image: string;
    address: {
      city: string;
      state: string;
      line1: string;
      line2: string;
      postalCode: string;
    };
  }>({
    name: "",
    email: "",
    contact: "",
    membershipId: "",
    referral: "",
    role: "USER",
    image: "",
    address: {
      city: "",
      state: "",
      line1: "",
      line2: "",
      postalCode: "",
    },
  });

  useEffect(() => {
    if (!params.id) return;
    const fetchUser = async () => {
      try {
        const data = await getUserById(params.id as string);
        if (data) {
          setUserData(data);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    if (params.id) {
      fetchUser();
    }
  }, [params.id]);

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        contact: userData.contact || "",
        membershipId: userData.membershipId || "",
        referral: userData.referral || "",
        role: userData.role || "USER",
        image: userData.image || "",
        address: {
          city: userData.address?.city || "",
          state: userData.address?.state || "",
          line1: userData.address?.line1 || "",
          line2: userData.address?.line2 || "",
          postalCode: userData.address?.postalCode || "",
        },
      });
    }
  }, [userData]);

  const [errors, setErrors] = useState({
    email: false,
    contact: false,
    name: false,
    role: false,
    membershipId: false,
  });

  const validateEmail = (email: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateContact = (contact: string): boolean =>
    /^\d{10}$/.test(contact);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: value.trim?.() === "" }));
  };

  const handleSubmit = async () => {
    const { name, contact, membershipId, role, email } = formData;

    const newErrors = {
      name: name.trim() === "",
      contact: contact ? !validateContact(contact) : true,
      membershipId: membershipId.trim() === "",
      role: !role,
      email: email ? !validateEmail(email) : true,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).includes(true)) {
      return toast.error("Please fill out all required fields correctly.");
    }

    setLoading(true);
    try {
      const response = await updateUserById(id, formData);
      if (response) {
        toast.success("Data updated successfully.");
        router.push("/admin/user");
      } else {
        toast.error("Failed to update user data.");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      toast.error("An error occurred while updating the data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3">
      <Container>
        <Row>
          <Col md={12}>
            <Heading title="Update User" center />
          </Col>
        </Row>
        <Row className="p-3 rounded" style={{ border: "1px solid black" }}>
          <Col md={4}>
            <TextField
              fullWidth
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              label="Name"
              error={errors.name}
              variant="outlined"
              className="p-1 my-4"
              required
            />
          </Col>

          <Col md={4}>
            <TextField
              fullWidth
              value={formData.email || ""}
              label="Email"
              disabled
              variant="outlined"
              className="p-1 my-4"
              type="email"
              autoComplete="off"
              required
              error={errors.email}
              helperText={errors.email ? "Invalid email address" : ""}
            />
          </Col>

          <Col md={4}>
            <TextField
              fullWidth
              value={formData.contact || ""}
              onChange={(e) => handleInputChange("contact", e.target.value)}
              label="Contact"
              variant="outlined"
              className="p-1 my-4"
              type="tel"
              required
              error={errors.contact}
              helperText={errors.contact ? "Invalid contact number" : ""}
              inputProps={{
                maxLength: 10,
              }}
            />
          </Col>

          <Col md={4}>
            <FormControl fullWidth className="m-1 my-4" error={errors.role}>
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                value={formData.role || ""}
                onChange={(e) =>
                  handleInputChange("role", e.target.value as Role)
                }
                label="Role"
                required
              >
                {roles?.map((roleOption) => (
                  <MenuItem value={roleOption} key={roleOption}>
                    {roleOption}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Col>

          <Col md={4}>
            <TextField
              fullWidth
              value={formData.membershipId || ""}
              label="Membership ID"
              disabled
              variant="outlined"
              className="p-1 my-4"
              required
            />
          </Col>

          <Col md={12}>
            <div className="d-flex justify-content-center align-items-center">
              <Button
                variant="contained"
                color="inherit"
                className="mt-4"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Submit"}
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ManageUser;
