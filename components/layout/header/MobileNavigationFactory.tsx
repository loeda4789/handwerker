import { NavigationItem } from '@/lib/config/navigationConfig'
import { ContentData } from '@/types/content'
import MobileHeader from './MobileHeader'
import MobileSideNavigation from './MobileSideNavigation'
import MobileDropdownNavigation from './MobileDropdownNavigation'

interface MobileNavigationFactoryProps {
  isOpen: boolean
  navItems: NavigationItem[]
  content: ContentData
  siteMode: 'onepage' | 'multipage'
  onSmoothScroll: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void
  onClose: () => void
  mobileType?: 'fullscreen' | 'sidebar' | 'dropdown'
}

export default function MobileNavigationFactory({
  isOpen,
  navItems,
  content,
  siteMode,
  onSmoothScroll,
  onClose,
  mobileType = 'fullscreen'
}: MobileNavigationFactoryProps) {
  
  // Wähle die passende Navigation basierend auf dem Typ
  switch (mobileType) {
    case 'sidebar':
      return (
        <MobileSideNavigation
          isOpen={isOpen}
          navItems={navItems}
          content={content}
          siteMode={siteMode}
          onSmoothScroll={onSmoothScroll}
          onClose={onClose}
        />
      )
    
    case 'dropdown':
      return (
        <MobileDropdownNavigation
          isOpen={isOpen}
          navItems={navItems}
          content={content}
          siteMode={siteMode}
          onSmoothScroll={onSmoothScroll}
          onClose={onClose}
        />
      )
    
    case 'fullscreen':
    default:
      return (
        <MobileHeader
          isOpen={isOpen}
          navItems={navItems}
          content={content}
          siteMode={siteMode}
          onSmoothScroll={onSmoothScroll}
          onClose={onClose}
        />
      )
  }
}
