// src/components/pages/ProductDetailPage.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../../slices/productSlice';

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { current, loading, error } = useSelector((s) => s.products);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;
  if (!current) return <p>Товар не найден</p>;

  return (
    <section>
      <h1>
        {current.name} {current.code && `(${current.code})`}
      </h1>
      <p>{current.description}</p>
      {current.documents && current.documents.length > 0 && (
        <>
          <h2>Документация</h2>
          <ul>
            {current.documents.map((d) => (
              <li key={d.id}>
                <a href={d.url} target="_blank" rel="noreferrer">
                  {d.title}
                </a>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
};

export default ProductDetailPage;
