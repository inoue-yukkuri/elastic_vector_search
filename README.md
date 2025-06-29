# 部活動検索システム

Spring Boot、Elasticsearch、Reactを使用した日本語ベクトル検索対応の部活動検索システムです。

## 構成

- **Backend**: Spring Boot 3.2.0 + Elasticsearch 8.11.0 + Lombok
- **Frontend**: React 18 + TypeScript + Bootstrap
- **Database**: Elasticsearch
- **Container**: Docker Compose
- **日本語検索**: Kuromoji（形態素解析）

## 機能

- 日本語形態素解析によるベクトル検索
- CSVファイルからの部活動データインポート
- カテゴリ別、学校別、学年別検索
- タグ検索
- 部員数範囲検索
- 活動状況フィルタリング
- レスポンシブなUI（Bootstrap）

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
2. 「データアップロード」メニューをクリック
3. `sample_clubs.csv` を選択してアップロード

### 2. 検索機能

1. 「検索」メニューをクリック
2. 検索ボックスにキーワードを入力
3. 日本語のベクトル検索が実行されます

### 3. 検索例

- 「サッカー」→ サッカー部、運動系の部活動
- 「音楽」→ 吹奏楽部、音楽系の部活動
- 「科学」→ 科学部、研究系の部活動
- 「運動」→ スポーツ系の部活動全般

## API エンドポイント

### 部活動関連

- `GET /api/clubs` - 全部活動取得
- `GET /api/clubs/{id}` - 部活動詳細取得
- `POST /api/clubs` - 部活動作成
- `PUT /api/clubs/{id}` - 部活動更新
- `DELETE /api/clubs/{id}` - 部活動削除

### 検索関連

- `GET /api/clubs/search?query={query}` - 全文検索（日本語対応）
- `GET /api/clubs/search/category?category={category}` - カテゴリ検索
- `GET /api/clubs/search/school?school={school}` - 学校検索
- `GET /api/clubs/search/grade?grade={grade}` - 学年検索
- `GET /api/clubs/search/tag?tag={tag}` - タグ検索
- `GET /api/clubs/search/active?isActive={isActive}` - 活動状況検索
- `GET /api/clubs/search/members?minCount={min}&maxCount={max}` - 部員数範囲検索

### インポート関連

- `POST /api/clubs/import` - CSVファイルインポート
- `GET /api/clubs/count` - 部活動数取得

## CSVファイル形式

```csv
name,description,category,school,grade,activities,tags,memberCount,meetingTime,meetingPlace,achievements,isActive
部活動名,説明,カテゴリ,学校名,学年,活動内容,タグ,部員数,活動時間,活動場所,実績,活動状況
```

## 技術スタック

### Backend
- Spring Boot 3.2.0
- Spring Data Elasticsearch
- Lombok
- Kuromoji（日本語形態素解析）
- OpenCSV
- Maven

### Frontend
- React 18
- TypeScript
- Bootstrap 5
- React Router DOM
- Axios

### Infrastructure
- Docker
- Docker Compose
- Elasticsearch 8.11.0

## 日本語検索の特徴

- **Kuromoji形態素解析**: 日本語テキストを適切に分割
- **ベクトル検索**: 意味的な類似性を考慮した検索
- **キーワード抽出**: 名詞、動詞、形容詞を自動抽出
- **検索クエリ最適化**: 入力されたクエリを最適化して検索精度を向上

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

## ライセンス

MIT License
