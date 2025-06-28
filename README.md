# Elasticsearch 全文検索デモ

Spring Boot、Elasticsearch、Reactを使用した全文検索デモアプリケーションです。

## 構成

- **Backend**: Spring Boot 3.2.0 + Elasticsearch 8.11.0
- **Frontend**: React 18 + TypeScript
- **Database**: Elasticsearch
- **Container**: Docker Compose

## 機能

- CSVファイルからの商品データインポート
- 全文検索（商品名、説明、カテゴリ）
- リアルタイム検索結果表示
- レスポンシブなUI

## セットアップ

### 1. リポジトリのクローン

```bash
git clone <repository-url>
cd elastic_vector_search
```

### 2. Docker Composeで起動

```bash
docker-compose up --build
```

### 3. アクセス

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080
- **Elasticsearch**: http://localhost:9200

## 使用方法

### 1. データのインポート

1. ブラウザで http://localhost:3000 にアクセス
2. 「CSVファイルをアップロード」セクションで `sample_products.csv` を選択
3. 「アップロード」ボタンをクリック

### 2. 検索

1. 検索ボックスにキーワードを入力
2. 「検索」ボタンをクリックまたはEnterキーを押下
3. 商品名、説明、カテゴリで全文検索が実行されます

### 3. 全件表示

「全件表示」ボタンをクリックすると、すべての商品が表示されます。

## API エンドポイント

### 商品関連

- `GET /api/products` - 全商品取得
- `GET /api/products/{id}` - 商品詳細取得
- `POST /api/products` - 商品作成
- `PUT /api/products/{id}` - 商品更新
- `DELETE /api/products/{id}` - 商品削除

### 検索関連

- `GET /api/products/search?query={query}` - 全文検索
- `GET /api/products/search/name?name={name}` - 名前検索
- `GET /api/products/search/description?description={description}` - 説明検索
- `GET /api/products/search/category?category={category}` - カテゴリ検索
- `GET /api/products/search/price?minPrice={min}&maxPrice={max}` - 価格範囲検索

### インポート関連

- `POST /api/products/import` - CSVファイルインポート
- `GET /api/products/count` - 商品数取得

## CSVファイル形式

```csv
name,description,category,price,stock
商品名,商品説明,カテゴリ,価格,在庫数
```

## 開発

### バックエンド開発

```bash
cd backend
./mvnw spring-boot:run
```

### フロントエンド開発

```bash
cd frontend
npm install
npm start
```

## 技術スタック

### Backend
- Spring Boot 3.2.0
- Spring Data Elasticsearch
- OpenCSV
- Maven

### Frontend
- React 18
- TypeScript
- Axios
- CSS3

### Infrastructure
- Docker
- Docker Compose
- Elasticsearch 8.11.0

## ライセンス

MIT License
