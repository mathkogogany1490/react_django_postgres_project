pip install -r requirements.txt


프레임워크 구성 명령어: django-admin startproject config .
application 구성 명령어: python manage.py startapp app


서버 실행문: python manage.py runserver


orm 방식 명령어
python manage.py makemigrations : schema 구성
python manage.py migrate : 테이블 구현


관리자 등록
python manage.py createsuperuser