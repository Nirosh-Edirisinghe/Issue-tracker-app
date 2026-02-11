import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const centerTextPlugin = {
  id: "centerText",
  beforeDraw: (chart) => {
    const { ctx, chartArea } = chart;
    if (!chartArea) return;

    const centerX = (chartArea.left + chartArea.right) / 2;
    const centerY = (chartArea.top + chartArea.bottom) / 2;

    const total = chart.data.datasets[0].data.reduce(
      (sum, value) => sum + value,
      0
    );

    ctx.save();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.font = "14px Arial";
    ctx.fillStyle = "#6B7280";
    ctx.fillText("Total Issues", centerX, centerY - 12);

    ctx.font = "bold 26px Arial";
    ctx.fillStyle = "#111827";
    ctx.fillText(total, centerX, centerY + 14);

    ctx.restore();
  },
};

const IssuePieChart = ({
  openCount,
  inProgressCount,
  resolvedCount,
  closedCount,
}) => {
  const data = {
    datasets: [
      {
        data: [
          openCount,
          inProgressCount,
          resolvedCount,
          closedCount,
        ],
        backgroundColor: [
          "#6366F1",
          "#F59E0B",
          "#10B981",
          "#EF4444",
        ],
        borderWidth: 6,
      },
    ],
  };

  const options = {
    cutout: "70%",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // 🚀 removes empty space
      },
    },
  };

  return (
    <div className="w-full h-55 sm:h-65">
      <Doughnut
        data={data}
        options={options}
        plugins={[centerTextPlugin]}
      />
    </div>
  );
};

export default IssuePieChart;
