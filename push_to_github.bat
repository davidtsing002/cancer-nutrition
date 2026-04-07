@echo off
echo 正在清理不需要的大文件夹...
if exist node_modules rmdir /s /q node_modules
if exist dist rmdir /s /q dist

echo 初始化 git...
git init

echo 添加文件...
git add .

echo 提交...
git commit -m "feat: 肿瘤营养管家 - 完整版"

echo 重命名分支...
git branch -M main

echo 关联远程仓库...
git remote add origin https://github.com/davidtsing002/cancer-nutrition.git

echo 推送到 GitHub...
git push -u origin main

echo 完成！如果看到推送成功，就可以去 GitHub 页面查看了。
pause