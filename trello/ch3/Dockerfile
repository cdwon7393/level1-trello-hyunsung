FROM node:16

WORKDIR /web
# web에서 명령어를 설치할 것이다.

COPY . .
# 현재 디렉토리 내 파일 모두를 도커로 카피 (첫번째 .은 현재 디렉토리 위치, 두번째 .은 도커내 위치)

RUN npm install

RUN npm run build

CMD ["npm", "start"]
# cmd : 처음 시작하는 명령어