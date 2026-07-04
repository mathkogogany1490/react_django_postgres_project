# Node.js 22 Alpine 이미지 사용
FROM node:22-alpine

# 컨테이너 작업 디렉토리 생성
WORKDIR /app

# package.json, package-lock.json 복사
# 의존성 변경이 없으면 Docker 캐시를 활용할 수 있음
COPY package*.json ./

# 의존성 설치
# CI/CD 환경에서는 npm install 보다 npm ci 권장
RUN npm ci

# 프로젝트 소스 전체 복사
COPY . .

# React(Vite) 프로젝트 빌드
RUN npm run build

# Vite 개발 서버 포트
EXPOSE 5173

# Vite 서버 실행
# --host 옵션을 주어 외부(컨테이너 밖)에서도 접속 가능
CMD ["npm", "run", "dev", "--", "--host"]