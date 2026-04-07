import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Bot, User, Sparkles, Clock, AlertTriangle } from 'lucide-react'

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  time: string
}

// 预设问题和回答
const presetQAs: Record<string, string> = {
  '食': '根据您目前的营养方案，建议选择高蛋白、富含维生素的食物。早餐可以选择小米粥配鸡蛋羹，午餐推荐清蒸鱼配糙米饭。如果有特定的食物想替换，可以告诉我具体是什么，我来帮您分析。',
  '药': '服用药物时，请注意以下时间间隔：\n• 抗生素：与食物间隔2小时\n• 甲状腺药物：空腹服用，30分钟内不进食\n• 补铁剂：与钙片、维生素C间隔2小时\n• 华法林：保持维生素K摄入稳定\n\n如果您在服用其他药物，可以告诉我药名，我会给您更具体的建议。',
  '水果': '适合您目前情况的水果推荐：\n✅ 猕猴桃（维C之王）\n✅ 苹果（性平，易消化）\n✅ 香蕉（补充能量）\n✅ 梨（润肺生津）\n❌ 避免：柚子/西柚（与药物相互作用）\n\n建议在两餐之间食用，每天200g左右为宜。',
  '不适': '如果出现以下症状，请及时就医：\n• 持续恶心呕吐超过24小时\n• 腹泻超过3次/天\n• 吞咽困难加重\n• 体重一周内下降超过2kg\n\n轻微不适可以先尝试：少食多餐、选择清淡易消化的食物、适当散步促进消化。如果症状持续或加重，请联系您的主治医生。',
  'default': '您好！我是愈健智能助手。我可以帮您解答以下问题：\n\n🍽️ 食物选择与替换\n💊 药物与营养的相互作用\n🍎 水果选择建议\n🏥 不适时应该怎么办\n📋 营养方案相关问题\n\n请直接描述您的问题，我会尽力为您解答！'
}

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: '您好！我是愈健智能助手 🤝\n\n我可以帮您解答关于营养方案、饮食选择、药物相互作用等问题。有什么我可以帮您的吗？',
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    for (const [key, value] of Object.entries(presetQAs)) {
      if (lowerMessage.includes(key)) {
        return value
      }
    }

    return presetQAs['default']
  }

  const handleSend = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')

    // 模拟AI思考
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: getAIResponse(inputValue),
        time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, aiResponse])
    }, 800)
  }

  const handleQuickQuestion = (question: string) => {
    setInputValue(question)
    setTimeout(handleSend, 100)
  }

  const quickQuestions = [
    { label: '食物替换建议', icon: '🍽️' },
    { label: '药物服用注意', icon: '💊' },
    { label: '水果选择', icon: '🍎' },
    { label: '身体不适时', icon: '🏥' }
  ]

  return (
    <>
      {/* 悬浮按钮 */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 text-white shadow-lg hover:shadow-xl transition-all z-40 flex items-center justify-center group ${
          isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <MessageCircle className="w-7 h-7 group-hover:scale-110 transition-transform" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full animate-pulse" />
      </button>

      {/* 聊天窗口 */}
      <div className={`fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden transition-all ${
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}>
        {/* 头部 */}
        <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-semibold text-white">愈健智能助手</div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-xs text-cyan-100">在线</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 消息区域 */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-2 max-w-[85%] ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                  msg.type === 'user' ? 'bg-cyan-600' : 'bg-gray-200'
                }`}>
                  {msg.type === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-gray-600" />
                  )}
                </div>
                <div>
                  <div className={`rounded-2xl px-4 py-3 ${
                    msg.type === 'user'
                      ? 'bg-gradient-to-br from-cyan-500 to-cyan-600 text-white rounded-tr-sm'
                      : 'bg-white text-gray-800 rounded-tl-sm shadow-sm'
                  }`}>
                    <p className="text-sm whitespace-pre-line">{msg.content}</p>
                  </div>
                  <div className={`text-xs text-gray-400 mt-1 ${msg.type === 'user' ? 'text-right' : ''}`}>
                    {msg.time}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* 快捷问题 */}
        {messages.length === 1 && (
          <div className="px-4 py-2 border-t bg-white">
            <p className="text-xs text-gray-500 mb-2">快捷问题：</p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickQuestion(q.label)}
                  className="px-3 py-1.5 bg-gray-100 hover:bg-cyan-50 text-gray-700 hover:text-cyan-700 rounded-full text-xs transition-colors flex items-center gap-1"
                >
                  <span>{q.icon}</span>
                  {q.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 输入区域 */}
        <div className="p-4 border-t bg-white">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleSend()}
              placeholder="输入您的问题..."
              className="flex-1 px-4 py-2 border border-gray-200 rounded-full focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-sm"
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 text-white flex items-center justify-center hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center">
            AI辅助回答，如有紧急情况请咨询医生
          </p>
        </div>
      </div>
    </>
  )
}
