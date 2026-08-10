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
  /**
   * Подсказка браузеру для выбора из srcset / layout.
   * По умолчанию — карточки контента.
   */
  sizes?: string;
  /**
   * Опциональный srcSet для <img> (JPEG) — только реальные файлы.
   * Пример: "/images/x.jpg 800w, /images/x-1200.jpg 1200w"
   */
  srcSet?: string;
  /** Опциональный srcSet для WebP <source> — только существующие файлы */
  webpSrcSet?: string;
  /**
   * Отдельный mobile-источник (только если файл реально есть).
   * Не передавать выдуманные пути вроде *-mobile без файла.
   */
  mobileSrc?: string;
  /** media для mobileSrc */
  mobileMedia?: string;
};

const DEFAULT_SIZES =
  "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";

/**
 * <picture> WebP + JPEG с настоящим fallback для корпоративных прокси.
 *
 * onError:
 *   1-я ошибка на .webp → убираем <source>, браузер берёт JPEG;
 *   2-я ошибка (JPEG) → fallback того же размера.
 * Без циклов: setState максимум дважды.
 *
 * SSR: ошибка до гидрации → на mount проверяем complete && naturalWidth === 0.
 * Без /_next/image — прямые /images/... (optimizer в корп. сетях → 400).
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
  sizes = DEFAULT_SIZES,
  srcSet,
  webpSrcSet,
  mobileSrc,
  mobileMedia = "(max-width: 768px)",
}: PictureImageProps) {
  const jpg = jpegSibling(src) ?? (/\.jpe?g$/i.test(src) ? src : undefined);
  const mobileJpg = mobileSrc
    ? (jpegSibling(mobileSrc) ??
      (/\.jpe?g$/i.test(mobileSrc) ? mobileSrc : undefined))
    : undefined;
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
      sizes={sizes}
      srcSet={srcSet}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      decoding="async"
      className={className}
      style={style}
      onError={(e) => applyErrorFallback(e.currentTarget)}
    />
  );

  const useWebpSources = !webpBlocked && isWebp(src) && Boolean(jpg);
  const useMobile =
    Boolean(mobileSrc) &&
    !webpBlocked &&
    (isWebp(mobileSrc!) || Boolean(mobileJpg));

  if (!useWebpSources && !useMobile) {
    return img;
  }

  return (
    <picture>
      {useMobile && mobileSrc && isWebp(mobileSrc) ? (
        <source type="image/webp" media={mobileMedia} srcSet={mobileSrc} />
      ) : null}
      {useMobile && mobileJpg ? (
        <source media={mobileMedia} srcSet={mobileJpg} />
      ) : null}
      {useWebpSources ? (
        <source type="image/webp" srcSet={webpSrcSet ?? src} sizes={sizes} />
      ) : null}
      {img}
    </picture>
  );
}
