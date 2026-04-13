const WHATSAPP_NUMBER = "212632454694";
const WHATSAPP_TEXT = encodeURIComponent("مرحبًا! أود الاستفسار عن منتجات كريستال أويل.");

const WhatsAppWidget = () => {
    const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_TEXT}`;

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
            <div className="hidden md:block">
                <div className="rounded-[30px] bg-slate-950/95 px-5 py-4 text-right text-base leading-6 text-white shadow-[0_20px_60px_rgba(15,23,42,0.35)] backdrop-blur-xl">
                    <p className="font-semibold text-white">مرحبًا! تحدث معنا عبر واتساب</p>
                    <p className="mt-1 text-sm text-slate-300">استفسر عن الطلبات أو اطلب مساعدة مباشرة.</p>
                </div>
            </div>

            <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="اتصل بنا عبر واتساب"
                className="group relative inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-[0_24px_60px_rgba(16,185,129,0.35)] transition-transform duration-300 hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-4 focus:ring-offset-transparent"
            >
                <span className="absolute inset-0 rounded-full bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="absolute -bottom-1 h-2 w-2 rounded-full bg-emerald-300 opacity-90 animate-pulse" />

                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-whatsapp" viewBox="0 0 16 16">
                    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                </svg>
            </a>
        </div>
    );
};

export default WhatsAppWidget;
