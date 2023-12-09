import React from "react";
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

    // Get color mode value
    const ChartColor = useColorModeValue("teal.900", "rgba(129,230,217)")

    for (let i = 0; i < arr.length; i++) {
        if (days === "24h") date.push(new Date(arr[i][0]).toLocaleTimeString());
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

    return (
        <Line
            options={{
                // responsive: true,
                elements: {
                    point: {
                        radius: 1,
                    },
                },
            }}
            data={data}
        />
    );
};

export default ChartCard;
