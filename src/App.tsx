import { useState } from 'react'
import { Starfield } from './components/Starfield'
import { ReadingFlow } from './components/ReadingFlow'
import { Library } from './components/Library'
import { History } from './components/History'
import { Guide } from './components/Guide'
import './App.css'

type Tab = 'reading' | 'library' | 'history'

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'reading', label: 'Bói bài', icon: '🔮' },
  { id: 'library', label: 'Thư viện', icon: '📖' },
  { id: 'history', label: 'Lịch sử', icon: '📜' },
]

const TAB_IDS: Tab[] = ['reading', 'library', 'history']

function initialTab(): Tab {
  const h = window.location.hash.replace('#', '') as Tab
  return TAB_IDS.includes(h) ? h : 'reading'
}

function App() {
  const [tab, setTab] = useState<Tab>(initialTab)
  const [guideOpen, setGuideOpen] = useState(false)

  function changeTab(t: Tab) {
    setTab(t)
    window.location.hash = t
  }

  return (
    <div className="app">
      <Starfield />

      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">🌙</span>
          <div>
            <h1>Huyền Bài</h1>
            <p>Tarot · soi chiếu nội tâm</p>
          </div>
        </div>
        <button type="button" className="btn ghost sm" onClick={() => setGuideOpen(true)}>
          ✦ Tìm hiểu Tarot
        </button>
      </header>

      <nav className="tabbar">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            className={`tab ${tab === t.id ? 'active' : ''}`}
            onClick={() => changeTab(t.id)}
          >
            <span className="tab-icon">{t.icon}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </nav>

      <main className="content">
        {tab === 'reading' && <ReadingFlow />}
        {tab === 'library' && <Library />}
        {tab === 'history' && <History />}
      </main>

      <footer className="foot">
        <p>Tarot là tấm gương soi chiếu, không phải định mệnh. Hãy lắng nghe trực giác của chính bạn. 🔮</p>
      </footer>

      {guideOpen && <Guide onClose={() => setGuideOpen(false)} />}
    </div>
  )
}

export default App
