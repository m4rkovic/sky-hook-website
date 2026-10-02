import { redirect } from "next/navigation";

export default async function ReleaseRedirect({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  redirect(`/en/music/${slug}`);
}
