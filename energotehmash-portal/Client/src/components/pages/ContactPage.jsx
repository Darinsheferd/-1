// src/components/pages/ContactPage.jsx
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createEnquiry } from '../../slices/enquirySlice';

const ContactPage = () => {
  const dispatch = useDispatch();
  const { loading, error, lastCreated } = useSelector((s) => s.enquiries);

  const [form, setForm] = useState({
    customerName: '',
    company: '',
    email: '',
    phone: '',
    comment: '',
  });

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createEnquiry({ ...form, items: [] }));
  };

  return (
    <section className="py-4 md:py-6">
      <div className="grid gap-8 md:grid-cols-[1.1fr,1.2fr] items-start">
        {/* Описание слева */}
        <div className="space-y-5">
          <h1 className="page-title">Запросить коммерческое предложение</h1>
          <p className="page-subtitle">
            Опишите объект, объёмы и интересующие системы — мы подберём
            решения, подготовим спецификацию и ориентировочные сроки.
          </p>

          <div className="card-muted space-y-3 text-xs text-slate-300">
            <p className="font-medium text-slate-100">
              Что можно указать в запросе:
            </p>
            <ul className="space-y-1.5">
              <li>• Наименование объекта и город</li>
              <li>• Тип систем (фасадные, оконные, балконные, витражи)</li>
              <li>• Примерные объёмы и требования к профилю</li>
              <li>• Если есть — перечень артикулов или спецификация</li>
            </ul>
          </div>

          <div className="text-[11px] text-slate-500">
            Для типовых систем REVENTAL, PROVEDAL и др. мы можем предложить
            готовые решения под ваши задачи.
          </div>
        </div>

        {/* Форма справа */}
        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Имя + Компания */}
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Контактное лицо <span className="text-rose-400">*</span>
                </label>
                <input
                  name="customerName"
                  className="input"
                  placeholder="Например: Иван Петров"
                  value={form.customerName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Компания
                </label>
                <input
                  name="company"
                  className="input"
                  placeholder="Название компании / организации"
                  value={form.company}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Email + Телефон */}
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  E-mail <span className="text-rose-400">*</span>
                </label>
                <input
                  name="email"
                  type="email"
                  className="input"
                  placeholder="you@company.ru"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Телефон
                </label>
                <input
                  name="phone"
                  className="input"
                  placeholder="+7 (___) ___-__-__"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Комментарий */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Комментарий к запросу
              </label>
              <textarea
                name="comment"
                rows={5}
                className="input resize-none"
                placeholder="Опишите системы, объёмы, особенности объекта или вставьте список артикулов..."
                value={form.comment}
                onChange={handleChange}
              />
            </div>

            {/* Статусы */}
            <div className="flex flex-col gap-2">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full md:w-auto"
              >
                {loading ? 'Отправляем...' : 'Отправить запрос'}
              </button>
              {error && (
                <p className="text-xs text-rose-400">
                  Ошибка при отправке: {error}
                </p>
              )}
              {lastCreated && !error && !loading && (
                <p className="text-xs text-emerald-400">
                  Заявка отправлена. Менеджер свяжется с вами по указанным
                  контактам.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
