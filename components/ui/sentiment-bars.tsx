interface SentimentBarsProps {
    sentiments: {
      emotion: string
      score: number
      color: string
    }[]
  }
  
  export function SentimentBars({ sentiments }: SentimentBarsProps) {
    return (
      <div className="grid grid-cols-3 gap-4 mt-2">
        {sentiments.map((sentiment) => (
          <div key={sentiment.emotion} className="flex flex-col gap-1">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground capitalize">
                {sentiment.emotion}
              </span>
              <span className="text-muted-foreground">
                {sentiment.score.toFixed(2)}
              </span>
            </div>
            <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${sentiment.score * 100}%`,
                  backgroundColor: sentiment.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    )
  }
  
  