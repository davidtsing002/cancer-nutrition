// 中医临床营养学数据库
export interface TCMFood {
  name: string;
  nature: '寒' | '凉' | '平' | '温' | '热';
  flavor: string[];
  meridians: string[];
  functions: string[];
  indications: string[];
  contraindications: string[];
  category: string;
}

export interface TCMPattern {
  id: string;
  name: string;
  symptoms: string[];
  tongueSign: string;
  pulseSign: string;
  dietPrinciple: string;
  recommendedFoods: string[];
  avoidFoods: string[];
  representativeRecipe: { name: string; ingredients: string; method: string; benefits: string };
}

// 中医体质与辨证施食
export const TCM_PATTERNS: TCMPattern[] = [
  {
    id: 'qi_deficiency',
    name: '气虚证',
    symptoms: ['神疲乏力', '少气懒言', '动则气喘', '食欲不振', '大便溏软'],
    tongueSign: '舌淡胖，苔薄白',
    pulseSign: '脉虚弱',
    dietPrinciple: '益气健脾，补中升阳',
    recommendedFoods: ['山药', '茯苓', '大枣', '黄芪（药食同源）', '莲子', '小米', '南瓜', '党参（药食同源）'],
    avoidFoods: ['生冷食物', '过于油腻', '萝卜（行气，不宜多）'],
    representativeRecipe: {
      name: '黄芪山药粥',
      ingredients: '黄芪30g、山药50g、大枣6枚、粳米100g',
      method: '黄芪先煎取汁，加山药、大枣、粳米共煮成粥',
      benefits: '补气健脾，增强体力，改善化疗后疲劳'
    }
  },
  {
    id: 'blood_deficiency',
    name: '血虚证',
    symptoms: ['面色苍白或萎黄', '头晕眼花', '心悸失眠', '手足麻木', '爪甲淡白'],
    tongueSign: '舌淡，苔薄',
    pulseSign: '脉细无力',
    dietPrinciple: '补血养血，滋阴养心',
    recommendedFoods: ['阿胶（药食同源）', '桑葚', '黑芝麻', '红枣', '龙眼肉', '花生', '猪肝', '菠菜', '黑木耳'],
    avoidFoods: ['辛辣刺激', '烟酒', '生冷'],
    representativeRecipe: {
      name: '当归补血汤（食疗版）',
      ingredients: '黑木耳20g、红枣10枚、桂圆8g、冰糖适量',
      method: '黑木耳泡发，与红枣、桂圆加水炖煮30分钟，加冰糖调味',
      benefits: '补血养心，改善化疗后贫血和失眠'
    }
  },
  {
    id: 'yin_deficiency',
    name: '阴虚证',
    symptoms: ['口干咽燥', '五心烦热', '盗汗', '大便干结', '形体消瘦'],
    tongueSign: '舌红少苔或花剥苔',
    pulseSign: '脉细数',
    dietPrinciple: '滋阴润燥，清热生津',
    recommendedFoods: ['百合', '银耳', '枸杞', '麦冬', '梨', '藕', '荸荠', '甲鱼', '鸭肉', '牛奶'],
    avoidFoods: ['辛辣煎炸', '羊肉', '韭菜', '烟酒', '咖啡'],
    representativeRecipe: {
      name: '银耳百合羹',
      ingredients: '银耳20g、百合15g、枸杞10g、冰糖适量',
      method: '银耳泡发炖烂，加百合、枸杞同煮，加冰糖调味',
      benefits: '滋阴润肺，改善放疗后口干和黏膜损伤'
    }
  },
  {
    id: 'phlegm_dampness',
    name: '痰湿证',
    symptoms: ['体型肥胖', '胸闷痰多', '倦怠乏力', '腹胀', '大便黏腻'],
    tongueSign: '舌淡胖，苔白腻',
    pulseSign: '脉滑',
    dietPrinciple: '燥湿化痰，健脾利湿',
    recommendedFoods: ['薏苡仁', '赤小豆', '冬瓜', '荷叶', '陈皮', '萝卜', '白扁豆', '苦瓜'],
    avoidFoods: ['油腻食物', '甜食', '生冷', '腌制品'],
    representativeRecipe: {
      name: '薏苡仁赤豆粥',
      ingredients: '薏苡仁30g、赤小豆30g、粳米50g',
      method: '薏苡仁、赤小豆提前浸泡4小时，与粳米同煮成粥',
      benefits: '健脾利湿，改善化疗后水肿和消化不良'
    }
  },
  {
    id: 'qi_stagnation_blood_stasis',
    name: '气滞血瘀证',
    symptoms: ['胸胁刺痛', '情志抑郁', '肿块固定', '皮肤甲错', '唇舌紫暗'],
    tongueSign: '舌紫暗或有瘀斑，苔薄',
    pulseSign: '脉弦涩',
    dietPrinciple: '行气活血，化瘀散结',
    recommendedFoods: ['山楂', '玫瑰花', '三七（药食同源）', '黑木耳', '洋葱', '益母草（药食同源）', '金橘'],
    avoidFoods: ['过于收涩食物', '冷饮', '油腻食物'],
    representativeRecipe: {
      name: '山楂玫瑰饮',
      ingredients: '山楂15g、玫瑰花5g、蜂蜜适量',
      method: '山楂、玫瑰花用沸水冲泡，加蜂蜜调味，温服',
      benefits: '行气活血，改善情志不畅和疼痛'
    }
  },
  {
    id: 'heat_toxin',
    name: '热毒证',
    symptoms: ['发热', '口苦口臭', '大便秘结', '小便黄赤', '舌溃疡'],
    tongueSign: '舌红，苔黄腻',
    pulseSign: '脉滑数',
    dietPrinciple: '清热解毒，凉血消肿',
    recommendedFoods: ['绿豆', '苦瓜', '薄荷', '金银花（泡茶）', '冬瓜', '莲藕', '荸荠', '西瓜'],
    avoidFoods: ['辛辣食物', '羊肉', '狗肉', '烟酒', '油炸食品'],
    representativeRecipe: {
      name: '绿豆薏仁汤',
      ingredients: '绿豆50g、薏苡仁30g、冰糖适量',
      method: '绿豆、薏苡仁加水同煮至熟烂，加冰糖调味，温服',
      benefits: '清热解毒，利湿消肿，缓解化疗后炎症反应'
    }
  },
];

