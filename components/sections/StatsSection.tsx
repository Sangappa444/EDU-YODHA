export default function StatsSection() {
  const stats = [
    { value: '12+', label: 'Internship Programs' },
    { value: '8', label: 'Business Verticals' },
    { value: 'LLP', label: 'Officially Registered' },
    { value: 'MSME', label: 'MSME Registered' },
  ];

  return (
    <section className="bg-[#0f172a] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-4xl lg:text-5xl font-bold text-white mb-2">{stat.value}</p>
              <p className="text-slate-400 text-sm font-medium uppercase tracking-wide">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
