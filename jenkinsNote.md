

github/chuntaojun/Software-Requirements-Analysis-Front-end

#定期检查源码的变更，设置比如每小时检查，有更新就checkout下来，并执行构建
Poll SCM 
H/5****
每5分钟执行一次 job: H/5 * * * *
每2小时执行一次 job: H H/2 * * *

bash shell

sudo docker build -t web /var/lib/jenkins/workspace/Software-Requirements-Analysis-Front-end
sudo docker stop system-require-web
sudo docker rm system-requirement-web
sudo docker run -d --name system-require-web -p 8077:8077 web

#编写dockerfile告诉docker如何构建镜像
Dockerfile
FROM ubuntu
RUN apt-get update \
    && apt-get install -y nodejs npm
COPY . /root/web
WORKDIR /root/web
EXPOSE 8077
RUN npm -g install http-server
CMD ["http-server", "-p", "8077"]

