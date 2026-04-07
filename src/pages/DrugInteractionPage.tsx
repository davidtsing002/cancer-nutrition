import { useState } from 'react'
import { DRUG_INTERACTIONS } from '../data/drugInteractions'
import WechatConsult from '../components/WechatConsult'

const SEVERITY_CONFIG = {
  severe: { label: '严重', bg: 'bg-red-50', border: 'border-red-400', text: 'text-red-700', badge: 'bg-red-500 text-white' },
  moderate: { label: '中度', bg: 'bg-orange-50', border: 'border-orange-400', text: 'text-orange-700', badge: 'bg-orange-400 text-white' },
  mild: { label: '轻度', bg: 'bg-yellow-50', border: 'border-yellow-300', text: 'text-yellow-700', badge: 'bg-yellow-400 text-white' },
}

export default function DrugInteractionPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDrug, setSelectedDrug] = useState<typeof DRUG_INTERACTIONS[0] | null>(null)

  const filtered = DRUG_INTERACTIONS.filter(d =>
    d.drugName.includes(searchQuery) ||
    d.drugNameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.drugClass.includes(searchQuery) ||
    d.commonUse.some(u => u.includes(searchQuery))
  )

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-cyan-100">
        <h2 className="text-xl font-bold text-cyan-900 mb-1 flex items-center gap-2">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0891B2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.5 20H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H20a2 2 0 0 1 2 2v2"/>
            <circle cx="18" cy="18" r="3"/><path d="M18 15v3l2 1"/>
          </svg>
          药物-食物相互作用查询
        </h2>
        <p className="text-cyan-600 text-sm">查询化疗药物、靶向药与食物的相互作用，保障用药安全</p>
      </div>

      {/* Search */}
      <div className="relative">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="搜索药物名称（中文或英文）、药物类型、癌症类型..."
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-white text-sm focus:border-cyan-500 focus:outline-none shadow-sm"
        />
      </div>

      {/* Warning Banner */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" className="flex-shrink-0 mt-0.5">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
          <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
        <div>
          <p className="text-sm font-semibold text-red-700 mb-0.5">重要安全提示</p>
          <p className="text-xs text-red-600">发现严重相互作用时，请立即告知主治医师。不要自行停药或更改剂量。本信息仅供参考，不替代专业药师和医师的建议。</p>
        </div>
      </div>

      {selectedDrug ? (
        /* Drug Detail View */
        <div className="space-y-5">
          <button onClick={() => setSelectedDrug(null)} className="flex items-center gap-2 text-cyan-600 hover:text-cyan-800 text-sm font-medium cursor-pointer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            返回列表
          </button>

          {/* Drug Header */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-cyan-100">
            <div className="flex items-start justify-between flex-wrap gap-3">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{selectedDrug.drugName}</h3>
                <p className="text-gray-400 text-sm">{selectedDrug.drugNameEn}</p>
                <span className="inline-block mt-2 bg-cyan-100 text-cyan-800 text-xs px-2 py-1 rounded-full font-medium">{selectedDrug.drugClass}</span>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1 font-medium">常用于：</p>
                <div className="flex flex-wrap gap-1">
                  {selectedDrug.commonUse.map(u => (
                    <span key={u} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{u}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Food Interactions */}
          <div className="bg-white rounded-2xl shadow-sm border border-cyan-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h4 className="font-bold text-gray-800 flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                食物相互作用
              </h4>
            </div>
            <div className="divide-y divide-gray-50">
              {selectedDrug.criticalFoodInteractions.map((interaction, i) => {
                const config = SEVERITY_CONFIG[interaction.severity]
                return (
                  <div key={i} className={`p-4 ${config.bg} border-l-4 ${config.border}`}>
                    <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
                      <div className="font-medium text-gray-800">{interaction.food}</div>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${config.badge}`}>
                        {config.label}相互作用
                      </span>
                    </div>
                    <div className="space-y-1.5 text-sm">
                      <p><span className="font-medium text-gray-600">作用机制：</span><span className={config.text}>{interaction.mechanism}</span></p>
                      <p><span className="font-medium text-gray-600">可能后果：</span><span className={config.text}>{interaction.consequence}</span></p>
                      <div className="mt-2 p-2 bg-white rounded-lg border border-current border-opacity-20">
                        <p className="font-semibold text-gray-800 flex items-center gap-1">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11l3 3L22 4"/></svg>
                          建议：
                        </p>
                        <p className={`${config.text} font-medium`}>{interaction.recommendation}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Nutrition Tips */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-emerald-100">
            <h4 className="font-bold text-emerald-800 mb-3 flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/><path d="M8 12l2.5 2.5L16 9"/></svg>
              营养注意事项
            </h4>
            <ul className="space-y-2">
              {selectedDrug.nutritionTips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="w-5 h-5 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">{i + 1}</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* Monitoring */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-blue-100">
            <h4 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
              需监测指标
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedDrug.monitoringItems.map((item, i) => (
                <span key={i} className="bg-blue-50 text-blue-700 border border-blue-200 text-sm px-3 py-1.5 rounded-lg font-medium">{item}</span>
              ))}
            </div>
          </div>

          <WechatConsult />
        </div>
      ) : (
        /* Drug List */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map(drug => {
            const severeCount = drug.criticalFoodInteractions.filter(i => i.severity === 'severe').length
            const moderateCount = drug.criticalFoodInteractions.filter(i => i.severity === 'moderate').length
            return (
              <button
                key={drug.drugName}
                onClick={() => setSelectedDrug(drug)}
                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-left hover:border-cyan-300 hover:shadow-md cursor-pointer transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-gray-800">{drug.drugName}</h3>
                    <p className="text-xs text-gray-400">{drug.drugNameEn}</p>
                  </div>
                  <div className="flex gap-1.5">
                    {severeCount > 0 && (
                      <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium border border-red-200">
                        {severeCount} 严重
                      </span>
                    )}
                    {moderateCount > 0 && (
                      <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-medium border border-orange-200">
                        {moderateCount} 中度
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-xs bg-cyan-50 text-cyan-700 px-2 py-0.5 rounded-full">{drug.drugClass}</span>
                <div className="mt-3 flex flex-wrap gap-1">
                  {drug.commonUse.slice(0, 3).map(u => (
                    <span key={u} className="text-xs text-gray-500 bg-gray-50 px-2 py-0.5 rounded-full">{u}</span>
                  ))}
                </div>
              </button>
            )
          })}
          {filtered.length === 0 && (
            <div className="col-span-2 py-12 text-center text-gray-400">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto mb-3 opacity-40"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <p>未找到匹配药物，请尝试其他关键词</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
