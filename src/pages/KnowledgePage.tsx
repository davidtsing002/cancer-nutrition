import { useState } from 'react'
import { TCM_PATTERNS, FIVE_ELEMENT_FOODS, TCM_RECIPES } from '../data/tcmNutrition'
import WechatConsult from '../components/WechatConsult'

type KnowledgeTab = 'western' | 'tcm' | 'fiveelements' | 'foodsafety' | 'recipes'

export default function KnowledgePage() {
  const [activeTab, setActiveTab] = useState<KnowledgeTab>('western')
  const [expandedPattern, setExpandedPattern] = useState<string | null>(null)

  const tabs: { id: KnowledgeTab; label: string }[] = [
    { id: 'western', label: '西医营养学' },
    { id: 'tcm', label: '中医辨证施食' },
    { id: 'fiveelements', label: '五行食疗' },
    { id: 'recipes', label: '食疗方集' },
    { id: 'foodsafety', label: '食品安全' },
  ]

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-cyan-100">
        <h2 className="text-xl font-bold text-cyan-900 mb-1 flex items-center gap-2">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0891B2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
          </svg>
          营养知识库
        </h2>
        <p className="text-cyan-600 text-sm">融合现代循证营养学与中医临床营养学，为肿瘤患者提供全面营养指导</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex border-b border-gray-100 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap cursor-pointer transition-colors ${
                activeTab === tab.id ? 'text-cyan-700 border-b-2 border-cyan-600 bg-cyan-50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-5">
          {activeTab === 'western' && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { title: '蛋白质', subtitle: '肿瘤患者最关键营养素', color: 'bg-cyan-50 border-cyan-200', items: ['目标：1.0-1.5 g/(kg·d)，肌肉减少症患者可达2.0 g/(kg·d)', '优质蛋白来源：瘦肉、鱼虾、蛋类、豆腐、牛奶', '蛋白质缺乏→肌肉萎缩→体能下降→化疗耐受性差', '每餐尽量含蛋白质食物，少量多次补充更有效'] },
                  { title: '热量', subtitle: '维持体重核心', color: 'bg-orange-50 border-orange-200', items: ['目标：25-30 kcal/(kg·d)（卧床患者取下限）', '化疗期间基础代谢可升高10-30%', '体重下降>5%/月→提示恶病质风险', '高热量密度食物：坚果酱、橄榄油、藕粉、奶昔'] },
                  { title: '水分', subtitle: '化疗保护必需', color: 'bg-blue-50 border-blue-200', items: ['基础目标：30-35 mL/(kg·d)，通常1500-2000mL/天', '顺铂/卡铂化疗日需2000-3000mL以保护肾脏', '发热/腹泻时增加补水量', '流质/半流质饮食患者从食物获得大量水分'] },
                ].map(card => (
                  <div key={card.title} className={`${card.color} rounded-xl p-4 border`}>
                    <h3 className="font-bold text-gray-800 mb-0.5">{card.title}</h3>
                    <p className="text-xs text-gray-500 mb-3">{card.subtitle}</p>
                    <ul className="space-y-1.5">
                      {card.items.map((item, i) => (
                        <li key={i} className="text-xs text-gray-700 flex items-start gap-1.5">
                          <span className="text-cyan-500 mt-0.5 flex-shrink-0">•</span>{item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="font-bold text-gray-800 mb-3">治疗副作用营养管理</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { side: '恶心呕吐（化疗最常见）', tips: ['少量多餐，每2-3小时进食', '选择清淡低脂食物', '冷食/室温食物气味更弱', '生姜（姜茶、姜片）有循证依据缓解恶心', '化疗前2-3小时避免进食'] },
                    { side: '口腔黏膜炎（放化疗）', tips: ['流质/半流质为主：粥、奶昔、豆腐脑', '食物温凉（<40°C）', '避免酸辣粗糙食物', '多漱口保持口腔清洁', '银耳百合羹、藕粉有滋阴润燥功效'] },
                    { side: '腹泻（化疗/放疗）', tips: ['低纤维饮食：白米粥、蒸烂蔬菜', '口服补液盐补充水和电解质', '避免高纤维、高脂、生冷食物', '山药芡实粥（中医健脾止泻）', '严重腹泻需补钾（香蕉、土豆泥）'] },
                    { side: '味觉改变（锌缺乏/化疗）', tips: ['金属味：用塑料餐具代替金属餐具', '苦味增加：避免咖啡，选用甜食调味', '嗅觉减退：冷食可减少气味', '补充锌（贝壳类、肉类、坚果）', '尝试酸味（柠檬汁）可刺激唾液'] },
                    { side: '疲劳/乏力', tips: ['少量多餐，避免进食引起血糖大幅波动', '优质碳水化合物（全谷物、糙米）持续供能', '铁质补充（贫血相关疲劳）', '充足蛋白质维持肌肉', '适度活动比绝对卧床更有助于缓解疲劳'] },
                    { side: '食欲不振/厌食', tips: ['首选患者喜欢的食物', '营养密度优先（每口都要"划算"）', '餐前少量运动改善食欲', '创造愉快进餐环境', '必要时考虑营养师指导的口服营养补充剂'] },
                  ].map(item => (
                    <div key={item.side} className="bg-white rounded-xl p-4 border border-gray-100">
                      <h4 className="font-semibold text-gray-800 text-sm mb-2">{item.side}</h4>
                      <ul className="space-y-1">
                        {item.tips.map((tip, i) => (
                          <li key={i} className="text-xs text-gray-600 flex items-start gap-1.5">
                            <span className="text-emerald-500 flex-shrink-0 mt-0.5">✓</span>{tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tcm' && (
            <div className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
                <p className="font-semibold mb-1">中医临床营养学 — 辨证施食</p>
                <p className="text-xs">中医营养学认为，食物具有四气五味和归经属性，肿瘤患者应根据辨证结果，选择性质相符的食物，达到"食药同源、扶正固本"的目的。</p>
              </div>
              {TCM_PATTERNS.map(pattern => (
                <div key={pattern.id} className="bg-white rounded-xl border border-amber-100 overflow-hidden">
                  <button
                    onClick={() => setExpandedPattern(expandedPattern === pattern.id ? null : pattern.id)}
                    className="w-full flex items-center justify-between p-4 hover:bg-amber-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center font-bold text-sm">{pattern.name[0]}</span>
                      <div className="text-left">
                        <p className="font-semibold text-gray-800">{pattern.name}</p>
                        <p className="text-xs text-gray-500">{pattern.dietPrinciple}</p>
                      </div>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`text-gray-400 transition-transform ${expandedPattern === pattern.id ? 'rotate-180' : ''}`}>
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </button>
                  {expandedPattern === pattern.id && (
                    <div className="px-4 pb-4 border-t border-amber-50 bg-amber-50/30">
                      <div className="grid grid-cols-2 gap-3 mt-3">
                        <div>
                          <p className="text-xs font-semibold text-gray-600 mb-1">典型症状</p>
                          <div className="flex flex-wrap gap-1">
                            {pattern.symptoms.map(s => <span key={s} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{s}</span>)}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-600 mb-1">舌脉</p>
                          <p className="text-xs text-gray-600">{pattern.tongueSign} | {pattern.pulseSign}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 mt-3">
                        <div>
                          <p className="text-xs font-semibold text-emerald-700 mb-1">宜食</p>
                          <div className="flex flex-wrap gap-1">
                            {pattern.recommendedFoods.slice(0, 5).map(f => <span key={f} className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">{f}</span>)}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-red-600 mb-1">慎食</p>
                          <div className="flex flex-wrap gap-1">
                            {pattern.avoidFoods.map(f => <span key={f} className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full border border-red-200">{f}</span>)}
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 bg-amber-100/50 rounded-lg p-3">
                        <p className="text-xs font-semibold text-amber-800 mb-1">代表食疗方：{pattern.representativeRecipe.name}</p>
                        <p className="text-xs text-gray-600"><span className="font-medium">组成：</span>{pattern.representativeRecipe.ingredients}</p>
                        <p className="text-xs text-gray-600 mt-1"><span className="font-medium">功效：</span>{pattern.representativeRecipe.benefits}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'fiveelements' && (
            <div className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
                <p className="font-semibold mb-1">五行与脏腑食疗对应</p>
                <p className="text-xs">中医认为五行（木火土金水）对应五脏（肝心脾肺肾），不同癌症影响不同脏腑功能，通过五行对应的食物进行调补，达到扶正的效果。</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.values(FIVE_ELEMENT_FOODS).map(elem => {
                  const colors: Record<string, string> = {
                    木: 'bg-green-50 border-green-200', 火: 'bg-red-50 border-red-200',
                    土: 'bg-yellow-50 border-yellow-200', 金: 'bg-gray-50 border-gray-200',
                    水: 'bg-blue-50 border-blue-200'
                  }
                  const badges: Record<string, string> = {
                    木: 'bg-green-600', 火: 'bg-red-600', 土: 'bg-yellow-600', 金: 'bg-gray-600', 水: 'bg-blue-600'
                  }
                  return (
                    <div key={elem.element} className={`rounded-xl p-4 border ${colors[elem.element]}`}>
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`w-8 h-8 ${badges[elem.element]} text-white rounded-full flex items-center justify-center font-bold text-sm`}>{elem.element}</span>
                        <div>
                          <p className="font-bold text-gray-800">{elem.organ}</p>
                          <p className="text-xs text-gray-500">{elem.flavor}味 · {elem.color}色 · 应{elem.season}</p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mb-3 italic">"{elem.tcmPrinciple}"</p>
                      <div className="mb-2">
                        <p className="text-xs font-semibold text-gray-600 mb-1">推荐食物</p>
                        <div className="flex flex-wrap gap-1">
                          {elem.beneficialFoods.map(f => <span key={f} className="text-xs bg-white text-gray-700 px-2 py-0.5 rounded-full border border-gray-200">{f}</span>)}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 mb-1">适用癌种</p>
                        <div className="flex flex-wrap gap-1">
                          {elem.tumorTypes.map(t => <span key={t} className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{t}</span>)}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {activeTab === 'recipes' && (
            <div className="space-y-5">
              <p className="text-sm text-gray-500">中医食疗方集，按癌症类型整理，结合现代营养学分析</p>
              {Object.entries(TCM_RECIPES).map(([cancerKey, recipes]) => {
                const cancerName: Record<string, string> = { gastric: '胃癌', lung: '肺癌', colorectal: '结直肠癌', liver: '肝癌' }
                return (
                  <div key={cancerKey}>
                    <h3 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
                      <span className="w-6 h-6 bg-amber-500 text-white rounded-md flex items-center justify-center text-xs font-bold">{cancerName[cancerKey]?.[0]}</span>
                      {cancerName[cancerKey] || cancerKey} 适用食疗方
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {recipes.map((recipe, i) => (
                        <div key={i} className="bg-amber-50/60 rounded-xl p-4 border border-amber-100">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-bold text-amber-900">{recipe.name}</h4>
                            <span className="text-xs bg-amber-200 text-amber-800 px-2 py-0.5 rounded-full">{recipe.tcmEffect}</span>
                          </div>
                          <div className="space-y-2 text-sm">
                            <p className="text-gray-700"><span className="font-medium text-gray-500">食材：</span>{recipe.ingredients.join('、')}</p>
                            <p className="text-gray-700"><span className="font-medium text-gray-500">做法：</span>{recipe.method}</p>
                            <p className="text-gray-700"><span className="font-medium text-gray-500">适用：</span>{recipe.suitableFor}</p>
                            <div className="mt-2 p-2 bg-green-50 rounded-lg border border-green-200">
                              <p className="text-xs text-green-700"><span className="font-semibold">现代营养学价值：</span>{recipe.modernBenefits}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {activeTab === 'foodsafety' && (
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-800">
                <p className="font-semibold mb-1">食品安全特别提示</p>
                <p className="text-xs">化疗导致免疫力低下（中性粒细胞减少）的患者，食源性感染风险大幅增加，需严格遵守食品安全原则。</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    title: '化疗期免疫抑制饮食原则',
                    color: 'border-red-200 bg-red-50',
                    items: [
                      ['所有肉类彻底熟透（中心温度≥75°C）', 'severe'],
                      ['避免生食：生鱼片、刺身、半熟蛋', 'severe'],
                      ['避免未经巴氏消毒的奶制品和蜂蜜', 'severe'],
                      ['水果蔬菜彻底清洗，去皮食用', 'moderate'],
                      ['冰箱生熟分开，熟食4°C以下保存', 'moderate'],
                      ['不吃隔夜饭菜（尤其夏季）', 'moderate'],
                    ]
                  },
                  {
                    title: '需要特别注意的食物',
                    color: 'border-orange-200 bg-orange-50',
                    items: [
                      ['生豆芽类（沙门氏菌风险）', 'severe'],
                      ['软奶酪（李斯特菌风险）', 'severe'],
                      ['街头摊贩食品（温度控制难）', 'moderate'],
                      ['凉拌菜、卤味（放置时间不明）', 'moderate'],
                      ['未经处理的蜂蜜（婴儿和免疫低下者）', 'moderate'],
                      ['散装坚果（黄曲霉毒素）', 'mild'],
                    ]
                  },
                ].map(section => (
                  <div key={section.title} className={`rounded-xl p-4 border ${section.color}`}>
                    <h3 className="font-bold text-gray-800 text-sm mb-3">{section.title}</h3>
                    <ul className="space-y-2">
                      {section.items.map(([item, level], i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <span className={`flex-shrink-0 w-4 h-4 rounded-full mt-0.5 flex items-center justify-center text-white text-xs font-bold ${
                            level === 'severe' ? 'bg-red-500' : level === 'moderate' ? 'bg-orange-400' : 'bg-yellow-400'
                          }`}>!</span>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                <h3 className="font-bold text-emerald-800 text-sm mb-3">安全食物推荐（免疫低下期）</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['新鲜烹饪的米饭/面条', '熟透的蒸鱼', '水煮蔬菜', '全熟炒蛋', '巴氏消毒牛奶', '罐装食品（当天开罐）', '煮熟的豆腐', '新鲜出锅热汤'].map(f => (
                    <div key={f} className="bg-white rounded-lg p-2 text-center text-xs text-emerald-700 border border-emerald-100">
                      <span className="text-emerald-500 text-sm">✓</span>
                      <br/>{f}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <WechatConsult />
    </div>
  )
}
