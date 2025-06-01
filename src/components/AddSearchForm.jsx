import { useState } from 'react';

export default function AddNewSearch() {
  const [visible, setVisible] = useState(true);

  const handleClick = () => {
    setVisible(!visible);
  };

  return (
    <>
      {visible ? (
        <div className='add-new-wrapper'>
          <button onClick={handleClick} className='secondary-button'>
            Add New
          </button>
        </div>
      ) : null}
    </>
  );
}
