"use client";
import * as React from "react";
import { useMemo, useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import toast from "react-hot-toast";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";
import Heading from "@/components/ui/Heading";
import getUsers from "@/actions/getUsers";
import { User } from "@prisma/client";

const ShowUser = () => {

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

  const columns: GridColDef[] = useMemo(
    () => [
      { field: "name", headerName: "Name", width: 250 },
      { field: "email", headerName: "Email", width: 250 },
      { field: "role", headerName: "Role", width: 250 },
    ],
    []
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
    </Container>
  );
};

export default ShowUser;
