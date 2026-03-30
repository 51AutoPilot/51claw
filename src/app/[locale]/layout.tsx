import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Space_Grotesk, Noto_Sans_TC, JetBrains_Mono } from "next/font/google";
import { routing } from "@/i18n/routing";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/JsonLd";
import "../globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const notoSansTC = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-tc",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  const url = `https://hunterkit.xyz/${locale}`;

  return {
    title: t("title"),
    description: t("description"),
    metadataBase: new URL("https://hunterkit.xyz"),
    alternates: {
      canonical: url,
      languages: { "zh-TW": "https://hunterkit.xyz/zh-TW", en: "https://hunterkit.xyz/en" },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url,
      siteName: "HunterKit",
      type: "website",
      locale: locale === "zh-TW" ? "zh_TW" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      creator: "@0x515151",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return (
    <html
      lang={locale}
      className={`h-full antialiased ${spaceGrotesk.variable} ${notoSansTC.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground bg-grid">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "HunterKit",
            url: "https://hunterkit.xyz",
            description: "AI Skills Hub — MCP / Claude practical guides",
            inLanguage: [locale === "zh-TW" ? "zh-TW" : "en"],
            potentialAction: {
              "@type": "SearchAction",
              target: `https://hunterkit.xyz/${locale}/skills?q={search_term_string}`,
              "query-input": "required name=search_term_string",
            },
          }}
        />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Nav />
          <main className="flex-1 pt-16 animate-page-enter">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
