import { useState } from 'react';
import { FormProps } from './types';

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

export default Form;
