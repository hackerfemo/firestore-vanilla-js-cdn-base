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