import { useState } from 'react';

interface PackingItem {
  id: number;
  description: string;
  quantity: number;
  packed: boolean;
}

interface PackingListProps {
  items: PackingItem[];
  onDeleteItem: (id: number) => void;
  onChangeItem: (id: number, packed: boolean) => void;
}

interface FormProps {
  onAddItem: (item: PackingItem) => void;
}

interface ItemProps {
  item: PackingItem;
  onDeleteItem: (id: number) => void;
  onChangeItem: (id: number, packed: boolean) => void;
}

export default function App() {
  const [items, setItems] = useState<PackingItem[]>([]);

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

  return (
    <div className='app'>
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onChangeItem={handleChangeItem}
      />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 💼</h1>;
}

const Form: React.FC<FormProps> = ({ onAddItem }) => {
  const [description, setDescription] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!description) return;
    const newItem = {
      id: Date.now(),
      description,
      quantity,
      packed: false,
    };

    // Add new data
    onAddItem(newItem);

    // Reset the input
    setDescription('');
    setQuantity(1);
  };

  return (
    <form className='add-form' onSubmit={handleSubmit}>
      <h3>What you need for your 😍 trip? </h3>
      <select
        value={quantity}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setQuantity(Number(e.target.value))
        }
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        placeholder='item...'
        type='text'
        value={description}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setDescription(e.target.value)
        }
      />
      <button>Add</button>
    </form>
  );
};

const PackingList: React.FC<PackingListProps> = ({
  items,
  onDeleteItem,
  onChangeItem,
}) => {
  return (
    <div className='list'>
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onChangeItem={onChangeItem}
          />
        ))}
      </ul>
    </div>
  );
};

const Item: React.FC<ItemProps> = ({ item, onDeleteItem, onChangeItem }) => {
  const handleCheckboxChange = () => {
    onChangeItem(item.id, !item.packed);
  };

  return (
    <li>
      <input
        type='checkbox'
        checked={item.packed}
        onChange={handleCheckboxChange}
      />
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
};

function Stats() {
  return (
    <footer className='stats'>
      <em>You have X items on your lists, and you already packed X (X%)</em>
    </footer>
  );
}
