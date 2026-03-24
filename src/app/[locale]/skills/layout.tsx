import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

const BASE_URL = "https://51claw.xyz";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.skills" });
  const url = `${BASE_URL}/${locale}/skills`;

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: url,
      languages: { "zh-TW": `${BASE_URL}/zh-TW/skills`, en: `${BASE_URL}/en/skills` },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url,
      siteName: "51Claw",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

export default function SkillsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
