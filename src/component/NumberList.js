import React, { useEffect, useState, memo } from 'react';
import axios from 'axios';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'typeface-raleway';

const containerStyle = {
  backgroundColor: '#f5f5f5',
  backgroundImage: 'linear-gradient(to right, #ffecd2, #fcb69f)',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

function NumberList() {
  const [primes, setPrimes] = useState([]);
  const [fibo, setFibo] = useState([]);
  const [odd, setOdd] = useState([]);
  const [rand, setRand] = useState([]);

  useEffect(() => {
    const fetchNumbers = async () => {
      const urls = [
        { url: 'http://104.211.219.98/numbers/primes', setter: setPrimes },
        { url: 'http://104.211.219.98/numbers/fibo', setter: setFibo },
        { url: 'http://104.211.219.98/numbers/odd', setter: setOdd },
        { url: 'http://104.211.219.98/numbers/rand', setter: setRand },
      ];

      try {
        const responseArray = await Promise.all(
          urls.map((item) => axios.get(item.url))
        );

        responseArray.forEach((response, index) => {
          const { numbers } = response.data;
          urls[index].setter(numbers);
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchNumbers();
  }, []);

  return (
    <div style={containerStyle}>
      <div className="text-center">
        <h2 className="text-white mb-4">Numbers List</h2>

        <div className="mb-5">
          <h4>Primes:</h4>
          <ul className="list-unstyled">
            {primes.map((number) => (
              <li
                key={number}
                className="text-white font-weight-bold mb-2"
                style={{ fontSize: '24px' }}
              >
                {number}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-5">
          <h4>Fibonacci:</h4>
          <ul className="list-unstyled">
            {fibo.map((number) => (
              <li
                key={number}
                className="text-white font-weight-bold mb-2"
                style={{ fontSize: '24px' }}
              >
                {number}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-5">
          <h4>Odd Numbers:</h4>
          <ul className="list-unstyled">
            {odd.map((number) => (
              <li
                key={number}
                className="text-white font-weight-bold mb-2"
                style={{ fontSize: '24px' }}
              >
                {number}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4>Random Numbers:</h4>
          <ul className="list-unstyled">
            {rand.map((number) => (
              <li
                key={number}
                className="text-white font-weight-bold mb-2"
                style={{ fontSize: '24px' }}
              >
                {number}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default memo(NumberList);