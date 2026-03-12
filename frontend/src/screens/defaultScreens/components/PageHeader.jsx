export default function PageHeader({
  title = "",
  value = 0,
  valuePrefixText = "",
  totalAmountValue = 0,
}) {
  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-slate-800 mb-2">{title}</h1>
          <p className="text-slate-600">
            {value} {valuePrefixText}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-md border border-slate-200 px-6 py-4">
          <p className="text-sm font-medium text-slate-600 mb-1">
            Total Amount
          </p>
          <p className="text-3xl font-bold text-indigo-600">
            $ {totalAmountValue}
          </p>
        </div>
      </div>
    </div>
  );
}
