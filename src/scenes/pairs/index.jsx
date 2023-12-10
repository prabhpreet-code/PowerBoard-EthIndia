import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";

const TotalPairs = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    { field: "liquidity", headerName: "Liquidity" },
    {
      field: "volume24h",
      headerName: "Volume 24H",
      flex: 1,
    },
    {
      field: "fee24h",
      headerName: "Fee 24H",
      flex: 1,
    },
  ];

  const [totalTokens, setTotalTokens] = useState([]);

  useEffect(() => {
    //for showing on cards

    // for showing token
    fetch(
      "https://uniswapv2-api.powerloom.io/data/3441/aggregate_24h_top_pairs_lite:9fb408548a732c85604dacb9c956ffc2538a3b895250741593da630d994b1f27:UNISWAPV2/"
    )
      .then((response) => response.json())
      .then((data) => {
        const dataTokens = data.pairs.map((item, index) => ({
          ...item,
          id: index + 1,
        }));
        setTotalTokens(dataTokens);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <Box m="20px">
      <Header title="Pairs" subtitle="List of Pairs" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={totalTokens}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default TotalPairs;
