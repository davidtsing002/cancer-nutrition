import type { UserRole } from '../types'

interface HeaderProps {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
}

const roleConfig = {
  patient: { label: '患者视图', color: 'bg-cyan-600', icon: '🏥', desc: '简洁易用，专注个人健康' },
  family: { label: '家属视图', color: 'bg-teal-600', icon: '👨‍👩‍👧', desc: '营养追踪，关爱家人' },
  clinician: { label: '医护视图', color: 'bg-blue-700', icon: '👨‍⚕️', desc: '专业数据，循证指南' },
}

export default function Header({ userRole, setUserRole }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-cyan-100">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between flex-wrap gap-3">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-xl flex items-center justify-center shadow-md">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold text-cyan-900">肿瘤营养管家</h1>
              <p className="text-xs text-cyan-500">CancerCare Nutrition · 中文专业版</p>
            </div>
          </div>

          {/* Role Switcher */}
          <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-1.5 border border-gray-200">
            {(Object.keys(roleConfig) as UserRole[]).map((role) => (
              <button
                key={role}
                onClick={() => setUserRole(role)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium cursor-pointer transition-all duration-200 ${
                  userRole === role
                    ? `${roleConfig[role].color} text-white shadow-sm`
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span>{roleConfig[role].icon}</span>
                <span className="hidden sm:inline">{roleConfig[role].label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Role description */}
        <div className="mt-1.5">
          <span className="text-xs text-cyan-500 bg-cyan-50 px-2 py-0.5 rounded-full">
            当前模式：{roleConfig[userRole].desc}
          </span>
        </div>
      </div>
    </header>
  )
}
