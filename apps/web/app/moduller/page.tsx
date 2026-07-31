const modules = ["Belediye", "Vatandaş", "İşletme", "Turizm", "Yönetici", "MU AI"];

export default function ModulesPage() {
  return (
    <main className="simple-page">
      <p className="eyebrow">Modüller</p>
      <h1>İhtiyacınız kadar modül kullanın.</h1>
      <p>
        İlk fazda odak; az menü, hızlı işlem ve belediye ekiplerinin günlük operasyonlarını sadeleştiren temel
        modüllerdir.
      </p>
      <div className="simple-list">
        {modules.map((module) => (
          <span key={module}>{module}</span>
        ))}
      </div>
    </main>
  );
}
