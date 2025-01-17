export function shareOnX(metrics: {
  defaiScore: number;
  performance: {
    daily: number;
    vsCMC100: number;
  };
  metrics: {
    capitalManagement: number;
    degenIndex: number;
    defiSavviness: number;
  };
}) {
  const tweetText = `🤖 My $DeFAI Portfolio Metrics:

🎯 $DeFAI Score: ${metrics.defaiScore}
📈 24h Performance: ${metrics.performance.daily.toFixed(2)}%
🏆 vs CMC100: ${metrics.performance.vsCMC100.toFixed(2)}%
💼 Capital Management: ${metrics.metrics.capitalManagement}
🎲 Degen Index: ${metrics.metrics.degenIndex}
🧠 DeFi Savviness: ${metrics.metrics.defiSavviness}

Get Your Own Score at https://my.eliza.finance
`;

  const encodedTweet = encodeURIComponent(tweetText);
  window.open(`https://twitter.com/intent/tweet?text=${encodedTweet}`, '_blank');
} 