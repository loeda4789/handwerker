'use client'

import ConfigCard from './ConfigCard'

interface DesignPreviewButtonProps {
  className?: string
}

export default function DesignPreviewButton({ className = '' }: DesignPreviewButtonProps) {
  return <ConfigCard />
} 