import { useState, useEffect, useRef } from 'react'
import {
  Brain, Zap, Shield, Clock, Heart, Users, Sparkles, ArrowRight,
  CheckCircle, AlertTriangle, ChevronDown, MessageCircle, X,
  Stethoscope, Utensils, Activity, Pill, ClipboardCheck, RefreshCw
} from 'lucide-react'
import PatientForm from './components/PatientForm'
import NutritionPlan from './components/NutritionPlan'
import ChatAssistant from './components/ChatAssistant'

// 数字递增动画组件
function CountUp({ end, duration = 2000, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          let start = 0
          const increment = end / (duration / 16)
          const timer = setInterval(() => {
            start += increment
            if (start >= end) {
              setCount(end)
              clearInterval(timer)
            } else {
              setCount(Math.floor(start))
            }
          }, 16)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end, duration, hasAnimated])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

// Hero 区组件
function HeroSection({ onStartAssessment }: { onStartAssessment: () => void }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-hero-gradient bg-hero-pattern overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float" style={{ animationDelay: '3s' }} />
      </div>

      <div className="container-custom relative z-10 text-center text-white px-4">
        {/* 品牌标签 */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-8 animate-fade-in-up">
          <Sparkles className="w-4 h-4 text-cyan-300" />
          <span className="text-sm font-medium">AI驱动的院后营养管理新时代</span>
        </div>

        {/* 主标题 */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          愈健
          <span className="block text-cyan-300 mt-2">让每一餐都科学</span>
        </h1>

        {/* 副标题 */}
        <p className="text-lg md:text-xl text-cyan-100 max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          基于深度学习和大数据分析，为出院患者提供个性化的营养方案。<br />
          整合疾病诊断、代谢特点、药物相互作用，守护您的居家康复之路。
        </p>

        {/* CTA 按钮 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <button onClick={onStartAssessment} className="btn-accent text-lg px-8 py-4 flex items-center justify-center gap-2">
            <Zap className="w-5 h-5" />
            立即开始评估
          </button>
          <a href="#features" className="px-8 py-4 border-2 border-white/30 rounded-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2 text-white">
            了解更多
            <ChevronDown className="w-5 h-5" />
          </a>
        </div>

        {/* 核心数据 */}
        <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold font-numbers text-cyan-300">
              <CountUp end={50000} suffix="+" />
            </div>
            <div className="text-sm text-cyan-200 mt-2">服务患者</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold font-numbers text-orange-300">
              <CountUp end={96} suffix="%" />
            </div>
            <div className="text-sm text-cyan-200 mt-2">方案准确率</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold font-numbers text-emerald-300">
              <CountUp end={10} suffix="秒" />
            </div>
            <div className="text-sm text-cyan-200 mt-2">方案生成</div>
          </div>
        </div>
      </div>

      {/* 向下滚动指示 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 animate-bounce">
        <ChevronDown className="w-8 h-8" />
      </div>
    </section>
  )
}

// 痛点区组件
function PainPointsSection() {
  const painPoints = [
    {
      icon: <Utensils className="w-8 h-8" />,
      title: '不知道吃什么',
      description: '出院后面对各种食材，不知道如何搭配才能满足康复需求',
      stat: '78%'
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: '不知道吃多少',
      description: '不同阶段、不同体质需要的热量和营养素完全不同',
      stat: '65%'
    },
    {
      icon: <AlertTriangle className="w-8 h-8" />,
      title: '不知道禁忌',
      description: '药物与食物的相互作用复杂，盲目饮食可能影响药效',
      stat: '43%'
    }
  ]

  return (
    <section className="py-24 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="tag tag-orange mb-4">核心痛点</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            院后营养，患者最真实的困惑
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            基于对数万名出院患者的调研，我们发现了这三个最常见的问题
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {painPoints.map((point, index) => (
            <div key={index} className="card p-8 text-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 text-6xl font-bold text-gray-100 opacity-50 transform translate-x-4 -translate-y-4">
                {point.stat}
              </div>
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white transition-all">
                {point.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{point.title}</h3>
              <p className="text-gray-600">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// 功能特性组件
function FeaturesSection() {
  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: 'AI智能评估',
      description: '深度学习模型分析您的疾病、代谢、用药等多维度数据',
      color: 'cyan'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: '秒级生成',
      description: '10秒内生成个性化营养方案，无需漫长等待',
      color: 'orange'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: '安全保障',
      description: '药物-营养相互作用检测，确保饮食安全',
      color: 'green'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: '全程陪伴',
      description: '院后闭环管理，随访提醒，持续优化方案',
      color: 'purple'
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: '人文关怀',
      description: '考虑口味偏好、饮食习惯，让方案更易执行',
      color: 'pink'
    },
    {
      icon: <RefreshCw className="w-6 h-6" />,
      title: '动态调整',
      description: '基于随访数据自动更新方案，适应康复进程',
      color: 'blue'
    }
  ]

  return (
    <section id="features" className="py-24 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="tag tag-blue mb-4">核心能力</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            六大AI智能引擎
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            整合深度学习、自然语言处理、大数据分析，构建全方位智能营养管理体系
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="card p-6 group cursor-pointer">
              <div className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center
                ${feature.color === 'cyan' ? 'bg-cyan-100 text-cyan-600' : ''}
                ${feature.color === 'orange' ? 'bg-orange-100 text-orange-600' : ''}
                ${feature.color === 'green' ? 'bg-emerald-100 text-emerald-600' : ''}
                ${feature.color === 'purple' ? 'bg-purple-100 text-purple-600' : ''}
                ${feature.color === 'pink' ? 'bg-pink-100 text-pink-600' : ''}
                ${feature.color === 'blue' ? 'bg-blue-100 text-blue-600' : ''}
              `}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 group-hover:text-cyan-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// 闭环流程组件
function ProcessSection() {
  const steps = [
    { icon: <ClipboardCheck className="w-6 h-6" />, title: '评估', desc: '输入疾病与身体信息', color: 'cyan' },
    { icon: <Sparkles className="w-6 h-6" />, title: '生成', desc: 'AI秒级生成方案', color: 'orange' },
    { icon: <Utensils className="w-6 h-6" />, title: '执行', desc: '居家实施营养方案', color: 'emerald' },
    { icon: <Clock className="w-6 h-6" />, title: '随访', desc: '定期提醒与记录', color: 'purple' },
    { icon: <RefreshCw className="w-6 h-6" />, title: '迭代', desc: '数据驱动方案优化', color: 'blue' }
  ]

  return (
    <section className="py-24 bg-gradient-to-b from-cyan-50 to-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="tag tag-green mb-4">院后闭环</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            五步闭环，全程守护
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            从评估到迭代，构建完整的院后营养管理闭环，让康复之路不再迷茫
          </p>
        </div>

        {/* 流程可视化 */}
        <div className="relative">
          {/* 连接线 */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-cyan-200 via-orange-200 to-blue-200 transform -translate-y-1/2 z-0" />

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center
                  ${step.color === 'cyan' ? 'bg-cyan-500 text-white' : ''}
                  ${step.color === 'orange' ? 'bg-orange-500 text-white' : ''}
                  ${step.color === 'emerald' ? 'bg-emerald-500 text-white' : ''}
                  ${step.color === 'purple' ? 'bg-purple-500 text-white' : ''}
                  ${step.color === 'blue' ? 'bg-blue-500 text-white' : ''}
                  shadow-lg`}>
                  {step.icon}
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">{step.title}</h4>
                <p className="text-sm text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 详细说明 */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="card p-6 border-t-4 border-cyan-500">
            <h4 className="font-semibold text-gray-900 mb-3">评估维度</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-cyan-500" /> 疾病诊断与分期</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-cyan-500" /> 营养状态评估</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-cyan-500" /> 代谢指标分析</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-cyan-500" /> 药物使用情况</li>
            </ul>
          </div>
          <div className="card p-6 border-t-4 border-orange-500">
            <h4 className="font-semibold text-gray-900 mb-3">方案内容</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-orange-500" /> 个性化食谱</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-orange-500" /> 营养素摄入目标</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-orange-500" /> 饮食禁忌清单</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-orange-500" /> 烹饪指导建议</li>
            </ul>
          </div>
          <div className="card p-6 border-t-4 border-emerald-500">
            <h4 className="font-semibold text-gray-900 mb-3">随访管理</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> 每日打卡记录</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> 症状反馈追踪</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> 异常预警提醒</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> 阶段性复评</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

// 技术架构组件
function TechSection() {
  return (
    <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
      {/* 背景效果 */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <span className="tag bg-cyan-500/20 text-cyan-300 mb-4">技术架构</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            三大AI核心引擎
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            整合深度学习、自然语言处理、大数据分析，为您提供精准的个性化营养方案
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center mb-6">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-4">深度学习引擎</h3>
            <p className="text-gray-400 mb-6">
              基于数百万临床营养案例训练，精准分析患者个体差异，自动识别复杂营养需求模式
            </p>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> CNN疾病特征提取
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> LSTM时序数据分析
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> 注意力机制优化
              </li>
            </ul>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mb-6">
              <MessageCircle className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-4">自然语言处理</h3>
            <p className="text-gray-400 mb-6">
              理解患者自然语言描述，智能提取关键症状信息，支持语音输入和智能问答
            </p>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-400" /> 症状意图识别
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-400" /> 实体关系抽取
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-400" /> 多轮对话理解
              </li>
            </ul>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mb-6">
              <Activity className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-4">大数据分析</h3>
            <p className="text-gray-400 mb-6">
              整合最新营养学研究、食材数据库、药物相互作用数据，确保方案科学可靠
            </p>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> 实时数据更新
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> 交叉验证机制
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> 异常检测预警
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

// 案例展示组件
function CasesSection() {
  const cases = [
    {
      name: '张女士',
      age: 58,
      condition: '乳腺癌术后',
      days: 30,
      result: '体重稳定，白蛋白指标正常，无营养不良',
      quote: '出院前最担心的就是营养问题，现在每天都有详细的食谱，再也不用为吃什么发愁了。'
    },
    {
      name: '王先生',
      age: 72,
      condition: '结肠癌化疗后',
      days: 45,
      result: '顺利完成后续化疗疗程，体重恢复5%',
      quote: '以前不知道吃药和吃饭还要间隔时间，用了系统后才明白，现在治疗效果比以前好多了。'
    },
    {
      name: '李奶奶',
      age: 81,
      condition: '髋关节置换术后',
      days: 60,
      result: '伤口愈合良好，骨质疏松改善',
      quote: '孙女帮我用这个系统，给我安排得很清楚，连孙女都不知道该给我做什么，现在都照着做。'
    }
  ]

  return (
    <section className="py-24 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="tag tag-blue mb-4">真实案例</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            他们都在用愈健
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            听听已经在使用愈健的患者和家属怎么说
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {cases.map((c, index) => (
            <div key={index} className="card p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-white font-bold">
                  {c.name[0]}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{c.name}</div>
                  <div className="text-sm text-gray-500">{c.age}岁 · {c.condition}</div>
                </div>
              </div>
              <p className="text-gray-600 italic mb-4">"{c.quote}"</p>
              <div className="border-t pt-4">
                <div className="text-sm text-gray-500 mb-2">使用{c.days}天后的结果</div>
                <div className="text-sm font-medium text-emerald-600">{c.result}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// CTA区组件
function CTASection({ onStartAssessment }: { onStartAssessment: () => void }) {
  return (
    <section className="py-24 bg-gradient-to-br from-cyan-600 to-cyan-700 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container-custom relative z-10 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          开启您的个性化营养之旅
        </h2>
        <p className="text-cyan-100 text-lg mb-10 max-w-2xl mx-auto">
          只需3分钟，完成健康评估，即可获得专属的营养方案。<br />
          让科学饮食成为您康复路上最可靠的伙伴。
        </p>
        <button onClick={onStartAssessment} className="btn-accent text-lg px-10 py-4 inline-flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          立即开始免费评估
        </button>
        <p className="text-cyan-200 text-sm mt-6">
          无需注册 · 数据安全 · 完全免费
        </p>
      </div>
    </section>
  )
}

// 导航栏组件
function Navbar({ onStartAssessment }: { onStartAssessment: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'glass shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className={`text-xl font-bold ${scrolled ? 'text-gray-900' : 'text-white'}`}>
              愈健
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className={`font-medium ${scrolled ? 'text-gray-700 hover:text-cyan-600' : 'text-white/90 hover:text-white'}`}>首页</a>
            <a href="#features" className={`font-medium ${scrolled ? 'text-gray-700 hover:text-cyan-600' : 'text-white/90 hover:text-white'}`}>功能</a>
            <a href="#process" className={`font-medium ${scrolled ? 'text-gray-700 hover:text-cyan-600' : 'text-white/90 hover:text-white'}`}>流程</a>
            <a href="#tech" className={`font-medium ${scrolled ? 'text-gray-700 hover:text-cyan-600' : 'text-white/90 hover:text-white'}`}>技术</a>
            <button onClick={onStartAssessment} className="btn-accent px-6 py-2">
              立即体验
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className={`w-6 h-6 ${scrolled ? 'text-gray-900' : 'text-white'}`} />
            ) : (
              <div className={`w-6 h-0.5 ${scrolled ? 'bg-gray-900' : 'bg-white'} mb-1.5`} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden glass py-4 rounded-b-xl">
            <div className="flex flex-col gap-4 px-4">
              <a href="#" className="text-gray-700 font-medium py-2">首页</a>
              <a href="#features" className="text-gray-700 font-medium py-2">功能</a>
              <a href="#process" className="text-gray-700 font-medium py-2">流程</a>
              <a href="#tech" className="text-gray-700 font-medium py-2">技术</a>
              <button onClick={onStartAssessment} className="btn-accent w-full">立即体验</button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

// 页脚组件
function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container-custom">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">愈健</span>
            </div>
            <p className="text-gray-400 mb-4">
              AI驱动的院后营养管理平台，致力于为每一位出院患者提供科学、个性化的营养方案，让康复之路更加清晰。
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-cyan-500 transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-cyan-500 transition-colors">
                <Users className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">快速链接</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#features" className="hover:text-cyan-400 transition-colors">核心功能</a></li>
              <li><a href="#process" className="hover:text-cyan-400 transition-colors">服务流程</a></li>
              <li><a href="#tech" className="hover:text-cyan-400 transition-colors">技术架构</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">隐私政策</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">联系我们</h4>
            <ul className="space-y-2 text-gray-400">
              <li>客服热线：400-888-9999</li>
              <li>邮箱：contact@yujian.health</li>
              <li>工作时间：9:00-21:00</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p>© 2026 愈健健康科技 · 院后营养管理专家</p>
          <p className="mt-2">本平台内容仅供健康参考，不替代专业医疗建议</p>
        </div>
      </div>
    </footer>
  )
}

// 主应用组件
export default function HomePage() {
  const [showAssessment, setShowAssessment] = useState(false)
  const [showPlan, setShowPlan] = useState(false)
  const [patientData, setPatientData] = useState<any>(null)

  const handleStartAssessment = () => {
    setShowAssessment(true)
  }

  const handleFormSubmit = (data: any) => {
    setPatientData(data)
    setShowAssessment(false)
    setShowPlan(true)
  }

  return (
    <div className="min-h-screen">
      <Navbar onStartAssessment={handleStartAssessment} />

      <HeroSection onStartAssessment={handleStartAssessment} />
      <PainPointsSection />
      <FeaturesSection />
      <ProcessSection />
      <TechSection />
      <CasesSection />
      <CTASection onStartAssessment={handleStartAssessment} />
      <Footer />

      {/* 患者评估表单弹窗 */}
      {showAssessment && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowAssessment(false)} />
          <div className="relative min-h-screen flex items-center justify-center p-4">
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setShowAssessment(false)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors z-10"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
              <PatientForm onSubmit={handleFormSubmit} onCancel={() => setShowAssessment(false)} />
            </div>
          </div>
        </div>
      )}

      {/* 营养方案展示弹窗 */}
      {showPlan && patientData && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowPlan(false)} />
          <div className="relative min-h-screen flex items-center justify-center p-4 py-12">
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setShowPlan(false)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors z-10"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
              <NutritionPlan patientData={patientData} />
            </div>
          </div>
        </div>
      )}

      {/* 智能助手 */}
      <ChatAssistant />
    </div>
  )
}
