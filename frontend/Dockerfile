# Base image là node:18
FROM node:20

# Thư mục làm việc bên trong container
WORKDIR /app

# Copy package.json và lockfile trước để cài dependency (tối ưu cache)
COPY package*.json ./

# Cài đặt các package
RUN npm install

RUN npm uninstall esbuild && npm install esbuild

# Copy toàn bộ source code vào container
COPY . .

# Build frontend
RUN npm run build

# Expose cổng mặc định Vite preview
EXPOSE 5173

# Lệnh chạy preview
CMD ["npm", "run", "preview", "--", "--host"]
