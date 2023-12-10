import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { mockLineData as data } from "../data/mockData";
import { useEffect, useState } from "react";

const LineChart = ({ isCustomLineColors = false, isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [totalTokens, setTotalTokens] = useState([]);
  const [epochId, setEpochId] = useState();
  const [graphData, setGraphData] = useState([])
  let x=[]
  let y=[]
  useEffect(() => {
    const calculateGraph = async() => {
      let totalCalculatedToken = [];

    const mockData = [
      {
        id: "TVL",
        color: tokens("dark").greenAccent[500],
        data: [],
      },
    ];
    
    // for finding epochID
    await fetch(
      "https://uniswapv2-api.powerloom.io/data/3441/aggregate_24h_stats_lite:9fb408548a732c85604dacb9c956ffc2538a3b895250741593da630d994b1f27:UNISWAPV2/"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("data : ",data);
        setEpochId(data.epochId);


        for (let index = 0; index < 20; index++) {
          console.log(data.epochId - index)
         fetch(
            `https://uniswapv2-api.powerloom.io/data/${data.epochId - index}/aggregate_24h_stats_lite:9fb408548a732c85604dacb9c956ffc2538a3b895250741593da630d994b1f27:UNISWAPV2/`
          )
            .then((response) => response.json())
            .then(async (data2) => {
        console.log("data : ",data2);
        console.log(data.epochId-index);
              totalCalculatedToken.push(data2.tvl);
              await mockData[0].data.push({
                x: `epoch ${data.epochId-index}`,
                y: data2.tvl,
              })
            })
            .catch((error) => console.error("Error:", error));
    
          setTotalTokens(totalCalculatedToken);
        }
      })
      .catch((error) => console.error("Error:", error));

      console.log(mockData)

      setGraphData(mockData)
    }

    calculateGraph()
    
  }, []);


  return (
    <ResponsiveLine
      data={graphData}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
        tooltip: {
          container: {
            color: colors.primary[500],
          },
        },
      }}
      colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }} // added
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "transportation", // added
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5, // added
        tickSize: 3,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "count", // added
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={8}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default LineChart;
