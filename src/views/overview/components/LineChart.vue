<template>
  <div class="w-full grid-cols-12 col-span-4">
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
  props: {
    chartData: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      chartInstance: null, // To store the chart instance
    };
  },

  mounted() {
    this.$nextTick(() => {
      if (this.chartData.length > 0) {
        this.initializeChart(); // Initialize the chart once DOM is rendered
      }
    });
  },

  watch: {
    chartData: {
      handler(newData) {
        if (newData.length > 0) {
          // Ensure chartData is available before updating
          if (this.chartInstance) {
            this.updateChart(newData); // Update the chart when chartData changes
          } else {
            this.initializeChart(); // Initialize chart if not already created
          }
        }
      },
      immediate: true, // Watcher fires immediately after mount
      deep: true, // Ensure deep watching in case of nested objects
    },
  },

  methods: {
    initializeChart() {
      const canvas = document.getElementById('smooth-line-chart');
      if (!canvas) {
        console.error('Canvas element not found!');
        return;
      }

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        console.error('Failed to get canvas context!');
        return;
      }

      // Create a gradient fill
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, 'rgba(193, 230, 255, 1)'); // Blue gradient start
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparent gradient end

      // Extract labels and totalSales from chartData prop
      const labels = this.chartData.map((item) => item.label); // X-axis (label)
      const dataPoints = this.chartData.map((item) => item.totalSales); // Y-axis (totalSales)

      this.chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels, // Use labels from the chartData prop
          datasets: [
            {
              label: 'Total Sales',
              data: dataPoints, // Use totalSales as the data points
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

    updateChart(newData) {
      const labels = newData.map((item) => item.label); // X-axis (label)
      const dataPoints = newData.map((item) => item.totalSales); // Y-axis (totalSales)

      // Update chart data
      this.chartInstance.data.labels = labels;
      this.chartInstance.data.datasets[0].data = dataPoints;
      this.chartInstance.update(); // Trigger chart update
    },
  },
};
</script>

<style scoped>
canvas {
  width: 100% !important;
  /* height: 200px !important; */
  margin: 0 auto;
  color: rgb(193, 230, 255);
}
</style>
