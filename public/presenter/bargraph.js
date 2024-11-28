import "https://cdn.jsdelivr.net/npm/chart.js"

const ctx = document.getElementById('graph');

const purple = "rgba(192, 0, 192, 1)";
const teal = "rgba(0, 192, 192, 1)";
const yellow = "rgba(192, 192, 0, 1)";
const red = "rgba(192, 0, 0, 1)";

let question = 1;
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels:['A','B','C','D'],
            datasets: [
                {
                    labels: ['A','B','C','D'],
                    data: [4, 5, 6, 3],
                    borderColor: [purple, teal, yellow, red],
                    backgroundColor: [purple, teal, yellow, red],
                    borderWidth: 1
                },
            ],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });