import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

const BASE_URL = "https://hunterkit.xyz";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.bundles" });
  const url = `${BASE_URL}/${locale}/bundles`;

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: url,
      languages: { "zh-TW": `${BASE_URL}/zh-TW/bundles`, en: `${BASE_URL}/en/bundles` },
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

export default function BundlesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
