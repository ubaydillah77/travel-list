import { useState, useEffect } from 'react';
import { PackingItem } from './types';
import Logo from './Logo';
import Stats from './Stats';
import Form from './Form';
import PackingList from './PackingList';

export default function App() {
  const [items, setItems] = useState<PackingItem[]>(() => {
    const storedItems = localStorage.getItem('packingItems');
    return storedItems ? JSON.parse(storedItems) : [];
  });

  useEffect(() => {
    localStorage.setItem('packingItems', JSON.stringify(items));
  }, [items]);

  const handleAddItem = (item: PackingItem) => {
    setItems((prevValue) => [...prevValue, item]);
  };

  const handleDeleteItem = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleChangeItem = (id: number, packed: boolean) => {
    const updateItems = items.map((item) => {
      if (item.id === id) {
        const updateItem = { ...item, packed };
        return updateItem;
      }
      return item;
    });
    setItems(updateItems);
  };

  const handleResetItem = () => {
    if (window.confirm('Are you sure want to reset?')) {
      setItems([]);
    }
  };

  return (
    <div className='app'>
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onChangeItem={handleChangeItem}
        onResetItem={handleResetItem}
      />
      <Stats items={items} />
    </div>
  );
}
