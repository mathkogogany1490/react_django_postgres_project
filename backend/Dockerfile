
# Python 3.12
FROM python:3.12-slim

# Python 설정
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# 작업 디렉토리
WORKDIR /app

# PostgreSQL 라이브러리 설치
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# requirements 먼저 복사
COPY requirements.txt .

# Python 패키지 설치
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# 프로젝트 복사
COPY . .

# static 디렉터리 생성
RUN mkdir -p staticfiles

# 포트
EXPOSE 8000

# Django 실행
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

