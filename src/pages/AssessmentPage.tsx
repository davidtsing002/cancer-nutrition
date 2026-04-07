import { useState } from 'react'
import type { UserRole } from '../types'
import { CANCER_TYPES, TREATMENT_STAGES, SYMPTOMS } from '../data/cancerTypes'
import { EXPERT_CONSENSUS_2024 } from '../data/expertConsensus'
import { TCM_PATTERNS, TCM_RECIPES } from '../data/tcmNutrition'
import WechatConsult from '../components/WechatConsult'

interface Props { userRole: UserRole }

export default function AssessmentPage({ userRole }: Props) {
  const [cancerType, setCancerType] = useState('')
  const [treatmentStage, setTreatmentStage] = useState('')
  const [symptoms, setSymptoms] = useState<string[]>([])
  const [nutritionMode, setNutritionMode] = useState<'western' | 'integrated'>('integrated')
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [age, setAge] = useState('')
  const [showResult, setShowResult] = useState(false)

  const toggleSymptom = (id: string) => {
    setSymptoms(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id])
  }

  const bmi = weight && height ? (Number(weight) / ((Number(height) / 100) ** 2)).toFixed(1) : null
  const targetCalories = weight ? Math.round(Number(weight) * 27.5) : null
  const targetProtein = weight ? (Number(weight) * 1.2).toFixed(0) : null

  const selectedCancer = CANCER_TYPES.find(c => c.id === cancerType)
  const selectedStage = TREATMENT_STAGES.find(s => s.id === treatmentStage)

  // Get relevant ONS recommendations
  const getONSRecs = () => {
    const recs = [EXPERT_CONSENSUS_2024[4]] // Always include ONS principle
    if (symptoms.includes('diarrhea') || symptoms.includes('constipation')) recs.push(EXPERT_CONSENSUS_2024[12])
    if (symptoms.includes('hyperglycemia')) recs.push(EXPERT_CONSENSUS_2024[7])
    if (treatmentStage === 'pretreatment') recs.push(EXPERT_CONSENSUS_2024[10])
    if (cancerType === 'pancreatic') recs.push(EXPERT_CONSENSUS_2024[11])
    return recs.slice(0, 4)
  }

  // Get TCM pattern based on symptoms
  const getTCMPattern = () => {
    if (symptoms.includes('fatigue') || symptoms.includes('appetite_loss')) return TCM_PATTERNS[0]
    if (symptoms.includes('dry_mouth') || symptoms.includes('taste_change')) return TCM_PATTERNS[2]
    if (symptoms.includes('diarrhea') || symptoms.includes('abdominal_bloating')) return TCM_PATTERNS[3]
    return TCM_PATTERNS[0]
  }

  // Get TCM recipes for cancer type
  const tcmRecipes = TCM_RECIPES[cancerType] || TCM_RECIPES['gastric']

  const symptomsByCategory = SYMPTOMS.reduce((acc, s) => {
    if (!acc[s.category]) acc[s.category] = []
    acc[s.category].push(s)
    return acc
  }, {} as Record<string, typeof SYMPTOMS>)

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-cyan-100">
        <h2 className="text-xl font-bold text-cyan-900 mb-1 flex items-center gap-2">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0891B2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
          </svg>
          个性化营养评估
        </h2>
        <p className="text-cyan-600 text-sm">根据您的癌症类型、治疗阶段和症状，获取个性化营养方案</p>
      </div>

      {!showResult ? (
        <div className="space-y-5">
          {/* Step 1: Cancer Type */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-cyan-100">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-7 h-7 bg-cyan-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
              选择癌症类型
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {CANCER_TYPES.map(ct => (
                <button
                  key={ct.id}
                  onClick={() => setCancerType(ct.id)}
                  className={`p-3 rounded-xl text-sm text-left border-2 cursor-pointer transition-all duration-200 ${
                    cancerType === ct.id
                      ? 'border-cyan-500 bg-cyan-50 text-cyan-800 font-medium shadow-sm'
                      : 'border-gray-100 bg-gray-50 text-gray-600 hover:border-cyan-300 hover:bg-cyan-50/50'
                  }`}
                >
                  <div className="font-medium">{ct.name}</div>
                  <div className="text-xs opacity-60 mt-0.5">{ct.category}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Treatment Stage */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-cyan-100">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-7 h-7 bg-cyan-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
              当前治疗阶段
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TREATMENT_STAGES.map(ts => (
                <button
                  key={ts.id}
                  onClick={() => setTreatmentStage(ts.id)}
                  className={`p-4 rounded-xl text-left border-2 cursor-pointer transition-all duration-200 ${
                    treatmentStage === ts.id
                      ? 'border-teal-500 bg-teal-50 shadow-sm'
                      : 'border-gray-100 bg-gray-50 hover:border-teal-300 hover:bg-teal-50/50'
                  }`}
                >
                  <div className={`font-medium text-sm ${treatmentStage === ts.id ? 'text-teal-800' : 'text-gray-700'}`}>{ts.name}</div>
                  <div className="text-xs text-gray-500 mt-1">{ts.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Symptoms */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-cyan-100">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-7 h-7 bg-cyan-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
              当前症状（可多选）
            </h3>
            {Object.entries(symptomsByCategory).map(([category, items]) => (
              <div key={category} className="mb-4">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">{category}</p>
                <div className="flex flex-wrap gap-2">
                  {items.map(s => (
                    <button
                      key={s.id}
                      onClick={() => toggleSymptom(s.id)}
                      className={`px-3 py-1.5 rounded-full text-sm border cursor-pointer transition-all duration-200 ${
                        symptoms.includes(s.id)
                          ? 'bg-orange-100 border-orange-400 text-orange-800 font-medium'
                          : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-orange-300 hover:bg-orange-50'
                      }`}
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Step 4: Body Metrics */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-cyan-100">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-7 h-7 bg-cyan-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
              基本体格信息（选填）
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: '体重 (kg)', value: weight, setter: setWeight, placeholder: '如：60' },
                { label: '身高 (cm)', value: height, setter: setHeight, placeholder: '如：165' },
                { label: '年龄', value: age, setter: setAge, placeholder: '如：55' },
              ].map(field => (
                <div key={field.label}>
                  <label className="block text-sm text-gray-600 mb-1">{field.label}</label>
                  <input
                    type="number"
                    value={field.value}
                    onChange={e => field.setter(e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none bg-gray-50 focus:bg-white transition-colors"
                  />
                </div>
              ))}
            </div>
            {bmi && (
              <div className="mt-3 p-3 bg-cyan-50 rounded-xl text-sm text-cyan-700">
                BMI：<strong>{bmi}</strong>
                {Number(bmi) < 18.5 ? ' — 体重偏低，需加强营养支持' :
                  Number(bmi) < 24 ? ' — 体重正常范围' :
                  Number(bmi) < 28 ? ' — 体重偏高' : ' — 肥胖，建议控制体重'}
              </div>
            )}
          </div>

          {/* Step 5: Nutrition Mode */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-cyan-100">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-7 h-7 bg-cyan-600 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
              营养方案偏好
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setNutritionMode('western')}
                className={`p-4 rounded-xl border-2 text-left cursor-pointer transition-all ${
                  nutritionMode === 'western' ? 'border-blue-500 bg-blue-50' : 'border-gray-100 bg-gray-50 hover:border-blue-300'
                }`}
              >
                <div className="font-semibold text-sm text-blue-800 mb-1">循证西医营养</div>
                <div className="text-xs text-gray-500">基于国际指南（ESPEN/ASPEN），以热量、蛋白质目标为核心</div>
              </button>
              <button
                onClick={() => setNutritionMode('integrated')}
                className={`p-4 rounded-xl border-2 text-left cursor-pointer transition-all ${
                  nutritionMode === 'integrated' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-100 bg-gray-50 hover:border-emerald-300'
                }`}
              >
                <div className="font-semibold text-sm text-emerald-800 mb-1">中西医结合营养</div>
                <div className="text-xs text-gray-500">融合中医辨证施食与现代营养学，食疗与营养补充并重</div>
              </button>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={() => { if (cancerType && treatmentStage) setShowResult(true) }}
            disabled={!cancerType || !treatmentStage}
            className={`w-full py-4 rounded-2xl font-bold text-base transition-all duration-200 cursor-pointer ${
              cancerType && treatmentStage
                ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white hover:from-cyan-700 hover:to-teal-700 shadow-lg hover:shadow-cyan-200'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            {cancerType && treatmentStage ? '生成个性化营养方案' : '请先选择癌症类型和治疗阶段'}
          </button>
        </div>
      ) : (
        /* Results */
        <div className="space-y-5">
          <button
            onClick={() => setShowResult(false)}
            className="flex items-center gap-2 text-cyan-600 hover:text-cyan-800 text-sm font-medium cursor-pointer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            返回修改
          </button>

          {/* Summary Card */}
          <div className="bg-gradient-to-r from-cyan-600 to-teal-600 rounded-2xl p-6 text-white shadow-lg">
            <h3 className="text-lg font-bold mb-3">您的营养方案概览</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white/20 rounded-xl p-3 text-center">
                <div className="text-xs opacity-80 mb-1">癌症类型</div>
                <div className="font-bold">{selectedCancer?.name || cancerType}</div>
              </div>
              <div className="bg-white/20 rounded-xl p-3 text-center">
                <div className="text-xs opacity-80 mb-1">治疗阶段</div>
                <div className="font-bold text-sm">{selectedStage?.name.split('（')[0] || treatmentStage}</div>
              </div>
              {targetCalories && (
                <div className="bg-white/20 rounded-xl p-3 text-center">
                  <div className="text-xs opacity-80 mb-1">目标热量</div>
                  <div className="font-bold">{targetCalories} kcal/天</div>
                </div>
              )}
              {targetProtein && (
                <div className="bg-white/20 rounded-xl p-3 text-center">
                  <div className="text-xs opacity-80 mb-1">目标蛋白质</div>
                  <div className="font-bold">{targetProtein} g/天</div>
                </div>
              )}
            </div>
          </div>

          {/* Cancer-specific nutrition notes */}
          {selectedCancer && (
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-cyan-100">
              <h3 className="font-bold text-cyan-900 mb-3 flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0891B2" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                {selectedCancer.name} 营养要点
              </h3>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">{selectedCancer.dietaryNotes}</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <p className="text-xs font-semibold text-cyan-700 mb-2">营养重点</p>
                  <div className="flex flex-wrap gap-1">
                    {selectedCancer.nutritionFocus.map(f => (
                      <span key={f} className="bg-cyan-100 text-cyan-800 text-xs px-2 py-1 rounded-full">{f}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-orange-600 mb-2">常见相关症状</p>
                  <div className="flex flex-wrap gap-1">
                    {selectedCancer.commonSymptoms.map(s => (
                      <span key={s} className="bg-orange-50 text-orange-700 text-xs px-2 py-1 rounded-full border border-orange-200">{s}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-emerald-700 mb-2">方案偏好</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${nutritionMode === 'integrated' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'}`}>
                    {nutritionMode === 'integrated' ? '中西医结合' : '循证西医'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ONS Recommendations */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-cyan-100">
            <div className="flex items-center gap-2 mb-4">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <h3 className="font-bold text-gray-800">口服营养补充建议（基于2024版专家共识）</h3>
            </div>
            <div className="space-y-3">
              {getONSRecs().map(rec => (
                <div key={rec.id} className="flex items-start gap-3 p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                  <span className={`text-xs font-bold px-1.5 py-0.5 rounded flex-shrink-0 mt-0.5 ${
                    rec.evidenceLevel === 'A' ? 'bg-emerald-600 text-white' :
                    rec.evidenceLevel === 'B' ? 'bg-blue-500 text-white' : 'bg-gray-400 text-white'
                  }`}>
                    证据{rec.evidenceLevel}
                  </span>
                  <div>
                    <p className="font-medium text-sm text-gray-800">{rec.title}</p>
                    <p className="text-sm text-gray-600 mt-0.5 leading-relaxed">{rec.recommendation}</p>
                    {rec.formulaType && (
                      <span className="inline-block mt-1 text-xs bg-white border border-emerald-300 text-emerald-700 px-2 py-0.5 rounded-full">
                        推荐：{rec.formulaType}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TCM Section */}
          {nutritionMode === 'integrated' && (
            <>
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-amber-100">
                <h3 className="font-bold text-amber-900 mb-4 flex items-center gap-2">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#92400e" strokeWidth="2"><path d="M12 22c4.97 0 9-2.69 9-6s-4.03-6-9-6-9 2.69-9 6 4.03 6 9 6z"/><path d="M3 13.5C3 10.46 7.03 8 12 8s9 2.46 9 5.5M12 8V2M8 4l4-2 4 2"/></svg>
                  中医辨证施食建议
                </h3>
                {(() => {
                  const pattern = getTCMPattern()
                  return (
                    <div className="space-y-4">
                      <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold text-amber-800">{pattern.name}</span>
                          <span className="text-xs text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">辨证结果</span>
                        </div>
                        <p className="text-sm text-amber-700 mb-3">
                          <span className="font-medium">食疗原则：</span>{pattern.dietPrinciple}
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <p className="text-xs font-semibold text-emerald-700 mb-1">推荐食物</p>
                            <div className="flex flex-wrap gap-1">
                              {pattern.recommendedFoods.slice(0, 6).map(f => (
                                <span key={f} className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">{f}</span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-red-600 mb-1">宜少食</p>
                            <div className="flex flex-wrap gap-1">
                              {pattern.avoidFoods.map(f => (
                                <span key={f} className="text-xs bg-red-50 text-red-700 px-2 py-0.5 rounded-full border border-red-200">{f}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-amber-800 mb-3">推荐食疗方（{selectedCancer?.name}适用）</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {(tcmRecipes || []).slice(0, 2).map((recipe, i) => (
                            <div key={i} className="bg-amber-50/60 rounded-xl p-4 border border-amber-100">
                              <h4 className="font-bold text-amber-900 text-sm mb-1">{recipe.name}</h4>
                              <p className="text-xs text-amber-600 mb-2">{recipe.tcmEffect}</p>
                              <p className="text-xs text-gray-600 mb-2">
                                <span className="font-medium">食材：</span>{recipe.ingredients.join('、')}
                              </p>
                              <p className="text-xs text-gray-500 mb-2">
                                <span className="font-medium">做法：</span>{recipe.method}
                              </p>
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                                {recipe.modernBenefits}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                })()}
              </div>
            </>
          )}

          {/* Symptom Management */}
          {symptoms.length > 0 && (
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-cyan-100">
              <h3 className="font-bold text-gray-800 mb-4">症状营养管理建议</h3>
              <div className="space-y-3">
                {symptoms.includes('nausea') && (
                  <div className="p-3 bg-blue-50 rounded-xl border-l-4 border-blue-400">
                    <p className="font-medium text-blue-800 text-sm">恶心/呕吐</p>
                    <p className="text-sm text-blue-700 mt-1">少量多餐（每2-3小时进食）；选择清淡冷食；避免油腻气味强烈食物；姜茶（生姜10g煎水）有助缓解</p>
                  </div>
                )}
                {symptoms.includes('mucositis') && (
                  <div className="p-3 bg-purple-50 rounded-xl border-l-4 border-purple-400">
                    <p className="font-medium text-purple-800 text-sm">口腔黏膜炎</p>
                    <p className="text-sm text-purple-700 mt-1">流质/半流质为主；食物温凉（避免过热）；避免酸辣刺激；冰淇淋/冷藏食物可暂时缓解疼痛；银耳百合粥有滋阴润燥效果</p>
                  </div>
                )}
                {symptoms.includes('diarrhea') && (
                  <div className="p-3 bg-orange-50 rounded-xl border-l-4 border-orange-400">
                    <p className="font-medium text-orange-800 text-sm">腹泻</p>
                    <p className="text-sm text-orange-700 mt-1">补充水分和电解质（口服补液盐）；选择低纤维易消化食物（白米粥、蒸烂蔬菜）；避免生冷、高纤维、产气食物；山药茯苓粥健脾止泻</p>
                  </div>
                )}
                {symptoms.includes('appetite_loss') && (
                  <div className="p-3 bg-yellow-50 rounded-xl border-l-4 border-yellow-400">
                    <p className="font-medium text-yellow-800 text-sm">食欲不振</p>
                    <p className="text-sm text-yellow-700 mt-1">选择喜爱食物；餐前少量运动促食欲；少量多餐；可用少量开胃食物（山楂、陈皮）；营养密度高的食物优先（坚果、蛋、瘦肉）</p>
                  </div>
                )}
                {symptoms.includes('weight_loss') && (
                  <div className="p-3 bg-red-50 rounded-xl border-l-4 border-red-400">
                    <p className="font-medium text-red-800 text-sm">体重减轻</p>
                    <p className="text-sm text-red-700 mt-1">体重下降 &gt;5%/月需警惕恶病质；增加热量密度（在食物中加橄榄油、坚果酱）；口服营养补充剂（ONS）在两餐间补充；建议尽快营养评估（NRS2002/PG-SGA）</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Clinician-only NRS scoring */}
          {userRole === 'clinician' && (
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-blue-100">
              <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="2"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 0 2-2h2a2 2 0 0 0 2 2"/></svg>
                医护专区：营养评分工具（NRS 2002）
              </h3>
              <div className="bg-blue-50 rounded-xl p-4 text-sm text-blue-800">
                <p className="font-medium mb-2">NRS 2002 评估标准（推荐共识 Rec.1）</p>
                <div className="space-y-2 text-blue-700">
                  <p>① 疾病严重程度评分（0-3分）：肿瘤患者通常≥1分</p>
                  <p>② 营养状态受损评分（0-3分）：根据BMI/体重/摄入情况评定</p>
                  <p>③ 年龄≥70岁加1分</p>
                  <p className="font-medium text-blue-900 mt-2">总分≥3分 → 有营养风险，需制定营养干预计划</p>
                </div>
              </div>
              <div className="mt-3 bg-blue-50 rounded-xl p-4 text-sm">
                <p className="font-medium text-blue-800 mb-2">PG-SGA 肿瘤患者专用评估</p>
                <p className="text-blue-700">患者主观整体评估（PG-SGA）是肿瘤患者营养评估金标准，包含A（营养良好）、B（可疑/中度营养不良）、C（重度营养不良）三个等级</p>
              </div>
            </div>
          )}

          {/* WeChat Consult */}
          <WechatConsult />

          {/* Disclaimer */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-700">
            <strong>免责声明：</strong>以上方案基于循证营养学指南和中医食疗理论，仅供参考。具体营养干预方案请咨询您的临床营养师或主治医师，尤其在存在特殊并发症（肾功能不全、严重肝损伤等）时，需专业评估后个体化调整。
          </div>
        </div>
      )}
    </div>
  )
}
