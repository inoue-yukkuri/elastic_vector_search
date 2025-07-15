import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [activeTab, setActiveTab] = useState('search'); // 'upload' or 'list' or 'search'

  useEffect(() => {
    fetchClubs();
  }, []);

  const fetchClubs = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/clubs');
      if (response.ok) {
        const data = await response.json();
        setClubs(data);
      }
    } catch (error) {
      console.error('Error fetching clubs:', error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadStatus('');
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus('ファイルを選択してください');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploadStatus('アップロード中...');
      const response = await fetch('http://localhost:8080/api/clubs/import', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.text();
        setUploadStatus(result);
        setFile(null);
        // ファイル入力フィールドをリセット
        document.getElementById('file-input').value = '';
        // データ一覧を更新
        fetchClubs();
      } else {
        const errorText = await response.text();
        setUploadStatus('アップロード失敗: ' + errorText);
      }
    } catch (error) {
      setUploadStatus('アップロードエラー: ' + error.message);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/clubs/search?query=${encodeURIComponent(searchQuery)}`);
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
      }
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // 全データ削除
  const handleDeleteAll = async () => {
    if (!window.confirm('本当に全ての部活動データを削除しますか？')) return;
    try {
      await fetch('http://localhost:8080/api/clubs/all', { method: 'DELETE' });
      setClubs([]);
    } catch (error) {
      alert('全件削除に失敗しました');
      console.error('Error deleting all clubs:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>部活動検索システム</h1>
      </header>

      <div className="nav-tabs">
        <button
          className={`nav-tab ${activeTab === 'upload' ? 'active' : ''}`}
          onClick={() => setActiveTab('upload')}
        >
          CSVアップロード
        </button>
        <button
          className={`nav-tab ${activeTab === 'list' ? 'active' : ''}`}
          onClick={() => setActiveTab('list')}
        >
          データ一覧
        </button>
        <button
          className={`nav-tab ${activeTab === 'search' ? 'active' : ''}`}
          onClick={() => setActiveTab('search')}
        >
          検索
        </button>
      </div>

      <main className="App-main">
        {activeTab === 'upload' && (
          <div className="upload-section">
            <h2>CSVファイルアップロード</h2>
            <div className="upload-form">
              <input
                id="file-input"
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="file-input"
              />
              <button onClick={handleUpload} className="upload-button">
                アップロード
              </button>
            </div>
            {uploadStatus && (
              <div className={`status ${uploadStatus.includes('失敗') || uploadStatus.includes('エラー') ? 'error' : 'success'}`}>
                {uploadStatus}
              </div>
            )}
          </div>
        )}

        {activeTab === 'list' && (
          <div className="list-section">
            <h2>データ一覧 ({clubs.length}件)</h2>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              <button onClick={fetchClubs} className="refresh-button">
                更新
              </button>
              <button onClick={handleDeleteAll} className="btn btn-danger">
                全データ削除
              </button>
            </div>
            <div className="clubs-grid">
              {clubs.map((club) => (
                <div key={club.id} className="club-card">
                  <h3>{club.name}</h3>
                  <p><strong>説明:</strong> {club.description}</p>
                  <p><strong>カテゴリ:</strong> {club.category}</p>
                  <p><strong>学校:</strong> {club.school}</p>
                  <p><strong>学年:</strong> {club.grade}</p>
                  <p><strong>活動内容:</strong> {club.activities}</p>
                  <p><strong>タグ:</strong> {club.tags?.join(', ')}</p>
                  <p><strong>部員数:</strong> {club.memberCount}人</p>
                  <p><strong>活動時間:</strong> {club.meetingTime}</p>
                  <p><strong>活動場所:</strong> {club.meetingPlace}</p>
                  <p><strong>実績:</strong> {club.achievements}</p>
                  <p><strong>活動状況:</strong> {club.isActive ? '活動中' : '休部中'}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'search' && (
          <div className="search-section">
            <h2>部活動検索</h2>
            <div className="search-form">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="検索キーワードを入力..."
                className="search-input"
              />
              <button onClick={handleSearch} className="search-button">
                検索
              </button>
            </div>
            {searchResults.length > 0 && (
              <div className="search-results">
                <h3>検索結果 ({searchResults.length}件)</h3>
                <div className="clubs-grid">
                  {searchResults.map((club) => (
                    <div key={club.id} className="club-card">
                      <h3>{club.name}</h3>
                      <p><strong>説明:</strong> {club.description}</p>
                      <p><strong>カテゴリ:</strong> {club.category}</p>
                      <p><strong>学校:</strong> {club.school}</p>
                      <p><strong>学年:</strong> {club.grade}</p>
                      <p><strong>活動内容:</strong> {club.activities}</p>
                      <p><strong>タグ:</strong> {club.tags?.join(', ')}</p>
                      <p><strong>部員数:</strong> {club.memberCount}人</p>
                      <p><strong>活動時間:</strong> {club.meetingTime}</p>
                      <p><strong>活動場所:</strong> {club.meetingPlace}</p>
                      <p><strong>実績:</strong> {club.achievements}</p>
                      <p><strong>活動状況:</strong> {club.isActive ? '活動中' : '休部中'}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
