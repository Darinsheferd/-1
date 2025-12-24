// src/components/pages/HomePage.jsx
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <section className="py-8 md:py-12">
      <div className="grid gap-10 md:grid-cols-[1.4fr,1fr] items-center">
        {/* Hero */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300 mb-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>Промышленный B2B-сервис для алюминиевых систем</span>
          </div>

          <h1 className="page-title">
            Алюминиевые профили и фасадные системы для серьёзных проектов
          </h1>

          <p className="page-subtitle">
            ООО «Энерготехмаш» — производство и поставка экструдированных
            алюминиевых профилей, фасадных и оконных систем (REVENTAL, PROVEDAL
            и др.) с удобным онлайн-каталогом и запросом коммерческих
            предложений.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link to="/catalog" className="btn-primary">
              Открыть каталог
            </Link>
            <Link to="/contact" className="btn-secondary">
              Запросить коммерческое предложение
            </Link>
          </div>

          <div className="flex flex-wrap gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>Фасадные, оконные, балконные системы</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
              <span>Полная библиотека PDF-документации</span>
            </div>
          </div>
        </div>

        {/* Боковая карточка */}
        <div className="space-y-4">
          <div className="card">
            <h2 className="text-sm font-semibold text-slate-50 mb-2">
              Быстрый запрос по спецификации
            </h2>
            <p className="text-xs text-slate-400 mb-4">
              Пришлите список артикулов или описание системы — менеджер подберёт
              решения и подготовит предложение с учётом сроков и логистики.
            </p>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>• Подбор аналогов и альтернативных профилей</li>
              <li>• Актуальные цены и сроки производства</li>
              <li>• Консультация по фасадным и оконным системам</li>
            </ul>
            <Link to="/contact" className="btn-primary mt-4">
              Оставить запрос
            </Link>
          </div>

          <div className="card-muted text-xs text-slate-400">
            <p>
              Для проектировщиков и дилеров доступна актуальная документация по
              системам REVENTAL, PROVEDAL и др. в разделе{' '}
              <Link to="/docs" className="text-brand-300 hover:text-brand-200">
                «Документация»
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
