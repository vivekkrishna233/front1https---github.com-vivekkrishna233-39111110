import React from 'react';
import NumberList from './component/NumberList';

function App() {
  const urls = [
    'http://104.211.219.98/numbers/primes',
    'http://abc.com/fibo',
  ];

  return (
    <div className="App">
      <NumberList urls={urls} />
    </div>
  );
}

export default App;