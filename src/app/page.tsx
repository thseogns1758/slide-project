"use client";

import Image from "next/image";

const ASSIGNMENT_CONFIG = {
  title: "Image Carousel",
  subtitle: "Telepix Cosmo Pioneers Fellowship",
  description:
    "여러 장의 이미지를 순차적으로 전환하며 표시할 수 있는 웹 기반 이미지 캐러셀 애플리케이션을 제작하는 것으로, 좌우 버튼·자동 슬라이드·전환 애니메이션·인디케이터 등 다양한 조작 기능을 구현하여 제한된 공간에서도 시각적으로 효율적인 콘텐츠 표현이 가능하도록 구현해야 합니다.",
};

function Logo() {
  return (
    <div className="animate-fade-slide-up stagger-1 flex justify-center mb-8">
      <Image
        src="/logos/telepix-dark.webp"
        alt="Telepix"
        width={160}
        height={40}
        className="dark:hidden animate-float"
        priority
      />
      <Image
        src="/logos/telepix-white.webp"
        alt="Telepix"
        width={160}
        height={40}
        className="hidden dark:block animate-float"
        priority
      />
    </div>
  );
}

function Header() {
  return (
    <header className="relative z-10 pt-16 pb-8 px-6 text-center">
      <Logo />
      <p className="animate-fade-slide-up stagger-2 text-sm font-mono tracking-widest text-accent uppercase mb-4">
        {ASSIGNMENT_CONFIG.subtitle}
      </p>
      <h1 className="animate-fade-slide-up stagger-2 text-5xl md:text-7xl font-bold tracking-tight mb-6">
        <span className="text-accent">{ASSIGNMENT_CONFIG.title}</span>
      </h1>
      <p className="animate-fade-slide-up stagger-3 max-w-2xl mx-auto text-muted text-lg leading-relaxed">
        {ASSIGNMENT_CONFIG.description}
      </p>
    </header>
  );
}

function BackgroundPattern() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="geo-pattern absolute inset-0" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-linear-to-br from-telepix-200/30 to-telepix-400/10 dark:from-telepix-900/50 dark:to-telepix-700/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-linear-to-tr from-telepix-200/30 to-telepix-400/10 dark:from-telepix-900/50 dark:to-telepix-700/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-telepix-100/20 dark:bg-telepix-900/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
}

export default function Home() {
  return (
    <div className="relative w-full h-screen">
      <BackgroundPattern />
      <main className="relative flex flex-col items-center justify-center w-full h-full">
        <Header />
      </main>
    </div>
  );
}
