import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

const BASE_URL = "https://hunterkit.xyz";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.install" });
  const url = `${BASE_URL}/${locale}/install`;

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: url,
      languages: { "zh-TW": `${BASE_URL}/zh-TW/install`, en: `${BASE_URL}/en/install` },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url,
      siteName: "HunterKit",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

export default function InstallLayout({ children }: { children: React.ReactNode }) {
  return children;
}
