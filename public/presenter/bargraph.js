import "https://cdn.jsdelivr.net/npm/chart.js"

const ctx = document.getElementById('graph');

const purple = "rgba(1.0, 0.0, 1.0, 1.0)";
const teal = "rgba(0.0, 0.5, 0.5, 1.0)";
const yellow = "rgba(1.0, 1.0, 0.0, 1.0)";
const red = "rgba(1.0, 1.0, 1.0, 1.0)";

let question = 1;
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels:['A','B','C','D'],
            datasets: [
                {
                    label: `Question ${question}`,
                    data: [4, 5, 6, 3],
                    borderColor: [purple, teal, yellow, red],
                    borderWidth: 1,
                    backgroundColor: [purple, teal, yellow, red]
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