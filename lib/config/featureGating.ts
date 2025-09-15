export type PackageVariant = 'starter' | 'professional' | 'premium'

export interface FeatureConfig {
  // Form Features
  formCategories: boolean
  formFileUpload: boolean
  formAdvancedValidation: boolean
  
  // Services Features
  servicesDetailPages: boolean
  servicesGalleryOnly: boolean
  servicesBooking: boolean
  
  // Portfolio Features
  portfolioFiltering: boolean
  portfolioLightbox: boolean
  portfolioFullscreen: boolean
  
  // Contact Features
  contactMap: boolean
  contactMultipleForms: boolean
  contactLiveChat: boolean
  
  // Navigation Features
  navigationSubmenus: boolean
  navigationMegaMenu: boolean
  navigationBreadcrumbs: boolean
  
  // Content Features
  contentBlog: boolean
  contentNews: boolean
  contentTestimonials: boolean
  
  // Design Features
  customColors: boolean
  customFonts: boolean
  customLayouts: boolean
  animations: boolean
}

export const PACKAGE_FEATURES: Record<PackageVariant, FeatureConfig> = {
  starter: {
    // Form Features
    formCategories: false,
    formFileUpload: false,
    formAdvancedValidation: false,
    
    // Services Features
    servicesDetailPages: false,
    servicesGalleryOnly: true,
    servicesBooking: false,
    
    // Portfolio Features
    portfolioFiltering: true,
    portfolioLightbox: true,
    portfolioFullscreen: false,
    
    // Contact Features
    contactMap: true,
    contactMultipleForms: false,
    contactLiveChat: false,
    
    // Navigation Features
    navigationSubmenus: false,
    navigationMegaMenu: false,
    navigationBreadcrumbs: false,
    
    // Content Features
    contentBlog: false,
    contentNews: false,
    contentTestimonials: true,
    
    // Design Features
    customColors: false,
    customFonts: false,
    customLayouts: false,
    animations: false
  },
  
  professional: {
    // Form Features
    formCategories: true,
    formFileUpload: true,
    formAdvancedValidation: true,
    
    // Services Features
    servicesDetailPages: true,
    servicesGalleryOnly: false,
    servicesBooking: true,
    
    // Portfolio Features
    portfolioFiltering: true,
    portfolioLightbox: true,
    portfolioFullscreen: true,
    
    // Contact Features
    contactMap: true,
    contactMultipleForms: true,
    contactLiveChat: false,
    
    // Navigation Features
    navigationSubmenus: true,
    navigationMegaMenu: false,
    navigationBreadcrumbs: true,
    
    // Content Features
    contentBlog: false,
    contentNews: true,
    contentTestimonials: true,
    
    // Design Features
    customColors: true,
    customFonts: false,
    customLayouts: false,
    animations: true
  },
  
  premium: {
    // Form Features
    formCategories: true,
    formFileUpload: true,
    formAdvancedValidation: true,
    
    // Services Features
    servicesDetailPages: true,
    servicesGalleryOnly: false,
    servicesBooking: true,
    
    // Portfolio Features
    portfolioFiltering: true,
    portfolioLightbox: true,
    portfolioFullscreen: true,
    
    // Contact Features
    contactMap: true,
    contactMultipleForms: true,
    contactLiveChat: true,
    
    // Navigation Features
    navigationSubmenus: true,
    navigationMegaMenu: true,
    navigationBreadcrumbs: true,
    
    // Content Features
    contentBlog: true,
    contentNews: true,
    contentTestimonials: true,
    
    // Design Features
    customColors: true,
    customFonts: true,
    customLayouts: true,
    animations: true
  }
}

export function getFeatureConfig(packageVariant: PackageVariant): FeatureConfig {
  return PACKAGE_FEATURES[packageVariant]
}

export function hasFeature(packageVariant: PackageVariant, feature: keyof FeatureConfig): boolean {
  return PACKAGE_FEATURES[packageVariant][feature]
}

export function getAvailableFeatures(packageVariant: PackageVariant): string[] {
  const config = PACKAGE_FEATURES[packageVariant]
  return Object.entries(config)
    .filter(([_, enabled]) => enabled)
    .map(([feature, _]) => feature)
}

export function getMissingFeatures(packageVariant: PackageVariant): string[] {
  const config = PACKAGE_FEATURES[packageVariant]
  return Object.entries(config)
    .filter(([_, enabled]) => !enabled)
    .map(([feature, _]) => feature)
}
