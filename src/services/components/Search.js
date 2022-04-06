import React, { useState } from 'react';

export default function Search({ setQuery }) {
  const [input, setInput] = useState('');
  return (
    <div>
      <label>Query:</label>
      <input type="text" placeholder="Search..." onChange={(e) => setInput(e.target.value)} />
      <button onClick={() => setQuery(input)}>Search</button>
    </div>
  );
}
