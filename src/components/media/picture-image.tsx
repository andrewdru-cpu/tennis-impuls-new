"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

import { isWebp, jpegSibling } from "@/lib/image-fallback";

type PictureImageProps = {
  /** Основной источник (обычно .webp) */
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Hero / модалки: eager + fetchPriority=high; остальное lazy */
  eager?: boolean;
  className?: string;
  style?: CSSProperties;
  /** Что показать, если и JPEG не загрузился (null — просто убрать img) */
  fallback?: ReactNode;
};

/**
 * <picture> WebP + JPEG с настоящим fallback для корпоративных прокси.
 *
 * Важно: сам по себе <picture> НЕ переключается на JPEG, если браузер
 * поддерживает WebP, но прокси блокирует ответ. Поэтому onError:
 *   1-я ошибка на .webp → убираем <source>, браузер перезапрашивает JPEG;
 *   2-я ошибка (JPEG тоже недоступен) → рендерим fallback того же размера.
 * setState вызывается максимум дважды — цикла ререндеров нет.
 *
 * SSR-нюанс: для картинок выше fold ошибка загрузки может случиться ДО
 * гидрации React — onError уже не сработает. Поэтому на mount проверяем
 * `img.complete && naturalWidth === 0` и применяем ту же логику.
 */
export function PictureImage({
  src,
  alt,
  width,
  height,
  eager = false,
  className,
  style,
  fallback = null,
}: PictureImageProps) {
  const jpg = jpegSibling(src);
  const imgRef = useRef<HTMLImageElement>(null);
  const [webpBlocked, setWebpBlocked] = useState(false);
  const [failed, setFailed] = useState(false);

  const applyErrorFallback = (el: HTMLImageElement) => {
    const current = el.currentSrc || el.src;
    if (!webpBlocked && jpg && !/\.jpe?g(\?|$)/i.test(current)) {
      setWebpBlocked(true);
      return;
    }
    setFailed(true);
  };

  // Ошибка могла произойти до гидрации (SSR + блокирующий прокси)
  useEffect(() => {
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth === 0) {
      applyErrorFallback(el);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- одноразовая проверка после mount/ре-рендера источника
  }, [webpBlocked]);

  if (failed) return <>{fallback}</>;

  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={imgRef}
      src={jpg ?? src}
      alt={alt}
      width={width}
      height={height}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      decoding="async"
      className={className}
      style={style}
      onError={(e) => applyErrorFallback(e.currentTarget)}
    />
  );

  if (webpBlocked || !isWebp(src) || !jpg) {
    return img;
  }

  return (
    <picture>
      <source type="image/webp" srcSet={src} />
      {img}
    </picture>
  );
}
