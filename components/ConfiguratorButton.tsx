'use client'

interface ConfiguratorButtonProps {
  onClick: () => void
}

export default function ConfiguratorButton({ onClick }: ConfiguratorButtonProps) {
  // Website-Konfigurator ist deaktiviert
  return (
    <div className="fixed bottom-4 left-4 z-50">
      <button
        disabled
        className="bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed opacity-50"
        title="Website-Konfigurator ist deaktiviert"
      >
        ⚠️ Konfigurator deaktiviert
      </button>
    </div>
  )
} 