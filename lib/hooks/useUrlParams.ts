'use client'

import { useState, useEffect } from 'react';
import { UrlParams, extractUrlParams, hasUrlParams, decodeUrlParams } from '@/lib/url-params';
import { ContentData } from '@/types/content';
import { mergeUrlDataWithContent } from '@/lib/url-params';
import { getContentDataByBranche } from '@/lib/config';

export function useUrlParams() {
  const [urlParams, setUrlParams] = useState<UrlParams>({});
  const [hasParams, setHasParams] = useState(false);

  useEffect(() => {
    const params = extractUrlParams();
    setUrlParams(params);
    setHasParams(hasUrlParams(params));

    // URL-Änderungen überwachen
    const handleUrlChange = () => {
      const newParams = extractUrlParams();
      setUrlParams(newParams);
      setHasParams(hasUrlParams(newParams));
    };

    // Event Listener für URL-Änderungen
    window.addEventListener('popstate', handleUrlChange);
    
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
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

// Hook für branchenspezifisches Content-Laden (jetzt synchron)
export function useContentWithBranche(baseContent: ContentData) {
  const [content, setContent] = useState<ContentData>(baseContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function loadContent() {
      setLoading(true);
      try {
        const loadedContent = getContentDataByBranche();
        setContent(loadedContent);
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
    
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
    };
  }, [baseContent]);

  return {
    content,
    loading
  };
} 