// 五行食疗对应
export const FIVE_ELEMENT_FOODS = {
  wood_liver: {
    element: '木',
    organ: '肝胆',
    flavor: '酸',
    color: '青/绿',
    season: '春',
    beneficialFoods: ['菠菜', '芹菜', '青椒', '西兰花', '乌梅', '醋'],
    tumorTypes: ['肝癌', '胆囊癌', '淋巴瘤（部分）'],
    tcmPrinciple: '酸入肝，养肝柔肝，疏肝解郁'
  },
  fire_heart: {
    element: '火',
    organ: '心/小肠',
    flavor: '苦',
    color: '红',
    season: '夏',
    beneficialFoods: ['苦瓜', '莲子心', '红小豆', '番茄', '山楂'],
    tumorTypes: ['乳腺癌', '肺癌（部分）'],
    tcmPrinciple: '苦入心，清心泻火，养血安神'
  },
  earth_spleen: {
    element: '土',
    organ: '脾/胃',
    flavor: '甘',
    color: '黄',
    season: '长夏',
    beneficialFoods: ['小米', '南瓜', '山药', '玉米', '大枣', '蜂蜜'],
    tumorTypes: ['胃癌', '结直肠癌', '胰腺癌'],
    tcmPrinciple: '甘入脾，健脾和胃，补中益气'
  },
  metal_lung: {
    element: '金',
    organ: '肺/大肠',
    flavor: '辛',
    color: '白',
    season: '秋',
    beneficialFoods: ['白萝卜', '百合', '银耳', '梨', '莲藕', '白芝麻'],
    tumorTypes: ['肺癌', '大肠癌（部分）'],
    tcmPrinciple: '辛入肺，宣肺化痰，润肺止咳'
  },
  water_kidney: {
    element: '水',
    organ: '肾/膀胱',
    flavor: '咸',
    color: '黑',
    season: '冬',
    beneficialFoods: ['黑豆', '黑米', '黑木耳', '黑芝麻', '核桃', '板栗'],
    tumorTypes: ['肾癌', '膀胱癌', '前列腺癌', '白血病'],
    tcmPrinciple: '咸入肾，补肾固本，益精填髓'
  }
};

