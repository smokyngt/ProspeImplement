import React, { useEffect, useRef } from 'react'
import ApexCharts, { type ApexOptions } from 'apexcharts'

const Charts: React.FC = () => {
  const chartRef = useRef<HTMLDivElement | null>(null)
  const chartInstance = useRef<ApexCharts | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    const options: ApexOptions = {
      chart: {
        height: 300,
        type: 'area',
        toolbar: { show: false },
        zoom: { enabled: false }
      },
      series: [
        { name: 'Income', data: [18000, 51000, 60000, 38000, 88000, 50000, 40000, 52000, 88000, 80000, 60000, 70000] },
        { name: 'Outcome', data: [27000, 38000, 60000, 77000, 40000, 50000, 49000, 29000, 42000, 27000, 42000, 50000] }
      ],
      legend: {
        show: true,
        position: 'top',
        horizontalAlign: 'right',
      },
      dataLabels: { enabled: false },
      stroke: { curve: 'smooth', width: 2 },
      grid: { strokeDashArray: 2 },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'vertical',
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.2,
          stops: [0, 100]
        }
      },
      colors: ['#2563eb', '#9333ea'],
      xaxis: {
        type: 'category',
        tickPlacement: 'on',
        categories: [
          '25 January 2023', '26 January 2023', '27 January 2023', '28 January 2023', '29 January 2023', '30 January 2023', '31 January 2023', '1 February 2023', '2 February 2023', '3 February 2023', '4 February 2023', '5 February 2023'
        ],
        axisBorder: { show: false },
        axisTicks: { show: false },
  crosshairs: { stroke: { dashArray: 0 }, dropShadow: { enabled: false } },
        tooltip: { enabled: false },
        labels: {
          style: { colors: '#9ca3af', fontSize: '13px', fontFamily: 'Inter, ui-sans-serif', fontWeight: 400 },
          formatter: (title: string) => {
            let t = title
            if (t) {
              const newT = t.split(' ')
              const part1 = newT[0] ?? ''
              const part2 = (newT[1] ?? '').slice(0, 3)
              t = `${part1} ${part2}`.trim()
            }
            return t
          }
        }
      },
      yaxis: {
        labels: {
          align: 'left',
          minWidth: 0,
          maxWidth: 140,
          style: { colors: '#9ca3af', fontSize: '13px', fontFamily: 'Inter, ui-sans-serif', fontWeight: 400 },
          formatter: (value: number) => (value >= 1000 ? `${value / 1000}k` : `${value}`)
        }
      },
      tooltip: {
        x: { format: 'dd MMM' },
        y: { formatter: (value: number) => `$${value >= 1000 ? `${value / 1000}k` : value}` },
      },
      responsive: [
        {
          breakpoint: 568,
          options: {
            chart: { height: 300 },
            xaxis: {
              labels: {
                style: { colors: '#9ca3af', fontSize: '11px', fontFamily: 'Inter, ui-sans-serif', fontWeight: 400 },
                offsetX: -2,
                formatter: (title: string) => title.slice(0, 3)
              }
            },
            yaxis: {
              labels: {
                align: 'left',
                minWidth: 0,
                maxWidth: 140,
                style: { colors: '#9ca3af', fontSize: '11px', fontFamily: 'Inter, ui-sans-serif', fontWeight: 400 },
                formatter: (value: number) => (value >= 1000 ? `${value / 1000}k` : `${value}`)
              }
            }
          }
        }
      ]
    }

  const chart = new ApexCharts(chartRef.current, options)
  void chart.render()
    chartInstance.current = chart

    return () => {
      chartInstance.current?.destroy()
      chartInstance.current = null
    }
  }, [])

  return (
    <div>
      <div className="p-4 bg-white">
        <h2 className="text-base font-semibold mb-2">Charts</h2>
        <p className="text-sm text-custom-gray-dark mb-4">Install or share your chatbot with your customers or team by using the code snippets below.</p>
      </div>
      <div id="hs-curved-area-charts" ref={chartRef}></div>
    </div>
  )
}

export default Charts
