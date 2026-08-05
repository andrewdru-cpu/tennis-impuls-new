import { HeroMedia } from "@/components/hero/hero-media";
import { cn } from "@/lib/utils";

/**
 * Hero — Server Component.
 * Текст слева поверх фото (как в исходном дизайне).
 * Inline-цвета: видны без Tailwind CSS.
 */
export function Hero() {
  return (
    <section
      id="hero"
      className={cn(
        "relative isolate flex min-h-[min(100svh,56rem)] flex-col overflow-x-clip",
        "justify-start pb-[max(2.75rem,env(safe-area-inset-bottom,0px))]",
        "pt-[calc(5rem+env(safe-area-inset-top,0px))]"
      )}
      style={{
        backgroundColor: "#0A2F24",
        color: "#ffffff",
      }}
    >
      <HeroMedia />

      <div
        data-hero-content
        className="relative z-20 flex w-full flex-1 flex-col justify-center"
        style={{
          opacity: 1,
          visibility: "visible",
          color: "#ffffff",
        }}
      >
        {/* Обычный контейнер сайта — текст слева, не справа и не по центру ultrawide */}
        <div className="container-wide flex flex-col items-start py-6 text-left">
          <div
            className="relative isolate flex w-full min-w-0 max-w-2xl flex-col items-start px-1 py-6 text-left sm:px-0"
            style={{ color: "#ffffff" }}
          >
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                zIndex: -1,
                borderRadius: "1rem",
                backgroundColor: "rgba(10, 47, 36, 0.55)",
              }}
            />

            <p
              style={{
                margin: 0,
                fontSize: "0.6875rem",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#E63946",
                opacity: 1,
              }}
            >
              ЦТТ «Импульс» · Лосиный Остров
            </p>

            <h1
              style={{
                margin: "1.25rem 0 0",
                maxWidth: "100%",
                fontSize: "clamp(1.625rem, 1.2rem + 2vw, 3.125rem)",
                fontWeight: 800,
                lineHeight: 1.12,
                letterSpacing: "-0.02em",
                color: "#ffffff",
                textShadow: "0 2px 40px rgba(0,0,0,0.55)",
                overflowWrap: "anywhere",
                opacity: 1,
                visibility: "visible",
              }}
            >
              <span style={{ display: "block", color: "#ffffff" }}>
                Теннис, фитнес
              </span>
              <span style={{ display: "block", marginTop: "0.125rem" }}>
                <span style={{ color: "#ffffff" }}>и отдых — в </span>
                <span style={{ color: "#E63946" }}>одном месте</span>
              </span>
            </h1>

            <p
              style={{
                margin: "1rem 0 0",
                maxWidth: "100%",
                fontSize: "0.9375rem",
                fontWeight: 500,
                lineHeight: 1.6,
                color: "#ffffff",
                textShadow: "0 1px 3px rgba(0,0,0,0.55)",
                overflowWrap: "anywhere",
                opacity: 1,
                visibility: "visible",
              }}
            >
              Всё для спорта, восстановления и отдыха — в экологически чистой зоне
              у Лосиного Острова.
            </p>

            <ul
              style={{
                margin: "1.25rem 0 0",
                padding: 0,
                listStyle: "none",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "flex-start",
                gap: "0.5rem 0.75rem",
                fontSize: "0.8125rem",
                fontWeight: 600,
                color: "#F5E6D3",
                opacity: 1,
              }}
            >
              <li>В 3 минутах от Москвы</li>
              <li>Бесплатная парковка</li>
            </ul>

            <div
              style={{
                marginTop: "1.75rem",
                display: "flex",
                width: "100%",
                maxWidth: "24rem",
                flexDirection: "column",
                gap: "0.75rem",
                opacity: 1,
              }}
            >
              <a
                href="#booking"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  minHeight: "3rem",
                  width: "100%",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "9999px",
                  backgroundColor: "#E05A38",
                  color: "#ffffff",
                  fontSize: "0.9375rem",
                  fontWeight: 700,
                  textDecoration: "none",
                  boxShadow: "0 10px 32px -6px rgba(206,88,56,0.65)",
                  opacity: 1,
                  visibility: "visible",
                }}
              >
                Забронировать корт
              </a>
              <a
                href="#services"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  minHeight: "3rem",
                  width: "100%",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "9999px",
                  border: "2px solid rgba(255,255,255,0.4)",
                  backgroundColor: "rgba(7, 31, 24, 0.55)",
                  color: "#ffffff",
                  fontSize: "0.9375rem",
                  fontWeight: 700,
                  textDecoration: "none",
                  opacity: 1,
                  visibility: "visible",
                }}
              >
                Услуги и цены
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
