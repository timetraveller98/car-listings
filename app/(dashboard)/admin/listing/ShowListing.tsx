"use client";
import * as React from "react";
import { useState, useCallback } from "react";
import { Col, Container, Row } from "react-bootstrap";
import toast from "react-hot-toast";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import Heading from "@/components/ui/Heading";
import getListing from "@/actions/getListing";
import { Listing } from "@prisma/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Status from "@/components/ui/Status";
import { MdClose, MdDone, MdPending } from "react-icons/md";
import FormatPrice from "@/components/ui/formatPrice";
import { useRouter } from "next/navigation";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { deleteCarById, updateCarStatus } from "@/actions/updateCarStatus";
import DeleteModal from "@/components/ui/Model";
const ShowListing = () => {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["listings", page, pageSize],
    queryFn: async () => await getListing(page + 1, pageSize),
    staleTime: 1000 * 60 * 5,
  });

  React.useEffect(() => {
    if (isError) toast.error("Failed to load user data");
  }, [isError]);
  const queryClient = useQueryClient();
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
        const { success } = await deleteCarById(selectedId);
        if (success) {
          toast.success("Car Deleted");
          await queryClient.invalidateQueries({ queryKey: ["listings"] });
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
  }, [selectedId,queryClient, page, pageSize, closeModal]);

  const handleConfirm = useCallback(
    async (id: string, status: string) => {
      if (status === "confirm") return null;
      try {
        const { success, message } = await updateCarStatus({
          id,
          status: "confirm",
        });
        if (success) {
          toast.success(message);
          await queryClient.invalidateQueries({ queryKey: ["listings"] });
        } else {
          toast.error(message);
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Oops! Something went wrong");
      }
    },
    [queryClient]
  );

  const handleReject = useCallback(
    async (id: string, status: string) => {
      if (status === "cancel") return null;
      try {
        const { success, message } = await updateCarStatus({
          id,
          status: "cancel",
        });
        if (success) {
          toast.success(message);
          await queryClient.invalidateQueries({ queryKey: ["listings"] });
        } else {
          toast.error(message);
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Oops! Something went wrong");
      }
    },
    [queryClient]
  );

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return date.toLocaleString("en-IN", options);
  }

  const columns: GridColDef[] = [
    { field: "brand", headerName: "Brand", width: 150 },
    { field: "model", headerName: "Model", width: 150 },
    { field: "year", headerName: "Year", width: 100 },
    {
      field: "name",
      headerName: "Listing By",
      width: 150,
      renderCell: (params: GridRenderCellParams) => {
        return <div>{params.row.user.name}</div>;
      },
    },
    {
      field: "email",
      headerName: "Listing Email ID",
      width: 150,
      renderCell: (params: GridRenderCellParams) => {
        return <div>{params.row.user.email}</div>;
      },
    },

    {
      field: "price",
      headerName: "Price",
      width: 150,
      renderCell: (params: GridRenderCellParams) => {
        return <div>{FormatPrice(params.value)}</div>;
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 130,
      renderCell: (params: GridRenderCellParams) => {
        const status = params.row.status;
        if (status === "confirm") {
          return (
            <div className="text-secondary fw-light">
              <Status
                icon={MdDone}
                bg="bg-success"
                color="text-white"
                text="Approve"
              />
            </div>
          );
        }
        if (status === "pending") {
          return (
            <div className="text-secondary fw-light">
              <Status
                icon={MdPending}
                bg="bg-warning"
                color="text-dark"
                text="Pending"
              />
            </div>
          );
        }
        return (
          <div className="text-secondary fw-light">
            <Status
              icon={MdClose}
              bg="bg-danger"
              color="text-white"
              text="Reject"
            />
          </div>
        );
      },
    },
    {
      field: "statuschange",
      headerName: "Approve",
      width: 90,
      renderCell: (params: GridRenderCellParams) => (
        <CheckIcon
          onClick={() => handleConfirm(params.row.id, params.row.status)}
          color="success"
          fontSize="large"
          style={{ cursor: "pointer" }}
          className="ms-2 mt-2 p-1"
        />
      ),
    },
    {
      field: "statusReject",
      headerName: "Reject",
      width: 90,
      renderCell: (params: GridRenderCellParams) => (
        <CloseIcon
          onClick={() => handleReject(params.row.id, params.row.status)}
          color="error"
          fontSize="large"
          style={{ cursor: "pointer" }}
          className="ms-2 mt-2 p-1"
        />
      ),
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 90,
      renderCell: (params) => (
        <EditIcon
          onClick={() => router.push(`/admin/listing/${params.id}`)}
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
    { field: "adminEmail", headerName: "Audit Email By", width: 200 },
    {
      field: "updatedAt",
      headerName: "Audit Time",
      width: 250,
      renderCell: (params) => formatDate(params.row.updatedAt),
    },
  ];

  return (
    <Container>
      <Row>
        <Col md={12} className="my-3">
          <Heading title="Manage Car List" center />
          <Box sx={{ width: "100%", height: "450px" }}>
            <DataGrid
              rows={data?.listings ?? []}
              columns={columns}
              getRowId={(row: Listing) => row.id}
              rowCount={data?.total ?? 0}
              loading={isLoading}
              pagination
              paginationMode="server"
              pageSizeOptions={[10, 25, 50]}
              paginationModel={{ pageSize, page }}
              onPaginationModelChange={({ page, pageSize }) => {
                setPage(page);
                setPageSize(pageSize);
              }}
              sx={{
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
                  backgroundColor: "inherit !important",
                  outline: "none",
                  border: "none",
                },
                "& .MuiDataGrid-row.Mui-selected:hover": {
                  backgroundColor: "inherit !important",
                },
                "& .MuiDataGrid-row:hover": {
                  backgroundColor: "inherit",
                },
                "& .MuiDataGrid-cell:focus": {
                  outline: "none",
                },
                "& .MuiDataGrid-cell:focus-within": {
                  outline: "none",
                },
                "& .MuiDataGrid-cell": {
                  color: "#000",
                  border: "none",
                },
                "& .MuiDataGrid-toolbarContainer": {
                  color: "#000000",
                  "& .MuiButton-root, & .MuiInputBase-root, & .MuiSvgIcon-root":
                    {
                      color: "#000000",
                    },
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

export default ShowListing;
