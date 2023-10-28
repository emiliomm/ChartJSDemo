import { Bar } from "react-chartjs-2";

//Simple graph component made by react-charjs
export const BarChart = ({ name, chartData }: any) => {
  return (
    <div className="chart-container">
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: name
            },
            legend: {
              display: false
            }
          }
        }}
      />
    </div>
  );
};
