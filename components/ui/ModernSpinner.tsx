'use client'

import React from 'react'

interface ModernSpinnerProps {
  variant?: 'pulse' | 'dots' | 'ring' | 'wave' | 'bars' | 'squares'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: 'primary' | 'white' | 'accent'
  className?: string
}

export default function ModernSpinner({ 
  variant = 'ring', 
  size = 'md', 
  color = 'primary',
  className = '' 
}: ModernSpinnerProps) {
  
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }
  
  const colorClasses = {
    primary: 'text-primary border-primary',
    white: 'text-white border-white',
    accent: 'text-accent border-accent'
  }

  const baseSize = sizeClasses[size]
  const colorClass = colorClasses[color]

  if (variant === 'pulse') {
    return (
      <div className={`${baseSize} ${className}`}>
        <div className="relative">
          <div className={`${baseSize} rounded-full ${color === 'primary' ? 'bg-primary' : color === 'white' ? 'bg-white' : 'bg-accent'} animate-ping opacity-75`}></div>
          <div className={`${baseSize} rounded-full ${color === 'primary' ? 'bg-primary' : color === 'white' ? 'bg-white' : 'bg-accent'} absolute top-0 left-0`}></div>
        </div>
      </div>
    )
  }

  if (variant === 'dots') {
    return (
      <div className={`flex space-x-1 ${className}`}>
        <div className={`w-2 h-2 ${color === 'primary' ? 'bg-primary' : color === 'white' ? 'bg-white' : 'bg-accent'} rounded-full animate-bounce`}></div>
        <div className={`w-2 h-2 ${color === 'primary' ? 'bg-primary' : color === 'white' ? 'bg-white' : 'bg-accent'} rounded-full animate-bounce`} style={{ animationDelay: '0.1s' }}></div>
        <div className={`w-2 h-2 ${color === 'primary' ? 'bg-primary' : color === 'white' ? 'bg-white' : 'bg-accent'} rounded-full animate-bounce`} style={{ animationDelay: '0.2s' }}></div>
      </div>
    )
  }

  if (variant === 'wave') {
    return (
      <div className={`flex items-end space-x-1 ${className}`}>
        <div className={`w-1 h-4 ${color === 'primary' ? 'bg-primary' : color === 'white' ? 'bg-white' : 'bg-accent'} animate-wave`}></div>
        <div className={`w-1 h-6 ${color === 'primary' ? 'bg-primary' : color === 'white' ? 'bg-white' : 'bg-accent'} animate-wave`} style={{ animationDelay: '0.1s' }}></div>
        <div className={`w-1 h-4 ${color === 'primary' ? 'bg-primary' : color === 'white' ? 'bg-white' : 'bg-accent'} animate-wave`} style={{ animationDelay: '0.2s' }}></div>
        <div className={`w-1 h-6 ${color === 'primary' ? 'bg-primary' : color === 'white' ? 'bg-white' : 'bg-accent'} animate-wave`} style={{ animationDelay: '0.3s' }}></div>
        <div className={`w-1 h-4 ${color === 'primary' ? 'bg-primary' : color === 'white' ? 'bg-white' : 'bg-accent'} animate-wave`} style={{ animationDelay: '0.4s' }}></div>
      </div>
    )
  }

  if (variant === 'bars') {
    return (
      <div className={`flex space-x-1 ${className}`}>
        <div className={`w-1 h-8 ${color === 'primary' ? 'bg-primary' : color === 'white' ? 'bg-white' : 'bg-accent'} animate-bars`}></div>
        <div className={`w-1 h-8 ${color === 'primary' ? 'bg-primary' : color === 'white' ? 'bg-white' : 'bg-accent'} animate-bars`} style={{ animationDelay: '0.1s' }}></div>
        <div className={`w-1 h-8 ${color === 'primary' ? 'bg-primary' : color === 'white' ? 'bg-white' : 'bg-accent'} animate-bars`} style={{ animationDelay: '0.2s' }}></div>
        <div className={`w-1 h-8 ${color === 'primary' ? 'bg-primary' : color === 'white' ? 'bg-white' : 'bg-accent'} animate-bars`} style={{ animationDelay: '0.3s' }}></div>
      </div>
    )
  }

  if (variant === 'squares') {
    return (
      <div className={`grid grid-cols-3 gap-1 ${className}`}>
        <div className={`w-3 h-3 ${color === 'primary' ? 'bg-primary' : color === 'white' ? 'bg-white' : 'bg-accent'} animate-squares`}></div>
        <div className={`w-3 h-3 ${color === 'primary' ? 'bg-primary' : color === 'white' ? 'bg-white' : 'bg-accent'} animate-squares`} style={{ animationDelay: '0.1s' }}></div>
        <div className={`w-3 h-3 ${color === 'primary' ? 'bg-primary' : color === 'white' ? 'bg-white' : 'bg-accent'} animate-squares`} style={{ animationDelay: '0.2s' }}></div>
        <div className={`w-3 h-3 ${color === 'primary' ? 'bg-primary' : color === 'white' ? 'bg-white' : 'bg-accent'} animate-squares`} style={{ animationDelay: '0.3s' }}></div>
        <div className={`w-3 h-3 ${color === 'primary' ? 'bg-primary' : color === 'white' ? 'bg-white' : 'bg-accent'} animate-squares`} style={{ animationDelay: '0.4s' }}></div>
        <div className={`w-3 h-3 ${color === 'primary' ? 'bg-primary' : color === 'white' ? 'bg-white' : 'bg-accent'} animate-squares`} style={{ animationDelay: '0.5s' }}></div>
        <div className={`w-3 h-3 ${color === 'primary' ? 'bg-primary' : color === 'white' ? 'bg-white' : 'bg-accent'} animate-squares`} style={{ animationDelay: '0.6s' }}></div>
        <div className={`w-3 h-3 ${color === 'primary' ? 'bg-primary' : color === 'white' ? 'bg-white' : 'bg-accent'} animate-squares`} style={{ animationDelay: '0.7s' }}></div>
        <div className={`w-3 h-3 ${color === 'primary' ? 'bg-primary' : color === 'white' ? 'bg-white' : 'bg-accent'} animate-squares`} style={{ animationDelay: '0.8s' }}></div>
      </div>
    )
  }

  // Default: Ring Spinner
  return (
    <div className={`${baseSize} ${className}`}>
      <div className={`${baseSize} border-4 border-gray-200 rounded-full animate-spin`}>
        <div className={`${baseSize} border-4 border-transparent ${colorClass} border-t-current rounded-full`}></div>
      </div>
    </div>
  )
} 