const solutions = ["Belediyeler", "Turizm destinasyonları", "Üniversiteler", "OSB", "Marinalar", "AVM yönetimleri"];

export default function SolutionsPage() {
  return (
    <main className="simple-page">
      <p className="eyebrow">Çözümler</p>
      <h1>Şehir odaklı kurumlar için bulut platformu.</h1>
      <p>
        MUFLOW, farklı kurum tiplerinin vatandaş, ziyaretçi ve işletme iletişimini tek panelden yönetmesine yardımcı
        olur.
      </p>
      <div className="simple-list">
        {solutions.map((solution) => (
          <span key={solution}>{solution}</span>
        ))}
      </div>
    </main>
  );
}
