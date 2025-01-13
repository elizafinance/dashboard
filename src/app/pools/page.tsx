import { LiquidityPools } from "@/components/liquidity-pools";

export default function PoolsPage() {
  return (
    <main className="container max-w-[95vw] mx-auto">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-[32px] font-bold leading-[36px] text-center mb-4">
          <span className="text-[rgb(36,36,36)]">Liquidity</span>{" "}
          <span className="text-gray-400">Pools</span>
        </h1>
        <h2 className="text-[18px] leading-[24px] text-center text-[rgb(68,77,86)] mb-8">
          Provide liquidity to earn rewards
        </h2>
        <LiquidityPools />
      </div>
    </main>
  );
} 