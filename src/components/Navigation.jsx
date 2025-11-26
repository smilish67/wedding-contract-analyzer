import { Shield } from 'lucide-react'

export default function Navigation({ activeSection, onNavigate }) {
  const navItems = [
    { id: 'home', label: '홈' },
    { id: 'analyze', label: '계약서 분석' },
  ]

  return (
    <nav className="navbar">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <div className="nav-brand">
            <Shield className="w-8 h-8" />
            <span className="ml-2">웨딩가드</span>
          </div>
          <ul className="nav-menu flex">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault()
                    onNavigate(item.id)
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}
