# Nginx Alpine 이미지 사용
FROM nginx:alpine

# 사용자 정의 nginx 설정 파일 복사
# nginx.conf -> /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# HTTP 포트 개방
EXPOSE 80

# Nginx를 포그라운드로 실행
# 컨테이너는 메인 프로세스가 종료되면 함께 종료되므로
# daemon off 옵션을 사용해야 함
CMD ["nginx", "-g", "daemon off;"]