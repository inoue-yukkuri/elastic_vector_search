import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, Card } from 'react-bootstrap';
import { clubService } from '../services/api';

const UploadPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setError('');
      setSuccess('');
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      setError('ファイルを選択してください');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccess('');

      const message = await clubService.importFromCsv(selectedFile);
      setSuccess(message);
      setSelectedFile(null);

      // ファイル入力をリセット
      const fileInput = document.getElementById('csvFile') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }
    } catch (err) {
      setError('ファイルのアップロードに失敗しました');
      console.error('Error uploading file:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h1>データアップロード</h1>
          <p className="text-muted">
            CSVファイルから部活動データをインポートできます。
          </p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>CSVファイル形式</Card.Title>
              <Card.Text>
                以下の形式でCSVファイルを準備してください：
              </Card.Text>
              <div className="table-responsive">
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>列名</th>
                      <th>説明</th>
                      <th>例</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>name</td>
                      <td>部活動名</td>
                      <td>サッカー部</td>
                    </tr>
                    <tr>
                      <td>description</td>
                      <td>部活動の説明</td>
                      <td>技術向上とチームワークを重視</td>
                    </tr>
                    <tr>
                      <td>category</td>
                      <td>カテゴリ</td>
                      <td>Sports, Culture, Academic</td>
                    </tr>
                    <tr>
                      <td>school</td>
                      <td>学校名</td>
                      <td>東京高校</td>
                    </tr>
                    <tr>
                      <td>grade</td>
                      <td>対象学年</td>
                      <td>1-3年生</td>
                    </tr>
                    <tr>
                      <td>activities</td>
                      <td>活動内容</td>
                      <td>練習・試合・合宿</td>
                    </tr>
                    <tr>
                      <td>tags</td>
                      <td>タグ（カンマ区切り）</td>
                      <td>サッカー,運動,技術</td>
                    </tr>
                    <tr>
                      <td>memberCount</td>
                      <td>部員数</td>
                      <td>25</td>
                    </tr>
                    <tr>
                      <td>meetingTime</td>
                      <td>活動時間</td>
                      <td>平日16:00-18:00</td>
                    </tr>
                    <tr>
                      <td>meetingPlace</td>
                      <td>活動場所</td>
                      <td>グラウンド</td>
                    </tr>
                    <tr>
                      <td>achievements</td>
                      <td>実績</td>
                      <td>県大会優勝</td>
                    </tr>
                    <tr>
                      <td>isActive</td>
                      <td>活動状況</td>
                      <td>true/false</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>ファイルアップロード</Card.Title>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>CSVファイルを選択</Form.Label>
                  <Form.Control
                    id="csvFile"
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                  />
                  <Form.Text className="text-muted">
                    UTF-8エンコーディングのCSVファイルを選択してください
                  </Form.Text>
                </Form.Group>

                <Button
                  variant="primary"
                  onClick={handleFileUpload}
                  disabled={!selectedFile || loading}
                >
                  {loading ? 'アップロード中...' : 'アップロード'}
                </Button>
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

      {success && (
        <Row className="mb-4">
          <Col>
            <Alert variant="success">{success}</Alert>
          </Col>
        </Row>
      )}

      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>サンプルファイル</Card.Title>
              <Card.Text>
                サンプルのCSVファイル（sample_clubs.csv）がプロジェクトルートに用意されています。
                このファイルを参考にして、独自のデータを作成してください。
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UploadPage;
