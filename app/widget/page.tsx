import { ChatWidget } from "@/components/chat-widget";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function WidgetPage() {
  return (
    <main className="widget-page">
      <ChatWidget />
    </main>
  );
}
