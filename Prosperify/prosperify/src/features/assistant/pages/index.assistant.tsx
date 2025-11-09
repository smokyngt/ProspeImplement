import React from 'react';
import { useAssistants } from '@/features/assistant/hook/useAssistants';
import MetricCard from '@/components/ui/base/metricCard/metricCard';
import Charts from '../components/chart.assistant';
import AlertError from '@/components/ui/base/Alert/alertError';

const IndexAssistant: React.FC = () => {
  const assistants = useAssistants();

  // ✅ UN SEUL APPEL via le hook
  const { data: metrics, error, isLoading } = assistants.useMetrics();

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
            metric={metrics?.['users']}
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
            metric={metrics?.['sessions']}
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
            metric={metrics?.['clickrate']}
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
            metric={metrics?.['pageviews']}
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