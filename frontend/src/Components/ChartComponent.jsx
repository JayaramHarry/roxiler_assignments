import React, { useEffect, useMemo, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { Box, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import SelectTag from "./SelectTag";
import axios from "axios";

const ChartComponent = () => {
  const [data, setData] = useState([]);
  let totalitems = [];

  // Wrap the initialization of pricesrange in useMemo to memoize its value
  const pricesrange = useMemo(() => [
    "0-100",
    "101-200",
    "201-300",
    "301-400",
    "401-500",
    "501-600",
    "601-700",
    "701-800",
    "801-900",
    "901 Above",
  ], []);

  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: pricesrange,
        datasets: [
          {
            label: "Transactions",
            data:
              data.length === 0
                ? [20, 45, 50, 25, 35, 55, 65, 25, 30, 40]
                : data,
            backgroundColor: "#3f91a2",
          },
        ],
        borderWidth: 1,
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, pricesrange]);

  const handleChange = (e) => {
    console.log(e.target.value);
    pricesrange.forEach((ele) => {
      axios
        .get(`http://localhost:8080/price?month=${e.target.value}&price=${ele}`)
        .then((res) => {
          totalitems.push(res.data.length);
          if (totalitems.length === 10) {
            setData(totalitems);
          }
        });
    });
  };

  return (
    <div className="h-[50vh] w-[90vh] mb-[130vh] mt-[20%]">
      <Box float="right">
        <SelectTag name="Select Month" fun={handleChange} />
      </Box>
      <canvas id="myChart" ref={chartRef} />
      <Link to="/">
        <Button colorScheme="orange" float="right" mt="40px">
          Home
        </Button>
      </Link>
    </div>
  );
};
 
export default ChartComponent;
