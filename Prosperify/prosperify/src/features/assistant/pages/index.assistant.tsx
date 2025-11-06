import React from "react";
import { useQuery } from "@tanstack/react-query";
import { prosperify } from "@/core/ProsperifyClient"; // ✅ Import de l'instance globale
import AlertError from "@/components/ui/base/Alert/alertError";
import Charts from "../components/chart.assistant";

// ---------------------------------------------------------------
// Interfaces
// ---------------------------------------------------------------
interface Metric {
  name: string;
  value?: number | string;
  delta?: number;
}

interface MetricCardProps {
  title: string;
  metric?: Metric | undefined;
  iconPath: JSX.Element;
  loading?: boolean;
}

// ---------------------------------------------------------------
// Composant Principal
// ---------------------------------------------------------------
const IndexAssistant: React.FC = () => {
  // ✅ React Query utilise l'instance globale prosperify
  const { data, error, isLoading } = useQuery({
    queryKey: ["metrics"],
    queryFn: async () => {
      // ✅ Pas d'instanciation ici, juste utilisation directe
      const res = await prosperify.metrics.postV1MetricsList({
        limit: 10,
        order: "desc",
      });

      const parsed: Record<string, Metric> = {};
      res?.data?.items?.forEach((m: any) => {
        parsed[m.name?.toLowerCase() || "unknown"] = {
          name: m.name || "Unknown",
          value: m.value,
          delta: m.delta || 0,
        };
      });
      return parsed;
    },
    retry: false,
    staleTime: 60_000, // Cache 1 minute
  });

  // ---------------------------------------------------------------
  // 🎨 Rendu UI (reste identique)
  // ---------------------------------------------------------------
  return (
    <section className="w-full max-w-7xl p-4">
      <header className="mb-6">
        <h2 className="text-lg font-semibold mb-1">Assistant Dashboard</h2>
        <p className="text-sm text-gray-600">
          Follow your assistant's performance and usage trends.
        </p>
      </header>

      {error && (
        <div className="fixed top-4 right-4 z-50">
          <AlertError
            message={(error as Error).message}
            onClose={() => null}
            description=""
          />
        </div>
      )}

      <div className="max-w-[85rem] px-4 py-8 sm:px-6 lg:px-8 mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <MetricCard
            title="Total Users"
            metric={data?.["users"]}
            loading={isLoading}
            iconPath={
              <>
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
              </>
            }
          />

          <MetricCard
            title="Sessions"
            metric={data?.["sessions"]}
            loading={isLoading}
            iconPath={
              <>
                <path d="M5 22h14" />
                <path d="M5 2h14" />
                <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22" />
              </>
            }
          />

          <MetricCard
            title="Avg. Click Rate"
            metric={data?.["clickrate"]}
            loading={isLoading}
            iconPath={
              <>
                <path d="M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6" />
                <path d="m12 12 4 10 1.7-4.3L22 16Z" />
              </>
            }
          />

          <MetricCard
            title="Pageviews"
            metric={data?.["pageviews"]}
            loading={isLoading}
            iconPath={
              <>
                <path d="M5 12s2.545-5 7-5c4.454 0 7 5 7 5s-2.546 5-7 5c-4.455 0-7-5-7-5z" />
                <path d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
              </>
            }
          />
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mt-8">
        <Charts />
      </div>
    </section>
  );
};

export default IndexAssistant;

// ---------------------------------------------------------------
// Sous-composant MetricCard (reste identique)
// ---------------------------------------------------------------
const MetricCard: React.FC<MetricCardProps> = ({
  title,
  metric,
  iconPath,
  loading = false,
}) => {
  const renderValue = () => {
    if (loading)
      return <div className="h-6 w-16 bg-gray-200 animate-pulse rounded-md" />;
    if (!metric?.value && metric?.value !== 0)
      return <span className="text-sm text-gray-400 italic">No data</span>;
    return (
      <span className="text-xl sm:text-2xl font-medium text-gray-800">
        {metric.value}
      </span>
    );
  };

  const renderDelta = () => {
    if (!metric || metric.delta === undefined || metric.delta === null)
      return null;
    const positive = metric.delta >= 0;
    return (
      <span
        className={`inline-flex items-center gap-x-1 py-0.5 px-2 rounded-full text-xs font-medium ${
          positive
            ? "bg-green-100 text-green-900"
            : "bg-red-100 text-red-900"
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

  return (
    <div className="flex flex-col bg-white border border-gray-200 shadow-sm rounded-xl">
      <div className="p-4 md:p-5 flex gap-x-4">
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