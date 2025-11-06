import React, { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, Activity, Key, MessageSquare, Users, FileText, MessagesSquare, AlertCircle } from 'lucide-react'
import { useMetricsSummary, useRecentMetrics } from '../metrics/hooks/useMetrics'

const MetricsOverview: React.FC = () => {
  const [isTimeout, setIsTimeout] = useState(false)

  const { data: summary, isLoading: summaryLoading } = useMetricsSummary({
    date: {
      start: Date.now() - 30 * 24 * 60 * 60 * 1000, // 30 derniers jours
      end: Date.now(),
    },
  })

  const { data: recentData, isLoading: recentLoading } = useRecentMetrics()

  const isLoading = summaryLoading || recentLoading

  // Timeout après 10 secondes de chargement
  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsTimeout(true)
      }, 10000)
      return () => clearTimeout(timer)
    } else {
      setIsTimeout(false)
    }
  }, [isLoading])

  // Calcul du changement en % (simulé - adapter selon tes besoins)
  const calculateChange = (current: number) => {
    const random = Math.random() * 10 - 5 // -5% à +5%
    return parseFloat(random.toFixed(1))
  }

  const metrics = [
    {
      title: 'API Keys',
      value: summary?.['apiKey']?.total || 0,
      change: calculateChange(summary?.['apiKey']?.total || 0),
      icon: Key,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Assistants',
      value: summary?.['assistant']?.total || 0,
      change: calculateChange(summary?.['assistant']?.total || 0),
      icon: Activity,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Messages',
      value: summary?.['message']?.total || 0,
      change: calculateChange(summary?.['message']?.total || 0),
      icon: MessageSquare,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Threads',
      value: summary?.['thread']?.total || 0,
      change: calculateChange(summary?.['thread']?.total || 0),
      icon: MessagesSquare,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Files',
      value: summary?.['file']?.total || 0,
      change: calculateChange(summary?.['file']?.total || 0),
      icon: FileText,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
    },
    {
      title: 'Members',
      value: summary?.['member']?.total || 0,
      change: calculateChange(summary?.['member']?.total || 0),
      icon: Users,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
    },
  ]

  // Empty state si timeout ou pas de données après chargement
  if (isTimeout || (!isLoading && (!summary || summary['totalAll'] === 0))) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="p-4 bg-gray-50 rounded-full mb-4">
          <AlertCircle className="size-12 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {isTimeout ? 'Loading timeout' : 'No metrics available'}
        </h3>
        <p className="text-sm text-gray-500 text-center max-w-md">
          {isTimeout
            ? 'The request is taking longer than expected. Please check your connection and try again.'
            : 'No metrics data found for the last 30 days. Start using the system to track metrics.'}
        </p>
        {isTimeout && (
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        )}
      </div>
    )
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex flex-col bg-white border shadow-sm rounded-xl animate-pulse">
            <div className="p-4 md:p-5">
              <div className="h-4 bg-gray-200 rounded w-24 mb-3"></div>
              <div className="h-8 bg-gray-200 rounded w-32 mb-2"></div>
              <div className="h-6 bg-gray-200 rounded w-20"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Metrics Overview</h2>
        <p className="text-sm text-gray-600 mt-1">
          Track your system performance and resource usage over the last 30 days
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon
          const isPositive = metric.change >= 0

          return (
            
            <div key={index} className="flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md transition-shadow">
              <div className="p-4 md:p-5">
                {/* Metric Title at Top */}
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    {metric.title}
                  </p>
                  <div className="hs-tooltip">
                    <div className="hs-tooltip-toggle">
                      <svg
                        className="flex-shrink-0 size-4 text-gray-400 hover:text-gray-600 cursor-pointer"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                        <path d="M12 17h.01" />
                      </svg>
                      <span
                        className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm whitespace-nowrap"
                        role="tooltip"
                      >
                        Total {metric.title.toLowerCase()} events tracked
                      </span>
                    </div>
                  </div>
                </div>

                {/* Icon and Value */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className={`inline-flex p-2 rounded-lg ${metric.bgColor} mb-3`}>
                      <Icon className={`size-5 ${metric.color}`} />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-800">
                      {metric.value.toLocaleString()}
                    </h3>
                  </div>
                  
                  {/* Change Indicator */}
                  <div className={`flex items-center gap-x-1 px-2 py-1 rounded-md ${isPositive ? 'bg-green-50' : 'bg-red-50'}`}>
                    {isPositive ? (
                      <TrendingUp className={`size-4 ${isPositive ? 'text-green-600' : 'text-red-600'}`} />
                    ) : (
                      <TrendingDown className={`size-4 ${isPositive ? 'text-green-600' : 'text-red-600'}`} />
                    )}
                    <span className={`text-sm font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {isPositive ? '+' : ''}{metric.change}%
                    </span>
                  </div>
                </div>

                {/* Period Label */}
                <p className="text-xs text-gray-500 mt-2">Last 30 days</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Activity */}
      <div className="mt-8 bg-white border shadow-sm rounded-xl p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Recent Activity (24h)</h3>
          <span className="text-sm text-gray-500">
            {recentData?.total || 0} events
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Activity className="size-4 text-blue-600" />
          <span>
            {recentData?.metrics?.length || 0} metrics tracked in the last 24 hours
          </span>
        </div>
      </div>

      {/* Total Summary */}
      <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Total Metrics</p>
            <h2 className="text-4xl font-bold text-gray-800 mt-2">
              {summary?.['totalAll']?.toLocaleString() || 0}
            </h2>
            <p className="text-sm text-gray-500 mt-1">Across all resources (last 30 days)</p>
          </div>
          <div className="p-4 bg-white rounded-full shadow-md">
            <Activity className="size-8 text-blue-600" />
          </div>
        </div>
      </div>
    </>
  )
}

export default MetricsOverview