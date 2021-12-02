export const planetChartData = {
    type: "bar",
    data: {
        labels: ["1", "2","3"],
        datasets: [
            {
                label: "wight",
                data: [45, 50],
                backgroundColor: "rgba(54,73,93,.5)",
                borderColor: "#36495d",
                borderWidth: 2
            }
        ]
    },
    options: {
        responsive: true,
        lineTension: 1,
        scales: {
            xAxes: [
                {
                    ticks: {
                    },
                    gridLines:{
                    }
                }
            ],
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                        padding: 25
                    }
                }
            ]
        }
    }
};

export default planetChartData;