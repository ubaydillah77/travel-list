export interface PackingItem {
  id: number;
  description: string;
  quantity: number;
  packed: boolean;
}

export interface PackingListProps {
  items: PackingItem[];
  onDeleteItem: (id: number) => void;
  onChangeItem: (id: number, packed: boolean) => void;
  onResetItem: () => void;
}

export interface FormProps {
  onAddItem: (item: PackingItem) => void;
}

export interface ItemProps {
  item: PackingItem;
  onDeleteItem: (id: number) => void;
  onChangeItem: (id: number, packed: boolean) => void;
}

export interface StatsProps {
  items: PackingItem[];
}
