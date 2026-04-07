# 🏥 肿瘤营养管家

**专为肿瘤患者及其家属、医护人员打造的营养管理与教育平台**

## ✨ 主要功能

| 模块 | 描述 |
|------|------|
| 🎯 **营养评估** | 16种癌症 × 6个治疗阶段 × 14种症状，自动生成个性化方案 |
| 📊 **每日饮食记录** | 热量/蛋白质/水分追踪 + 7天趋势图 + 快捷食物 + CSV导出 |
| 💊 **药食互作查询** | 7种化疗/靶向药详细数据，严重度分级，中文说明 |
| 📚 **专家共识2024** | 完整20条推荐意见 + 智能制剂选择器 + 不推荐项目清单 |
| 🌿 **知识库** | 西医营养 + 中医辨证施食（6证型）+ 五行食疗 + 食疗方集 |
| 👥 **三方视图** | 患者 / 家属 / 医护 切换，医护版额外显示 NRS2002 评分工具 |

## 🚀 快速体验

部署链接：[https://davidtsing002.github.io/cancer-nutrition/](https://davidtsing002.github.io/cancer-nutrition/)

本地运行：
```bash
# 安装依赖
npm install --legacy-peer-deps

# 启动开发服务器
npm run dev
```

## 📁 项目结构

```
src/
├── components/     # 通用组件
├── pages/         # 页面组件
├── data/          # 静态数据
├── types/         # TypeScript 类型定义
└── App.tsx        # 应用入口
```

## 🔧 技术栈

- **框架**：React 19 + TypeScript
- **构建工具**：Vite
- **样式**：Tailwind CSS + @tailwindcss/vite
- **图标**：Lucide React
- **图表**：Recharts
- **部署**：GitHub Pages + GitHub Actions

## 📦 核心依赖

详细见 `package.json`，主要包含：

- `@tailwindcss/vite`: Tailwind CSS 的 Vite 插件
- `lucide-react`: 高质量 SVG 图标
- `recharts`: 交互式图表库

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
