import { ItemProps } from './types';

const PackingItem: React.FC<ItemProps> = ({
  item,
  onDeleteItem,
  onChangeItem,
}) => {
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

export default PackingItem;
