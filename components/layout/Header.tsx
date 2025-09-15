'use client';

import React from 'react';
import { ContentData } from '@/types/content';
import UnifiedHeader from './header/UnifiedHeader';

interface HeaderProps {
  content: ContentData;
}

export default function Header({ content }: HeaderProps) {
  return <UnifiedHeader content={content} />;
}