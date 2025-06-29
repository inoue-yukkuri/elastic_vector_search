import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import { Club } from '../types/Club';

interface ClubCardProps {
  club: Club;
}

const ClubCard: React.FC<ClubCardProps> = ({ club }) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Sports':
        return 'success';
      case 'Culture':
        return 'info';
      case 'Academic':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  return (
    <Card className="mb-3 h-100">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <h5 className="mb-0">{club.name}</h5>
        <Badge bg={club.isActive ? 'success' : 'danger'}>
          {club.isActive ? '活動中' : '休部中'}
        </Badge>
      </Card.Header>
      <Card.Body>
        <Card.Text>{club.description}</Card.Text>

        <div className="mb-2">
          <Badge bg={getCategoryColor(club.category)} className="me-1">
            {club.category}
          </Badge>
          <Badge bg="secondary" className="me-1">
            {club.school}
          </Badge>
          <Badge bg="light" text="dark" className="me-1">
            {club.grade}
          </Badge>
        </div>

        <div className="mb-2">
          <strong>活動内容:</strong> {club.activities}
        </div>

        <div className="mb-2">
          <strong>部員数:</strong> {club.memberCount}名
        </div>

        <div className="mb-2">
          <strong>活動時間:</strong> {club.meetingTime}
        </div>

        <div className="mb-2">
          <strong>活動場所:</strong> {club.meetingPlace}
        </div>

        {club.achievements && (
          <div className="mb-2">
            <strong>実績:</strong> {club.achievements}
          </div>
        )}

        {club.tags && club.tags.length > 0 && (
          <div className="mb-2">
            <strong>タグ:</strong>
            {club.tags.map((tag, index) => (
              <Badge key={index} bg="outline-primary" className="me-1">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </Card.Body>
      <Card.Footer>
        <Button variant="outline-primary" size="sm">
          詳細を見る
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default ClubCard;
