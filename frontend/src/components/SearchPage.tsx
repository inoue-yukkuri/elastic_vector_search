import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, Card } from 'react-bootstrap';
import { clubService } from '../services/api';
import { Club } from '../types/Club';
import ClubCard from './ClubCard';

const SearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [searchPerformed, setSearchPerformed] = useState<boolean>(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setError('検索キーワードを入力してください');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const data = await clubService.searchClubs(searchQuery);
      setClubs(data);
      setSearchPerformed(true);
    } catch (err) {
      setError('検索に失敗しました');
      console.error('Error searching clubs:', err);
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
    <Container>
      <Row className="mb-4">
        <Col>
          <h1>部活動検索</h1>
          <p className="text-muted">
            日本語のベクトル検索技術を使用して部活動を検索できます。
          </p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <Form>
                <Row>
                  <Col md={10}>
                    <Form.Group>
                      <Form.Label>検索キーワード</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="例: サッカー、音楽、科学、運動、文化活動..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={handleKeyPress}
                      />
                      <Form.Text className="text-muted">
                        部活動名、説明、活動内容、実績、タグなどから検索できます
                      </Form.Text>
                    </Form.Group>
                  </Col>
                  <Col md={2} className="d-flex align-items-end">
                    <Button
                      variant="primary"
                      onClick={handleSearch}
                      disabled={loading}
                      className="w-100"
                    >
                      {loading ? '検索中...' : '検索'}
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {error && (
        <Row className="mb-4">
          <Col>
            <Alert variant="danger">{error}</Alert>
          </Col>
        </Row>
      )}

      {loading && (
        <Row className="mb-4">
          <Col className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">検索中...</span>
            </div>
          </Col>
        </Row>
      )}

      {searchPerformed && !loading && (
        <Row className="mb-4">
          <Col>
            <h2>検索結果 ({clubs.length}件)</h2>
          </Col>
        </Row>
      )}

      {searchPerformed && !loading && clubs.length === 0 && (
        <Row className="mb-4">
          <Col>
            <Alert variant="info">
              検索条件に一致する部活動が見つかりませんでした。
              別のキーワードで検索してみてください。
            </Alert>
          </Col>
        </Row>
      )}

      <Row>
        {clubs.map((club) => (
          <Col key={club.id} lg={4} md={6} className="mb-3">
            <ClubCard club={club} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SearchPage;
