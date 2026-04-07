import { useState } from 'react'
import {
  User, Activity, Pill, Utensils, TrendingUp, Heart,
  ChevronRight, ChevronLeft, AlertTriangle, CheckCircle, Loader2
} from 'lucide-react'

interface PatientFormProps {
  onSubmit: (data: any) => void
  onCancel: () => void
}

const steps = [
  { id: 1, title: '基本信息', icon: User },
  { id: 2, title: '疾病信息', icon: Heart },
  { id: 3, title: '营养状态', icon: Utensils },
  { id: 4, title: '代谢指标', icon: Activity },
  { id: 5, title: '用药情况', icon: Pill },
  { id: 6, title: '生活习惯', icon: TrendingUp },
]

const commonMedications = [
  '华法林', '阿司匹林', '氯吡格雷', '他汀类药物', 'ACE抑制剂',
  '钙片/维生素D', '甲状腺药物', '降糖药', '抗生素', '质子泵抑制剂'
]

const allergies = [
  '海鲜', '鸡蛋', '牛奶', '大豆', '小麦/麸质',
  '坚果', '花生', '芒果', '无过敏史'
]

const cuisineStyles = [
  '清淡少油', '粤菜', '川菜', '湘菜', '鲁菜', '江浙菜',
  '东北菜', '西式', '日式', '韩式', '清真'
]

