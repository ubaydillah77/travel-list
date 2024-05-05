import { StatsProps } from './types';

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

export default Stats;
