// src/components/layout/Footer.jsx
const Footer = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/80">
      <div className="container-page flex flex-col md:flex-row items-center justify-between gap-3 py-4 text-xs text-slate-500">
        <p>
          © {new Date().getFullYear()} ООО «Энерготехмаш». Все права защищены.
        </p>
        <p className="flex gap-4">
          <span>Производство алюминиевых профилей и алюминиевых систем.</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
