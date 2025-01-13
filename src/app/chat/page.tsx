import { ChatTerminal } from "@/components/chat-terminal"

export default function ChatPage() {
  return (
    <main className="container max-w-[95vw] mx-auto p-4">
      <div className="flex flex-col items-center mb-8">
        <div className="flex flex-col items-center gap-4 mb-4">
          <h1 className="text-[32px] font-bold leading-[36px] text-center">
            <span className="text-[var(--ocean-dark)]">Chat with</span>{" "}
            <span className="text-[var(--coral)]">Eliza</span>
          </h1>
          <h2 className="text-[18px] leading-[24px] text-center text-[var(--ocean-dark)]/60">
            Your personal DeFi assistant 🤖
          </h2>
        </div>
        <ChatTerminal />
      </div>
    </main>
  )
} 