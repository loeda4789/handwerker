import { useContext } from 'react'
import { AppConfigContext } from '@/contexts/AppConfigContext'
import { getFeatureConfig, hasFeature, type PackageVariant, type FeatureConfig } from '@/lib/config/featureGating'

export function useFeatureGating() {
  const context = useContext(AppConfigContext)
  
  if (!context) {
    throw new Error('useFeatureGating must be used within an AppConfigProvider')
  }
  
  const { config } = context
  
  // Get current package variant from config
  const packageVariant: PackageVariant = (config?.layout?.variant as PackageVariant) || 'starter'
  
  const featureConfig = getFeatureConfig(packageVariant)
  
  const hasFeatureAccess = (feature: keyof FeatureConfig): boolean => {
    return hasFeature(packageVariant, feature)
  }
  
  const getFeatureConfigForPackage = (variant: PackageVariant): FeatureConfig => {
    return getFeatureConfig(variant)
  }
  
  return {
    packageVariant,
    featureConfig,
    hasFeatureAccess,
    getFeatureConfigForPackage,
    isStarter: packageVariant === 'starter',
    isProfessional: packageVariant === 'professional',
    isPremium: packageVariant === 'premium'
  }
}
