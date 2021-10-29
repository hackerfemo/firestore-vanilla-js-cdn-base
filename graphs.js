// intentionally global variable - modified over the life of the web app
let myChart;

function extractData(key, dataset, sensorPos) {
    return dataset[sensorPos].map((object) => { return object[key] })
}

function bubbleGraphDataF(values) {
    return values.map((object) => { return { x: object["timestamp"]["seconds"] * 1000, y: object["numPeople"], r: object["CO2"] / 100 } })
    // return values.map((object) => ({ x: object["timestamp"]["seconds"], y: object["numPeople"] }))
}

function scatterGraphDataF(values) {
    console.log("scatterGraphDataF")
    return values.map((object) => { return { x: object["numPeople"], y: object["CO2"] } })
    // return values.map((object) => ({ x: object["timestamp"]["seconds"], y: object["numPeople"] }))
}

function LineChartDataF(values, key) {
    return values.map((object) => { return { x: object["timestamp"]["seconds"] * 1000, y: object[key] } })
}

function addTimeLineChart(datasetlist) {
    const data = {
        datasets: [{
            label: 'Sensor 1',
            data: datasetlist[0],
            backgroundColor: "#D55E00",
            borderColor: "#D55E00",
            borderWidth: 1
        },
        {
            label: 'Sensor 2',
            data: datasetlist[1],
            backgroundColor: "#E69F00",
            borderColor: "#E69F00",
            borderWidth: 1
        },
        {
            label: 'Sensor 3',
            data: datasetlist[2],
            backgroundColor: "#56B4E9",
            borderColor: "#56B4E9",
            borderWidth: 1
        },
        {
            label: 'Sensor 4',
            data: datasetlist[3],
            backgroundColor: "#009E73",
            borderColor: "#009E73",
            borderWidth: 1
        },
        {
            label: 'Sensor 5',
            data: datasetlist[4],
            backgroundColor: "#0072B2",
            borderColor: "#0072B2",
            borderWidth: 1
        },
        {
            label: 'Sensor 6',
            data: datasetlist[5],
            backgroundColor: "#CC79A7",
            borderColor: "#CC79A7",
            borderWidth: 1
        },
        ]
    };
    const config = {
        type: 'line',
        data: data,
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'hour'
                    },
                    position: 'bottom'
                }
            }
        }
    };
    myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
}

function addBubbleChart(datasetlist) {
    // requires r: object["CO2"] / 100 added to map in formatting
    const data = {
        datasets: [{
            label: 'Sensor 1',
            data: datasetlist[0],
            backgroundColor: "#D55E00",
            borderColor: "#D55E00",
            borderWidth: 1
        },
        {
            label: 'Sensor 2',
            data: datasetlist[1],
            backgroundColor: "#E69F00",
            borderColor: "#E69F00",
            borderWidth: 1
        },
        {
            label: 'Sensor 3',
            data: datasetlist[2],
            backgroundColor: "#56B4E9",
            borderColor: "#56B4E9",
            borderWidth: 1
        },
        {
            label: 'Sensor 4',
            data: datasetlist[3],
            backgroundColor: "#009E73",
            borderColor: "#009E73",
            borderWidth: 1
        },
        {
            label: 'Sensor 5',
            data: datasetlist[4],
            backgroundColor: "#0072B2",
            borderColor: "#0072B2",
            borderWidth: 1
        },
        {
            label: 'Sensor 6',
            data: datasetlist[5],
            backgroundColor: "#CC79A7",
            borderColor: "#CC79A7",
            borderWidth: 1
        },
        ]
    };
    const config = {
        type: 'bubble',
        data: data,
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'hour'
                    },
                    position: 'bottom'
                }
            }
        }
    };
    myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
}

function addDoubleLineChart(barLineData) {

    const data = {
        labels: extractData("x", barLineData, 0),
        datasets: [{
            type: 'line',
            label: 'numPeople',
            data: extractData("y", barLineData, 0),
            backgroundColor: "#000000",
            borderColor: "#000000",
            borderWidth: 1
        }, {
            type: 'line',
            label: 'Sensor 1',
            data: extractData("r", barLineData, 0),
            backgroundColor: "#D55E00",
            borderColor: "#D55E00",
            borderWidth: 1
        },
        {
            type: 'line',
            label: 'Sensor 2',
            data: extractData("r", barLineData, 1),
            backgroundColor: "#E69F00",
            borderColor: "#E69F00",
            borderWidth: 1
        },
        {
            type: 'line',
            label: 'Sensor 3',
            data: extractData("r", barLineData, 2),
            backgroundColor: "#56B4E9",
            borderColor: "#56B4E9",
            borderWidth: 1
        },
        {
            type: 'line',
            label: 'Sensor 4',
            data: extractData("r", barLineData, 3),
            backgroundColor: "#009E73",
            borderColor: "#009E73",
            borderWidth: 1
        },
        {
            type: 'line',
            label: 'Sensor 5',
            data: extractData("r", barLineData, 4),
            backgroundColor: "#0072B2",
            borderColor: "#0072B2",
            borderWidth: 1
        },
        {
            type: 'line',
            label: 'Sensor 6',
            data: extractData("r", barLineData, 5),
            backgroundColor: "#CC79A7",
            borderColor: "#CC79A7",
            borderWidth: 1
        }]
    };
    const config = {
        type: 'scatter',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                },
                x: {
                    type: 'time',
                    time: {
                        unit: 'day'
                    },
                    position: 'bottom'
                }
            }
        }
    };
    myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
}

function addScatterChart(datasetlist) {
    console.log("scatter")
    console.log(datasetlist)
    const data = {
        datasets: [{
            label: 'Sensor 1',
            data: datasetlist[0],
            backgroundColor: "#D55E00",
            borderColor: "#D55E00",
            borderWidth: 1
        },
        {
            label: 'Sensor 2',
            data: datasetlist[1],
            backgroundColor: "#E69F00",
            borderColor: "#E69F00",
            borderWidth: 1
        },
        {
            label: 'Sensor 3',
            data: datasetlist[2],
            backgroundColor: "#56B4E9",
            borderColor: "#56B4E9",
            borderWidth: 1
        },
        {
            label: 'Sensor 4',
            data: datasetlist[3],
            backgroundColor: "#009E73",
            borderColor: "#009E73",
            borderWidth: 1
        },
        {
            label: 'Sensor 5',
            data: datasetlist[4],
            backgroundColor: "#0072B2",
            borderColor: "#0072B2",
            borderWidth: 1
        },
        {
            label: 'Sensor 6',
            data: datasetlist[5],
            backgroundColor: "#CC79A7",
            borderColor: "#CC79A7",
            borderWidth: 1
        },
        ]
    };
    const config = {
        type: 'scatter',
        data: data,
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom'
                }
            }
        }
    };
    myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
}