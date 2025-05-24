FROM node:20-alpine

WORKDIR /app

# 复制依赖文件并安装
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# 复制完整源码
COPY . .

# 暴露端口
EXPOSE 3000

# 启动 Next.js 开发服务器（注意这不是生产推荐做法）
CMD ["npm", "run", "dev"]
