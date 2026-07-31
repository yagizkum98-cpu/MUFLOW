import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "../../../../lib/current-user";

type CheckoutItem = {
  id?: string;
  segment?: string;
  name?: string;
  features?: string[];
};

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ message: "Satın alma için önce sisteme giriş yapmalısınız." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const items = Array.isArray(body?.items) ? (body.items as CheckoutItem[]) : [];
  const paymentMethod = body?.paymentMethod;

  if (!body?.kvkkApproved) {
    return NextResponse.json({ message: "KVKK onayı olmadan ödeme ekranı başlatılamaz." }, { status: 400 });
  }

  if (items.length === 0) {
    return NextResponse.json({ message: "Sepette satın alınacak paket bulunamadı." }, { status: 400 });
  }

  if (paymentMethod !== "card" && paymentMethod !== "iban") {
    return NextResponse.json({ message: "Geçerli bir ödeme yöntemi seçmelisiniz." }, { status: 400 });
  }

  const orderId = `MUF-${Date.now().toString(36).toUpperCase()}`;

  return NextResponse.json(
    {
      orderId,
      status: paymentMethod === "card" ? "payment_provider_redirect_ready" : "bank_transfer_waiting",
      paymentMethod,
      user: {
        email: user.email,
        role: user.role,
      },
      items: items.map((item) => ({
        id: item.id,
        segment: item.segment,
        name: item.name,
        featureCount: Array.isArray(item.features) ? item.features.length : 0,
      })),
      message:
        paymentMethod === "card"
          ? "Kart ödeme oturumu oluşturuldu. Ödeme sağlayıcısı entegrasyonu bağlandığında yönlendirme yapılır."
          : "IBAN ödeme talebi oluşturuldu. Dekont kontrolünden sonra paketler aktif edilir.",
    },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}
