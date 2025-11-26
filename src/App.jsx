import { useState } from 'react'
import Navigation from './components/Navigation'
import HomeSection from './components/HomeSection'
import AnalyzeSection from './components/AnalyzeSection'
import './styles/components.css'

function App() {
  const [activeSection, setActiveSection] = useState('analyze')

  const navigateToSection = (sectionId) => {
    setActiveSection(sectionId)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Navigation activeSection={activeSection} onNavigate={navigateToSection} />

      {activeSection === 'home' && <HomeSection onNavigate={navigateToSection} />}
      {activeSection === 'analyze' && <AnalyzeSection />}
    </div>
  )
}

export default App
