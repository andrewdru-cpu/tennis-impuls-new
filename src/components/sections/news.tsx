"use client";

import { useState } from "react";
import { ArrowUpRight, CalendarDays } from "@/lib/icons";

import { SectionHeading } from "@/components/section-heading";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { MediaImage } from "@/components/media/media-image";
import { NewsModal } from "@/components/news/news-modal";
import { Card } from "@/components/ui/card";
import { newsArticles, isRecentNews, type NewsArticle } from "@/lib/news";
import { cn } from "@/lib/utils";

function NewsCard({
  article,
  index,
  onOpen,
}: {
  article: NewsArticle;
  index: number;
  onOpen: (article: NewsArticle) => void;
}) {
  return (
    <Reveal delay={index * 0.06}>
      <Card
        className={cn(
          "group relative flex h-full cursor-pointer flex-col overflow-hidden border-forest-900/10 shadow-card",
          "transition-all duration-500 hover:-translate-y-1 hover:border-lime/45 hover:shadow-glow"
        )}
        onClick={() => onOpen(article)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpen(article);
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={`Читать новость: ${article.title}`}
      >
        <MediaImage
          media={article.image}
          ratio="photo"
          rounded={false}
          imageClassName="group-hover:scale-105 saturate-[1.06]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {isRecentNews(article.dateISO) && (
          <span className="absolute left-4 top-4 rounded-full bg-lime px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-forest-900 shadow-soft sm:text-xs">
            Новое
          </span>
        )}
        <div className="relative flex flex-1 flex-col p-5 sm:p-6">
          <time
            dateTime={article.dateISO}
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
          >
            <CalendarDays className="h-3.5 w-3.5 text-lime-600" aria-hidden />
            {article.date}
          </time>
          <h3 className="mt-3 text-card-title transition-colors group-hover:text-lime-600">
            {article.title}
          </h3>
          <p className="mt-2 line-clamp-3 flex-1 text-card-body">
            {article.excerpt}
          </p>
          <span className="mt-5 inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-forest-900 transition-colors group-hover:text-lime-600">
            Читать полностью
            <ArrowUpRight className="h-4 w-4 shrink-0" />
          </span>
        </div>
      </Card>
    </Reveal>
  );
}

export function News() {
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null);

  return (
    <Section id="news" tone="muted">
        <SectionHeading
          eyebrow="Новости клуба"
          title={
            <>
              Свежие события{" "}
              <span className="text-lime-600">ЦТТ «Импульс»</span>
            </>
          }
          description="Турниры, расписания и события комплекса — только актуальные материалы за последние дни."
        />

        <div className="section-inner mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:gap-6">
          {newsArticles.map((article, i) => (
            <NewsCard
              key={article.id}
              article={article}
              index={i}
              onOpen={setActiveArticle}
            />
          ))}
        </div>

      <NewsModal
        article={activeArticle}
        onClose={() => setActiveArticle(null)}
      />
    </Section>
  );
}
