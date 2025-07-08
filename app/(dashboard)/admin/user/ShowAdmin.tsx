"use client";
import * as React from "react";
import { useState, useMemo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import toast from "react-hot-toast";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridColDef,
} from "@mui/x-data-grid";
import Heading from "@/components/ui/Heading";
import getUsers from "@/actions/getUsers";
import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { debounce } from "lodash";
const ShowUser = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["users", page, pageSize],
    queryFn: async () => await getUsers(page + 1, pageSize),
    staleTime: 1000 * 60 * 5,
  });

  React.useEffect(() => {
    if (isError) toast.error("Failed to load user data");
  }, [isError]);

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 250 },
    { field: "email", headerName: "Email", width: 350 },
    { field: "role", headerName: "Role", width: 250 },
  ];

  return (
    <Container>
      <Row>
        <Col md={12} className="my-3">
          <Heading title="Manage User" center />
          <Box sx={{ width: "100%", height: "450px" }}>
            <DataGrid
              rows={data?.users ?? []}
              columns={columns}
              getRowId={(row: User) => row.id}
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
                  backgroundColor: "inherit",
                },
                "& .MuiDataGrid-row:hover": {
                  backgroundColor: "inherit",
                },
                "& .MuiDataGrid-toolbarContainer": {
                  color: "#000000",
                  "& .MuiButton-root, & .MuiInputBase-root, & .MuiSvgIcon-root":
                    {
                      color: "#000000",
                    },
                },
                "& .MuiDataGrid-cell": {
                  color: "#000",
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
