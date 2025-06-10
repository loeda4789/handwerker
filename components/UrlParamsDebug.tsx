'use client'

import { useState } from 'react';
import { useUrlParams } from '@/lib/hooks/useUrlParams';
import { loadUrlParamsFromStorage } from '@/lib/url-params';

export default function UrlParamsDebug() {
  const { urlParams, hasParams, decodedParams } = useUrlParams();
  const [isOpen, setIsOpen] = useState(false);
  const [showStorage, setShowStorage] = useState(false);

  if (!hasParams && typeof window !== 'undefined' && !loadUrlParamsFromStorage()) {
    return null; // Keine URL-Parameter und keine gespeicherten Daten
  }

  const storedData = typeof window !== 'undefined' ? loadUrlParamsFromStorage() : null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-500 text-white px-3 py-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
        title="URL-Parameter Debug"
      >
        🔧 URL-Debug
      </button>
      
      {isOpen && (
        <div className="absolute bottom-12 right-0 bg-white border border-gray-300 rounded-lg shadow-xl p-4 w-96 max-h-96 overflow-auto">
          <div className="mb-3">
            <h3 className="font-bold text-lg mb-2">URL-Parameter Debug</h3>
            
            <div className="flex gap-2 mb-3">
              <button
                onClick={() => setShowStorage(false)}
                className={`px-3 py-1 rounded ${!showStorage ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                Aktuelle URL
              </button>
              <button
                onClick={() => setShowStorage(true)}
                className={`px-3 py-1 rounded ${showStorage ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                Gespeichert
              </button>
            </div>
          </div>

          {!showStorage ? (
            <>
              <div className="mb-3">
                <strong>Status:</strong> {hasParams ? '✅ Parameter gefunden' : '❌ Keine Parameter'}
              </div>
              
              {hasParams && (
                <>
                  <div className="mb-3">
                    <strong>URL-Parameter (roh):</strong>
                    <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
                      {JSON.stringify(urlParams, null, 2)}
                    </pre>
                  </div>
                  
                  <div className="mb-3">
                    <strong>Dekodierte Parameter:</strong>
                    <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
                      {JSON.stringify(decodedParams, null, 2)}
                    </pre>
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              {storedData ? (
                <>
                  <div className="mb-3">
                    <strong>Gespeicherte Daten:</strong>
                    <div className="text-xs text-gray-600 mb-2">
                      Zeitstempel: {new Date(storedData.extracted_data.timestamp).toLocaleString('de-DE')}
                    </div>
                    <div className="text-xs text-gray-600 mb-2">
                      Quelle: {storedData.extracted_data.source_url}
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <strong>Parameter:</strong>
                    <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
                      {JSON.stringify(storedData.url_params, null, 2)}
                    </pre>
                  </div>
                </>
              ) : (
                <div className="text-gray-500">Keine gespeicherten Daten gefunden</div>
              )}
            </>
          )}
          
          <button
            onClick={() => setIsOpen(false)}
            className="mt-3 bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition-colors w-full"
          >
            Schließen
          </button>
        </div>
      )}
    </div>
  );
} 