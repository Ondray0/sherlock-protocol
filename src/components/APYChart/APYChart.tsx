import React, { useMemo } from "react"
import { useAPYOverTime } from "../../hooks/api/apy"
import { Box } from "../Box"
import { Chart } from "../Chart/Chart"
import { Column, Row } from "../Layout"
import { Title } from "../Title"
import { DateTime } from "luxon"

/**
 * APY over time chart.
 */
const APYChart: React.FC = () => {
  const { data: apyData } = useAPYOverTime()

  const chartData = useMemo(() => {
    const apyChartData = apyData?.map((item) => ({
      name: DateTime.fromMillis(item.timestamp * 1000).toLocaleString({ month: "2-digit", day: "2-digit" }),
      strategiesAPY: item.totalAPY - item.premiumsAPY,
      premiumsAPY: item.premiumsAPY,
      totalAPY: item.totalAPY,
    }))

    return apyChartData
  }, [apyData])

  return (
    <Box shadow={false}>
      <Column spacing="m">
        <Row>
          <Title variant="h3">APY</Title>
        </Row>
        <Row>
          <Title>{chartData?.at(chartData.length - 1)?.totalAPY}%</Title>
        </Row>
        <Row alignment="center">
          <Chart
            width={450}
            height={200}
            data={chartData}
            dataKeys={["premiumsAPY", "strategiesAPY"]}
            tooltipProps={{
              formatter: (v: number, name: string) => [
                `${v.toFixed(2)}%`,
                name === "premiumsAPY" ? "Premiums APY" : "Strategies APY",
              ],
            }}
            yTickFormatter={(v) => `${v}%`}
          />
        </Row>
      </Column>
    </Box>
  )
}

export default APYChart
