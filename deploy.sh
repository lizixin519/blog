#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

git add .

git commit -m 'deploy'

git push origin master

# 生成静态文件
npm run build

# 进入生成的文件夹
cd src/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add .
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
git push -f git@github.com:lizixin519/lizixin519.github.io.git master

cd -