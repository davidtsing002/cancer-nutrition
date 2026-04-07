export interface CancerType {
  id: string;
  name: string;
  category: string;
  nutritionFocus: string[];
  commonSymptoms: string[];
  dietaryNotes: string;
}

export const CANCER_TYPES: CancerType[] = [
  { id: 'gastric', name: '胃癌', category: '消化系统', nutritionFocus: ['软食', '少量多餐', '高蛋白'], commonSymptoms: ['恶心', '食欲不振', '早饱'], dietaryNotes: '消化系统手术后需要特殊饮食规划，以软烂易消化食物为主' },
  { id: 'colorectal', name: '结直肠癌', category: '消化系统', nutritionFocus: ['低渣饮食', '足量蛋白质', '水分'], commonSymptoms: ['腹泻', '便秘', '腹胀'], dietaryNotes: '根据肠道功能状态调整膳食纤维摄入量' },
  { id: 'liver', name: '肝癌', category: '消化系统', nutritionFocus: ['支链氨基酸', '低钠', '维生素补充'], commonSymptoms: ['腹水', '乏力', '食欲差'], dietaryNotes: '注意肝功能状态，限制蛋白质需谨慎评估' },
  { id: 'pancreatic', name: '胰腺癌', category: '消化系统', nutritionFocus: ['胰酶补充', '低脂', '要素饮食'], commonSymptoms: ['消化不良', '脂肪泻', '血糖异常'], dietaryNotes: '胰腺外分泌功能不足需补充胰酶制剂' },
  { id: 'esophageal', name: '食管癌', category: '消化系统', nutritionFocus: ['流质/半流质', '高热量密度', '管饲营养'], commonSymptoms: ['吞咽困难', '体重下降', '反流'], dietaryNotes: '吞咽困难严重者需肠内营养支持' },
  { id: 'lung', name: '肺癌', category: '呼吸系统', nutritionFocus: ['高热量', '高蛋白', '抗氧化营养素'], commonSymptoms: ['疲劳', '呼吸困难', '食欲下降'], dietaryNotes: '化疗期间注意维持体重，补充抗氧化营养素' },
  { id: 'breast', name: '乳腺癌', category: '乳腺', nutritionFocus: ['低脂饮食', '植物雌激素适量', '钙质补充'], commonSymptoms: ['疲劳', '恶心', '潮热'], dietaryNotes: '他莫昔芬治疗期间注意食物相互作用' },
  { id: 'cervical', name: '宫颈癌', category: '妇科', nutritionFocus: ['抗氧化维生素', '叶酸', '铁质'], commonSymptoms: ['出血', '疲劳', '盆腔不适'], dietaryNotes: '放疗期间注意肠道保护，补充益生菌食物' },
  { id: 'ovarian', name: '卵巢癌', category: '妇科', nutritionFocus: ['高蛋白', '低脂肪', 'ω-3脂肪酸'], commonSymptoms: ['腹胀', '食欲不振', '腹水'], dietaryNotes: '铂类化疗期注意肾脏保护，足量饮水' },
  { id: 'lymphoma', name: '淋巴瘤', category: '血液系统', nutritionFocus: ['高蛋白', '无菌饮食', '充足热量'], commonSymptoms: ['发热', '乏力', '口腔溃疡'], dietaryNotes: '骨髓抑制期严格食品安全，建议熟食为主' },
  { id: 'leukemia', name: '白血病', category: '血液系统', nutritionFocus: ['无菌饮食', '高热量', '富含造血营养素'], commonSymptoms: ['出血倾向', '感染风险高', '疲劳'], dietaryNotes: '移植期需严格洁净饮食，避免生冷食品' },
  { id: 'nasopharyngeal', name: '鼻咽癌', category: '头颈部', nutritionFocus: ['流质软食', '口腔护理', '充足水分'], commonSymptoms: ['口干', '吞咽痛', '口腔黏膜炎'], dietaryNotes: '放疗引起口腔并发症，需特别营养支持' },
  { id: 'thyroid', name: '甲状腺癌', category: '内分泌', nutritionFocus: ['碘管理', '钙质', '维生素D'], commonSymptoms: ['疲劳', '体重变化', '吞咽不适'], dietaryNotes: '放射碘治疗前需低碘饮食' },
  { id: 'prostate', name: '前列腺癌', category: '泌尿系统', nutritionFocus: ['低脂饮食', '番茄红素', '绿茶多酚'], commonSymptoms: ['疲劳', '骨痛', '排尿问题'], dietaryNotes: '内分泌治疗期注意骨密度保护，补充钙和维生素D' },
  { id: 'bladder', name: '膀胱癌', category: '泌尿系统', nutritionFocus: ['充足饮水', '维生素C', '低糖'], commonSymptoms: ['血尿', '尿频', '疲劳'], dietaryNotes: '足量饮水有助于稀释膀胱内致癌物' },
  { id: 'kidney', name: '肾癌', category: '泌尿系统', nutritionFocus: ['低钾低磷（肾功不全时）', '优质蛋白', '控制液体'], commonSymptoms: ['水肿', '高血压', '疲劳'], dietaryNotes: '肾功能受损时需根据GFR调整营养方案' },
];

export const TREATMENT_STAGES = [
  { id: 'pretreatment', name: '治疗前（围手术期）', description: '手术前营养准备，提高手术耐受性' },
  { id: 'chemo', name: '化疗中', description: '化疗期间营养支持，减轻副作用' },
  { id: 'radiation', name: '放疗中', description: '放疗期间保护正常组织' },
  { id: 'targeted', name: '靶向/免疫治疗', description: '靶向或免疫治疗期间营养维护' },
  { id: 'posttreatment', name: '治疗结束康复期', description: '康复期体质重建与营养恢复' },
  { id: 'palliative', name: '姑息治疗期', description: '维持生活质量，减轻症状' },
];

export const SYMPTOMS = [
  { id: 'nausea', name: '恶心/呕吐', category: '消化道' },
  { id: 'appetite_loss', name: '食欲不振', category: '消化道' },
  { id: 'diarrhea', name: '腹泻', category: '消化道' },
  { id: 'constipation', name: '便秘', category: '消化道' },
  { id: 'mucositis', name: '口腔黏膜炎', category: '口腔' },
  { id: 'dry_mouth', name: '口干', category: '口腔' },
  { id: 'taste_change', name: '味觉改变', category: '口腔' },
  { id: 'dysphagia', name: '吞咽困难', category: '消化道' },
  { id: 'fatigue', name: '乏力/疲劳', category: '全身' },
  { id: 'weight_loss', name: '体重减轻', category: '全身' },
  { id: 'hyperglycemia', name: '血糖升高', category: '代谢' },
  { id: 'neutropenia', name: '中性粒细胞减少', category: '血液' },
  { id: 'pain', name: '疼痛', category: '全身' },
  { id: 'abdominal_bloating', name: '腹胀', category: '消化道' },
];
