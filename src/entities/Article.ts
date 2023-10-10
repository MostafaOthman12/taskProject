export interface Article {
  id: number;
  title: string;
  body: string;
  date: string;
  userId: number;
  categoryId: number;
  isActive: boolean;
  categoryName: string;
  writeName: string;
}
