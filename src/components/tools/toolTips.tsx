export function FlowToolTip() {
    return (
        <p>
            <span className="text-white">White Flow</span>  - Order Size Does Not Surpass Daily Open Interest (Low Aggression) <br /> <br />
            <span className="text-white">Yellow Flow</span>  - Order Size Surpasses Daily Open Interest With Single Order (High Aggression) <br /> <br />
            <span className="text-white">Blue Flow</span> - Order Surpasses Daily Open Interest With Multiple Orders (Medium Aggression) <br /> <br />
            <span className="text-white">Block Trade</span> - Large Trade Transaction Done on a Single Exchange <br /> <br />
            <span className="text-white">Sweep Trade</span> - Large Trade Transaction Executed Through Multiple Exchanges. Indicates Urgency To Execute Trade <br /> <br /> 
            <span className="text-white">Ask Execution (A)</span> - Trade Executed At The Asking Price <br /> <br />
            <span className="text-white">Above Ask Execution (AA)</span> - Trade Executed Above The Asking Price (Aggressive) <br /> <br />
            <span className="text-white">Bid Execution (B)</span> - Trade Executed At The Bidding Price <br /> <br />
            <span className="text-white">Below Bid Execution (BB)</span> - Trade Executed Below The Bidding Price. Could Indicate Closing Position
        </p>
    )
}

export function FlowAiToolTip() {
    return (
        <p>
            <span className="text-white">Repeat Bullish/Bearish</span> - Multiple Orders Targeting an Option Contract With Identical Strike & Expiration Within a Relevant Time Period <br /> <br />
            <span className="text-white">Aggressive Bullish/Bearish</span> - Aggressive Transaction Exceeding Open Interest & Expiring Same Week <br /> <br />
            <span className="text-white">Heavy Bullish/Bearish</span> - Aggressive Transaction Filled At Asking Price With Heavy Market Value & Exceeding Open Interest <br /> <br />
            <span className="text-white">Impulsive Bullish/Bearish</span> - ultiple Orders Targeting an Option Contract With Identical Strike & Expiration Within a 2 Minute Time Period <br /> <br />
            <span className="text-white">Premium Spike Bullish/Bearish</span> - Multiple Orders Targeting an Option Contract With Identical Strike & Expiration Which Is Suddenly Spiking Contract Price <br /> <br /> 
            <span className="text-white">Premium Increase Bullish/Bearish</span> - Multiple Orders Targeting an Option Contract With Identical Strike & Expiration Which Is Progressively Increasing Contract Price <br /> <br />
        </p>
    )
}