// intentionally global variable - modified over the life of the web app
let myChart;

function addScatterChart(datasetlist) {
    const data = {
        datasets: [{
            label: 'Sensor1',
            data: datasetlist[0],
            backgroundColor: 'rgb(255, 99, 132)'
        },
        {
            label: 'Sensor2',
            data: datasetlist[1],
            backgroundColor: 'rgb(255, 255, 132)'
        },
        {
            label: 'Sensor3',
            data: datasetlist[2],
            backgroundColor: 'rgb(255, 0, 255)'
        },
        {
            label: 'Sensor4',
            data: datasetlist[3],
            backgroundColor: 'rgb(0, 0, 0)'
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

function GraphDataFormatting(values) {
    return values.map((object) => { return { x: object["timestamp"]["seconds"] * 1000, y: object["numPeople"], r: object["CO2"] / 100 } })
    // OR return values.map((object) => ({ x: object["CO2"], y: object["numPeople"] }))
}

function addExampleScatterChart() {
    const data = {
        datasets: [{
            label: 'Scatter Dataset',
            data: [{
                x: -10,
                y: 0
            }, {
                x: 0,
                y: 10
            }, {
                x: 10,
                y: 5
            }, {
                x: 0.5,
                y: 5.5
            }],
            backgroundColor: 'rgb(255, 99, 132)'
        }],
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
    var myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
}

function addExampleChart() {
    const labels = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
    ];
    const data = {
        labels: labels,
        datasets: [{
            label: 'My First dataset',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 10, 5, 2, 20, 30, 45],
        }]
    };
    const config = {
        type: 'line',
        data: data,
        options: {}
    };
    var myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
}

function addTimeLineChart(datasetlist) {
    const data = {
        datasets: [{
            label: 'Sensor1',
            data: datasetlist[0],
            backgroundColor: 'rgb(255, 99, 132)'
        },
        {
            label: 'Sensor2',
            data: datasetlist[1],
            backgroundColor: 'rgb(255, 255, 132)'
        },
        {
            label: 'Sensor3',
            data: datasetlist[2],
            backgroundColor: 'rgb(255, 0, 255)'
        },
        {
            label: 'Sensor4',
            data: datasetlist[3],
            backgroundColor: 'rgb(0, 0, 0)'
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
            label: 'Sensor1',
            data: datasetlist[0],
            backgroundColor: 'rgb(255, 99, 132)'
        },
        {
            label: 'Sensor2',
            data: datasetlist[1],
            backgroundColor: 'rgb(255, 255, 132)'
        },
        {
            label: 'Sensor3',
            data: datasetlist[2],
            backgroundColor: 'rgb(255, 0, 255)'
        },
        {
            label: 'Sensor4',
            data: datasetlist[3],
            backgroundColor: 'rgb(0, 0, 0)'
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

function extractData(key, dataset) {
    return dataset[0].map((object) => { return object[key] })
}

function addLineBarChart(barLineData) {

    const data = {
        labels: extractData("x", barLineData),
        datasets: [{
            type: 'line',
            label: 'Bar Dataset',
            data: extractData("y", barLineData),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)'
        }, {
            type: 'line',
            label: 'Line Dataset',
            data: extractData("r", barLineData),
            fill: false,
            borderColor: 'rgb(54, 162, 235)'
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

function addLineBarChartExample() {
    const data = {
        labels: [
            'January',
            'February',
            'March',
            'April'
        ],
        datasets: [{
            type: 'bar',
            label: 'Bar Dataset',
            data: [10, 20, 30, 40],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)'
        }, {
            type: 'line',
            label: 'Line Dataset',
            data: [50, 20, 10, 30],
            fill: false,
            borderColor: 'rgb(54, 162, 235)'
        }]
    };
    const config = {
        type: 'scatter',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    };
    myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
}