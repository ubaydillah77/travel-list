import { useState } from 'react';
import { PackingItem, PackingListProps } from './types';
import PackingListItem from './PackingListItem';

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
          <PackingListItem
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

export default PackingList;
