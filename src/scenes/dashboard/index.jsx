import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

import Header from "../../components/Header";
import LineChart from "../../components/LineChart";

import StatBox from "../../components/StatBox";

import { useEffect } from "react";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import LockIcon from "@mui/icons-material/Lock";
import { useState } from "react";
import PaymentsIcon from "@mui/icons-material/Payments";
import TotalTokens from "../totalTokens";
import TotalPairs from "../pairs";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [totalValue, setTotalValue] = useState([]);
  const [totalTokens, setTotalTokens] = useState([]);

  useEffect(() => {
    //for showing on cards

    fetch(
      "https://uniswapv2-api.powerloom.io/data/3441/aggregate_24h_stats_lite:9fb408548a732c85604dacb9c956ffc2538a3b895250741593da630d994b1f27:UNISWAPV2/"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTotalValue(data);
      })
      .catch((error) => console.error("Error:", error));

    // for showing pairs
    fetch(
      "https://uniswapv2-api.powerloom.io/data/3441/aggregate_24h_top_pairs_lite:9fb408548a732c85604dacb9c956ffc2538a3b895250741593da630d994b1f27:UNISWAPV2/"
    )
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));

    // for showing token
    fetch(
      "https://uniswapv2-api.powerloom.io/data/3441/aggregate_24h_top_tokens_lite:9fb408548a732c85604dacb9c956ffc2538a3b895250741593da630d994b1f27:UNISWAPV2/"
    )
      .then((response) => response.json())
      .then((data) => {
        setTotalTokens(data.tokens.splice(0, 3));
        console.log(data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to Powerloom dashboard" />

        <Box></Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={Math.round(totalValue.volume24h)}
            subtitle="Volume 24H"
            progress="0.75"
            increase="+14%"
            icon={
              <EqualizerIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={Math.round(totalValue.tvl)}
            subtitle="TVL"
            progress="0.50"
            increase="+21%"
            icon={
              <LockIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={Math.round(totalValue.fee24h)}
            subtitle="Fees 24H"
            progress="0.30"
            increase="+5%"
            icon={
              <PaymentsIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <div className="flex">
            <div>Current Epoch</div>
            <div
              style={{
                color: "#4cceac",
              }}
            >
              {totalValue.epochId}
            </div>
          </div>
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Last 10 epoch TVL
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Top Tokens
            </Typography>
          </Box>
          {totalTokens.map((transaction, i) => (
            <Box
              // key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.symbol}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.name}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>
                {Math.round(transaction.volume24h)}
              </Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                ${Math.round(transaction.price)}
              </Box>
            </Box>
          ))}
        </Box>

        {/* ROW 3 */}
      </Box>
      <TotalTokens />
      <TotalPairs />
    </Box>
  );
};

export default Dashboard;
