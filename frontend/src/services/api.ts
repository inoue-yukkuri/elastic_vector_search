import axios from 'axios';
import { Club } from '../types/Club';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const clubService = {
  // 全部活動を取得
  getAllClubs: async (): Promise<Club[]> => {
    const response = await api.get<Club[]>('/clubs');
    return response.data;
  },

  // 部活動を検索
  searchClubs: async (query: string): Promise<Club[]> => {
    const response = await api.get<Club[]>(`/clubs/search?query=${encodeURIComponent(query)}`);
    return response.data;
  },

  // カテゴリで検索
  searchByCategory: async (category: string): Promise<Club[]> => {
    const response = await api.get<Club[]>(`/clubs/search/category?category=${encodeURIComponent(category)}`);
    return response.data;
  },

  // 学校で検索
  searchBySchool: async (school: string): Promise<Club[]> => {
    const response = await api.get<Club[]>(`/clubs/search/school?school=${encodeURIComponent(school)}`);
    return response.data;
  },

  // 学年で検索
  searchByGrade: async (grade: string): Promise<Club[]> => {
    const response = await api.get<Club[]>(`/clubs/search/grade?grade=${encodeURIComponent(grade)}`);
    return response.data;
  },

  // タグで検索
  searchByTag: async (tag: string): Promise<Club[]> => {
    const response = await api.get<Club[]>(`/clubs/search/tag?tag=${encodeURIComponent(tag)}`);
    return response.data;
  },

  // 活動状況で検索
  searchByActivityStatus: async (isActive: boolean): Promise<Club[]> => {
    const response = await api.get<Club[]>(`/clubs/search/active?isActive=${isActive}`);
    return response.data;
  },

  // 部員数範囲で検索
  searchByMemberCountRange: async (minCount: number, maxCount: number): Promise<Club[]> => {
    const response = await api.get<Club[]>(`/clubs/search/members?minCount=${minCount}&maxCount=${maxCount}`);
    return response.data;
  },

  // 部活動を作成
  createClub: async (club: Club): Promise<Club> => {
    const response = await api.post<Club>('/clubs', club);
    return response.data;
  },

  // 部活動を更新
  updateClub: async (id: string, club: Club): Promise<Club> => {
    const response = await api.put<Club>(`/clubs/${id}`, club);
    return response.data;
  },

  // 部活動を削除
  deleteClub: async (id: string): Promise<void> => {
    await api.delete(`/clubs/${id}`);
  },

  // 全部活動を削除
  deleteAllClubs: async (): Promise<void> => {
    await api.delete('/clubs/all');
  },

  // CSVファイルをインポート
  importFromCsv: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post<string>('/clubs/import', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // 部活動数を取得
  getClubCount: async (): Promise<number> => {
    const response = await api.get<number>('/clubs/count');
    return response.data;
  },
};
