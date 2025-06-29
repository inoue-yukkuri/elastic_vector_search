FROM openjdk:17-jdk-slim

WORKDIR /app

# Mavenをインストール
RUN apt-get update && apt-get install -y maven

# pom.xmlをコピー
COPY pom.xml .

# 依存関係をダウンロード（リトライを追加）
RUN mvn dependency:go-offline -B -U

# ソースコードをコピー
COPY src ./src

# ビルド（テストをスキップ、詳細ログを出力）
RUN mvn clean compile -B -X && mvn package -DskipTests -B

# JARファイルを実行
CMD ["java", "-jar", "target/club-search-1.0.0.jar"]
