@echo off
echo ============================================
echo   愈健 - 院后智能营养方案系统 部署脚本
echo ============================================
echo.

echo 正在清理不需要的大文件夹...
if exist node_modules rmdir /s /q node_modules
if exist *.log del /q *.log

echo.
echo 初始化 git...
git init

echo.
echo 添加文件...
git add .

echo.
echo 提交...
git commit -m "feat: 愈健 - AI院后智能营养方案系统 v2.0

主要功能:
- 首页展示（Hero、功能、流程、技术架构、案例）
- 6步患者评估表单
- AI营养方案生成展示
- 药物-营养相互作用检测
- 智能助手ChatBot

技术栈:
- React + TypeScript
- Tailwind CSS
- Vite构建"

echo.
echo 重命名分支...
git branch -M main

echo.
echo 关联远程仓库...
git remote add origin https://github.com/davidtsing002/cancer-nutrition.git

echo.
echo 推送到 GitHub...
git push -u origin main --force

echo.
echo ============================================
echo   部署完成！
echo   访问 https://davidtsing002.github.io/cancer-nutrition/
echo ============================================
pause
