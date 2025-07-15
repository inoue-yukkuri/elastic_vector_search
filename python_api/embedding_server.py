import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer
from typing import List

# モデル名は環境変数で指定、なければデフォルト
MODEL_NAME = os.getenv("MODEL_NAME", "paraphrase-multilingual-MiniLM-L12-v2")

try:
    model = SentenceTransformer(MODEL_NAME)
except Exception as e:
    raise RuntimeError(f"モデルのロードに失敗しました: {MODEL_NAME}\n{e}")

app = FastAPI(title="Embedding API", description="日本語対応 Sentence Transformers API", version="1.0")

class TextRequest(BaseModel):
    texts: List[str]

class EmbeddingResponse(BaseModel):
    embeddings: List[List[float]]

@app.post("/embed", response_model=EmbeddingResponse)
def embed(request: TextRequest):
    try:
        vectors = model.encode(request.texts, show_progress_bar=False)
        return {"embeddings": vectors.tolist()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"埋め込み生成エラー: {e}")

@app.get("/")
def root():
    return {"message": "Embedding API is running", "model": MODEL_NAME}
