// src/components/layout/Header.jsx
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../slices/authSlice';

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const linkClass = ({ isActive }) =>
    `text-sm px-3 py-2 rounded-full transition ${
      isActive
        ? 'bg-slate-800 text-slate-50'
        : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
    }`;

  return (
    <header className="sticky top-0 z-20 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur">
      <div className="container-page flex items-center justify-between py-3 gap-4">
        {/* Логотип */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-sky-500 shadow-lg shadow-brand-500/40">
            <span className="text-lg font-bold text-white">E</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-wide text-slate-50">
              Энерготехмаш
            </span>
            <span className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
              алюминиевые системы
            </span>
          </div>
        </Link>

        {/* Навигация */}
        <nav className="hidden md:flex items-center gap-1 rounded-full bg-slate-900/80 px-1 py-1 border border-slate-800">
          <NavLink to="/" className={linkClass}>
            Главная
          </NavLink>
          <NavLink to="/catalog" className={linkClass}>
            Каталог
          </NavLink>
          <NavLink to="/docs" className={linkClass}>
            Документация
          </NavLink>
          <NavLink to="/contact" className={linkClass}>
            Запрос КП
          </NavLink>
          {user?.role === 'ADMIN' && (
            <NavLink to="/admin" className={linkClass}>
              Админка
            </NavLink>
          )}
        </nav>

        {/* Справа — вход / профиль */}
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <div className="hidden sm:flex flex-col items-end leading-tight">
                <span className="text-xs text-slate-400">Вы вошли как</span>
                <span className="text-xs font-medium text-slate-100">
                  {user.email}
                </span>
              </div>
              <button
                onClick={() => dispatch(logout())}
                className="btn-secondary text-xs"
              >
                Выйти
              </button>
            </>
          ) : (
            <Link to="/login" className="btn-secondary text-xs">
              Войти
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