export default function PatientForm({ onSubmit }: PatientFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [formData, setFormData] = useState({
    // 基本信息
    age: '',
    gender: '',
    height: '',
    weight: '',
    // 疾病信息
    diagnosis: '',
    diagnosisOther: '',
    surgery: '',
    treatmentStage: '',
    dischargeDays: '',
    // 营养状态
    appetite: '',
    digestion: '',
    swallowing: '',
    weightChange: '',
    // 代谢指标
    bloodSugar: '',
    bloodPressure: '',
    bloodLipid: '',
    kidneyFunction: '',
    // 用药情况
    medications: [] as string[],
    medicationOther: '',
    // 生活习惯
    allergies: [] as string[],
    cuisineStyle: '',
    cookingAbility: '',
    budget: '',
  })

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const toggleArrayField = (field: 'medications' | 'allergies', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }))
  }

  const handleSubmit = async () => {
    setIsGenerating(true)
    // 模拟AI生成过程
    await new Promise(resolve => setTimeout(resolve, 3000))
    setIsGenerating(false)
    onSubmit(formData)
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1: return formData.age && formData.gender && formData.height && formData.weight
      case 2: return formData.diagnosis || formData.diagnosisOther
      case 3: return formData.appetite && formData.digestion
      case 4: return true
      case 5: return true
      case 6: return true
      default: return false
    }
  }

  return (
    <div className="p-8">
      {/* 标题 */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">个性化营养评估</h2>
        <p className="text-gray-600">请填写以下信息，我们将为您生成专属营养方案</p>
      </div>

      {/* 步骤指示器 */}
      <div className="flex items-center justify-center mb-8">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className={`flex flex-col items-center ${
              currentStep >= step.id ? 'text-cyan-600' : 'text-gray-400'
            }`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 transition-all ${
                currentStep > step.id ? 'bg-cyan-600 text-white' :
                currentStep === step.id ? 'bg-cyan-100 border-2 border-cyan-600' :
                'bg-gray-100'
              }`}>
                {currentStep > step.id ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <step.icon className="w-5 h-5" />
                )}
              </div>
              <span className="text-xs hidden md:block">{step.title}</span>
            </div>
            {index < steps.length - 1 && (
              <div className={`w-8 md:w-16 h-0.5 mx-1 ${
                currentStep > step.id ? 'bg-cyan-600' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* 表单内容 */}
      <div className="max-w-2xl mx-auto">
        {/* Step 1: 基本信息 */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">年龄 *</label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={e => updateField('age', e.target.value)}
                  placeholder="请输入年龄"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">性别 *</label>
                <div className="flex gap-4">
                  {['男', '女'].map(g => (
                    <label key={g} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value={g}
                        checked={formData.gender === g}
                        onChange={e => updateField('gender', e.target.value)}
                        className="w-4 h-4 text-cyan-600"
                      />
                      <span>{g}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">身高 (cm) *</label>
                <input
                  type="number"
                  value={formData.height}
                  onChange={e => updateField('height', e.target.value)}
                  placeholder="请输入身高"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">体重 (kg) *</label>
                <input
                  type="number"
                  value={formData.weight}
                  onChange={e => updateField('weight', e.target.value)}
                  placeholder="请输入体重"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
                />
              </div>
            </div>
            <div className="bg-cyan-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-cyan-700 mb-2">
                <Activity className="w-5 h-5" />
                <span className="font-medium">BMI计算</span>
              </div>
              {formData.height && formData.weight && (
                <p className="text-cyan-600">
                  您的BMI为：<span className="font-bold text-lg">
                    {(formData.weight / Math.pow(formData.height / 100, 2)).toFixed(1)}
                  </span>
                </p>
              )}
            </div>
          </div>
        )}

        {/* Step 2: 疾病信息 */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">主要诊断 *</label>
              <select
                value={formData.diagnosis}
                onChange={e => updateField('diagnosis', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
              >
                <option value="">请选择疾病类型</option>
                <option value="肿瘤-消化道">肿瘤 - 消化道（胃癌、肠癌、食管癌）</option>
                <option value="肿瘤-其他">肿瘤 - 其他部位</option>
                <option value="术后康复">术后康复（骨科、心脏等）</option>
                <option value="代谢性疾病">代谢性疾病（糖尿病、痛风）</option>
                <option value="心脑血管">心脑血管疾病</option>
                <option value="消化系统">消化系统疾病</option>
                <option value="other">其他</option>
              </select>
              {formData.diagnosis === 'other' && (
                <input
                  type="text"
                  value={formData.diagnosisOther}
                  onChange={e => updateField('diagnosisOther', e.target.value)}
                  placeholder="请描述您的疾病情况"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none mt-3"
                />
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">是否进行过手术</label>
              <div className="flex gap-4">
                {['是', '否', '计划中'].map(s => (
                  <label key={s} className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg border hover:bg-cyan-50 transition-colors">
                    <input
                      type="radio"
                      name="surgery"
                      value={s}
                      checked={formData.surgery === s}
                      onChange={e => updateField('surgery', e.target.value)}
                      className="w-4 h-4 text-cyan-600"
                    />
                    <span>{s}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">当前治疗阶段</label>
              <select
                value={formData.treatmentStage}
                onChange={e => updateField('treatmentStage', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
              >
                <option value="">请选择</option>
                <option value="出院初期">出院初期（1-2周内）</option>
                <option value="恢复期">恢复期（2-4周）</option>
                <option value="稳定期">稳定期（1-3个月）</option>
                <option value="长期康复">长期康复（3个月以上）</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">出院多少天</label>
              <input
                type="number"
                value={formData.dischargeDays}
                onChange={e => updateField('dischargeDays', e.target.value)}
                placeholder="请输入天数"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
              />
            </div>
          </div>
        )}

        {/* Step 3: 营养状态 */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">食欲情况 *</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['正常', '略有下降', '明显下降', '几乎无食欲'].map(a => (
                  <button
                    key={a}
                    onClick={() => updateField('appetite', a)}
                    className={`px-4 py-3 rounded-lg border text-sm transition-all ${
                      formData.appetite === a
                        ? 'border-cyan-500 bg-cyan-50 text-cyan-700'
                        : 'border-gray-200 hover:border-cyan-300'
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">消化功能 *</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['正常', '偶尔腹胀', '经常不适', '明显异常'].map(d => (
                  <button
                    key={d}
                    onClick={() => updateField('digestion', d)}
                    className={`px-4 py-3 rounded-lg border text-sm transition-all ${
                      formData.digestion === d
                        ? 'border-cyan-500 bg-cyan-50 text-cyan-700'
                        : 'border-gray-200 hover:border-cyan-300'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">咀嚼吞咽能力</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['正常', '咀嚼困难', '吞咽困难', '需流质饮食', '需管饲'].map(s => (
                  <button
                    key={s}
                    onClick={() => updateField('swallowing', s)}
                    className={`px-4 py-3 rounded-lg border text-sm transition-all ${
                      formData.swallowing === s
                        ? 'border-cyan-500 bg-cyan-50 text-cyan-700'
                        : 'border-gray-200 hover:border-cyan-300'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">近期体重变化</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['无明显变化', '减轻2-3kg', '减轻3-5kg', '减轻5kg以上', '略有增加'].map(w => (
                  <button
                    key={w}
                    onClick={() => updateField('weightChange', w)}
                    className={`px-4 py-3 rounded-lg border text-sm transition-all ${
                      formData.weightChange === w
                        ? 'border-cyan-500 bg-cyan-50 text-cyan-700'
                        : 'border-gray-200 hover:border-cyan-300'
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: 代谢指标 */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800">
                以下指标可帮助我们更精准地制定营养方案。如有近期检验报告，可参考填写；如不确定可跳过。
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">空腹血糖 (mmol/L)</label>
                <input
                  type="text"
                  value={formData.bloodSugar}
                  onChange={e => updateField('bloodSugar', e.target.value)}
                  placeholder="如：5.6"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">血压 (mmHg)</label>
                <input
                  type="text"
                  value={formData.bloodPressure}
                  onChange={e => updateField('bloodPressure', e.target.value)}
                  placeholder="如：130/85"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">血脂情况</label>
              <select
                value={formData.bloodLipid}
                onChange={e => updateField('bloodLipid', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
              >
                <option value="">请选择</option>
                <option value="正常">正常</option>
                <option value="边缘升高">边缘升高</option>
                <option value="明显升高">明显升高</option>
                <option value="不清楚">不清楚</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">肾功能</label>
              <select
                value={formData.kidneyFunction}
                onChange={e => updateField('kidneyFunction', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
              >
                <option value="">请选择</option>
                <option value="正常">正常</option>
                <option value="轻度异常">轻度异常</option>
                <option value="中度异常">中度异常</option>
                <option value="需透析">需透析</option>
                <option value="不清楚">不清楚</option>
              </select>
            </div>
          </div>
        )}

        {/* Step 5: 用药情况 */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">当前服用药物（可多选）</label>
              <p className="text-xs text-gray-500 mb-3">选择正在使用的药物，系统将自动检测药物-营养相互作用</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {commonMedications.map(med => (
                  <button
                    key={med}
                    onClick={() => toggleArrayField('medications', med)}
                    className={`px-4 py-3 rounded-lg border text-sm text-left transition-all ${
                      formData.medications.includes(med)
                        ? 'border-orange-500 bg-orange-50 text-orange-700'
                        : 'border-gray-200 hover:border-orange-300'
                    }`}
                  >
                    {formData.medications.includes(med) && (
                      <CheckCircle className="w-4 h-4 inline mr-2 text-orange-500" />
                    )}
                    {med}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">其他药物</label>
              <input
                type="text"
                value={formData.medicationOther}
                onChange={e => updateField('medicationOther', e.target.value)}
                placeholder="请描述其他正在服用的药物"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
              />
            </div>

            {formData.medications.includes('华法林') && (
              <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-red-700 mb-2">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="font-medium">重要提示</span>
                </div>
                <p className="text-sm text-red-800">
                  华法林与维生素K有拮抗作用。服用华法林期间，请注意绿叶蔬菜的摄入量应保持稳定，
                  避免突然大量增加或减少，同时注意维生素K含量高的食物（如菠菜、苋菜等）摄入均衡。
                </p>
              </div>
            )}

            {formData.medications.includes('他汀类药物') && (
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-amber-700 mb-2">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="font-medium">用药提示</span>
                </div>
                <p className="text-sm text-amber-800">
                  他汀类药物建议在晚餐时服用或睡前服用，与西柚汁同服可能增加副作用风险。
                </p>
              </div>
            )}
          </div>
        )}

        {/* Step 6: 生活习惯 */}
        {currentStep === 6 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">食物过敏/不耐受</label>
              <div className="flex flex-wrap gap-2">
                {allergies.map(allergy => (
                  <button
                    key={allergy}
                    onClick={() => toggleArrayField('allergies', allergy)}
                    className={`px-4 py-2 rounded-full text-sm transition-all ${
                      formData.allergies.includes(allergy)
                        ? 'bg-red-100 text-red-700 border border-red-300'
                        : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
                    }`}
                  >
                    {allergy}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">口味偏好</label>
              <div className="flex flex-wrap gap-2">
                {cuisineStyles.map(style => (
                  <button
                    key={style}
                    onClick={() => updateField('cuisineStyle', style)}
                    className={`px-4 py-2 rounded-full text-sm transition-all ${
                      formData.cuisineStyle === style
                        ? 'bg-cyan-100 text-cyan-700 border border-cyan-300'
                        : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">烹饪能力</label>
              <div className="grid grid-cols-3 gap-3">
                {['可以独立做饭', '需要简单指导', '主要依靠家人'].map(c => (
                  <button
                    key={c}
                    onClick={() => updateField('cookingAbility', c)}
                    className={`px-4 py-3 rounded-lg border text-sm transition-all ${
                      formData.cookingAbility === c
                        ? 'border-cyan-500 bg-cyan-50 text-cyan-700'
                        : 'border-gray-200 hover:border-cyan-300'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">每月饮食预算</label>
              <select
                value={formData.budget}
                onChange={e => updateField('budget', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
              >
                <option value="">请选择</option>
                <option value="1000以下">1000元以下</option>
                <option value="1000-2000">1000-2000元</option>
                <option value="2000-3000">2000-3000元</option>
                <option value="3000以上">3000元以上</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* 导航按钮 */}
      <div className="flex justify-between mt-8 max-w-2xl mx-auto">
        <button
          onClick={() => setCurrentStep(prev => prev - 1)}
          disabled={currentStep === 1}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
            currentStep === 1
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
          上一步
        </button>

        {currentStep < 6 ? (
          <button
            onClick={() => setCurrentStep(prev => prev + 1)}
            disabled={!canProceed()}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
              canProceed()
                ? 'bg-cyan-600 text-white hover:bg-cyan-700'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            下一步
            <ChevronRight className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={isGenerating}
            className="flex items-center gap-2 px-8 py-3 rounded-lg text-white transition-all bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                AI正在为您生成方案...
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                生成个性化方案
              </>
            )}
          </button>
        )}
      </div>
    </div>
  )
}
