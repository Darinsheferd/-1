// src/components/pages/CatalogPage.jsx
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../slices/productSlice';
import { Link } from 'react-router-dom';

const CatalogPage = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);
  const [q, setQ] = useState('');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(fetchProducts({ q }));
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="page-title">Каталог продукции</h1>
        <p className="page-subtitle">
          Найдите нужную фасадную, оконную или балконную систему по артикулу,
          названию или описанию.
        </p>
      </div>

      {/* Поисковая панель */}
      <div className="card flex flex-col gap-4">
        <form
          onSubmit={handleSearch}
          className="flex flex-col md:flex-row md:items-end gap-3"
        >
          <div className="flex-1">
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Артикул или название системы
            </label>
            <div className="relative">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Например: REVENTAL F50, PROVEDAL P400 или профиль по коду"
                className="input pr-10"
              />
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-500 text-xs">
                ⌕
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <button type="submit" className="btn-primary">
              Найти
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => {
                setQ('');
                dispatch(fetchProducts());
              }}
            >
              Сбросить
            </button>
          </div>
        </form>

        <p className="text-[11px] text-slate-500">
          Можно искать по артикулу, части названия системы или описанию профиля.
        </p>
      </div>

      {/* Список товаров */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {loading && <p className="text-slate-400">Загрузка...</p>}
        {error && <p className="text-rose-400">Ошибка: {error}</p>}
        {!loading && !error && items.length === 0 && (
          <p className="text-slate-400 text-sm">
            Ничего не найдено по текущему запросу. Попробуйте упростить поиск
            или изменить формулировку.
          </p>
        )}

        {items.map((p) => (
          <Link
            key={p.id}
            to={`/products/${p.id}`}
            className="card cursor-pointer hover:border-brand-500/60 hover:shadow-brand-500/30 transition"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-start justify-between gap-2">
                <h2 className="text-sm font-semibold text-slate-50">
                  {p.name}
                </h2>
                {p.code && (
                  <span className="rounded-full bg-slate-800/80 px-2 py-0.5 text-[10px] font-mono text-slate-300">
                    {p.code}
                  </span>
                )}
              </div>
              {p.category && (
                <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                  {p.category.name}
                </p>
              )}
              {p.description && (
                <p className="text-xs text-slate-400 line-clamp-3">
                  {p.description}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CatalogPage;
