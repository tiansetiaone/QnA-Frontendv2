# Gunakan image Node.js yang stabil
FROM node:18-alpine

# Set working directory dalam container
WORKDIR /app

# Copy package.json dan package-lock.json untuk menginstal dependencies terlebih dahulu
COPY package.json package-lock.json ./

# Install dependencies menggunakan --legacy-peer-deps
RUN npm install --legacy-peer-deps

# Copy seluruh proyek ke dalam container
COPY . .

# Build proyek
RUN npm run build

# Install serve untuk menjalankan aplikasi
RUN npm install -g serve

# Jalankan aplikasi
CMD ["serve", "-s", "dist", "-l", "3000"]
