import React from "react";
import styled from "styled-components";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useDashboard } from "../../store/hooks/useDashboard";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Dashboard = () => {
  const { kpi = {}, userRanking = [], productRanking = [] } = useDashboard();

  const userChartData = {
    labels: userRanking.map((item) => item.username),
    datasets: [
      {
        label: "구매 건수",
        data: userRanking.map((item) => item.count),
      },
    ],
  };

  const productChartData = {
    labels: productRanking.map((item) => item.name),
    datasets: [
      {
        label: "판매 수량",
        data: productRanking.map((item) => item.quantity),
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "y",
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Container>
      <Title>📊 Dashboard</Title>

      <KpiGrid>
        <KpiCard>
          <KpiTitle>총 매출액</KpiTitle>
          <KpiValue>
            {(kpi?.totalSalesAmount ?? 0).toLocaleString()} 원
          </KpiValue>
        </KpiCard>

        <KpiCard>
          <KpiTitle>총 주문건수</KpiTitle>
          <KpiValue>{(kpi?.totalOrderCount ?? 0).toLocaleString()} 건</KpiValue>
        </KpiCard>

        <KpiCard>
          <KpiTitle>총 판매수량</KpiTitle>
          <KpiValue>{(kpi?.totalQuantity ?? 0).toLocaleString()} 개</KpiValue>
        </KpiCard>

        <KpiCard>
          <KpiTitle>고객 수</KpiTitle>
          <KpiValue>{(kpi?.customerCount ?? 0).toLocaleString()} 명</KpiValue>
        </KpiCard>

        <KpiCard>
          <KpiTitle>상품 수</KpiTitle>
          <KpiValue>{(kpi?.productCount ?? 0).toLocaleString()} 개</KpiValue>
        </KpiCard>
      </KpiGrid>

      <ChartGrid>
        <ChartCard>
          <ChartTitle>고객 구매 랭킹 TOP 10</ChartTitle>

          <ChartWrapper>
            <Bar data={userChartData} options={chartOptions} />
          </ChartWrapper>
        </ChartCard>

        <ChartCard>
          <ChartTitle>상품 판매 랭킹 TOP 10</ChartTitle>

          <ChartWrapper>
            <Bar data={productChartData} options={chartOptions} />
          </ChartWrapper>
        </ChartCard>
      </ChartGrid>
    </Container>
  );
};

export default Dashboard;

/* ===================== Styled Components ===================== */

const Container = styled.div`
  padding: 24px;
  background: #f5f7fb;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 24px;
  color: #222;
`;

const KpiGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin-bottom: 30px;
`;

const KpiCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
`;

const KpiTitle = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
`;

const KpiValue = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #1677ff;
`;

const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ChartCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.08);
`;

const ChartTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #222;
`;

const ChartWrapper = styled.div`
  height: 450px;
`;
