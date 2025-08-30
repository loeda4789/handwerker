'use client'

interface ConfiguratorButtonProps {
  onClick: () => void
}

export default function ConfiguratorButton({ onClick }: ConfiguratorButtonProps) {
  // Website-Konfigurator ist komplett deaktiviert - zeige Button aber ohne Funktion
  return (
    <div className="fixed bottom-4 left-4 z-50">
      <button
        onClick={() => {
          console.log('Webseite-Designer ist deaktiviert');
          // onClick() wird NICHT aufgerufen - verhindert das Öffnen des Designers
        }}
        className="bg-gray-400 text-white px-3 py-2 rounded-lg cursor-not-allowed opacity-50 text-sm"
        title="Webseite-Designer ist deaktiviert"
        disabled
      >
        🔒 Designer deaktiviert
      </button>
    </div>
  )
} 