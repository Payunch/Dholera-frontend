import UpdateDetailPage, { generateMetadata as originalGenerateMetadata } from "@/app/(public)/blogs/[slug]/page";

export async function generateMetadata(props, parent) {
  return originalGenerateMetadata({ ...props, explicitLang: 'gu' }, parent);
}

export default async function Page(props) {
  return <UpdateDetailPage {...props} explicitLang="gu" />;
}
