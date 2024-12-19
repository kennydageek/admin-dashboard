<template>
  <div class="relative -mx-20 -mt-10">
    <canvas id="half-doughnut-chart"></canvas>
    <div class="absolute top-40 left-[50%] translate-x-[-50%]">
      <p class="text-[23px] font-semibold">
        {{ formatAsMoney(chartData.revenue) }}
      </p>

      <div
        class="py-0.5 px-1.5 flex justify-center gap-1 bg-primary-50 rounded-[100px]"
      >
        <img src="@/assets/svg/arrow-up-right.svg" alt="" />
        <p class="text-primary-600 text-[10px]">
          {{ chartData.percentageDifference }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { formatAsMoney } from '@/utils/formatAsMoney.js';
import {
  Chart,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the necessary components
Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

export default {
  props: {
    chartData: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    formatAsMoney,
  },
  mounted() {
    const ctx = document.getElementById('half-doughnut-chart').getContext('2d');

    new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: [
              this.chartData?.percentageDifference + 1,
              100 - this.chartData?.percentageDifference - 1,
            ], // 75.55% for filled part and 24.45% for empty part
            backgroundColor: ['#FFA500', '#E5E5E5'], // Orange for filled, grey for empty
            hoverBackgroundColor: ['#FFB347', '#E5E5E5'],
            borderWidth: 0, // Remove the border around segments
            // borderRadius: [10], // Only the filled part has rounded edges, no border radius for the unfilled part
            weight: 1, // Make the filled part thicker
          },
        ],
      },
      options: {
        rotation: -90, // Starts the chart at 12 o'clock
        circumference: 180, // Half doughnut, spans 180 degrees
        cutout: '85%', // To create the donut style with a hole in the middle
        responsive: true,
        plugins: {
          tooltip: {
            enabled: false, // Disable tooltips
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
  max-width: 400px;
  margin: 0 auto;
}
</style>
