export default function HeaderSection({ title = "", description = "" }) {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold text-slate-800 mb-2">{title}</h1>
      <p className="text-slate-600">{description}</p>
    </div>
  );
}
