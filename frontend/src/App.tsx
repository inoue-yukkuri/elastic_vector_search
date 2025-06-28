import React, { useState, useEffect } from 'react';
import { Product } from './types/Product';
import { productService } from './services/api';
import ProductCard from './components/ProductCard';
import './App.css';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [productCount, setProductCount] = useState<number>(0);

  useEffect(() => {
    loadProducts();
    loadProductCount();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getAllProducts();
      setProducts(data);
      setError('');
    } catch (err) {
      setError('商品の読み込みに失敗しました');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadProductCount = async () => {
    try {
      const count = await productService.getProductCount();
      setProductCount(count);
    } catch (err) {
      console.error('Error loading product count:', err);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      await loadProducts();
      return;
    }

    try {
      setLoading(true);
      const data = await productService.searchProducts(searchQuery);
      setProducts(data);
      setError('');
    } catch (err) {
      setError('検索に失敗しました');
      console.error('Error searching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      setError('ファイルを選択してください');
      return;
    }

    try {
      setLoading(true);
      const message = await productService.importFromCsv(selectedFile);
      setSuccess(message);
      setSelectedFile(null);
      await loadProducts();
      await loadProductCount();
      setError('');
    } catch (err) {
      setError('ファイルのアップロードに失敗しました');
      console.error('Error uploading file:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Elasticsearch 商品検索デモ</h1>
        <p>商品数: {productCount}件</p>
      </div>

      <div className="container">
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}

        <div className="upload-section">
          <h2>CSVファイルをアップロード</h2>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="file-input"
          />
          <button
            onClick={handleFileUpload}
            disabled={!selectedFile || loading}
            className="upload-button"
          >
            {loading ? 'アップロード中...' : 'アップロード'}
          </button>
        </div>

        <div className="search-section">
          <h2>商品検索</h2>
          <input
            type="text"
            placeholder="商品名、説明、カテゴリで検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="search-input"
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="search-button"
          >
            {loading ? '検索中...' : '検索'}
          </button>
          <button
            onClick={loadProducts}
            disabled={loading}
            className="search-button"
          >
            全件表示
          </button>
        </div>

        <div className="results-section">
          <h2>検索結果 ({products.length}件)</h2>
          {loading ? (
            <div className="loading">読み込み中...</div>
          ) : products.length === 0 ? (
            <div className="loading">商品が見つかりません</div>
          ) : (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
