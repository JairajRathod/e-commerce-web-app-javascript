import { Link } from "react-router-dom";

export default function EmptyCard({
  title = "",
  description = "",
  icon = "",
  buttonExist = false,
  buttonIcon = "",
  buttonText = "",
  buttonUrl = "",
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-12 text-center">
      <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-600 mb-6">{description}</p>

      <Link
        to={buttonUrl}
        className="empty-card__button--primary"
        hidden={!buttonExist}
      >
        {buttonIcon}
        {buttonText}
      </Link>
    </div>
  );
}
