// src/components/pages/admin/AdminDashboard.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReportSummary } from '../../../slices/reportSlice';

const statusLabels = {
  NEW: 'Новые',
  IN_PROGRESS: 'В работе',
  WON: 'Выигранные',
  LOST: 'Закрытые',
};

const statusColors = {
  NEW: 'bg-sky-500/15 text-sky-300 border-sky-500/40',
  IN_PROGRESS: 'bg-amber-500/15 text-amber-300 border-amber-500/40',
  WON: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40',
  LOST: 'bg-rose-500/15 text-rose-300 border-rose-500/40',
};

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { summary, loading, error } = useSelector((s) => s.reports);

  useEffect(() => {
    dispatch(fetchReportSummary());
  }, [dispatch]);

  return (
    <section className="py-4 md:py-6 space-y-6">
      {/* Заголовок */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div>
          <h1 className="page-title">Админ-панель</h1>
          <p className="page-subtitle">
            Краткая статистика по пользователям, заявкам и наиболее
            запрашиваемым продуктам.
          </p>
        </div>
        <div className="text-[11px] text-slate-500">
          Обновление данных происходит при входе на страницу. В будущем сюда
          можно добавить фильтры по датам и менеджерам.
        </div>
      </div>

      {/* Состояния загрузки/ошибки */}
      {loading && (
        <div className="card text-sm text-slate-300">
          Загрузка отчёта… Пожалуйста, подождите.
        </div>
      )}

      {error && (
        <div className="card border-rose-500/50 bg-rose-950/40 text-sm text-rose-100">
          Ошибка при загрузке отчёта: {error}
        </div>
      )}

      {!loading && !error && summary && (
        <>
          {/* Верхние метрики */}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="card flex flex-col gap-1">
              <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                пользователи системы
              </p>
              <p className="text-3xl font-semibold text-slate-50">
                {summary.usersCount}
              </p>
              <p className="text-xs text-slate-400">
                Администраторы, менеджеры и просмотрщики.
              </p>
            </div>

            <div className="card flex flex-col gap-1">
              <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                всего заявок
              </p>
              <p className="text-3xl font-semibold text-slate-50">
                {summary.enquiriesCount}
              </p>
              <p className="text-xs text-slate-400">
                Все запросы коммерческих предложений, сохранённые в системе.
              </p>
            </div>

            <div className="card flex flex-col gap-2">
              <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                активность по заявкам
              </p>
              <div className="flex flex-wrap gap-1.5">
                {summary.enquiriesByStatus.map((s) => (
                  <span
                    key={s.status}
                    className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] ${
                      statusColors[s.status] || 'bg-slate-800 text-slate-200'
                    }`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-current/70" />
                    <span>
                      {statusLabels[s.status] || s.status} — {s._count._all}
                    </span>
                  </span>
                ))}
                {summary.enquiriesByStatus.length === 0 && (
                  <span className="text-xs text-slate-500">
                    Заявок ещё не поступало.
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Нижний блок: статусы + топ продуктов */}
          <div className="grid gap-4 lg:grid-cols-[1.1fr,1.2fr] items-start">
            {/* Статистика по статусам (подробнее) */}
            <div className="card space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-50">
                  Заявки по статусам
                </h2>
                <span className="text-[11px] text-slate-500">
                  Распределение по воронке
                </span>
              </div>

              <div className="space-y-2">
                {summary.enquiriesByStatus.length > 0 ? (
                  summary.enquiriesByStatus.map((s) => {
                    const total = summary.enquiriesCount || 1;
                    const percent = Math.round(
                      (s._count._all / total) * 100
                    );

                    return (
                      <div
                        key={s.status}
                        className="flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`h-6 w-6 rounded-full border flex items-center justify-center text-[10px] ${
                              statusColors[s.status] ||
                              'bg-slate-800 text-slate-200 border-slate-700'
                            }`}
                          >
                            {percent}
                            <span className="text-[9px] ml-0.5">%</span>
                          </span>
                          <div className="flex flex-col">
                            <span className="text-slate-100">
                              {statusLabels[s.status] || s.status}
                            </span>
                            <span className="text-[11px] text-slate-500">
                              {s._count._all} заявок
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-xs text-slate-400">
                    Пока нет данных по статусам. Как только начнут
                    поступать заявки через форму «Запрос КП», здесь появится
                    статистика.
                  </p>
                )}
              </div>
            </div>

            {/* Топ продуктов по заявкам */}
            <div className="card space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-50">
                  Топ продуктов по количеству запросов
                </h2>
                <span className="text-[11px] text-slate-500">
                  На основе строк в заявках
                </span>
              </div>

              {summary.topProducts.length === 0 ? (
                <p className="text-xs text-slate-400">
                  Пока нет заявок с привязкой к конкретным продуктам.
                  При добавлении заявок, где указаны продукты, здесь будут
                  отображаться наиболее интересующие системы.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full border-separate border-spacing-y-1 text-xs">
                    <thead className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
                      <tr>
                        <th className="text-left pb-1 pr-4">Продукт</th>
                        <th className="text-right pb-1">Заявок</th>
                      </tr>
                    </thead>
                    <tbody>
                      {summary.topProducts.map((p, idx) => (
                        <tr key={p.id}>
                          <td className="pr-4">
                            <div className="flex items-center gap-2">
                              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-800 text-[10px] text-slate-300">
                                {idx + 1}
                              </span>
                              <span className="text-slate-100">{p.name}</span>
                            </div>
                          </td>
                          <td className="text-right text-slate-200">
                            {p.enquiry_count}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default AdminDashboard;
