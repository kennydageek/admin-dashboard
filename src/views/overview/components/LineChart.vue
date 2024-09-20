<template>
  <div class="w-full">
    <canvas id="smooth-line-chart"></canvas>
  </div>
</template>

<script>
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Filler,
} from 'chart.js';

// Register the necessary components
Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
  Title
);

export default {
  mounted() {
    const ctx = document.getElementById('smooth-line-chart').getContext('2d');

    // Create a gradient fill
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(193, 230, 255, 1)'); // Blue gradient start
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparent gradient end

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'], // Example labels
        datasets: [
          {
            label: 'Data',
            data: [30, 20, 50, 40, 80, 60, 100], // Example data points
            backgroundColor: gradient, // Use the gradient for the fill
            borderColor: '#C1E6FF', // Line border color (blue)
            borderWidth: 2,
            tension: 0.4, // Smooth curves
            fill: true, // Enable fill under the line
            pointRadius: 0, // No points visible on the line
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            grid: {
              color: 'rgba(200, 200, 200, 0.2)', // Grid line color
            },
          },
          y: {
            grid: {
              color: 'rgba(200, 200, 200, 0.2)', // Grid line color
            },
            beginAtZero: true, // Start the y-axis at 0
          },
        },
        plugins: {
          legend: {
            display: false, // Hide the legend
          },
        },
      },
    });
  },
};
</script>

<style scoped>
canvas {
  /* max-width: 800px; */
  width: 650px;
  margin: 0 auto;
  color: rgb(193, 230, 255);
}
</style>
