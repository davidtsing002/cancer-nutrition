import { useState, useEffect } from 'react'
import type { UserRole, NutritionEntry } from '../types'
import WechatConsult from '../components/WechatConsult'

interface Props { userRole: UserRole }

const MEAL_TYPES = [
  { id: 'breakfast', label: '早餐', color: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
  { id: 'lunch', label: '午餐', color: 'bg-green-100 text-green-800 border-green-300' },
  { id: 'dinner', label: '晚餐', color: 'bg-blue-100 text-blue-800 border-blue-300' },
  { id: 'snack', label: '加餐/ONS', color: 'bg-purple-100 text-purple-800 border-purple-300' },
] as const

const QUICK_FOODS = [
  { name: '米饭（1碗）', calories: 200, protein: 4, water: 0 },
  { name: '白粥（1碗）', calories: 80, protein: 2, water: 200 },
  { name: '鸡蛋（1个）', calories: 75, protein: 6, water: 0 },
  { name: '鸡胸肉（100g）', calories: 165, protein: 31, water: 0 },
  { name: '豆腐（100g）', calories: 76, protein: 8, water: 0 },
  { name: '牛奶（200mL）', calories: 130, protein: 6.6, water: 185 },
  { name: '口服营养补充剂（1瓶）', calories: 200, protein: 12, water: 200 },
  { name: '山药粥（1碗）', calories: 120, protein: 3, water: 180 },
  { name: '蒸鱼（100g）', calories: 110, protein: 22, water: 0 },
  { name: '西兰花（100g）', calories: 34, protein: 2.8, water: 0 },
  { name: '苹果（1个）', calories: 80, protein: 0.4, water: 50 },
  { name: '温开水（200mL）', calories: 0, protein: 0, water: 200 },
]

const TODAY = new Date().toISOString().split('T')[0]

export default function TrackerPage({ userRole }: Props) {
  const [entries, setEntries] = useState<NutritionEntry[]>(() => {
    try { return JSON.parse(localStorage.getItem('nutrition_entries') || '[]') } catch { return [] }
  })
  const [selectedDate, setSelectedDate] = useState(TODAY)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newEntry, setNewEntry] = useState({
    mealType: 'breakfast' as NutritionEntry['mealType'],
    food: '',
    amount: 1,
    unit: '份',
    calories: 0,
    protein: 0,
    water: 0,
    notes: '',
  })
  const [targetCalories] = useState(1800)
  const [targetProtein] = useState(75)
  const [targetWater] = useState(2000)

  useEffect(() => {
    localStorage.setItem('nutrition_entries', JSON.stringify(entries))
  }, [entries])

  const todayEntries = entries.filter(e => e.date === selectedDate)

  const totals = todayEntries.reduce((acc, e) => ({
    calories: acc.calories + e.calories,
    protein: acc.protein + e.protein,
    water: acc.water + e.water,
  }), { calories: 0, protein: 0, water: 0 })

  const addEntry = () => {
    const entry: NutritionEntry = {
      id: Date.now().toString(),
      date: selectedDate,
      ...newEntry,
    }
    setEntries(prev => [...prev, entry])
    setNewEntry({ mealType: 'breakfast', food: '', amount: 1, unit: '份', calories: 0, protein: 0, water: 0, notes: '' })
    setShowAddForm(false)
  }

  const deleteEntry = (id: string) => {
    setEntries(prev => prev.filter(e => e.id !== id))
  }

  const applyQuickFood = (food: typeof QUICK_FOODS[0]) => {
    setNewEntry(prev => ({
      ...prev,
      food: food.name,
      calories: food.calories,
      protein: food.protein,
      water: food.water,
      unit: '份',
    }))
  }

  const progressBar = (value: number, target: number, color: string) => {
    const pct = Math.min((value / target) * 100, 100)
    return (
      <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
        <div
          className={`h-3 rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    )
  }

  // Last 7 days for history
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - i)
    return d.toISOString().split('T')[0]
  }).reverse()

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-cyan-100">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-xl font-bold text-cyan-900 flex items-center gap-2">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0891B2" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              每日饮食记录
            </h2>
            <p className="text-cyan-600 text-sm mt-0.5">追踪热量、蛋白质和水分摄入</p>
          </div>
          <input
            type="date"
            value={selectedDate}
            onChange={e => setSelectedDate(e.target.value)}
            className="border border-cyan-200 rounded-xl px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Progress Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: '热量', value: totals.calories, target: targetCalories, unit: 'kcal', color: 'bg-orange-400', textColor: 'text-orange-600' },
          { label: '蛋白质', value: totals.protein, target: targetProtein, unit: 'g', color: 'bg-cyan-500', textColor: 'text-cyan-600' },
          { label: '水分', value: totals.water, target: targetWater, unit: 'mL', color: 'bg-blue-400', textColor: 'text-blue-600' },
        ].map(item => (
          <div key={item.label} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-end justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700">{item.label}</span>
              <span className={`text-xs font-medium ${item.textColor}`}>
                {Math.round((item.value / item.target) * 100)}%
              </span>
            </div>
            {progressBar(item.value, item.target, item.color)}
            <div className="mt-2 text-xs text-gray-500">
              <span className={`font-bold text-base ${item.textColor}`}>{Math.round(item.value)}</span>
              <span> / {item.target} {item.unit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Entries List */}
      <div className="bg-white rounded-2xl shadow-sm border border-cyan-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-semibold text-gray-800">
            {selectedDate === TODAY ? '今日' : selectedDate} 饮食记录
            <span className="ml-2 text-sm font-normal text-gray-400">（{todayEntries.length} 条）</span>
          </h3>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-1.5 bg-cyan-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-cyan-700 cursor-pointer transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            添加记录
          </button>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <div className="p-4 bg-cyan-50 border-b border-cyan-100">
            <div className="space-y-3">
              {/* Meal Type */}
              <div className="flex gap-2 flex-wrap">
                {MEAL_TYPES.map(mt => (
                  <button
                    key={mt.id}
                    onClick={() => setNewEntry(prev => ({ ...prev, mealType: mt.id }))}
                    className={`px-3 py-1 rounded-full text-xs border font-medium cursor-pointer transition-colors ${
                      newEntry.mealType === mt.id ? mt.color + ' border-current' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {mt.label}
                  </button>
                ))}
              </div>

              {/* Quick Foods */}
              <div>
                <p className="text-xs text-gray-500 mb-2 font-medium">快速选择常用食物：</p>
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_FOODS.map(f => (
                    <button
                      key={f.name}
                      onClick={() => applyQuickFood(f)}
                      className="text-xs px-2.5 py-1 bg-white border border-gray-200 rounded-full text-gray-600 hover:border-cyan-400 hover:text-cyan-700 hover:bg-cyan-50 cursor-pointer transition-colors"
                    >
                      {f.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Food Input */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="col-span-2">
                  <label className="text-xs text-gray-500 block mb-1">食物名称</label>
                  <input
                    value={newEntry.food}
                    onChange={e => setNewEntry(prev => ({ ...prev, food: e.target.value }))}
                    placeholder="如：米饭、鸡蛋..."
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                {[
                  { label: '热量 (kcal)', key: 'calories' as const },
                  { label: '蛋白质 (g)', key: 'protein' as const },
                ].map(field => (
                  <div key={field.key}>
                    <label className="text-xs text-gray-500 block mb-1">{field.label}</label>
                    <input
                      type="number"
                      value={newEntry[field.key] || ''}
                      onChange={e => setNewEntry(prev => ({ ...prev, [field.key]: Number(e.target.value) }))}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500 block mb-1">水分 (mL)</label>
                  <input
                    type="number"
                    value={newEntry.water || ''}
                    onChange={e => setNewEntry(prev => ({ ...prev, water: Number(e.target.value) }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">备注</label>
                  <input
                    value={newEntry.notes}
                    onChange={e => setNewEntry(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="可选..."
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <button onClick={() => setShowAddForm(false)} className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 cursor-pointer">取消</button>
                <button
                  onClick={addEntry}
                  disabled={!newEntry.food}
                  className="px-4 py-2 bg-cyan-600 text-white rounded-lg text-sm font-medium hover:bg-cyan-700 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  添加
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Entries */}
        <div className="divide-y divide-gray-50">
          {todayEntries.length === 0 ? (
            <div className="py-12 text-center text-gray-400">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto mb-3 opacity-40"><path d="M3 3h18v18H3z"/><path d="M3 9h18M9 3v18"/></svg>
              <p className="text-sm">暂无记录，点击"添加记录"开始追踪</p>
            </div>
          ) : (
            MEAL_TYPES.map(mt => {
              const mealEntries = todayEntries.filter(e => e.mealType === mt.id)
              if (mealEntries.length === 0) return null
              const mealTotals = mealEntries.reduce((a, e) => ({ cal: a.cal + e.calories, pro: a.pro + e.protein }), { cal: 0, pro: 0 })
              return (
                <div key={mt.id}>
                  <div className="px-4 py-2 bg-gray-50 flex items-center justify-between">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${mt.color}`}>{mt.label}</span>
                    <span className="text-xs text-gray-400">{Math.round(mealTotals.cal)} kcal · {mealTotals.pro.toFixed(1)}g 蛋白质</span>
                  </div>
                  {mealEntries.map(entry => (
                    <div key={entry.id} className="px-4 py-3 flex items-center justify-between hover:bg-gray-50 group">
                      <div>
                        <span className="text-sm font-medium text-gray-800">{entry.food}</span>
                        {entry.notes && <span className="ml-2 text-xs text-gray-400">{entry.notes}</span>}
                        <div className="text-xs text-gray-400 mt-0.5">
                          {entry.calories} kcal · 蛋白质 {entry.protein}g
                          {entry.water > 0 && ` · 水分 ${entry.water}mL`}
                        </div>
                      </div>
                      <button
                        onClick={() => deleteEntry(entry.id)}
                        className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 cursor-pointer transition-opacity p-1"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                      </button>
                    </div>
                  ))}
                </div>
              )
            })
          )}
        </div>
      </div>

      {/* Weekly History */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-cyan-100">
        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0891B2" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
          近7天营养摄入趋势
        </h3>
        <div className="grid grid-cols-7 gap-1">
          {weekDates.map(date => {
            const dayEntries = entries.filter(e => e.date === date)
            const dayCal = dayEntries.reduce((a, e) => a + e.calories, 0)
            const pct = Math.min((dayCal / targetCalories) * 100, 100)
            const dateLabel = date === TODAY ? '今天' : new Date(date + 'T12:00:00').toLocaleDateString('zh-CN', { month: 'numeric', day: 'numeric' })
            return (
              <div key={date} className="text-center">
                <div className="h-20 flex items-end justify-center mb-1">
                  <div
                    className={`w-6 rounded-t-md transition-all duration-500 ${dayCal === 0 ? 'bg-gray-100' : dayCal >= targetCalories ? 'bg-emerald-400' : 'bg-cyan-300'}`}
                    style={{ height: `${Math.max(pct, 3)}%` }}
                  />
                </div>
                <div className="text-xs text-gray-400">{dateLabel}</div>
                <div className="text-xs font-medium text-gray-600">{dayCal > 0 ? Math.round(dayCal) : '-'}</div>
              </div>
            )
          })}
        </div>
        <div className="mt-3 flex items-center gap-4 text-xs text-gray-400">
          <span className="flex items-center gap-1"><span className="w-3 h-3 bg-emerald-400 rounded-sm inline-block"></span>达标（≥{targetCalories}kcal）</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 bg-cyan-300 rounded-sm inline-block"></span>未达标</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 bg-gray-100 rounded-sm inline-block"></span>无记录</span>
        </div>
      </div>

      {/* Clinician export */}
      {userRole === 'clinician' && (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-blue-800 text-sm">医护专区：数据导出</p>
              <p className="text-xs text-blue-600 mt-0.5">导出 CSV 格式营养摄入数据，用于临床营养评估和随访</p>
            </div>
            <button
              onClick={() => {
                const csv = ['日期,餐次,食物,热量(kcal),蛋白质(g),水分(mL)',
                  ...entries.map(e => `${e.date},${e.mealType},${e.food},${e.calories},${e.protein},${e.water}`)
                ].join('\n')
                const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' })
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a'); a.href = url; a.download = '营养记录.csv'; a.click()
              }}
              className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 cursor-pointer transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              导出 CSV
            </button>
          </div>
        </div>
      )}

      <WechatConsult compact />
    </div>
  )
}
