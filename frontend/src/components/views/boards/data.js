export const planetChartData = {
    type: "bar",
    data: {
        labels: ["1", "2","3","4","5"],
        datasets: [
            {
                label: "wight",
                data: [45, 50,48,45],
                backgroundColor: "rgba(54,73,93,.5)",
                borderColor: "#36495d",
                borderWidth: 2
            }
        ]
    },
    options: {
        responsive: false,
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                        stepSize:15,
                        padding: 20
                    }
                }
            ]
        }
    }
};

export default planetChartData;