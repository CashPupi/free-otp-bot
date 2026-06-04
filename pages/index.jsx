import Chart from "../components/Chart";

const SAMPLE_DATA = [
  { time: 1717000000, open: 40000, high: 40500, low: 39800, close: 40400 },
  { time: 1717000600, open: 40400, high: 41000, low: 40300, close: 40900 },
];

export default function Home() {
  return (
    <main>
      <Chart data={SAMPLE_DATA} />
    </main>
  );
}
