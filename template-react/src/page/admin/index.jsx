import React, { useState, useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
import "bootstrap/dist/css/bootstrap.min.css";
import Chart from "chart.js/auto";

// const API_LINK = "http://localhost:5255/api/";
const API_LINK = "http://localhost:5143/api/";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function BerandaIndex() {
  const [chartData, setChartData] = useState({
    labels: monthNames,
    datasets: [
      {
        label: "Jumlah Register",
        data: Array(12).fill(0),
        backgroundColor: "rgba(4, 108, 252, 0.2)", // Warna biru dengan transparansi 0.2
        borderColor: "rgba(4, 108, 252, 1)", // Warna biru
        borderWidth: 1,
      },
    ],
  });
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const chartRef = useRef(null);

  const fetchChartData = async (startDate, endDate) => {
    try {
      let response;
      if (startDate && endDate) {
        response = await fetch(
          `${API_LINK}RegisterCustomer/GetDataRegisterByYearMonth`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ startDate, endDate }),
          }
        );
      } else {
        const currentYear = new Date().getFullYear();

        response = await fetch(
          `${API_LINK}RegisterCustomer/GetTotalDataRegister`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ year: currentYear }),
          }
        );
      }

      const data = await response.json();
      const currentYear = new Date().getFullYear();
      const filteredData = data.filter((item) => item.Tahun === currentYear);

      // Group data by year and month
      const groupedData = data.reduce((acc, item) => {
        const yearMonth = `${item.Tahun}-${item.Bulan}`;
        if (!acc[yearMonth]) {
          acc[yearMonth] = 0;
        }
        acc[yearMonth] += item.JumlahData;
        return acc;
      }, {});

      // Get labels (year-month) and values (jumlah data) from grouped data
      const labels = Object.keys(groupedData);
      const values = Object.values(groupedData);

      // Fill data array with zeroes for months that don't have data
      const updatedData = Array(12).fill(0);
      labels.forEach((label, index) => {
        const monthIndex = new Date(`${label}-01`).getMonth();
        updatedData[monthIndex] = values[index];
      });

      setChartData({
        labels: monthNames,
        datasets: [
          {
            label: "Jumlah Register",
            data: updatedData,
            backgroundColor: "rgba(4, 108, 252, 0.2)", // Warna biru dengan transparansi 0.2
            borderColor: "rgba(4, 108, 252, 1)", // Warna biru
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };

  useEffect(() => {
    fetchChartData();

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      fetchChartData(startDate, endDate);
    }
  }, [startDate, endDate]);

  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1, // Ensure y-axis steps are in integers
          callback: function (value) {
            if (Number.isInteger(value)) {
              return value;
            }
            return null;
          },
        },
      },
    },
  };

  return (
    <div className="card">
      <div className="card-header bg-primary text-white text-center">
        <h5>Data Register Politeknik Astra</h5>
      </div>
      <div className="card-body">
        <div className="row mb-3">
          <div className="col-md-6">
            <label>Dari:</label>
            <input
              type="date"
              className="form-control"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label>Sampai:</label>
            <input
              type="date"
              className="form-control"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div
            className="col-md-12"
            style={{
              height: "400px",
              width: "160vh",
            }}
          >
            {chartData.labels.length > 0 && (
              <Bar ref={chartRef} data={chartData} options={options} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
