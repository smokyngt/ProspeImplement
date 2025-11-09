import React from 'react';
import type { Metric } from '../types';

interface MetricCardProps {
  title: string;
  metric?: Metric;
  iconPath: JSX.Element;
  loading?: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  metric,
  iconPath,
  loading = false,
}) => {
  // ---------------------------------------------------------------
  // 🎨 Rendu de la valeur
  // ---------------------------------------------------------------
  const renderValue = () => {
    if (loading) {
      return <div className="h-6 w-16 bg-gray-200 animate-pulse rounded-md" />;
    }
    if (!metric?.value && metric?.value !== 0) {
      return <span className="text-sm text-gray-400 italic">No data</span>;
    }
    return (
      <span className="text-xl sm:text-2xl font-medium text-gray-800">
        {metric.value}
      </span>
    );
  };

  // ---------------------------------------------------------------
  // 📈 Rendu du delta (variation)
  // ---------------------------------------------------------------
  const renderDelta = () => {
    if (!metric || metric.delta === undefined || metric.delta === null) {
      return null;
    }
    const positive = metric.delta >= 0;
    return (
      <span
        className={`inline-flex items-center gap-x-1 py-0.5 px-2 rounded-full text-xs font-medium ${
          positive ? 'bg-green-100 text-green-900' : 'bg-red-100 text-red-900'
        }`}
      >
        <svg
          className="inline-block size-4 self-center"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
        >
          {positive ? (
            <>
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
              <polyline points="16 7 22 7 22 13" />
            </>
          ) : (
            <>
              <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
              <polyline points="16 17 22 17 22 11" />
            </>
          )}
        </svg>
        <span>{Math.abs(metric.delta)}%</span>
      </span>
    );
  };

  // ---------------------------------------------------------------
  // 🧱 Rendu principal
  // ---------------------------------------------------------------
  return (
    <div className="flex flex-col bg-white border border-gray-200 shadow-sm rounded-xl">
      <div className="p-4 md:p-5 flex gap-x-4">
        {/* 🎯 Icône */}
        <div className="shrink-0 flex justify-center items-center size-11 bg-gray-100 rounded-lg">
          <svg
            className="size-5 text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            {iconPath}
          </svg>
        </div>

        {/* 📊 Contenu */}
        <div className="grow">
          <p className="text-xs uppercase text-gray-500">{title}</p>
          <div className="mt-1 flex items-center gap-x-2">
            {renderValue()}
            {renderDelta()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;