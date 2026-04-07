import { useState } from 'react'
import {
  Calendar, Clock, Flame, Droplets, Apple, Beef,
  Sun, Moon, Coffee, AlertTriangle, CheckCircle, RefreshCw,
  Download, Share2, ChevronLeft, ChevronRight, Star
} from 'lucide-react'

interface NutritionPlanProps {
  patientData: any
}

// 生成模拟营养方案
function generateNutritionPlan(data: any) {
  const bmi = data.height && data.weight
    ? (data.weight / Math.pow(data.height / 100, 2)).toFixed(1)
    : '22.0'

  // 根据疾病类型调整方案
  const isOncology = data.diagnosis?.includes('肿瘤')
  const isPostOp = data.surgery === '是' || data.diagnosis?.includes('术后')
  const isMetabolic = data.diagnosis?.includes('代谢')

  // 基础热量计算
  const baseCalories = data.weight * 30
  const adjustedCalories = isOncology ? baseCalories * 1.3 : baseCalories

  // 生成的食谱
  const mealPlans = {
    monday: {
      breakfast: {
        time: '7:00-8:00',
        foods: [
          { name: '小米粥', amount: '250ml', calories: 92, protein: 2.5, note: '养胃易消化' },
          { name: '鸡蛋羹', amount: '1个', calories: 78, protein: 7, note: '优质蛋白' },
          { name: '清炒时蔬', amount: '100g', calories: 45, protein: 2, note: '补充维生素' }
        ],
        total: { calories: 215, protein: 11.5 }
      },
      lunch: {
        time: '12:00-13:00',
        foods: [
          { name: '软米饭', amount: '150g', calories: 174, protein: 4, note: '主食不可少' },
          { name: '清蒸鲈鱼', amount: '100g', calories: 98, protein: 18, note: '优质蛋白，低脂' },
          { name: '山药炒木耳', amount: '150g', calories: 65, protein: 2, note: '健脾益气' },
          { name: '番茄蛋汤', amount: '200ml', calories: 45, protein: 3, note: '开胃营养' }
        ],
        total: { calories: 382, protein: 27 }
      },
      dinner: {
        time: '18:00-19:00',
        foods: [
          { name: '菠菜瘦肉粥', amount: '300ml', calories: 180, protein: 8, note: '补铁补血' },
          { name: '蒸南瓜', amount: '100g', calories: 26, protein: 1, note: '富含膳食纤维' },
          { name: '凉拌黄瓜', amount: '80g', calories: 15, protein: 0.5, note: '清爽解腻' }
        ],
        total: { calories: 221, protein: 9.5 }
      },
      snack: {
        time: '15:00',
        foods: [
          { name: '猕猴桃', amount: '1个', calories: 43, protein: 0.5, note: '维C之王' },
          { name: '酸奶', amount: '150ml', calories: 85, protein: 4, note: '益生菌' }
        ],
        total: { calories: 128, protein: 4.5 }
      }
    },
    tuesday: {
      breakfast: {
        time: '7:00-8:00',
        foods: [
          { name: '红枣桂圆粥', amount: '250ml', calories: 120, protein: 2, note: '补气血' },
          { name: '肉松卷', amount: '2个', calories: 95, protein: 6, note: '开胃可口' },
          { name: '水煮西兰花', amount: '80g', calories: 27, protein: 2.5, note: '十字花科蔬菜' }
        ],
        total: { calories: 242, protein: 10.5 }
      },
      lunch: {
        time: '12:00-13:00',
        foods: [
          { name: '糙米饭', amount: '150g', calories: 165, protein: 4, note: '粗粮更健康' },
          { name: '虫草花炖鸡', amount: '150g', calories: 165, protein: 22, note: '增强免疫' },
          { name: '蒜蓉茄子', amount: '120g', calories: 48, protein: 2, note: '保护心血管' },
          { name: '紫菜蛋花汤', amount: '200ml', calories: 38, protein: 3, note: '微量元素' }
        ],
        total: { calories: 416, protein: 31 }
      },
      dinner: {
        time: '18:00-19:00',
        foods: [
          { name: '西红柿面片汤', amount: '300g', calories: 195, protein: 7, note: '易消化' },
          { name: '清炒杏鲍菇', amount: '100g', calories: 35, protein: 3, note: '菌菇多糖' },
          { name: '蒸胡萝卜', amount: '80g', calories: 25, protein: 0.5, note: 'β胡萝卜素' }
        ],
        total: { calories: 255, protein: 10.5 }
      },
      snack: {
        time: '15:00',
        foods: [
          { name: '银耳羹', amount: '200ml', calories: 65, protein: 0.5, note: '滋阴润肺' },
          { name: '苏打饼干', amount: '3片', calories: 60, protein: 1, note: '中和胃酸' }
        ],
        total: { calories: 125, protein: 1.5 }
      }
    }
  }

  // 营养目标
  const nutritionTargets = {
    calories: Math.round(adjustedCalories),
    protein: Math.round(data.weight * 1.2), // 每公斤体重1.2g蛋白
    fat: Math.round(adjustedCalories * 0.25 / 9),
    carbohydrate: Math.round((adjustedCalories * 0.55) / 4),
    water: 2000
  }

  // 禁忌和注意事项
  const restrictions = [
    ...(data.allergies?.includes('海鲜') ? ['忌食所有海鲜类食物'] : []),
    ...(data.allergies?.includes('鸡蛋') ? ['忌食鸡蛋及蛋制品'] : []),
    ...(data.medications.includes('华法林') ? [
      '保持绿叶蔬菜摄入量稳定，避免突然增减',
      '维生素K含量高的食物（菠菜、苋菜）需定量'
    ] : []),
    ...(data.medications.includes('他汀类药物') ? [
      '避免西柚及西柚汁',
      '他汀类建议晚餐时服用'
    ] : []),
    ...(data.medications.includes('降糖药') ? [
      '按时进餐，避免低血糖',
      '水果放在两餐之间食用'
    ] : []),
    '术后初期以软烂、易消化食物为主',
    '忌辛辣刺激、油腻生冷食物'
  ].filter(Boolean)

  // 药物-营养相互作用警告
  const warnings = []

  if (data.medications.includes('华法林')) {
    warnings.push({
      type: 'danger',
      title: '华法林用药提示',
      content: '华法林与维生素K有拮抗作用。建议每日绿叶蔬菜摄入量保持稳定（约200g），避免大幅波动影响药效。'
    })
  }

  if (data.medications.includes('他汀类药物')) {
    warnings.push({
      type: 'warning',
      title: '他汀类药物提示',
      content: '避免大量食用西柚或饮用西柚汁，可能增加药物副作用风险。'
    })
  }

  if (isOncology) {
    warnings.push({
      type: 'info',
      title: '肿瘤患者营养建议',
      content: '治疗期间保证充足热量和蛋白质摄入，有助于维持体重、支持免疫功能。如食欲明显下降，可考虑口服营养补充制剂。'
    })
  }

  return {
    bmi,
    mealPlans,
    nutritionTargets,
    restrictions,
    warnings,
    isOncology,
    isPostOp,
    isMetabolic
  }
}

