import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { useColorModeValue } from "@chakra-ui/react";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const ChartCard = ({ arr = [], currency, days }) => {
    const prices = [];
    const date = [];
    const [isLargeScreen, setIsLargeScreen] = useState(true);

    // Get color mode value
    const ChartColor = useColorModeValue("teal.900", "rgba(129,230,217)");

    useEffect(() => {
        // Check screen size on mount and resize
        const checkScreenSize = () => {
            setIsLargeScreen(window.innerWidth > 768); // Set breakpoint for large screens
        };

        window.addEventListener("resize", checkScreenSize);
        checkScreenSize();

        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    for (let i = 0; i < arr.length; i++) {
        if (days === "24h")
            date.push(new Date(arr[i][0]).toLocaleTimeString());
        else date.push(new Date(arr[i][0]).toLocaleDateString());
        prices.push(arr[i][1]);
    }

    const data = {
        labels: date,
        datasets: [
            {
                label: `Price in ${currency}`,
                data: prices,
                borderColor: ChartColor,
            },
        ],
    };

    const aspectRatio = isLargeScreen ? true : false;

    return (
        <Line
            options={{
                responsive: true,
                maintainAspectRatio: aspectRatio,
                elements: {
                    point: {
                        radius: 1,
                    },
                },
                scales: {
                    x: {
                        ticks: {
                            display: true,
                            autoSkip: true,
                            maxRotation: 10,
                        },
                    },
                    y: {
                        ticks: {
                            display: true,
                            autoSkip: true,
                        },
                    },
                },
            }}
            data={data}
        />
    );
};

export default ChartCard;
