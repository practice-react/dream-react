import { useEffect, useState } from 'react';

// 커스텀 훅
// use로 만드는 것이 스타일 가이드
// 함수로 만들어야한다.
// 일반 컴포넌트와 다른점 외부 사람들과 공유하고 싶은 데이터를 리턴한다
// 값의 재사용이 아니라 로직의 재사용을 위한 것이다.
export default function useProducts({ salesOnly }) {
  const [loading, setLoding] = useState(false);
  const [error, setError] = useState();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setLoding(true);
    setError();

    fetch(`data/${salesOnly ? 'sale_' : ''}products.json`)
      .then((res) => res.json())
      .then((data) => {
        console.log('생성');
        setProducts(data);
      })
      .catch((err) => {
        setError('에러가 발생했습니다.');
      })
      .finally(() => {
        setLoding(false);
      });
    return () => {
      console.log('삭제');
    };
  }, [salesOnly]);

  return [loading, error, products];
}
