// 公众号咨询入口组件 - "不怕肿"
export default function WechatConsult({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2 text-sm text-green-700">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8.5 13.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm7 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-4-4 1.41-1.41L11 14.17l6.59-6.58L19 9l-8 8z"/>
        </svg>
        <span>详情咨询</span>
        <span className="font-semibold">微信公众号：不怕肿</span>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-5 mt-6">
      <div className="flex items-start gap-4">
        {/* WeChat Icon */}
        <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M9.5 13a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
            <path d="M12 2C6.48 2 2 6.48 2 12c0 2.17.7 4.18 1.88 5.81L2.5 21.5l3.88-1.35C7.8 21.35 9.84 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z"/>
          </svg>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-green-800 text-base">专业营养咨询</h3>
            <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">微信公众号</span>
          </div>
          <p className="text-green-700 text-sm mb-2">
            关注微信公众号 <strong className="text-green-800 text-base">「不怕肿」</strong>，获取专业肿瘤营养师在线咨询、个性化饮食方案及最新营养资讯。
          </p>
          <div className="flex flex-wrap gap-2 text-xs text-green-600">
            <span className="bg-green-100 px-2 py-1 rounded-full">✓ 专业营养师团队</span>
            <span className="bg-green-100 px-2 py-1 rounded-full">✓ 个性化方案制定</span>
            <span className="bg-green-100 px-2 py-1 rounded-full">✓ 循证营养指导</span>
            <span className="bg-green-100 px-2 py-1 rounded-full">✓ 中西医结合</span>
          </div>
        </div>
        {/* QR Placeholder */}
        <div className="flex-shrink-0 text-center hidden sm:block">
          <div className="w-20 h-20 bg-white border-2 border-green-300 rounded-xl flex flex-col items-center justify-center shadow-sm">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.5">
              <rect x="3" y="3" width="7" height="7"/>
              <rect x="14" y="3" width="7" height="7"/>
              <rect x="3" y="14" width="7" height="7"/>
              <rect x="5" y="5" width="3" height="3" fill="#16a34a"/>
              <rect x="16" y="5" width="3" height="3" fill="#16a34a"/>
              <rect x="5" y="16" width="3" height="3" fill="#16a34a"/>
              <path d="M14 14h3v3h-3zM17 17h3v3h-3zM14 17v3" stroke="#16a34a"/>
            </svg>
            <span className="text-xs text-green-600 mt-1 font-medium">扫码关注</span>
          </div>
          <p className="text-xs text-green-500 mt-1">不怕肿</p>
        </div>
      </div>
    </div>
  )
}