// 中医食疗食谱（按癌症类型）
export const TCM_RECIPES: Record<string, Array<{name: string; ingredients: string[]; method: string; tcmEffect: string; modernBenefits: string; suitableFor: string}>> = {
  gastric: [
    {
      name: '山药薏仁粥',
      ingredients: ['山药50g', '薏苡仁30g', '大枣6枚', '粳米80g'],
      method: '薏苡仁提前浸泡4小时，与山药丁、大枣、粳米同煮成软烂粥，小火慢炖40分钟',
      tcmEffect: '健脾益胃，利湿消肿',
      modernBenefits: '易消化高碳水化合物，薏苡仁富含薏苡仁素（抗肿瘤活性），适合胃切除术后',
      suitableFor: '胃癌术后、化疗期间、食欲不振'
    },
    {
      name: '莲子芡实瘦肉汤',
      ingredients: ['莲子30g', '芡实30g', '猪瘦肉100g', '生姜3片'],
      method: '莲子、芡实浸泡2小时，猪肉切块焯水，加姜片共炖1.5小时',
      tcmEffect: '补脾止泻，益气固精',
      modernBenefits: '优质蛋白补充，改善腹泻症状，增强体力',
      suitableFor: '胃癌伴腹泻、术后体虚'
    }
  ],
  lung: [
    {
      name: '川贝雪梨炖冰糖',
      ingredients: ['雪梨1个', '川贝母5g', '冰糖适量'],
      method: '梨去核挖空，放入川贝母和冰糖，隔水炖1小时',
      tcmEffect: '清肺润燥，止咳化痰',
      modernBenefits: '富含维生素C，川贝有镇咳作用，缓解肺癌咳嗽症状',
      suitableFor: '肺癌伴咳嗽、放疗后肺燥'
    },
    {
      name: '银耳百合莲子羹',
      ingredients: ['银耳15g', '百合20g', '莲子20g', '枸杞10g', '冰糖适量'],
      method: '银耳泡发撕小块，与莲子共煮40分钟至软烂，加入百合、枸杞再煮15分钟',
      tcmEffect: '养阴润肺，宁心安神',
      modernBenefits: '多糖类成分有免疫调节作用，改善放疗后肺部症状',
      suitableFor: '肺癌放疗后、口干咽燥'
    }
  ],
  colorectal: [
    {
      name: '芦根麦冬粥',
      ingredients: ['芦根30g', '麦冬15g', '粳米100g', '冰糖适量'],
      method: '芦根、麦冬先煎20分钟取汁，加粳米煮粥，加冰糖调味',
      tcmEffect: '清热生津，润肠通便',
      modernBenefits: '改善化疗后便秘，补充水分，缓解口干',
      suitableFor: '结直肠癌化疗期间便秘'
    }
  ],
  liver: [
    {
      name: '茯苓白术茶',
      ingredients: ['茯苓10g', '白术10g', '薏苡仁20g'],
      method: '三味加水500mL，煎煮20分钟，代茶饮，每日1剂',
      tcmEffect: '健脾利湿，渗湿消肿',
      modernBenefits: '改善肝癌伴腹水，减轻水肿，增进食欲',
      suitableFor: '肝癌伴腹水、脾虚湿盛'
    }
  ],
};
