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
  onResetItem: () => void;
}

interface FormProps {
  onAddItem: (item: PackingItem) => void;
}

interface ItemProps {
  item: PackingItem;
  onDeleteItem: (id: number) => void;
  onChangeItem: (id: number, packed: boolean) => void;
}

interface StatsProps {
  items: PackingItem[];
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
  onResetItem,
}) => {
  const [sortBy, setSortBy] = useState('input');

  let sortedItems: PackingItem[] = items; // Initialize with a default value

  if (sortBy === 'description') {
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  } else if (sortBy === 'packed') {
    sortedItems = items
      .slice()
      .sort((a, b) => Number(b.packed) - Number(a.packed));
  }

  return (
    <div className='list'>
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onChangeItem={onChangeItem}
          />
        ))}
      </ul>

      <div className='actions'>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value='input'>Sorted by Input</option>
          <option value='description'>Sorted by Description</option>
          <option value='packed'>Sorted by Packed</option>
        </select>
        <button onClick={onResetItem}>Clear list</button>
      </div>
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

const Stats: React.FC<StatsProps> = ({ items }) => {
  if (!items.length) {
    return (
      <footer className='stats'>
        <em>Start adding some items to your packing list!</em>
      </footer>
    );
  }

  const totalItems = items.length;
  const checkedItem = items.filter((item) => item.packed).length;
  const packedPercentage = Math.round((checkedItem / totalItems) * 100);

  return (
    <footer className='stats'>
      <em>
        {packedPercentage >= 100 ? (
          <span>You are ready to go! ✈️</span>
        ) : (
          <span>
            🧳You have {totalItems} items on your lists, and you already packed{' '}
            {checkedItem} ({isNaN(packedPercentage) ? 0 : packedPercentage}%)
          </span>
        )}
      </em>
    </footer>
  );
};
