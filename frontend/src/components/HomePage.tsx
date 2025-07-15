import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { clubService } from '../services/api';
import { Club } from '../types/Club';
import ClubCard from './ClubCard';

const HomePage: React.FC = () => {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [clubCount, setClubCount] = useState<number>(0);

  useEffect(() => {
    loadClubs();
    loadClubCount();
  }, []);

  const loadClubs = async () => {
    try {
      setLoading(true);
      const data = await clubService.getAllClubs();
      setClubs(data.slice(0, 6)); // 最新6件のみ表示
      setError('');
    } catch (err) {
      setError('部活動の読み込みに失敗しました');
      console.error('Error loading clubs:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadClubCount = async () => {
    try {
      const count = await clubService.getClubCount();
      setClubCount(count);
    } catch (err) {
      console.error('Error loading club count:', err);
    }
  };

  const handleDeleteAll = async () => {
    if (!window.confirm('本当に全ての部活動データを削除しますか？')) return;
    try {
      setLoading(true);
      await clubService.deleteAllClubs();
      setClubs([]);
      setClubCount(0);
      setError('');
    } catch (err) {
      setError('全件削除に失敗しました');
      console.error('Error deleting all clubs:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container>
        <div className="text-center py-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">読み込み中...</span>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h1 className="text-center mb-4">部活動検索システム</h1>
          <Alert variant="info" className="text-center">
            登録部活動数: <strong>{clubCount}</strong>件
          </Alert>
        </Col>
      </Row>

      {error && (
        <Row className="mb-4">
          <Col>
            <Alert variant="danger">{error}</Alert>
          </Col>
        </Row>
      )}

      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>システム概要</Card.Title>
              <Card.Text>
                このシステムでは、日本語のベクトル検索技術を使用して部活動を効率的に検索できます。
                部活動名、説明、活動内容、実績などから関連する部活動を見つけることができます。
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <h2>最新の部活動</h2>
          <div className="d-flex align-items-center mb-2">
            <button className="btn btn-primary me-2" onClick={loadClubs}>
              更新
            </button>
            <button className="btn btn-danger" onClick={handleDeleteAll}>
              全データ削除
            </button>
          </div>
        </Col>
      </Row>

      <Row>
        {clubs.length === 0 ? (
          <Col>
            <Alert variant="warning">
              部活動データがありません。データアップロードページからCSVファイルをアップロードしてください。
            </Alert>
          </Col>
        ) : (
          clubs.map((club) => (
            <Col key={club.id} lg={4} md={6} className="mb-3">
              <ClubCard club={club} />
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default HomePage;
