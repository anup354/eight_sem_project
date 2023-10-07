import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import axios from "axios";

const AdminDashboard = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const loadData = async () => {
    const response = await axios.get("http://localhost:8080/api/predict");
    console.log(response.data.data);
    const data = response.data.data;
    // const data = [
    //   {
    //     id: 2,
    //     name: "aaa",
    //     address: "ddd",
    //     Result: "yes",
    //   },
    //   {
    //     id: 4,
    //     name: "dsd",
    //     address: "ddd",
    //     Result: "no",
    //   },
    //   {
    //     id: 3,
    //     name: "asas",
    //     address: "ddd",
    //     Result: "no",
    //   },
    //   {
    //     id: 1,
    //     name: "sdd",
    //     address: "ddd",
    //     Result: "yes",
    //   },
    // ];

    const passCounts = {
      yes: 0,
      no: 0,
    };

    data.forEach((item: any) => {
      if (item.Result === "Yes") {
        passCounts.yes++;
      } else if (item.Result === "No") {
        passCounts.no++;
      }
    });

    const passLabels = Object.keys(passCounts);
    const passValues = Object.values(passCounts);
    console.log("pass", passValues);
    const chartData = {
      labels: passLabels,
      datasets: [
        {
          label: " Status",
          data: passValues,
          backgroundColor: ["green", "red"], // Green for 'yes', red for 'no'
        },
      ],
    };

    const ctx = chartRef.current.getContext("2d");

    // Destroy the previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create a new chart instance
    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: chartData,
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 2,
            },
            title: {
              display: true,
              text: "number of",
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
        responsive: true,
      },
    });
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="h-[80vh]">
      <canvas ref={chartRef} width="15" height="15"></canvas>
    </div>
  );
};

export default AdminDashboard;
