import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(
    {
      generatedAt: new Date().toISOString(),
      metrics: [
        {
          id: "users",
          title: "Kullanıcı sayıları",
          value: "0",
          change: "0%",
          text: "Vatandaş, işletme ve personel kullanıcıları tek özet panelde takip edilir.",
          bars: [8, 8, 8, 8, 8],
          status: "Sıfırlandı",
        },
        {
          id: "pageViews",
          title: "Sayfa görüntülemeleri",
          value: "0",
          change: "0%",
          text: "Portal sayfalarının toplam erişimi ve en çok görüntülenen içerikler izlenir.",
          bars: [8, 8, 8, 8, 8],
          status: "Sıfırlandı",
        },
        {
          id: "eventAttendance",
          title: "Etkinlik katılımı",
          value: "0",
          change: "0%",
          text: "Etkinlik ilgisi, kayıt ve katılım eğilimi temel seviyede raporlanır.",
          bars: [8, 8, 8, 8, 8],
          status: "Sıfırlandı",
        },
        {
          id: "businessViews",
          title: "İşletme görüntülenmeleri",
          value: "0",
          change: "0%",
          text: "İşletme profili ve QR sayfası görünürlüğü canlı özet olarak sunulur.",
          bars: [8, 8, 8, 8, 8],
          status: "Sıfırlandı",
        },
      ],
    },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}
