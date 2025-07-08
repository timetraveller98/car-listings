"use client";

import * as React from "react";
import { useMemo, useCallback, useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import Box from "@mui/material/Box";
import {
  DataGrid,
  GridRenderCellParams,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import CachedIcon from "@mui/icons-material/Cached";
import { MdClose, MdDone } from "react-icons/md";

import Status from "@/components/ui/Status";
import Heading from "@/components/ui/Heading";
import DeleteModal from "@/components/ui/Model";

import { updateUserStatus } from "@/actions/authentication/updateStatus";
import { deleteUserById } from "@/actions/authentication/uodateUser";
import getUsers from "@/actions/getUsers";
import { User } from "@prisma/client";

const ShowUser = () => {
  const router = useRouter();

  const [rows, setRows] = useState<User[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [rowCount, setRowCount] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const fetchData = async (pageNumber: number, limit: number) => {
    try {
      setLoading(true);
      const data = await getUsers(pageNumber + 1, limit);
      setRows(data.users);
      setRowCount(data.total);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      toast.error("Failed to load user data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page, pageSize);
  }, [page, pageSize]);

  const handleToggleStatus = useCallback(
    async (id: string, isEnabled: boolean) => {
      try {
        const { success, message } = await updateUserStatus({
          id,
          isEnabled: !isEnabled,
        });
        if (success) {
          toast.success(message);
          fetchData(page, pageSize);
        } else {
          toast.error(message);
        }
      } catch (error) {
        console.error("Status update error:", error);
        toast.error("Oops! Something went wrong");
      }
    },
    [page, pageSize]
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const openModal = (id: string) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedId(null);
  }, []);

  const handleDelete = useCallback(async () => {
    if (selectedId) {
      try {
        const { success } = await deleteUserById(selectedId);
        if (success) {
          toast.success("User Deleted");
          fetchData(page, pageSize);
        } else {
          toast.error("Something went wrong");
        }
      } catch (error) {
        console.error("Delete error:", error);
        toast.error("Something went wrong while deleting");
      } finally {
        closeModal();
      }
    }
  }, [selectedId, page, pageSize, closeModal]);

  const columns: GridColDef[] = useMemo(
    () => [
      { field: "name", headerName: "Name", width: 120 },
      { field: "email", headerName: "Email", width: 200 },
      { field: "contact", headerName: "Contact", width: 110 },
      { field: "membershipId", headerName: "Membership ID", width: 130 },
      { field: "role", headerName: "Role", width: 120 },
      {
        field: "isEnabled",
        headerName: "User Status",
        width: 130,
        renderCell: (params: GridRenderCellParams) => (
          <Status
            icon={params.row.isEnabled ? MdDone : MdClose}
            bg={params.row.isEnabled ? "bg-success" : "bg-danger"}
            color="text-white"
            text={params.row.isEnabled ? "Active" : "Inactive"}
          />
        ),
      },
      {
        field: "statuschange",
        headerName: "Update Status",
        width: 110,
        renderCell: (params: GridRenderCellParams) => (
          <CachedIcon
            onClick={() =>
              handleToggleStatus(params.row.id, params.row.isEnabled)
            }
            color="success"
            fontSize="large"
            style={{ cursor: "pointer" }}
            className="ms-2 mt-2 p-1"
          />
        ),
      },
      {
        field: "update",
        headerName: "Update",
        width: 90,
        renderCell: (params) => (
          <EditIcon
            onClick={() => router.push(`/admin/user/${params.id}`)}
            color="success"
            fontSize="large"
            style={{ cursor: "pointer" }}
            className="ms-2 mt-2 p-1"
          />
        ),
      },
      {
        field: "delete",
        headerName: "Delete",
        width: 90,
        renderCell: (params) => (
          <DeleteForeverIcon
            onClick={() => openModal(params.row.id)}
            color="error"
            fontSize="large"
            style={{ cursor: "pointer" }}
            className="ms-2 mt-2 p-1"
          />
        ),
      },
    ],
    [router, handleToggleStatus]
  );

  return (
    <Container>
      <Row>
        <Col md={12} className="my-3">
          <Heading title="Manage User" center />
          <Box sx={{ width: "100%", height: "450px" }}>
            <DataGrid
              disableColumnFilter
              disableColumnSelector
              disableDensitySelector
              rows={rows}
              columns={columns}
              getRowId={(row) => row.id}
              slots={{ toolbar: GridToolbar }}
              rowCount={rowCount}
              loading={loading}
              pagination
              paginationMode="server"
              pageSizeOptions={[10, 25, 50]}
              paginationModel={{ pageSize, page }}
              onPaginationModelChange={({ page, pageSize }) => {
                setPage(page);
                setPageSize(pageSize);
              }}
              getRowClassName={(params) =>
                params.row.isEnabled
                  ? "super-app-theme--Active"
                  : "super-app-theme--Inactive"
              }
              sx={{
                border: "none",
                "& .MuiDataGrid-footerContainer": {
                  justifyContent: "flex-end",
                  paddingRight: "16px",
                },
                "& .MuiTablePagination-toolbar": {
                  flexWrap: "nowrap",
                },
                "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
                  {
                    margin: "0 8px",
                  },
                "& .MuiDataGrid-row.Mui-selected": {
                  border: "none",
                  backgroundColor: "inherit",
                },
                "& .MuiDataGrid-row:hover": {
                  backgroundColor: "inherit",
                },
                "& .MuiDataGrid-cell": {
                  color: "#000",
                },
                "& .MuiDataGrid-cell:focus": {
                  outline: "none",
                },
                "& .MuiDataGrid-row.Mui-selected:hover": {
                  backgroundColor: "inherit",
                },
                "& .MuiDataGrid-cell:focus-within": {
                  outline: "none",
                },
              }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                  quickFilterProps: { debounceMs: 500 },
                },
              }}
            />
          </Box>
        </Col>
      </Row>

      <DeleteModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleDelete}
      />
    </Container>
  );
};

export default ShowUser;
