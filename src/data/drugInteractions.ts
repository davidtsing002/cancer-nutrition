// 药物-食物相互作用数据库（中文版）
export interface DrugInteraction {
  drugName: string;
  drugNameEn: string;
  drugClass: string;
  commonUse: string[];
  criticalFoodInteractions: Array<{
    food: string;
    severity: 'severe' | 'moderate' | 'mild';
    mechanism: string;
    consequence: string;
    recommendation: string;
  }>;
  nutritionTips: string[];
  monitoringItems: string[];
}

export const DRUG_INTERACTIONS: DrugInteraction[] = [
  {
    drugName: '甲氨蝶呤',
    drugNameEn: 'Methotrexate',
    drugClass: '抗代谢类化疗药',
    commonUse: ['急性白血病', '淋巴瘤', '乳腺癌', '骨肉瘤'],
    criticalFoodInteractions: [
      {
        food: '叶酸含量丰富的食物（如深色蔬菜）',
        severity: 'moderate',
        mechanism: '叶酸拮抗甲氨蝶呤的抗叶酸作用',
        consequence: '可能降低药物疗效',
        recommendation: '化疗期间不宜额外大量补充叶酸补充剂（除非医嘱）'
      },
      {
        food: '牛奶/乳制品',
        severity: 'mild',
        mechanism: '钙离子可能影响药物吸收',
        consequence: '口服甲氨蝶呤吸收轻度减少',
        recommendation: '口服用药时与乳制品间隔1小时'
      },
      {
        food: '酒精',
        severity: 'severe',
        mechanism: '协同增加肝毒性',
        consequence: '严重肝损伤风险增加',
        recommendation: '治疗期间严格禁酒'
      }
    ],
    nutritionTips: ['充足饮水（每日2000mL以上）促进药物排泄', '亮氨酸、蛋氨酸等氨基酸摄入正常即可', '治疗后可按医嘱补充亚叶酸钙'],
    monitoringItems: ['肝功能（ALT/AST）', '肾功能', '血常规', '甲氨蝶呤血药浓度']
  },
  {
    drugName: '他莫昔芬',
    drugNameEn: 'Tamoxifen',
    drugClass: '选择性雌激素受体调节剂',
    commonUse: ['乳腺癌激素受体阳性'],
    criticalFoodInteractions: [
      {
        food: '葡萄柚/西柚',
        severity: 'moderate',
        mechanism: '抑制CYP3A4酶，增加他莫昔芬血药浓度',
        consequence: '药物毒副反应风险增加',
        recommendation: '服药期间避免食用葡萄柚及其汁液'
      },
      {
        food: '大豆异黄酮（大豆、豆腐、豆浆）',
        severity: 'moderate',
        mechanism: '植物雌激素可能影响药效',
        consequence: '理论上可能影响抗雌激素效果',
        recommendation: '适量食用豆制品，避免额外补充大豆异黄酮补充剂'
      },
      {
        food: '含油脂较多的食物',
        severity: 'mild',
        mechanism: '脂肪可增加药物吸收',
        consequence: '血药浓度可能稍有波动',
        recommendation: '尽量在同样饮食条件下服药，保持一致性'
      }
    ],
    nutritionTips: ['多摄入十字花科蔬菜（西兰花、卷心菜）', '注意补钙和维生素D（他莫昔芬可能影响骨密度）', '保持健康体重'],
    monitoringItems: ['子宫内膜厚度', '血脂', '骨密度', '肝功能']
  },
  {
    drugName: '顺铂',
    drugNameEn: 'Cisplatin',
    drugClass: '铂类化疗药',
    commonUse: ['肺癌', '卵巢癌', '宫颈癌', '头颈部肿瘤', '膀胱癌'],
    criticalFoodInteractions: [
      {
        food: '酒精',
        severity: 'severe',
        mechanism: '增加肾毒性和神经毒性',
        consequence: '肾功能损害加重，恶心呕吐加重',
        recommendation: '化疗期间严格禁酒'
      },
      {
        food: '高盐食物',
        severity: 'moderate',
        mechanism: '影响水化策略效果',
        consequence: '不利于顺铂肾脏保护',
        recommendation: '顺铂治疗前后保持低盐饮食，大量饮水（水化）'
      }
    ],
    nutritionTips: [
      '治疗前后大量饮水（化疗当天2000-3000mL），保护肾脏',
      '镁的补充：顺铂常导致低镁血症，可食用坚果、全谷物',
      '姜茶有助于缓解恶心',
      '少量多餐，清淡易消化食物'
    ],
    monitoringItems: ['肾功能（肌酐、尿素氮）', '电解质（镁、钾、钠）', '听力', '血常规']
  },
  {
    drugName: '伊马替尼',
    drugNameEn: 'Imatinib',
    drugClass: '靶向治疗（酪氨酸激酶抑制剂）',
    commonUse: ['慢性粒细胞白血病', 'GIST（胃肠间质瘤）'],
    criticalFoodInteractions: [
      {
        food: '葡萄柚/西柚',
        severity: 'severe',
        mechanism: '强效抑制CYP3A4，显著升高伊马替尼血药浓度',
        consequence: '毒副反应明显增加（水肿、恶心、肝损伤）',
        recommendation: '治疗期间严格禁止食用葡萄柚及其汁液'
      },
      {
        food: '圣约翰草（贯叶连翘）',
        severity: 'severe',
        mechanism: '诱导CYP3A4，降低伊马替尼血药浓度',
        consequence: '药效显著降低',
        recommendation: '禁用含圣约翰草的保健品/草药'
      }
    ],
    nutritionTips: [
      '随餐或餐后服药，减少胃肠道刺激',
      '用大量水（240mL以上）送服',
      '保证足量钙和维生素D（伊马替尼可导致低磷血症）',
      '避免在高脂肪餐后服药（影响吸收）'
    ],
    monitoringItems: ['肝功能', '血常规', '血磷、血钙', '心电图（QT间期）']
  },
  {
    drugName: '卡培他滨',
    drugNameEn: 'Capecitabine',
    drugClass: '口服氟尿嘧啶类化疗药',
    commonUse: ['结直肠癌', '乳腺癌', '胃癌'],
    criticalFoodInteractions: [
      {
        food: '华法林（如同时服用）',
        severity: 'severe',
        mechanism: '抑制华法林代谢，增加抗凝作用',
        consequence: '出血风险增加',
        recommendation: '如同时使用华法林，密切监测INR'
      },
      {
        food: '富含维生素K的食物（深色蔬菜）',
        severity: 'mild',
        mechanism: '维生素K影响凝血功能',
        consequence: '若同时使用抗凝药，可能影响疗效',
        recommendation: '保持维生素K摄入稳定，避免大幅波动'
      }
    ],
    nutritionTips: [
      '餐后30分钟内服药，减少胃肠道副反应',
      '手足综合征（手足皮肤反应）期间保持皮肤湿润，避免热水烫脚',
      '腹泻时补充足量水分和电解质',
      '口腔溃疡时选择温凉软食'
    ],
    monitoringItems: ['血常规', '肝肾功能', '手足皮肤情况', '大便情况']
  },
  {
    drugName: '来曲唑/阿那曲唑',
    drugNameEn: 'Letrozole / Anastrozole',
    drugClass: '芳香化酶抑制剂',
    commonUse: ['绝经后乳腺癌激素受体阳性'],
    criticalFoodInteractions: [
      {
        food: '大豆异黄酮补充剂',
        severity: 'moderate',
        mechanism: '植物雌激素可能拮抗药物抗雌激素效果',
        consequence: '可能影响疗效',
        recommendation: '避免服用大豆异黄酮、红三叶草等植物雌激素补充剂'
      }
    ],
    nutritionTips: [
      '重视钙补充：每日1000-1500mg（治疗可导致骨密度下降）',
      '维生素D补充：每日800-2000IU',
      '负重运动有助于保护骨骼',
      '控制体重，减少脂肪组织中雌激素转化'
    ],
    monitoringItems: ['骨密度（每1-2年）', '血脂', '关节症状', '肝功能']
  },
  {
    drugName: '华法林（化疗相关血栓预防）',
    drugNameEn: 'Warfarin',
    drugClass: '抗凝药',
    commonUse: ['肿瘤相关静脉血栓栓塞预防/治疗'],
    criticalFoodInteractions: [
      {
        food: '菠菜、西兰花、卷心菜等绿叶蔬菜（高维生素K）',
        severity: 'severe',
        mechanism: '维生素K拮抗华法林抗凝作用',
        consequence: 'INR降低，血栓风险增加',
        recommendation: '保持绿叶蔬菜摄入量稳定，不要突然大量增减'
      },
      {
        food: '大蒜、姜黄（大量）',
        severity: 'moderate',
        mechanism: '抑制血小板聚集，增强抗凝效果',
        consequence: 'INR升高，出血风险增加',
        recommendation: '避免大量服用大蒜素补充剂，食用量的大蒜调味无需限制'
      },
      {
        food: '葡萄柚',
        severity: 'moderate',
        mechanism: '抑制华法林代谢',
        consequence: 'INR波动',
        recommendation: '治疗期间避免食用葡萄柚'
      }
    ],
    nutritionTips: [
      '绿叶蔬菜可以吃，但保持摄入量稳定',
      '避免大量服用鱼油补充剂',
      '酒精会增加出血风险，限制饮酒'
    ],
    monitoringItems: ['INR（每周至稳定，后每月）', '出血症状', '血常规']
  },
];
