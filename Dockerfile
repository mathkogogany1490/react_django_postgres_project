# Jenkins LTS 이미지 사용
FROM jenkins/jenkins:lts

# 패키지 설치를 위해 root 권한 사용
USER root

# 기본 패키지 설치
RUN apt-get update && \
    apt-get install -y \
    ca-certificates \
    curl \
    gnupg \
    lsb-release \
    git && \
    rm -rf /var/lib/apt/lists/*

# Node.js 22 설치
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && \
    apt-get install -y nodejs

# Docker 저장소용 Keyring 디렉터리 생성
RUN install -m 0755 -d /etc/apt/keyrings

# Docker GPG Key 등록
RUN curl -fsSL https://download.docker.com/linux/debian/gpg | \
    gpg --dearmor -o /etc/apt/keyrings/docker.gpg && \
    chmod a+r /etc/apt/keyrings/docker.gpg

# Docker 공식 Repository 등록
RUN echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
    https://download.docker.com/linux/debian \
    $(. /etc/os-release && echo "$VERSION_CODENAME") stable" \
    > /etc/apt/sources.list.d/docker.list

# Docker CLI, Buildx, Compose 설치
RUN apt-get update && \
    apt-get install -y \
    docker-ce-cli \
    docker-buildx-plugin \
    docker-compose-plugin && \
    rm -rf /var/lib/apt/lists/*

# docker 그룹이 없으면 생성
RUN groupadd -f docker

# jenkins 사용자를 docker 그룹에 추가
RUN usermod -aG docker jenkins

# 다시 jenkins 사용자로 전환
USER jenkins