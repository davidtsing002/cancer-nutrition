import React from 'react'
import type { PageType } from '../App'

interface NavigationProps {
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
}

const navItems: { id: PageType; label: string; icon: React.ReactNode; desc: string }[] = [
  {
    id: 'assessment',
    label: '营养评估',
    desc: '个性化方案',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4"/>
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      </svg>
    )
  },
  {
    id: 'tracker',
    label: '饮食记录',
    desc: '每日追踪',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3h18v18H3z"/>
        <path d="M3 9h18M3 15h18M9 3v18"/>
      </svg>
    )
  },
  {
    id: 'drug',
    label: '药食互作',
    desc: '安全查询',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.5 20H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H20a2 2 0 0 1 2 2v2"/>
        <circle cx="18" cy="18" r="3"/>
        <path d="M18 15v3l2 1"/>
      </svg>
    )
  },
  {
    id: 'consensus',
    label: '专家共识',
    desc: '2024版ONS',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    )
  },
  {
    id: 'knowledge',
    label: '知识库',
    desc: '中西医结合',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
      </svg>
    )
  },
]

export default function Navigation({ currentPage, setCurrentPage }: NavigationProps) {
  return (
    <nav className="bg-white border-b border-cyan-100 sticky top-0 z-40 shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex gap-1 overflow-x-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 text-sm font-medium whitespace-nowrap cursor-pointer transition-all duration-200 ${
                currentPage === item.id
                  ? 'border-cyan-600 text-cyan-700 bg-cyan-50'
                  : 'border-transparent text-gray-500 hover:text-cyan-600 hover:border-cyan-300 hover:bg-cyan-50/50'
              }`}
            >
              <span className={currentPage === item.id ? 'text-cyan-600' : 'text-gray-400'}>
                {item.icon}
              </span>
              <div className="text-left">
                <div>{item.label}</div>
                <div className="text-xs opacity-60">{item.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
