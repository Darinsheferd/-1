// src/components/pages/DocsPage.jsx
import { useEffect, useState } from 'react';
import api from '../../api/axiosClient';

const DocsPage = () => {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await api.get('/documents');
        setDocs(res.data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <section>
      <h1>Документация</h1>
      {loading && <p>Загрузка...</p>}
      <ul>
        {docs.map((d) => (
          <li key={d.id}>
            <a href={d.url} target="_blank" rel="noreferrer">
              {d.title}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default DocsPage;
