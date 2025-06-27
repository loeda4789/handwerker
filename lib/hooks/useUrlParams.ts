'use client'

import { useState, useEffect } from 'react';
import { UrlParams, getEffectiveUrlParams, hasUrlParams, decodeUrlParams } from '@/lib/url-params';
import { ContentData } from '@/types/content';
import { mergeUrlDataWithContent } from '@/lib/url-params';
import { getContentDataByBranche } from '@/lib/config';

export function useUrlParams() {
  const [urlParams, setUrlParams] = useState<UrlParams>({});
  const [hasParams, setHasParams] = useState(false);

  useEffect(() => {
    // Lade effektive URL-Parameter (URL oder LocalStorage)
    const params = getEffectiveUrlParams();
    setUrlParams(params);
    setHasParams(hasUrlParams(params));

    // URL-Änderungen überwachen
    const handleUrlChange = () => {
      const newParams = getEffectiveUrlParams();
      setUrlParams(newParams);
      setHasParams(hasUrlParams(newParams));
    };

    // Event Listener für URL-Änderungen
    window.addEventListener('popstate', handleUrlChange);
    
    // Event Listener für Storage-Änderungen (zwischen Tabs)
    window.addEventListener('storage', handleUrlChange);
    
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('storage', handleUrlChange);
    };
  }, []);

  return {
    urlParams,
    hasParams,
    decodedParams: decodeUrlParams(urlParams)
  };
}

export function useContentWithUrlParams(baseContent: ContentData): ContentData {
  const { urlParams, hasParams } = useUrlParams();
  
  if (!hasParams) {
    return baseContent;
  }
  
  return mergeUrlDataWithContent(baseContent, urlParams);
}

// Hook für branchenspezifisches Content-Laden mit URL-Parameter-Unterstützung
export function useContentWithBranche(baseContent: ContentData) {
  const [content, setContent] = useState<ContentData>(baseContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function loadContent() {
      setLoading(true);
      try {
        // Lade Content mit Branche und URL-Parametern
        const loadedContent = getContentDataByBranche();
        
        // Wende URL-Parameter auf den geladenen Content an
        const urlParams = getEffectiveUrlParams();
        const finalContent = hasUrlParams(urlParams) 
          ? mergeUrlDataWithContent(loadedContent, urlParams)
          : loadedContent;
          
        setContent(finalContent);
      } catch (error) {
        console.error('Fehler beim Laden des Contents:', error);
        setContent(baseContent);
      } finally {
        setLoading(false);
      }
    }

    loadContent();
    
    // URL-Änderungen überwachen
    const handleUrlChange = () => {
      loadContent();
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('storage', handleUrlChange);
    
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('storage', handleUrlChange);
    };
  }, [baseContent]);

  return {
    content,
    loading
  };
} 