export default function NutritionPlan({ patientData }: NutritionPlanProps) {
  const [activeTab, setActiveTab] = useState<'recipe' | 'nutrition' | 'warning'>('recipe')
  const [activeDay, setActiveDay] = useState<'monday' | 'tuesday'>('monday')

  const plan = generateNutritionPlan(patientData)
  const currentDayPlan = plan.mealPlans[activeDay]

  const tabs = [
    { id: 'recipe', label: '食谱方案', icon: Calendar },
    { id: 'nutrition', label: '营养目标', icon: Flame },
    { id: 'warning', label: '注意事项', icon: AlertTriangle }
  ]

  const getMealIcon = (mealType: string) => {
    switch (mealType) {
      case 'breakfast': return <Sun className="w-5 h-5 text-orange-500" />
      case 'lunch': return <Sun className="w-5 h-5 text-yellow-500" />
      case 'dinner': return <Moon className="w-5 h-5 text-indigo-500" />
      case 'snack': return <Coffee className="w-5 h-5 text-amber-500" />
      default: return null
    }
  }

  const getMealName = (mealType: string) => {
    switch (mealType) {
      case 'breakfast': return '早餐'
      case 'lunch': return '午餐'
      case 'dinner': return '晚餐'
      case 'snack': return '加餐'
      default: return ''
    }
  }

  return (
    <div className="p-6">
      {/* 方案标题 */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full mb-3">
          <CheckCircle className="w-5 h-5" />
          <span className="font-medium">AI营养方案已生成</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          专属{patientData.age}岁{patientData.gender}性营养方案
        </h2>
        <p className="text-gray-600">
          基于您的疾病情况、代谢特点和用药信息，为您定制每日热量 {plan.nutritionTargets.calories} kcal
        </p>
      </div>

      {/* 患者信息摘要 */}
      <div className="grid grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
        <div className="text-center">
          <div className="text-2xl font-bold text-cyan-600">{patientData.age}岁</div>
          <div className="text-xs text-gray-500">年龄</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-cyan-600">{plan.bmi}</div>
          <div className="text-xs text-gray-500">BMI</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600">{plan.nutritionTargets.calories}</div>
          <div className="text-xs text-gray-500">每日热量(kcal)</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-emerald-600">{plan.nutritionTargets.protein}g</div>
          <div className="text-xs text-gray-500">蛋白质(g)</div>
        </div>
      </div>

      {/* 标签页切换 */}
      <div className="flex gap-2 mb-6 border-b">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-3 font-medium transition-all ${
              activeTab === tab.id
                ? 'text-cyan-600 border-b-2 border-cyan-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <tab.icon className="w-5 h-5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* 食谱方案 */}
      {activeTab === 'recipe' && (
        <div>
          {/* 日期切换 */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setActiveDay('monday')}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeDay === 'monday'
                  ? 'bg-cyan-100 text-cyan-700 font-medium'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              周一
            </button>
            <button
              onClick={() => setActiveDay('tuesday')}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeDay === 'tuesday'
                  ? 'bg-cyan-100 text-cyan-700 font-medium'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              周二
            </button>
            <span className="text-sm text-gray-500">查看其他日期可滚动</span>
          </div>

          {/* 餐次卡片 */}
          <div className="space-y-4">
            {['breakfast', 'lunch', 'dinner', 'snack'].map(mealType => {
              const meal = currentDayPlan[mealType as keyof typeof currentDayPlan]
              return (
                <div key={mealType} className="card p-4">
                  <div className="flex items-center gap-3 mb-3">
                    {getMealIcon(mealType)}
                    <div>
                      <h4 className="font-semibold text-gray-900">{getMealName(mealType)}</h4>
                      <p className="text-sm text-gray-500">{meal.time}</p>
                    </div>
                    <div className="ml-auto text-right">
                      <div className="text-lg font-bold text-orange-500">{meal.total.calories} kcal</div>
                      <div className="text-sm text-gray-500">蛋白质 {meal.total.protein}g</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {meal.foods.map((food: any, idx: number) => (
                      <div key={idx} className="bg-gray-50 rounded-lg p-3">
                        <div className="font-medium text-gray-900 text-sm">{food.name}</div>
                        <div className="text-xs text-gray-500">{food.amount}</div>
                        <div className="text-xs text-cyan-600 mt-1">{food.note}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {/* 每日营养汇总 */}
          <div className="mt-6 p-4 bg-gradient-to-r from-cyan-50 to-emerald-50 rounded-xl">
            <h4 className="font-semibold text-gray-900 mb-3">周一营养汇总</h4>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-500">946</div>
                <div className="text-xs text-gray-500">总热量(kcal)</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-500">48.5</div>
                <div className="text-xs text-gray-500">蛋白质(g)</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-500">42</div>
                <div className="text-xs text-gray-500">脂肪(g)</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-500">130</div>
                <div className="text-xs text-gray-500">碳水(g)</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 营养目标 */}
      {activeTab === 'nutrition' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Flame, label: '总热量', value: plan.nutritionTargets.calories, unit: 'kcal', color: 'orange' },
              { icon: Beef, label: '蛋白质', value: plan.nutritionTargets.protein, unit: 'g', color: 'cyan' },
              { icon: Droplets, label: '脂肪', value: plan.nutritionTargets.fat, unit: 'g', color: 'emerald' },
              { icon: Apple, label: '碳水', value: plan.nutritionTargets.carbohydrate, unit: 'g', color: 'purple' }
            ].map((item, idx) => (
              <div key={idx} className="card p-4 text-center">
                <item.icon className={`w-8 h-8 mx-auto mb-2 text-${item.color}-500`} />
                <div className={`text-2xl font-bold text-${item.color}-600`}>{item.value}</div>
                <div className="text-sm text-gray-500">{item.unit}</div>
                <div className="text-xs text-gray-400 mt-1">{item.label}</div>
              </div>
            ))}
          </div>

          {/* 详细建议 */}
          <div className="card p-6">
            <h4 className="font-semibold text-gray-900 mb-4">营养摄入建议</h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">蛋白质占总热量比例</span>
                  <span className="text-sm font-medium text-cyan-600">20-25%</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full w-[22%] bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full" />
                </div>
                <p className="text-xs text-gray-500 mt-1">优质蛋白来源：鱼、禽、蛋、奶、豆制品</p>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">脂肪占总热量比例</span>
                  <span className="text-sm font-medium text-emerald-600">25-30%</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full w-[27%] bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full" />
                </div>
                <p className="text-xs text-gray-500 mt-1">优先选择不饱和脂肪酸：橄榄油、坚果、深海鱼</p>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">碳水化合物占总热量比例</span>
                  <span className="text-sm font-medium text-purple-600">55-60%</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full w-[57%] bg-gradient-to-r from-purple-400 to-purple-600 rounded-full" />
                </div>
                <p className="text-xs text-gray-500 mt-1">选择低GI主食：糙米、全麦面包、燕麦</p>
              </div>
            </div>
          </div>

          {/* 饮水建议 */}
          <div className="card p-6 bg-blue-50 border border-blue-100">
            <div className="flex items-center gap-3 mb-4">
              <Droplets className="w-6 h-6 text-blue-500" />
              <h4 className="font-semibold text-blue-900">饮水建议</h4>
            </div>
            <p className="text-blue-800 mb-4">
              每日建议饮水 <span className="font-bold text-lg">{plan.nutritionTargets.water}ml</span>，
              分次少量饮用，养成主动喝水的习惯。
            </p>
            <div className="flex gap-2 flex-wrap">
              {['晨起一杯温水', '餐前半小时', '两餐之间', '睡前少量'].map((tip, idx) => (
                <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  {tip}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 注意事项 */}
      {activeTab === 'warning' && (
        <div className="space-y-6">
          {/* 药物-营养相互作用警告 */}
          {plan.warnings.length > 0 && (
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                药物-营养相互作用提示
              </h4>
              {plan.warnings.map((warning: any, idx: number) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border ${
                    warning.type === 'danger' ? 'bg-red-50 border-red-200' :
                    warning.type === 'warning' ? 'bg-amber-50 border-amber-200' :
                    'bg-blue-50 border-blue-200'
                  }`}
                >
                  <h5 className={`font-medium mb-2 ${
                    warning.type === 'danger' ? 'text-red-700' :
                    warning.type === 'warning' ? 'text-amber-700' :
                    'text-blue-700'
                  }`}>
                    {warning.title}
                  </h5>
                  <p className={`text-sm ${
                    warning.type === 'danger' ? 'text-red-800' :
                    warning.type === 'warning' ? 'text-amber-800' :
                    'text-blue-800'
                  }`}>
                    {warning.content}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* 饮食禁忌 */}
          <div className="card p-6">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              饮食禁忌
            </h4>
            <div className="flex flex-wrap gap-2">
              {plan.restrictions.map((restriction: string, idx: number) => (
                <span key={idx} className="px-4 py-2 bg-red-50 text-red-700 rounded-full text-sm border border-red-100">
                  {restriction}
                </span>
              ))}
            </div>
          </div>

          {/* 烹饪建议 */}
          <div className="card p-6">
            <h4 className="font-semibold text-gray-900 mb-4">烹饪方式建议</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { name: '蒸', color: 'emerald' },
                { name: '煮', color: 'blue' },
                { name: '炖', color: 'orange' },
                { name: '清炒', color: 'cyan' },
                { name: '汆', color: 'teal' },
                { name: '焯', color: 'lime' },
                { name: '烩', color: 'amber' },
                { name: '拌', color: 'violet' }
              ].map((method, idx) => (
                <div key={idx} className={`bg-${method.color}-50 text-${method.color}-700 px-4 py-3 rounded-lg text-center font-medium`}>
                  {method.name}
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-4">
              推荐使用蒸、煮、炖等低温烹饪方式，保留食材营养，避免油炸、烧烤等高温烹饪。
            </p>
          </div>

          {/* 随访提醒 */}
          <div className="card p-6 bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-100">
            <h4 className="font-semibold text-cyan-900 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              随访提醒设置
            </h4>
            <p className="text-cyan-800 mb-4">
              我们将定期提醒您记录体重、食欲和症状，帮助您和医生了解康复进展。
            </p>
            <div className="flex flex-wrap gap-3">
              {['每日打卡', '每周评估', '异常预警', '复查提醒'].map((reminder, idx) => (
                <label key={idx} className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg cursor-pointer hover:bg-cyan-50 transition-colors">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-cyan-600 rounded" />
                  <span className="text-sm text-gray-700">{reminder}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 操作按钮 */}
      <div className="flex gap-4 mt-8 pt-6 border-t">
        <button className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
          <Download className="w-5 h-5" />
          保存方案
        </button>
        <button className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
          <Share2 className="w-5 h-5" />
          分享给家人
        </button>
        <button className="flex items-center gap-2 px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors ml-auto">
          <RefreshCw className="w-5 h-5" />
          开始执行
        </button>
      </div>
    </div>
  )
}
