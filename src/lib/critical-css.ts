/**
 * Критический CSS в <head>/<body> — читаемый сайт, если /_next/static/css/*.css
 * не загрузился (корп. прокси, устаревший HTML после деплоя, блокировка CDN).
 * Не заменяет Tailwind; только аварийный слой.
 */
export const CRITICAL_CSS = `
html{box-sizing:border-box}
*,*::before,*::after{box-sizing:inherit}
body{
  margin:0;
  background:#F8F5F0;
  color:#1F2E2A;
  font-family:system-ui,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  line-height:1.55;
  -webkit-text-size-adjust:100%;
}
a{color:inherit}
img,video{max-width:100%;height:auto}
main,section,header,nav,footer{display:block}
/* Навбар: читаем без Tailwind */
header[data-site-header]{
  position:sticky;
  top:0;
  z-index:50;
  background:rgba(255,255,255,.94);
  border-bottom:1px solid rgba(10,47,36,.1);
  color:#1F2E2A;
}
header[data-site-header] a{text-decoration:none;color:inherit}
header[data-site-header] nav{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:.75rem;
  min-height:64px;
  max-width:80rem;
  margin:0 auto;
  padding:.5rem max(1rem,env(safe-area-inset-left,0px));
}
/* Hero: тёмный фон + белый текст даже без полного CSS */
#hero{
  background-color:#0A2F24;
  color:#fff;
  min-height:100vh;
  min-height:100svh;
  position:relative;
}
#hero [data-hero-content],
#hero [data-hero-content] *{
  opacity:1!important;
  visibility:visible!important;
}
#hero h1,#hero p,#hero a,#hero span{color:#fff}
#hero a[href]{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  gap:.5rem;
  min-height:48px;
  padding:.75rem 1.35rem;
  margin:.25rem 0;
  border-radius:9999px;
  text-decoration:none;
  font-weight:700;
  background:#E05A38;
  color:#fff!important;
}
/* Секции: не схлопываются в одну стену текста */
section[id]{
  padding:2.5rem max(1rem,env(safe-area-inset-left,0px));
  max-width:80rem;
  margin-left:auto;
  margin-right:auto;
}
h1,h2,h3{line-height:1.2;font-weight:700}
button,input,textarea,select{font:inherit}
`.replace(/\s+/g, " ").trim();
