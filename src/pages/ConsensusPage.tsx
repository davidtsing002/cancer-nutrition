import { useState } from 'react'
import { EXPERT_CONSENSUS_2024, NOT_RECOMMENDED } from '../data/expertConsensus'
import WechatConsult from '../components/WechatConsult'

export default function ConsensusPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'recs' | 'selector' | 'notrecommended'>('overview')

  // Formula selector logic
  const [condition, setCondition] = useState<string[]>([])
  const toggleCondition = (c: string) => setCondition(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c])

  const getFormula = () => {
    if (condition.includes('糖尿病/糖耐量异常')) return { name: '糖尿病专用配方（低GI）', rec: EXPERT_CONSENSUS_2024[7] }
    if (condition.includes('严重消化吸收障碍')) return { name: '要素型/短肽配方', rec: EXPERT_CONSENSUS_2024[6] }
    if (condition.includes('胰腺外分泌功能不全')) return { name: '富含MCT的要素型配方', rec: EXPERT_CONSENSUS_2024[11] }
    if (condition.includes('需限制液体')) return { name: '高能量密度配方（≥1.5kcal/mL）', rec: EXPERT_CONSENSUS_2024[9] }
    if (condition.includes('围手术期大手术')) return { name: '免疫增强配方（含精氨酸/ω-3/核苷酸）', rec: EXPERT_CONSENSUS_2024[10] }
    if (condition.includes('腹泻/便秘')) return { name: '含膳食纤维配方', rec: EXPERT_CONSENSUS_2024[12] }
    if (condition.includes('严重肾功能不全+电解质紊乱')) return { name: '肾病专用配方（低钠低钾低磷）', rec: EXPERT_CONSENSUS_2024[8] }
    return { name: '标准整蛋白配方', rec: EXPERT_CONSENSUS_2024[5] }
  }

  const formula = getFormula()

  const tabs = [
    { id: 'overview' as const, label: '共识概览' },
    { id: 'recs' as const, label: '推荐意见' },
    { id: 'selector' as const, label: '制剂选择器' },
    { id: 'notrecommended' as const, label: '不推荐项目' },
  ]

  return (
    <div className="space-y-5">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-1">肿瘤患者口服营养补充制剂选择专家共识</h2>
            <p className="text-emerald-100 text-sm">（2024版）| 中国营养学会肿瘤营养管理分会</p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">中华临床营养杂志 2024, 32(05):279-288</span>
              <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">20条推荐意见</span>
              <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">循证医学A-C级证据</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex border-b border-gray-100 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3 text-sm font-medium whitespace-nowrap cursor-pointer transition-colors ${
                activeTab === tab.id ? 'text-emerald-700 border-b-2 border-emerald-600 bg-emerald-50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-5">
          {activeTab === 'overview' && (
            <div className="space-y-5">
              {/* Core Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: '推荐意见总数', value: '20条', color: 'bg-emerald-100 text-emerald-700' },
                  { label: 'A级证据', value: '8条', color: 'bg-green-100 text-green-700' },
                  { label: 'B级证据', value: '9条', color: 'bg-blue-100 text-blue-700' },
                  { label: '不常规推荐', value: '6项', color: 'bg-red-100 text-red-700' },
                ].map(stat => (
                  <div key={stat.label} className={`${stat.color} rounded-xl p-3 text-center`}>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-xs mt-1 opacity-80">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Key Principles */}
              <div>
                <h3 className="font-bold text-gray-800 mb-3">核心原则</h3>
                <div className="space-y-3">
                  {[
                    { icon: '1', title: '营养筛查优先', desc: '肿瘤患者确诊即进行 NRS2002 筛查、PG-SGA 评定、GLIM 标准诊断营养不良', color: 'bg-emerald-50 border-emerald-200' },
                    { icon: '2', title: '能量与蛋白质目标', desc: '能量：25-30 kcal/(kg·d)；蛋白质：1.0-1.5 g/(kg·d)（肝肾功能正常时）', color: 'bg-blue-50 border-blue-200' },
                    { icon: '3', title: 'ONS首选原则', desc: '胃肠道有功能→首选口服营养补充；ONS 不足→管饲；管饲不足→考虑肠外营养', color: 'bg-teal-50 border-teal-200' },
                    { icon: '4', title: '个体化制剂选择', desc: '根据合并症（糖尿病/肾病/胰腺疾病等）选择适合配方；无并发症选标准整蛋白配方', color: 'bg-purple-50 border-purple-200' },
                    { icon: '5', title: '监测与随访', desc: 'ONS期间定期监测营养摄入、肝肾功能、血糖、电解质；建议每2-4周随访', color: 'bg-orange-50 border-orange-200' },
                  ].map(item => (
                    <div key={item.icon} className={`flex items-start gap-3 p-4 rounded-xl border ${item.color}`}>
                      <span className="w-7 h-7 bg-white rounded-full flex items-center justify-center text-sm font-bold text-gray-600 flex-shrink-0 shadow-sm">{item.icon}</span>
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">{item.title}</p>
                        <p className="text-sm text-gray-600 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Formula Selection Table */}
              <div>
                <h3 className="font-bold text-gray-800 mb-3">制剂选择速查表</h3>
                <div className="overflow-x-auto rounded-xl border border-gray-100">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-emerald-600 text-white">
                        <th className="text-left px-4 py-3 font-semibold">患者情况</th>
                        <th className="text-left px-4 py-3 font-semibold">推荐配方类型</th>
                        <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">证据级别</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['一般营养风险（无特殊并发症）', '标准整蛋白配方', 'A'],
                        ['消化吸收功能严重受损', '要素型/短肽配方', 'B'],
                        ['合并糖尿病/糖耐量异常', '糖尿病专用配方（低GI）', 'B'],
                        ['需限制液体摄入', '高能量密度配方（≥1.5kcal/mL）', 'B'],
                        ['大手术围手术期', '免疫增强配方（精氨酸+ω-3+核苷酸）', 'A'],
                        ['胰腺外分泌功能不全', '富含MCT的要素型配方', 'B'],
                        ['腹泻或便秘', '含膳食纤维配方', 'B'],
                        ['严重电解质紊乱（CKD）', '肾病专用配方（低钠/钾/磷）', 'B'],
                      ].map(([condition, formula, level], i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-4 py-3 text-gray-700">{condition}</td>
                          <td className="px-4 py-3 font-medium text-emerald-700">{formula}</td>
                          <td className={`px-4 py-3 hidden sm:table-cell`}>
                            <span className={`text-xs font-bold px-2 py-0.5 rounded ${level === 'A' ? 'bg-emerald-600 text-white' : 'bg-blue-500 text-white'}`}>
                              {level}级
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'recs' && (
            <div className="space-y-3">
              <p className="text-sm text-gray-500 mb-4">共 {EXPERT_CONSENSUS_2024.length} 条核心推荐意见，按证据等级标注</p>
              {EXPERT_CONSENSUS_2024.map((rec, i) => (
                <div key={rec.id} className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <span className="text-xs font-bold text-gray-400 w-6 text-right">#{i + 1}</span>
                      <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${
                        rec.evidenceLevel === 'A' ? 'bg-emerald-600 text-white' :
                        rec.evidenceLevel === 'B' ? 'bg-blue-500 text-white' : 'bg-gray-400 text-white'
                      }`}>
                        {rec.evidenceLevel}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 text-sm mb-1">{rec.title}</p>
                      <p className="text-sm text-gray-600 leading-relaxed">{rec.recommendation}</p>
                      {rec.formulaType && (
                        <span className="inline-block mt-2 text-xs bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full">
                          推荐制剂：{rec.formulaType}
                        </span>
                      )}
                      {rec.notes && (
                        <p className="text-xs text-gray-400 mt-1.5 italic">{rec.notes}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'selector' && (
            <div className="space-y-5">
              <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                <p className="text-sm font-semibold text-emerald-800 mb-1">智能制剂选择器</p>
                <p className="text-xs text-emerald-600">根据患者合并症，自动推荐最适合的 ONS 制剂类型</p>
              </div>

              <div>
                <p className="font-medium text-gray-700 mb-3 text-sm">请选择患者合并的情况（可多选）：</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    '糖尿病/糖耐量异常', '严重消化吸收障碍', '需限制液体',
                    '围手术期大手术', '胰腺外分泌功能不全', '腹泻/便秘',
                    '严重肾功能不全+电解质紊乱', '肝功能不全',
                  ].map(c => (
                    <button
                      key={c}
                      onClick={() => toggleCondition(c)}
                      className={`p-3 rounded-xl text-sm border-2 text-left cursor-pointer transition-all ${
                        condition.includes(c)
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-800 font-medium'
                          : 'border-gray-100 bg-gray-50 text-gray-600 hover:border-emerald-300'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Result */}
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-5 text-white">
                <p className="text-sm opacity-80 mb-1">推荐制剂类型</p>
                <p className="text-xl font-bold mb-3">{formula.name}</p>
                <div className="bg-white/20 rounded-xl p-3 text-sm">
                  <p className="font-semibold mb-1">依据：推荐意见 {formula.rec.title}</p>
                  <p className="opacity-90 leading-relaxed">{formula.rec.recommendation}</p>
                  {formula.rec.notes && (
                    <p className="opacity-70 text-xs mt-2 italic">{formula.rec.notes}</p>
                  )}
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded bg-white/30`}>
                    证据{formula.rec.evidenceLevel}级
                  </span>
                  <span className="text-xs opacity-70">中华临床营养杂志 2024</span>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-700">
                本选择器基于2024版专家共识的推荐意见，实际选择需结合患者具体情况，由临床营养师或医师综合评估后决定。
              </div>
            </div>
          )}

          {activeTab === 'notrecommended' && (
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-sm font-semibold text-red-700 mb-1">不常规推荐项目（共识明确说明）</p>
                <p className="text-xs text-red-600">以下制剂类型现有证据不支持常规使用，不应在缺乏特殊适应证的情况下常规选用</p>
              </div>
              <div className="space-y-3">
                {NOT_RECOMMENDED.map((item, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 border border-red-100 flex items-start gap-3">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" className="flex-shrink-0 mt-0.5">
                      <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">{item.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{item.reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <WechatConsult />
    </div>
  )
}
