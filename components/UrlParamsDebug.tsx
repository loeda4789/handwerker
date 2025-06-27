'use client'

import { useState, useEffect } from 'react';
import { getEffectiveUrlParams, loadUrlParamsFromLocalStorage, clearUrlParamsFromLocalStorage, hasUrlParams } from '@/lib/url-params';

export default function UrlParamsDebug() {
  const [urlParams, setUrlParams] = useState({});
  const [storedParams, setStoredParams] = useState({});
  const [effectiveParams, setEffectiveParams] = useState({});
  const [showDebug, setShowDebug] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // URL-Parameter
      const currentUrlParams = new URLSearchParams(window.location.search);
      const urlParamsObj: any = {};
      currentUrlParams.forEach((value, key) => {
        urlParamsObj[key] = value;
      });
      setUrlParams(urlParamsObj);

      // Gespeicherte Parameter
      const stored = loadUrlParamsFromLocalStorage();
      setStoredParams(stored);

      // Effektive Parameter
      const effective = getEffectiveUrlParams();
      setEffectiveParams(effective);
    }
  }, []);

  const handleClearStorage = () => {
    clearUrlParamsFromLocalStorage();
    setStoredParams({});
    setEffectiveParams({});
    window.location.reload();
  };

  if (!showDebug) {
    return (
      <button
        onClick={() => setShowDebug(true)}
        className="fixed bottom-4 left-4 bg-gray-800 text-white px-3 py-1 text-xs rounded z-50 opacity-50 hover:opacity-100"
      >
        Debug URL-Params
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 bg-white border shadow-lg p-4 text-xs max-w-md z-50 rounded">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold">URL-Parameter Debug</h3>
        <button onClick={() => setShowDebug(false)} className="text-red-500">×</button>
      </div>
      
      <div className="space-y-3">
        <div>
          <strong>Aktuelle URL-Parameter:</strong>
          <pre className="bg-gray-100 p-2 mt-1 rounded text-xs overflow-auto">
            {Object.keys(urlParams).length > 0 ? JSON.stringify(urlParams, null, 2) : 'Keine URL-Parameter'}
          </pre>
        </div>
        
        <div>
          <strong>Gespeicherte Parameter (LocalStorage):</strong>
          <pre className="bg-gray-100 p-2 mt-1 rounded text-xs overflow-auto">
            {Object.keys(storedParams).length > 0 ? JSON.stringify(storedParams, null, 2) : 'Keine gespeicherten Parameter'}
          </pre>
        </div>
        
        <div>
          <strong>Effektive Parameter (verwendet):</strong>
          <pre className="bg-green-100 p-2 mt-1 rounded text-xs overflow-auto">
            {Object.keys(effectiveParams).length > 0 ? JSON.stringify(effectiveParams, null, 2) : 'Keine Parameter aktiv'}
          </pre>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={handleClearStorage}
            className="bg-red-500 text-white px-2 py-1 text-xs rounded hover:bg-red-600"
          >
            Storage löschen
          </button>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 text-white px-2 py-1 text-xs rounded hover:bg-blue-600"
          >
            Neu laden
          </button>
        </div>
      </div>
    </div>
  );
} 