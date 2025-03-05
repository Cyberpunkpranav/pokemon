"use client";

import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PoliwhirlStatsChart = ({labels,data}) => {
    const graph = {
        labels: labels,
        datasets: [
            {
                label: "Base Stats",
                data: data,
                backgroundColor: data.map(value => value >= 0 ? "rgba(75, 192, 75, 0.6)" : "rgba(255, 99, 132, 0.6)"),
                borderColor: data.map(value => value >= 0 ? "rgba(0, 100, 0, 0.8)" : "rgba(139, 0, 0, 0.8)"),
                borderWidth: 1,
            },
        ],
    };

    const options = {
        indexAxis:'y',
        responsive: true,
        plugins: {
            legend: { display: false },
            title: { display: true, text: "Poliwhirl Base Stats" },
        },
        scales: {
            y: { beginAtZero: true },
        },
    };

    return <Bar data={graph} options={options} />;
};

export default PoliwhirlStatsChart;
