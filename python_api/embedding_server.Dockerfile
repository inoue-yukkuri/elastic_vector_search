FROM python:3.10-slim

WORKDIR /app

# 必要なパッケージをインストール
RUN pip install --no-cache-dir fastapi uvicorn sentence-transformers

# サーバースクリプトをコピー
COPY embedding_server.py .

# ポート5000で起動
EXPOSE 5000

# モデル名は環境変数で指定可能
ENV MODEL_NAME=paraphrase-multilingual-MiniLM-L12-v2

CMD ["uvicorn", "embedding_server:app", "--host", "0.0.0.0", "--port", "5000"]
