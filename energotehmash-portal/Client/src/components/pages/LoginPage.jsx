// src/components/pages/LoginPage.jsx
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../slices/authSlice';
import { Navigate, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((s) => s.auth);

  const [form, setForm] = useState({ email: '', password: '' });

  if (user) return <Navigate to="/admin" replace />;

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(form));
  };

  const handleClose = () => {
    navigate(-1); // вернуться на предыдущую страницу
  };

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      {/* Клик по фону — закрыть */}
      <div
        className="absolute inset-0"
        onClick={handleClose}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-md card">
        {/* Кнопка закрытия */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-3 top-3 rounded-full bg-slate-800/80 px-2 py-0.5 text-xs text-slate-400 hover:text-slate-100 hover:bg-slate-700/80 transition"
        >
          ✕
        </button>

        <div className="mb-4">
          <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500 mb-1">
            панель управления
          </p>
          <h1 className="text-xl font-semibold text-slate-50">
            Вход в админ-панель
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Только для сотрудников и партнёров. Используйте учётные данные,
            выданные администратором.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              E-mail
            </label>
            <input
              name="email"
              type="email"
              placeholder="admin@company.ru"
              value={form.email}
              onChange={handleChange}
              className="input"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Пароль
            </label>
            <input
              name="password"
              type="password"
              placeholder="Пароль"
              value={form.password}
              onChange={handleChange}
              className="input"
            />
          </div>

          {error && (
            <p className="text-xs text-rose-400">
              Ошибка авторизации: {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? 'Входим...' : 'Войти'}
          </button>

          <p className="text-[11px] text-slate-500 text-center">
            При возникновении проблем с входом обратитесь к администратору
            системы.
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
