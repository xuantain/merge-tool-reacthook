export type Data = {
  name: string;
  image: string;
  status: string;
  sku: string;
  createdAt: string;
};

export type HeadRow = {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  type: string;
};

export type Order = 'asc' | 'desc';
