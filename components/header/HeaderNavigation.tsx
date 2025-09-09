import Link from 'next/link'
import { NavigationItem, DropdownItem } from '@/lib/config/navigationConfig'
import { DropdownStyles } from '@/lib/config/headerStyles'

interface HeaderNavigationProps {
  navItems: NavigationItem[]
  textColor: string
  dropdownStyles: DropdownStyles
  dropdownOpen: string | null
  activeSection: string
  siteMode: 'onepage' | 'multipage'
  onDropdownEnter: (itemId: string) => void
  onDropdownLeave: (itemId: string) => void
  onSmoothScroll: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void
}

export default function HeaderNavigation({
  navItems,
  textColor,
  dropdownStyles,
  dropdownOpen,
  activeSection,
  siteMode,
  onDropdownEnter,
  onDropdownLeave,
  onSmoothScroll
}: HeaderNavigationProps) {
  return (
    <div className="hidden lg:flex items-center space-x-8">
      {navItems.map((item) => (
        <div key={item.id} className="relative">
          {item.hasDropdown ? (
            <div
              className="relative"
              onMouseEnter={() => onDropdownEnter(item.id)}
              onMouseLeave={() => onDropdownLeave(item.id)}
            >
              {item.isClickable && item.href ? (
                <Link
                  href={item.href}
                  className={`${textColor} relative font-medium transition-all duration-300 flex items-center uppercase group hover:scale-105`}
                  onClick={(e) => {
                    console.log('Link clicked:', item.label, item.href)
                    onDropdownLeave(item.id)
                  }}
                >
                  <span className="relative">
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full" style={{ backgroundColor: 'var(--color-primary)' }}></span>
                  </span>
                  <svg className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </Link>
              ) : (
                <button 
                  className={`${textColor} relative font-medium transition-all duration-300 flex items-center uppercase group hover:scale-105`}
                >
                  <span className="relative">
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full" style={{ backgroundColor: 'var(--color-primary)' }}></span>
                  </span>
                  <svg className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
              )}
              
              {dropdownOpen === item.id && (
                <div 
                  className={`${dropdownStyles.container}`}
                  style={dropdownStyles.containerStyle}
                  onMouseEnter={() => onDropdownEnter(item.id)}
                  onMouseLeave={() => onDropdownLeave(item.id)}
                >
                  {item.dropdownItems?.map((dropdownItem, index) => (
                    dropdownItem.href ? (
                      <Link
                        key={index}
                        href={dropdownItem.href}
                        className={`${dropdownStyles.item}`}
                        style={{
                          '--tw-gradient-from': 'var(--color-primary)',
                          '--tw-gradient-to': 'var(--color-secondary)',
                        } as React.CSSProperties}
                        onMouseEnter={(e) => {
                          if (dropdownStyles.itemHoverStyle) {
                            Object.assign(e.currentTarget.style, dropdownStyles.itemHoverStyle)
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.removeProperty('background')
                          e.currentTarget.style.removeProperty('color')
                          e.currentTarget.style.removeProperty('background-color')
                        }}
                      >
                        {'icon' in dropdownItem && dropdownItem.icon && (
                          <span className="mr-2 text-lg">{dropdownItem.icon}</span>
                        )}
                        {dropdownItem.label}
                      </Link>
                    ) : (
                      <span
                        key={index}
                        className={`${dropdownStyles.item} cursor-default`}
                      >
                        {'icon' in dropdownItem && dropdownItem.icon && (
                          <span className="mr-2 text-lg">{dropdownItem.icon}</span>
                        )}
                        {dropdownItem.label}
                      </span>
                    )
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Link
              href={item.href || '#'}
              onClick={item.isClickable && item.href?.startsWith('#') ? (e) => onSmoothScroll(e, item.id) : undefined}
              className={`${textColor} relative font-medium transition-all duration-300 uppercase group hover:scale-105 ${
                activeSection === item.id && siteMode === 'onepage' ? 'scale-105' : ''
              }`}
            >
              <span className="relative">
                {item.label}
                <span className={`absolute bottom-0 left-0 h-0.5 bg-current transition-all duration-300 ${
                  activeSection === item.id && siteMode === 'onepage' ? 'w-full' : 'w-0 group-hover:w-full'
                }`} style={{ backgroundColor: 'var(--color-primary)' }}></span>
              </span>
            </Link>
          )}
        </div>
      ))}
    </div>
  )
}
