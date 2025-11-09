import React from 'react';
import { useParams } from 'react-router-dom';
import { useAssistants } from '@/features/assistant/hook/useAssistants';
import { useAssistantMetrics } from '@/features/metrics/hooks/useMetrics';
import MetricCard from '@/components/ui/base/metricCard/metricCard';
import AlertError from '@/components/ui/base/Alert/alertError';

const AssistantDetail: React.FC = () => {
  const { id: assistantId } = useParams<{ id: string }>();
  const { useDetail } = useAssistants();

  // --- Récupération de l'assistant
  const {
    data: assistant,
    isLoading: loadingAssistant,
    error: errorAssistant,
  } = useDetail(assistantId || '', Boolean(assistantId));

  // --- Récupération des métriques liées
  const {
    data: metricsData,
    isLoading: loadingMetrics,
    error: errorMetrics,
  } = useAssistantMetrics(assistantId);

  if (!assistantId) {
    return (
      <p className="text-center text-red-600 mt-8">
        Aucun assistant sélectionné.
      </p>
    );
  }

  if (loadingAssistant) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-2" />
        <span className="text-sm text-gray-500">
          Chargement de l’assistant...
        </span>
      </div>
    );
  }

  if (errorAssistant) {
    return (
      <AlertError
        message={(errorAssistant as Error).message || 'Erreur lors du chargement.'}
        onClose={() => null}
        description=""
      />
    );
  }

  if (!assistant) {
    return (
      <p className="text-center text-gray-500 mt-8">
        Assistant introuvable.
      </p>
    );
  }

  const metrics = metricsData?.metrics || [];
  const totalMetrics = metrics.length;

  const lastActivity =
    metrics.length > 0
      ? new Date(metrics[0].timestamp).toLocaleString()
      : 'Aucune activité';
  const resourceType = metrics[0]?.resourceType || 'assistant';
  const organization = metrics[0]?.organization || '—';

  return (
    <section className="max-w-6xl mx-auto p-6">
      {/* HEADER */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">{assistant.name}</h1>
          <p className="text-sm text-gray-600">
            Assistant ID :
            <span className="font-mono text-gray-800 ml-1">{assistant.id}</span>
          </p>
        </div>
        <p className="text-sm text-gray-500 mt-2 sm:mt-0">
          Créé le{' '}
          {assistant.createdAt
            ? new Date(assistant.createdAt).toLocaleDateString('fr-FR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })
            : 'Non disponible'}
        </p>
      </header>

      {/* DESCRIPTION */}
      {assistant.description && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-8">
          <h2 className="font-semibold text-gray-800 mb-2">Description</h2>
          <p className="text-sm text-gray-700 whitespace-pre-line">
            {assistant.description}
          </p>
        </div>
      )}

      {/* METRICS */}
      <section>
        <h2 className="text-lg font-semibold mb-4 text-gray-900">
          Métriques de l’assistant
        </h2>

        {errorMetrics && (
          <div className="mb-4">
            <AlertError
              message={(errorMetrics as Error).message || 'Erreur lors du chargement des métriques.'}
              onClose={() => null}
              description=""
            />
          </div>
        )}

        {loadingMetrics ? (
          <div className="flex justify-center py-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : metrics.length === 0 ? (
          <p className="text-sm text-gray-500">
            Aucune métrique enregistrée pour cet assistant.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            <MetricCard
              title="Total Metrics"
              metric={{ name: 'total', value: totalMetrics }}
              iconPath={<circle cx="12" cy="12" r="10" />}
            />
            <MetricCard
              title="Dernière activité"
              metric={{ name: 'last', value: lastActivity }}
              iconPath={
                <>
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </>
              }
            />
            <MetricCard
              title="Type de ressource"
              metric={{ name: 'resourceType', value: resourceType }}
              iconPath={<path d="M3 3h18v4H3z M3 17h18v4H3z M3 10h18v4H3z" />}
            />
            <MetricCard
              title="Organisation"
              metric={{ name: 'org', value: organization }}
              iconPath={<path d="M3 12l2-2 4 4 8-8 4 4" />}
            />
          </div>
        )}
      </section>
    </section>
  );
};

export default AssistantDetail;
