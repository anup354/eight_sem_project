import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import axios from "axios";
import Head from "next/head";
// import "chartjs-plugin-annotation";
import "chartjs-plugin-annotation";

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
    const annotations = passValues.map((value, index) => ({
      type: "line",
      mode: "vertical",
      scaleID: "x",
      value: index, // Position on the x-axis
      borderColor: "black", // Line color
      borderWidth: 1, // Line width
      label: {
        content: passLabels[index], // Label content (from passLabels)
        position: "top", // Label position (top, bottom, etc.)
      },
    }));
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
          x: { // x-axis options
            display: true, // Display the x-axis
            title: {
              display: true,
              text: "Status", // x-axis label
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 5,
            },
            title: {
              display: true,
              text: "Number of Prediction",
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          annotation: { // Annotation plugin configuration
            annotations: annotations, // Added the annotations we created
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
      <Head>
        <title>Admin</title>
      </Head>
      <canvas ref={chartRef} width="15" height="15"></canvas>
    </div>
  );
};

export default AdminDashboard;
