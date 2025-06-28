FROM openjdk:17-jdk-slim

WORKDIR /app

# Mavenの依存関係をコピー
COPY pom.xml .
COPY src ./src

# Mavenをインストールしてビルド
RUN apt-get update && apt-get install -y maven
RUN mvn clean package -DskipTests

# JARファイルを実行
CMD ["java", "-jar", "target/elasticsearch-demo-1.0.0.jar"]
