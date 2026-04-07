// 专家共识2024版 - 口服营养补充制剂选择数据
export interface ONSRecommendation {
  id: string;
  title: string;
  evidenceLevel: 'A' | 'B' | 'C';
  recommendation: string;
  formulaType?: string;
  indication?: string;
  notes?: string;
}

export const EXPERT_CONSENSUS_2024: ONSRecommendation[] = [
  {
    id: 'rec1',
    title: '营养筛查与评定',
    evidenceLevel: 'A',
    recommendation: '肿瘤患者一经确诊，即应进行营养风险筛查（NRS2002）、营养评定（PG-SGA）和营养不良诊断（GLIM标准）。',
    notes: 'NRS2002 ≥3分提示存在营养风险，需启动营养干预'
  },
  {
    id: 'rec2',
    title: '能量摄入目标',
    evidenceLevel: 'A',
    recommendation: '成年肿瘤患者能量摄入量建议为 105～126 kJ/(kg·d)，即 25～30 kcal/(kg·d)。',
    notes: '根据患者活动水平、代谢状态个体化调整'
  },
  {
    id: 'rec3',
    title: '蛋白质摄入目标',
    evidenceLevel: 'A',
    recommendation: '对肝肾功能正常的成年肿瘤患者，蛋白质摄入量建议为 1～1.5 g/(kg·d)。',
    notes: '肌肉减少或手术后可提高至 1.5～2.0 g/(kg·d)'
  },
  {
    id: 'rec4',
    title: '维生素和矿物质',
    evidenceLevel: 'B',
    recommendation: '应常规监测患者的维生素和矿物质状况，对缺乏者应予强化补充。',
    notes: '常见缺乏：维生素D、B12、叶酸、铁、锌'
  },
  {
    id: 'rec5',
    title: 'ONS首选原则',
    evidenceLevel: 'A',
    recommendation: '存在营养风险/营养不良的肿瘤患者，只要胃肠道有功能，应首选口服营养补充（ONS）。',
    formulaType: '首选整蛋白标准配方'
  },
  {
    id: 'rec6',
    title: '标准整蛋白配方',
    evidenceLevel: 'A',
    recommendation: '大多数存在营养风险的患者，可选择标准的整蛋白配方。',
    formulaType: '标准整蛋白配方',
    indication: '一般营养风险患者',
    notes: '居家营养、无特殊并发症时的基础选择'
  },
  {
    id: 'rec7',
    title: '要素型/短肽配方',
    evidenceLevel: 'B',
    recommendation: '如存在肠功能严重受损（如短肠综合征等），可选择要素型（短肽）配方。',
    formulaType: '要素型/短肽配方',
    indication: '消化吸收功能障碍',
    notes: '适用于肠功能衰竭、严重腹泻或吸收不良患者'
  },
  {
    id: 'rec8',
    title: '糖尿病专用配方',
    evidenceLevel: 'B',
    recommendation: '如合并糖尿病或糖耐量异常，可选择糖尿病专用配方。',
    formulaType: '糖尿病专用配方（低GI）',
    indication: '合并糖尿病/糖耐量异常',
    notes: '有助于血糖控制，降低血糖波动'
  },
  {
    id: 'rec9',
    title: '肾病专用配方',
    evidenceLevel: 'B',
    recommendation: '如存在严重的电解质异常（合并严重CKD），可选择钠、钾、磷含量较低的肾病专用配方。',
    formulaType: '肾病专用配方（低钠低钾低磷）',
    indication: '合并慢性肾功能不全+严重电解质异常',
    notes: '不常规推荐，仅在严重电解质紊乱时考虑'
  },
  {
    id: 'rec10',
    title: '高能量密度配方',
    evidenceLevel: 'B',
    recommendation: '如需要限制入量，可选择高能量密度配方。',
    formulaType: '高能量密度配方（1.5～2.0 kcal/mL）',
    indication: '需限制液体摄入患者',
    notes: '减少液体负荷，同时保障营养需求'
  },
  {
    id: 'rec11',
    title: '免疫增强配方（围手术期）',
    evidenceLevel: 'A',
    recommendation: '如拟接受大手术（尤其是消化道手术），ONS选择免疫增强配方（含精氨酸、ω-3脂肪酸、核苷酸等）可能获益。',
    formulaType: '免疫增强配方（含精氨酸+ω-3+核苷酸）',
    indication: '大手术围手术期',
    notes: '可能降低术后感染并发症，促进愈合；疗程≥5天'
  },
  {
    id: 'rec16',
    title: 'MCT配方（胰腺外分泌不全）',
    evidenceLevel: 'B',
    recommendation: '如存在胰腺外分泌功能不全，在补充胰酶无效后，可选择富含中链甘油三酯（MCT）的要素型ONS。',
    formulaType: '富含MCT的要素型配方',
    indication: '胰腺外分泌功能不全',
    notes: 'MCT不需要胆盐和胰脂酶水解，吸收更直接'
  },
  {
    id: 'rec18',
    title: '含膳食纤维配方',
    evidenceLevel: 'B',
    recommendation: '如存在腹泻或便秘，可选择含有膳食纤维的ONS。',
    formulaType: '含膳食纤维配方',
    indication: '腹泻/便秘',
    notes: '可溶性膳食纤维有助于调节肠道功能'
  },
  {
    id: 'rec20',
    title: '监测与随访',
    evidenceLevel: 'A',
    recommendation: '采用ONS时，应监测营养支持治疗的效果和并发症（如营养摄入量、肝肾功能、血糖、电解质等）。',
    notes: '建议每2-4周随访一次营养状态'
  },
];

// 专家共识 - 不常规推荐项目
export const NOT_RECOMMENDED = [
  { name: '强化ω-3脂肪酸ONS', reason: '现有证据不支持常规使用获益（特定情况除外）' },
  { name: '强化HMB（β-羟基-β-丁酸甲酯）的ONS', reason: '缺乏足够证据支持常规使用' },
  { name: '强化精氨酸ONS（非手术期）', reason: '非手术患者不常规推荐，可能对感染/败血症患者有害' },
  { name: '强化谷氨酰胺ONS', reason: '不常规推荐（烧伤/创伤除外）' },
  { name: '强化支链氨基酸（BCAA）ONS', reason: '合并肝性脑病者除外，其余不常规推荐' },
  { name: '益生菌联合ONS', reason: '现有证据不支持常规使用' },
];
