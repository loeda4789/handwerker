'use client'

import InfoTooltip from './InfoTooltip'
import InfoTooltipAdvanced from './InfoTooltipAdvanced'
import ExpandableInfo from './ExpandableInfo'

export default function TooltipDemo() {
  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-900">Tooltip-Varianten Demo</h1>
      
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            Original Tooltip (z-50)
            <InfoTooltip content="Dies ist der ursprüngliche Tooltip mit z-50. Er sollte über den meisten Elementen erscheinen." />
          </h2>
          <p className="text-gray-600">Hover über das Info-Icon um den Tooltip zu sehen.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            Erhöhter Z-Index Tooltip (z-[10002])
            <InfoTooltipAdvanced 
              content="Dies ist der verbesserte Tooltip mit z-[10002]. Er sollte über allen anderen Elementen erscheinen, einschließlich der Mobile Navigation." 
              variant="tooltip"
            />
          </h2>
          <p className="text-gray-600">Klicken Sie auf das Info-Icon um den Tooltip zu sehen.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            Aufklappbare Info mit Pfeil (Expandable)
            <InfoTooltipAdvanced 
              content="Dies ist die aufklappbare Variante mit animiertem Pfeil. Der Pfeil dreht sich beim Öffnen und zeigt die Richtung an.\n\nVorteile:\n• Animierter Pfeil zeigt Zustand\n• Bleibt geöffnet\n• Mehr Platz für längere Texte\n• Bessere Lesbarkeit\n• Keine Z-Index-Probleme" 
              variant="expandable"
            />
          </h2>
          <p className="text-gray-600">Klicken Sie auf das Info-Icon um die aufklappbare Info zu sehen. Der Pfeil dreht sich beim Öffnen!</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            Separate ExpandableInfo mit Pfeil
            <ExpandableInfo content="Dies ist die separate ExpandableInfo-Komponente mit Pfeil-Animation. Sie funktioniert ähnlich wie die Advanced-Variante, ist aber eine eigenständige Komponente.\n\nFeatures:\n• Animierter Pfeil\n• Einfache Verwendung\n• Konsistente Darstellung\n• Responsive Design\n• Pfeil nach oben in der Info-Box" />
          </h2>
          <p className="text-gray-600">Klicken Sie auf das Info-Icon um die Info zu sehen. Beachten Sie den animierten Pfeil!</p>
        </div>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Z-Index Hierarchie:</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Mobile Navigation Overlay: z-[9999]</li>
          <li>• Mobile Navigation Panel: z-[10000]</li>
          <li>• Mobile Navigation Close: z-[10001]</li>
          <li>• <strong>Tooltips: z-[10002]</strong></li>
          <li>• ConfigSidebar: z-50</li>
          <li>• Header: z-[60]</li>
        </ul>
      </div>
    </div>
  )
}
