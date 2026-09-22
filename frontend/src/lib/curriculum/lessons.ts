import type { Lesson } from "./types";

export const LESSONS: Lesson[] = [
  
  {
    id: "0.1",
    level: 0,
    title: "What is a company?",
    concept: "Company basics",
    minutes: 4,
    summary: "A company is a business that sells a product or service to make a profit.",
    body: [
      {
        kind: "paragraph",
        text: "A **company** is a business that sells a product or a service. It exists to make a **profit** by providing something people are willing to pay for. A bakery selling bread, a bank lending money, a telecom selling airtime, a matatu operator moving passengers: all of these are companies. The thing they share is that they take in money from customers and spend less than they take in.",
      },
      {
        kind: "paragraph",
        text: "Companies come in every size. A small duka on the corner is owned by one person. A mid-sized company like a local manufacturer might be owned by a family. A large company like Safaricom is owned by hundreds of thousands of **shareholders**, most of whom have never met each other and never will. Every one of those shareholders owns a small piece of the same business.",
      },
      {
        kind: "paragraph",
        text: "What makes a company different from a charity or a government body is the profit motive. A charity exists to serve a mission. A government exists to provide public services. A company exists to generate a return for the people who put money into it. That does not mean companies cannot be ethical or serve a social purpose. It means the reason capital flows into them is the expectation of a return.",
      },
      {
        kind: "paragraph",
        text: "For you as a beginner investor, the important insight is that a share is not a lottery ticket or a casino chip. It is a legal claim on a real business. When you buy a share, you become a part-owner of everything that business does, owns, and owes. That is why understanding the business matters before understanding the price.",
      },
      {
        kind: "example",
        title: "Example",
        text: "Safaricom sells mobile services, mobile money through M-Pesa, and data. It earns money from every call placed, every text sent, every M-Pesa transaction, and every data plan subscribed to. It spends money on towers, spectrum licences, staff salaries, and network maintenance. What remains after all of that is its profit, and that profit belongs to the shareholders.",
      },
      {
        kind: "takeaway",
        text: "A company sells something people want, and keeps a portion of the money left after costs.",
      },
    ],
  },
  {
    id: "0.2",
    level: 0,
    title: "Why companies need money",
    concept: "Capital",
    minutes: 4,
    summary: "Growth requires capital, and capital comes from investors or lenders.",
    body: [
      {
        kind: "paragraph",
        text: "To grow, a company needs **capital**: money to open new branches, hire people, buy equipment, and fund research. A bakery that wants to serve more customers needs a bigger oven. A telecom that wants better coverage needs more towers. A bank that wants more customers needs more branches and more staff. None of that is free.",
      },
      {
        kind: "paragraph",
        text: "Capital comes from one of two places. **Lenders** give money with the expectation that it will be repaid, plus interest. **Investors** give money in exchange for a share of the future profits of the business. Both are ways to fund growth, but they come with very different incentives and very different risks.",
      },
      {
        kind: "paragraph",
        text: "Lenders are cautious. They want their money back regardless of how the company performs. If the business fails, lenders are paid before anyone else. Because their downside is limited, their upside is limited too: they only earn the agreed interest rate. Investors take on more risk. If the company does badly, they can lose everything they put in. In exchange, they get a share of the upside with no cap.",
      },
      {
        kind: "paragraph",
        text: "This tradeoff shows up everywhere in the market. Companies that are stable and predictable tend to borrow more because they can safely service debt. Companies that are young or volatile tend to raise equity because they cannot guarantee the fixed payments a lender would demand. When you look at a company balance sheet later in this course, you will see this tradeoff written into the numbers.",
      },
      {
        kind: "example",
        title: "Example",
        text: "A local bakery wants to open a second branch. It needs KSh 2,000,000. A bank might lend it that amount at 14% interest, expecting KSh 280,000 a year in interest plus the principal back after five years. An investor might put in the same KSh 2,000,000 in exchange for 20% of the business forever. The bank is repaid. The investor owns a piece of every future profit the bakery ever makes.",
      },
      {
        kind: "takeaway",
        text: "Lenders get paid back. Investors own a piece of the future.",
      },
    ],
  },
  {
    id: "0.3",
    level: 0,
    title: "What is a share?",
    concept: "Share ownership",
    minutes: 5,
    summary: "A share is a unit of ownership in a company.",
    body: [
      {
        kind: "paragraph",
        text: "A **share** is one unit of ownership in a company. If a company has issued 1,000,000 shares and you own 1,000 of them, you own 0.1% of that business. Every shilling of profit that the company distributes belongs to shareholders in proportion to how many shares they hold. If the company is sold tomorrow, the sale price is divided among the shareholders on the same basis.",
      },
      {
        kind: "paragraph",
        text: "Owning shares gives you two potential returns. If the company grows and the share price rises, the value of your holding rises. This is called **capital appreciation**. If the company pays a **dividend**, you receive a portion of the profits directly. This is called **income**. A stock can deliver one, the other, or both, depending on the company and the market environment.",
      },
      {
        kind: "paragraph",
        text: "Shares also come with **rights**. As a shareholder, you can vote on major decisions at the annual general meeting, receive the annual report, and in some cases participate in rights issues when the company raises more capital. For most retail investors, the most valuable right is the one you exercise by choosing which companies to own in the first place.",
      },
      {
        kind: "paragraph",
        text: "The number of shares a company has issued is not fixed. A company can issue more shares to raise money, which reduces the ownership percentage of every existing shareholder. This is called **dilution**, and it is why serious investors watch the share count as well as the share price. A company that is constantly issuing new shares to fund itself is quietly taking value from its existing owners.",
      },
      {
        kind: "example",
        title: "Example",
        text: "A company has 1,000,000 shares. You buy 1,000 of them at KSh 100 each, so you invest KSh 100,000. The company earns KSh 5,000,000 this year and pays KSh 3 per share as a dividend. You receive KSh 3,000. If the share price rises to KSh 110, your holding is now worth KSh 110,000. If the company later issues another 1,000,000 shares to fund an acquisition, your slice of the business halves overnight.",
      },
      {
        kind: "takeaway",
        text: "A share is a slice of a real business, not a lottery ticket.",
      },
    ],
  },
  {
    id: "0.4",
    level: 0,
    title: "What is a stock exchange?",
    concept: "Market structure",
    minutes: 5,
    summary: "A stock exchange is a marketplace where buyers and sellers meet.",
    body: [
      {
        kind: "paragraph",
        text: "A **stock exchange** is a marketplace where people buy and sell shares. It is not a physical building any more, and it has not been for decades. It is a set of rules, computer systems, and clearing mechanisms that match buyers with sellers. In Kenya, the main exchange is the **Nairobi Securities Exchange (NSE)**, which has been operating in various forms since 1954.",
      },
      {
        kind: "paragraph",
        text: "Not every company can list on an exchange. A company that wants to list agrees to a long list of obligations: it must publish its financial statements every quarter, disclose material events promptly, follow rules on how it treats minority shareholders, and submit to ongoing supervision by the exchange and the Capital Markets Authority. That transparency is what makes it possible for strangers to buy shares without meeting the managers.",
      },
      {
        kind: "paragraph",
        text: "The exchange itself does not set prices. It provides the infrastructure for buyers and sellers to find each other and agree on a price. When those prices are visible to everyone, the market becomes a public scoreboard for how every listed company is being perceived by investors. That is why people say the market is a weighing machine in the long run and a voting machine in the short run.",
      },
      {
        kind: "paragraph",
        text: "When you buy shares through a broker, the broker sends your order to the exchange. The exchange matches it with someone willing to sell at your price. Once matched, the trade is confirmed and both sides are contractually bound. Then the settlement process begins, which you will see in detail later in Level 1.",
      },
      {
        kind: "example",
        title: "Example",
        text: "Safaricom trades on the NSE under the ticker **SCOM**. When you place a buy order for 100 shares of SCOM, your broker sends it to the exchange. The exchange finds a matching seller and confirms the trade. From your point of view, the whole thing happens in a few seconds. From the market point of view, another small piece of Safaricom has just changed hands.",
      },
      {
        kind: "takeaway",
        text: "The exchange is where ownership changes hands. It does not set prices; buyers and sellers do.",
      },
    ],
  },
  {
    id: "0.5",
    level: 0,
    title: "How prices form",
    concept: "Price formation",
    minutes: 5,
    summary: "Price is set by supply and demand at every instant.",
    body: [
      {
        kind: "paragraph",
        text: "A share price is not a fixed number. It is the price at which the most recent trade happened, and it changes every time a new trade occurs. Every moment during trading hours, buyers are offering prices and sellers are asking prices. The **market price** is the point at which a buyer and a seller agreed to transact.",
      },
      {
        kind: "paragraph",
        text: "If more people want to buy than to sell, buyers must raise their offers to get shares. The price rises. If more people want to sell than to buy, sellers must lower their asks. The price falls. That is the whole mechanism. Every movement you see on a chart is the accumulated record of thousands of these small negotiations between buyers and sellers.",
      },
      {
        kind: "paragraph",
        text: "What makes buyers and sellers change their minds? Three things, mostly. First, news about the company: an earnings report, a new product, a change in management. Second, news about the market: interest rate changes, inflation data, political events. Third, the actions of other traders: if you see the price rising fast, you may decide to buy before you miss out, which pushes the price even higher. These forces can compound quickly, which is why markets sometimes move a lot on what seems like small news.",
      },
      {
        kind: "paragraph",
        text: "Understanding this is essential, because it tells you what a share price actually represents. It is not a measure of what a company is worth. It is a measure of what the most eager buyer and the most eager seller agreed on today. The two can diverge for long periods. The market can hold a high view of a company that is not yet delivering, and a low view of a company that is quietly doing well.",
      },
      {
        kind: "example",
        title: "Example",
        text: "Good earnings news comes out. Suddenly five buyers want a stock that only one person is selling. That seller will not sell at KSh 50 any more. As the five buyers compete for the one available share, the price jumps to KSh 55. No one decided the stock was worth KSh 55. The price is simply the outcome of that moment supply and demand.",
      },
      {
        kind: "takeaway",
        text: "Prices move because the balance between buyers and sellers changes.",
      },
    ],
  },

  
  {
    id: "1.1",
    level: 1,
    title: "Market orders",
    concept: "Order types",
    minutes: 5,
    summary: "A market order buys or sells immediately at the best available price.",
    body: [
      {
        kind: "paragraph",
        text: "A **market order** is the simplest instruction you can give a broker: buy or sell right now, at whatever price the market offers. You do not specify a price. The order is filled at the best available price from the next willing counterparty. There is one sentence to remember about market orders: they prioritise speed over price certainty.",
      },
      {
        kind: "paragraph",
        text: "The main advantage is **certainty of execution**. If there is a counterparty, the trade happens in seconds. You will not sit in an order book waiting. The trade-off is price uncertainty. You will not know the exact price until the trade completes. In a **liquid** stock, the gap between the expected price and the filled price is tiny, usually a few cents. In an illiquid stock, it can be several percent of the trade value.",
      },
      {
        kind: "paragraph",
        text: "Market orders are used when speed matters more than price. If a stock is falling fast and you want out now, a market order guarantees an exit. If a stock is rising and you want in now, a market order guarantees entry. What you give up is control over the exact price. Professional traders often avoid market orders in thin stocks because the slippage can be large. For beginners trading liquid shares, they are usually fine.",
      },
      {
        kind: "paragraph",
        text: "There is a subtlety here worth knowing early. The price you see quoted is the last traded price, not the price at which your order will fill. If the last trade happened at KSh 35.20 but the next available seller is asking KSh 35.25, your market buy will fill at KSh 35.25. That is not a mistake; it is how the market works. The gap between the quoted price and the executed price is called **slippage**.",
      },
      {
        kind: "example",
        title: "Example",
        text: "You place a market buy for 100 shares of Safaricom at the last traded price of KSh 35.20. There are sellers offering shares at KSh 35.25. Your order fills at KSh 35.25, the ask price. You paid 0.05 more per share than the last traded price, but you own the shares immediately. On a 100-share trade, the total extra cost is KSh 5. On a 10,000-share trade, it is KSh 500.",
      },
      {
        kind: "takeaway",
        text: "Market orders prioritise certainty of execution over certainty of price.",
      },
    ],
  },
  {
    id: "1.2",
    level: 1,
    title: "Limit orders",
    concept: "Order types",
    minutes: 5,
    summary: "A limit order buys or sells only at a specified price or better.",
    body: [
      {
        kind: "paragraph",
        text: "A **limit order** tells the broker: buy or sell, but only at this price or better. A buy limit order will only fill at your limit price or lower. A sell limit order will only fill at your limit price or higher. The order sits in the order book until either the price reaches your level or you cancel it.",
      },
      {
        kind: "paragraph",
        text: "The main advantage is **price certainty**. You will not pay more than your limit, and you will not receive less than your limit. The trade-off is execution uncertainty. If the market never reaches your price, the order does not fill. This is the opposite of a market order: a market order guarantees a fill but not a price, a limit order guarantees a price but not a fill.",
      },
      {
        kind: "paragraph",
        text: "A limit order can be placed above or below the current market price. A buy limit below the market will only fill if the price falls. A sell limit above the market will only fill if the price rises. Both are **waiting orders**: they do nothing until the price reaches your level. For a patient investor, this is often the right way to trade. You decide what price you are comfortable with and let the market come to you.",
      },
      {
        kind: "paragraph",
        text: "Limit orders matter more in illiquid stocks. In a thin market, a market order can move the price several percent. A limit order caps your cost. In a very liquid stock, the difference between a market order and a limit order placed at the current price is negligible. As a general rule: the less liquid the stock, the more a limit order becomes worth using.",
      },
      {
        kind: "example",
        title: "Example",
        text: "You want to buy 500 shares of Safaricom. The current price is KSh 35.25. You believe it will dip, so you place a limit buy at KSh 35.00. If the price never drops to KSh 35.00, you do not buy. If it does, you buy at KSh 35.00 and save KSh 125 on the trade compared to buying at the market. The trade-off is that the price might never dip, and you might miss the move entirely.",
      },
      {
        kind: "takeaway",
        text: "Limit orders prioritise certainty of price over certainty of execution.",
      },
    ],
  },
  {
    id: "1.3",
    level: 1,
    title: "Bid, ask, and the spread",
    concept: "Market mechanics",
    minutes: 5,
    summary: "The bid is the highest price buyers will pay. The ask is the lowest price sellers will accept.",
    body: [
      {
        kind: "paragraph",
        text: "At any moment, every stock on an exchange has two prices. The **bid** is the highest price any buyer is currently willing to pay. The **ask** is the lowest price any seller is currently willing to accept. The **spread** is the difference between the two. Together they are called the quote.",
      },
      {
        kind: "paragraph",
        text: "If you want to buy immediately, you pay the ask. If you want to sell immediately, you receive the bid. That is the cost of immediacy. The spread is a **hidden cost of trading**: a small amount that leaks out of your account every time you cross it. A tight spread of a few cents means the stock is liquid and the cost of entry and exit is low. A wider spread means fewer participants and a higher cost on every trade.",
      },
      {
        kind: "paragraph",
        text: "The spread widens when uncertainty rises. Around major news, earnings reports, or the first minutes after the market opens, the spread can double or triple as traders step back and wait for clarity. It narrows again once the picture is clearer. Watching the spread is a simple way to sense whether now is a calm moment to trade or one where patience might serve you better.",
      },
      {
        kind: "paragraph",
        text: "There is another way to think about the spread. It is what the market is charging you for liquidity. If you are willing to be patient and place a limit order inside the spread, you can often avoid paying it. If you need to trade right now, the spread is the price of that convenience. The market is not unfair; it is simply pricing the service of immediacy.",
      },
      {
        kind: "example",
        title: "Example",
        text: "Safaricom is quoted at bid KSh 35.20, ask KSh 35.25. The spread is KSh 0.05. If you buy at 35.25 and immediately sell at 35.20, you lose KSh 0.05 per share. On 1,000 shares, that is KSh 50 across two trades. In an illiquid small-cap, the spread might be KSh 0.50 on a KSh 20 stock. That is 2.5% of the value, and it is paid every time you trade.",
      },
      {
        kind: "takeaway",
        text: "The spread is a hidden cost of every trade. Tight spreads are better.",
      },
    ],
  },
  {
    id: "1.4",
    level: 1,
    title: "Volume and liquidity",
    concept: "Liquidity",
    minutes: 5,
    summary: "Volume is how many shares traded. Liquidity is how easily you can trade without moving the price.",
    body: [
      {
        kind: "paragraph",
        text: "**Volume** is the total number of shares that changed hands in a given period, usually reported daily. **Liquidity** is how easily you can buy or sell a large quantity of shares without affecting the market price. They are related but distinct: high-volume stocks tend to be liquid, but volume alone does not guarantee liquidity. A stock can trade millions of shares a day and still be thin at any given moment if those trades are sporadic.",
      },
      {
        kind: "paragraph",
        text: "Liquidity matters most when you want to **sell**. In a liquid stock, you can sell a large position quickly without moving the price. In an illiquid stock, a large sell order can push the price down significantly because there are not enough buyers to absorb the supply. A liquid market is often described as **deep**: there are many orders on both the buy and the sell side, so a single trade barely moves the needle.",
      },
      {
        kind: "paragraph",
        text: "This is why institutional investors watch liquidity so closely. A pension fund that needs to sell KSh 500 million of a small-cap stock may find that the market cannot absorb the order without moving the price sharply. They have to sell in small pieces over days, which is slower and more costly. The same order in Safaricom is a rounding error. That is one of the reasons large funds often gravitate toward large stocks.",
      },
      {
        kind: "paragraph",
        text: "For a retail investor, liquidity matters most in two situations. First, when you want to exit a position quickly and cannot find a buyer. Second, when the spread is so wide that the cost of entry and exit eats a meaningful part of your return. Both are reasons to prefer stocks that trade actively, especially while you are still building a feel for how the market behaves.",
      },
      {
        kind: "example",
        title: "Example",
        text: "Stock A trades 5,000,000 shares a day. Stock B trades 20,000 shares a day. You want to sell 30,000 shares of each. In Stock A, your sale is a minor event and the price barely moves. In Stock B, you are a major seller, and your order pushes the price down several percent before it fills. Same trade, same size, very different outcomes.",
      },
      {
        kind: "takeaway",
        text: "Liquidity is about exits. Illiquid positions are easy to enter and hard to leave.",
      },
    ],
  },
  {
    id: "1.5",
    level: 1,
    title: "Settlement",
    concept: "Market mechanics",
    minutes: 5,
    summary: "Settlement is the transfer of shares to your account and cash to the seller's account after a trade.",
    body: [
      {
        kind: "paragraph",
        text: "When a trade is matched on the exchange, that is only the **agreement**. **Settlement** is the actual transfer of ownership: shares move to the buyer account, and cash moves to the seller account. The settlement period is usually expressed as T plus a number, where T is the trade date. Most major markets, including the Nairobi Securities Exchange, use a rolling settlement cycle.",
      },
      {
        kind: "paragraph",
        text: "Until settlement is complete, the trade is legally agreed but not yet finalised. This matters for cash planning. If you sell shares today, the proceeds are typically available on the settlement date, not immediately. The NSE has historically operated on longer cycles, but like many markets, it has been moving toward shorter cycles to improve efficiency and reduce counterparty risk. A shorter settlement cycle means less time for something to go wrong between the trade and the transfer.",
      },
      {
        kind: "paragraph",
        text: "Settlement is also the reason you cannot sell shares and use the money the same day to buy something else in a different account. The sale and the new purchase happen on different settlement cycles. Understanding this prevents the surprise of seeing cash appear in your account two or three days later than expected, and it matters when you are managing your cash position around month end or tax dates.",
      },
      {
        kind: "paragraph",
        text: "On the flip side, when you buy shares, they may not show up in your account immediately either. Until settlement completes, you own the shares in a legal sense, but the custodian may not have registered the transfer. This is normal and is the same for every participant. The market works on a well-defined timeline, and once you know it, you can plan around it.",
      },
      {
        kind: "example",
        title: "Example",
        text: "You sell 200 shares of Safaricom on Monday. The trade executes on Monday, but settlement completes on Wednesday. Your account shows the cash on Wednesday, not Monday. That gap is normal. If you had planned to use those funds for a purchase on Tuesday, you would need to adjust the plan or use other cash.",
      },
      {
        kind: "takeaway",
        text: "A trade is an agreement. Settlement is the delivery.",
      },
    ],
  },
  {
    id: "1.6",
    level: 1,
    title: "Market indices",
    concept: "Market indices",
    minutes: 5,
    summary: "An index tracks the average performance of a group of stocks.",
    body: [
      {
        kind: "paragraph",
        text: "A **market index** is a single number that represents the performance of a group of stocks. In Kenya, the most widely watched indices are the **NSE 20** (the 20 largest companies by a weighted measure) and the **NASI** (the Nairobi All Share Index, which covers every listed share). When people say the market went up, they usually mean an index went up.",
      },
      {
        kind: "paragraph",
        text: "An index does not move the same way as any single stock. On any given day, some shares rise and some fall. The index **nets those out**. That is why your portfolio can fall on a day when the index rises, or rise when the index falls. The index gives you a market-level view, not a portfolio-level view. Keeping the two separate is one of the useful early habits to build.",
      },
      {
        kind: "paragraph",
        text: "Indices matter for two reasons. First, they are the benchmark against which professional investors measure their performance. A fund that returned 8% in a year when its benchmark index returned 12% has underperformed, even though 8% sounds like a good number. Second, they are what most retail investors actually buy when they want broad exposure through an index fund or ETF. Understanding how an index is constructed helps you understand what a fund that tracks it will actually do.",
      },
      {
        kind: "paragraph",
        text: "Different indices are built on different rules. Some are **price-weighted**, meaning expensive stocks have a bigger influence. Some are **market-cap weighted**, meaning larger companies dominate. Some are **equal-weighted**, meaning every stock counts the same. The same list of companies can produce very different indices depending on which weighting method is used. Knowing the method tells you what the index is actually measuring.",
      },
      {
        kind: "example",
        title: "Example",
        text: "The NASI rises 1.2% today. That means the average listed share moved up. But Safaricom might have fallen 0.5% while Equity Group rose 2.8% and KCB rose 1.6%. The index is an average; the individual stocks can go anywhere. If you had owned only Safaricom, your portfolio would have gone down on a day the market went up.",
      },
      {
        kind: "takeaway",
        text: "The index tells you about the market. It does not tell you about your portfolio.",
      },
    ],
  },

  
  {
    id: "2.1",
    level: 2,
    title: "Revenue",
    concept: "Revenue",
    minutes: 5,
    summary: "Revenue is the total money a company receives from selling its product or service, before any costs are subtracted.",
    body: [
      {
        kind: "paragraph",
        text: "**Revenue** is the total amount of money a company receives from its customers before any costs are taken out. It is sometimes called the **top line** because it appears at the very top of the income statement. Every other number on that statement is derived from it. Revenue is the input to the whole financial statement; everything else is what happens to it on the way down.",
      },
      {
        kind: "paragraph",
        text: "Revenue tells you about **demand**. If revenue is growing, more customers are buying, or existing customers are paying more. If revenue is shrinking, something is happening: a competitor is winning, a market is contracting, or a product is going out of fashion. Revenue growth is the first signal that a business is healthy, and revenue decline is often the first sign of trouble.",
      },
      {
        kind: "paragraph",
        text: "Revenue can grow in three ways. The company can sell **more units** of the same product. It can **raise prices**. Or it can **acquire** another business whose revenue is then added to its own. Each method has different implications for the quality of the growth. Selling more units means real customer demand. Raising prices means pricing power and usually improves margins. Acquisition growth can be expensive and often hides what is happening in the underlying business. When you see revenue growth, the first question to ask is which of these three is driving it.",
      },
      {
        kind: "paragraph",
        text: "Revenue is not profit. A company can grow revenue rapidly and still lose money on every sale. A retailer that doubles its sales by heavily discounting might see revenue rise while margins compress. A telecom that adds millions of subscribers by giving away service for free might see revenue hold steady while costs climb. This is why revenue and profit are usually looked at together. Revenue alone tells you the size of the inflow, not whether the business is sustainable.",
      },
      {
        kind: "example",
        title: "Example",
        text: "Safaricom reports revenue of KSh 427.6B in its FY2026 results. That number represents every shilling its customers paid for calls, data, M-Pesa, and everything else. It is not what Safaricom kept, and it does not tell you whether the business was profitable this year. It only tells you the size of the inflow. Whether that inflow turned into profit depends on the costs below it on the income statement.",
      },
      {
        kind: "takeaway",
        text: "Revenue measures the size of the business. It does not measure how efficiently the business runs.",
      },
    ],
  },
  {
    id: "2.2",
    level: 2,
    title: "Profit",
    concept: "Profit",
    minutes: 6,
    summary: "Profit is what remains after a company subtracts its expenses from revenue. There are several levels of profit.",
    body: [
      {
        kind: "paragraph",
        text: "**Profit** is what a company keeps after paying its expenses. There is no single profit number on an income statement; there are three that matter. **Gross profit** is revenue minus the direct cost of making the product. **Operating profit** also subtracts the cost of running the business: staff, rent, marketing. **Net profit** subtracts everything, including interest on debt and taxes. Each level tells you something different.",
      },
      {
        kind: "paragraph",
        text: "The difference between these three numbers tells you where a company is spending its money. A company with healthy gross profit but weak net profit has a gap below the surface: high overhead, expensive debt, or a heavy tax burden. A company with thin gross profit and healthy net profit is running lean. Net profit is often called the **bottom line**, because it is the last number on the income statement and the one that ultimately belongs to shareholders.",
      },
      {
        kind: "paragraph",
        text: "Profit margins are profit expressed as a percentage of revenue. A gross margin of 40% means the company keeps 40 shillings of every 100 shillings of revenue after direct costs. Margins matter more than raw profit: two companies with identical profit can be very different businesses if one has twice the revenue of the other. Margins also tell you about competitive position. A business with a consistently high margin usually has something others do not: a brand, a licence, a network effect, or a cost advantage.",
      },
      {
        kind: "paragraph",
        text: "Watching the trend of margins over several years is often more useful than looking at the current number. Margins that are steadily expanding mean the business is getting stronger. Margins that are steadily compressing mean competitive pressure is building, or costs are rising faster than the company can pass them on. Either way, you are seeing something real about the business that a single year of profit does not reveal.",
      },
      {
        kind: "example",
        title: "Example",
        text: "A bakery has revenue of KSh 500,000 a month. Flour, sugar, and packaging cost KSh 300,000, so gross profit is KSh 200,000, a gross margin of 40%. Rent, wages, and utilities cost KSh 150,000, so operating profit is KSh 50,000. Interest on a bank loan costs KSh 10,000 and taxes take KSh 8,000, leaving net profit of KSh 32,000. Each level of profit tells you a different story about how the business is doing.",
      },
      {
        kind: "takeaway",
        text: "Revenue is the money coming in. Profit is what remains. The gap between them is where the business lives or dies.",
      },
    ],
  },
  {
    id: "2.3",
    level: 2,
    title: "Earnings per share",
    concept: "EPS",
    minutes: 5,
    summary: "Earnings per share (EPS) is the company net profit divided by the number of shares.",
    body: [
      {
        kind: "paragraph",
        text: "**Earnings per share (EPS)** is the company net profit divided by the number of shares issued. It answers a simple question: if you owned one share, how much of the profit would be yours? EPS is the way profit gets translated from a big corporate number into something an individual shareholder can relate to.",
      },
      {
        kind: "paragraph",
        text: "EPS matters because it lets you compare companies of very different sizes on the same scale. A large company and a small company might have very different net profits, but their EPS numbers are directly comparable. If one has EPS of KSh 4 and the other has KSh 1, the first company is generating four times the profit per share of the second. This is why EPS is the universal unit for talking about company profitability.",
      },
      {
        kind: "paragraph",
        text: "EPS is the number used in the most common valuation ratio, the **P/E ratio**, which you will see in Level 3. Everything from that point on depends on understanding what EPS actually represents. It is the profit per share, not the profit in total. A high EPS on its own does not tell you whether a stock is expensive or cheap; only the price relative to EPS does that.",
      },
      {
        kind: "paragraph",
        text: "There is a subtlety here. Companies have two common measures of EPS: **basic** and **diluted**. Basic EPS divides profit by the shares currently outstanding. Diluted EPS assumes that any convertible securities (options, warrants, preferred shares) are converted into common shares, which increases the share count and lowers the per-share figure. Diluted EPS is the more conservative and more useful number, because it captures the maximum number of shares that could exist. Serious investors tend to look at diluted rather than basic.",
      },
      {
        kind: "example",
        title: "Example",
        text: "A company earns net profit of KSh 100 million. It has 25 million shares issued. EPS = 100,000,000 ÷ 25,000,000 = KSh 4 per share. Every share of that company corresponds to KSh 4 of annual profit. If the company then issues 5 million new shares to fund an acquisition, diluted EPS drops to 100,000,000 ÷ 30,000,000 = KSh 3.33, a 17% reduction. That is what dilution does to existing shareholders.",
      },
      {
        kind: "takeaway",
        text: "EPS normalises profit across companies of different sizes. It is the profit per share, not the profit in total.",
      },
    ],
  },
  {
    id: "2.4",
    level: 2,
    title: "The balance sheet",
    concept: "Balance sheet",
    minutes: 6,
    summary: "The balance sheet shows what a company owns, what it owes, and what belongs to shareholders, at a single moment in time.",
    body: [
      {
        kind: "paragraph",
        text: "The **balance sheet** is a snapshot of a company financial position on a specific date. It has three parts. **Assets** are what the company owns: cash, buildings, inventory, money owed to it. **Liabilities** are what it owes: loans, unpaid bills, taxes due. **Equity** is what is left for the owners after all liabilities are subtracted from assets. Every listed company publishes a balance sheet every quarter, so you can track how its financial position evolves over time.",
      },
      {
        kind: "paragraph",
        text: "The fundamental rule of the balance sheet is that **assets always equal liabilities plus equity**. That is where the name comes from: both sides balance. If a company owns KSh 500 million of assets and owes KSh 200 million, the equity is KSh 300 million. Every shilling of assets was funded by either a creditor or an owner, and the balance sheet is the record of that funding.",
      },
      {
        kind: "paragraph",
        text: "Equity is not the same as cash. Cash is a specific asset, but equity represents the ownership claim on everything the company holds. A company with KSh 100 million of equity and no cash in the bank can still be technically solvent if it owns property or equipment. This is why reading the balance sheet involves looking at both sides at once, not just at the bottom line.",
      },
      {
        kind: "paragraph",
        text: "The balance sheet tells you whether a company is financially healthy. A company with high debt and low equity has less room to absorb a downturn, because it must service its loans regardless of how the business performs. A company with high equity and low debt can weather a difficult year more comfortably. The ratio of debt to equity is one of the clearest signals of how much cushion a company has. A ratio above two is worth investigating in most industries, though what counts as normal varies by sector.",
      },
      {
        kind: "example",
        title: "Example",
        text: "A company has assets of KSh 500 million: KSh 100 million in cash, KSh 300 million in property, and KSh 100 million owed by customers. It has liabilities of KSh 200 million: a KSh 150 million bank loan and KSh 50 million owed to suppliers. Equity = 500 − 200 = KSh 300 million. The debt-to-equity ratio is 200 / 300 = 0.67, which is comfortable. If the loan were KSh 800 million instead, the ratio would be 800 / 300 = 2.67, which is worth a closer look.",
      },
      {
        kind: "takeaway",
        text: "The balance sheet shows what a company owns, what it owes, and what is left for its owners.",
      },
    ],
  },
  {
    id: "2.5",
    level: 2,
    title: "Debt and equity",
    concept: "Capital structure",
    minutes: 5,
    summary: "Companies fund themselves with a mix of debt and equity. Each has different costs and risks.",
    body: [
      {
        kind: "paragraph",
        text: "Every company has to fund its operations somehow. The two main sources are **debt** (borrowed money that must be repaid with interest) and **equity** (money raised by selling shares, which does not have to be repaid). The mix between them is called the company **capital structure**, and it is one of the useful things to understand about a business.",
      },
      {
        kind: "paragraph",
        text: "Debt is usually cheaper than equity. Interest payments are tax-deductible, and lenders take less risk than shareholders, so they demand a lower return. But debt is a fixed obligation: interest must be paid whether the business is doing well or badly. Equity is more expensive because shareholders demand a higher return, but it does not have a fixed cost. In a bad year, a company can simply skip the dividend and reinvest the cash back into the business.",
      },
      {
        kind: "paragraph",
        text: "A company carrying a lot of debt has less room to absorb a bad year. If revenue drops, it can struggle to make its loan payments. This is called **over-leverage**, and it is one of the more common reasons businesses run into trouble. A company with very little debt is often leaving cheap capital on the table. The right balance depends on the industry and the stability of the business. Utilities can carry more debt than technology companies because their cash flows are more predictable. Banks are a special case: their business model is built on leverage, which is why regulators impose strict capital requirements on them.",
      },
      {
        kind: "paragraph",
        text: "Capital structure also affects the returns to shareholders. When a company borrows money to grow and the growth pays off, the extra return goes entirely to the shareholders, because the lender is only getting the fixed interest rate. This is called **leverage**, and it amplifies returns. But when the growth does not pay off, the loss also falls entirely on the shareholders, because the lender still must be paid. Leverage works in both directions.",
      },
      {
        kind: "example",
        title: "Example",
        text: "Company A has KSh 500 million of debt and KSh 100 million of equity. Company B has KSh 100 million of debt and KSh 500 million of equity. In a recession, Company A may find it harder to cover interest while Company B has more cushion. In a boom, Company A shareholders benefit more because there are fewer of them to share the profit, and the debt cost is fixed. Same total capital, very different risk profiles.",
      },
      {
        kind: "takeaway",
        text: "Debt amplifies both returns and risks. The right amount depends on how stable the business is.",
      },
    ],
  },
  {
    id: "2.6",
    level: 2,
    title: "Cash flow",
    concept: "Cash flow",
    minutes: 6,
    summary: "Cash flow shows how much cash actually moves in and out of the business. A profitable company can still run out of cash.",
    body: [
      {
        kind: "paragraph",
        text: "**Cash flow** is the movement of actual money in and out of a business. It is different from profit. Profit is an accounting measure: revenue is recognised when a sale is made, even if the customer has not paid yet. Cash flow is what actually hits the bank account. A company can be very profitable on paper and still run out of money to pay its staff.",
      },
      {
        kind: "paragraph",
        text: "The **cash flow statement** has three sections. **Operating cash flow** is cash generated by the core business. **Investing cash flow** is cash spent on or received from long-term assets. **Financing cash flow** is cash from loans, share issues, and dividends. The most important number is usually operating cash flow: it tells you whether the business is generating cash from its own operations. If operating cash flow is negative for many quarters, the business is burning through cash regardless of what the income statement says.",
      },
      {
        kind: "paragraph",
        text: "A company can be profitable on paper and still run out of cash. This happens when customers are slow to pay, when inventory is piling up, or when the business is growing faster than it can collect. That is why the phrase **cash is king** exists. Companies do not go bankrupt from lack of profit; they go bankrupt from lack of cash. This is especially true for fast-growing businesses, which sometimes run into trouble not because they were unprofitable but because they ran out of cash while waiting for customers to pay.",
      },
      {
        kind: "paragraph",
        text: "For an investor, the important test is whether operating cash flow is consistently larger than net profit. If it is, the reported profit is being converted into real cash, which is a good sign. If operating cash flow is consistently smaller than net profit, the profit may be an accounting illusion. This gap is where a lot of corporate trouble hides, and it is one of the reasons cash flow analysis is often considered more reliable than earnings analysis in professional investing.",
      },
      {
        kind: "example",
        title: "Example",
        text: "A company reports net profit of KSh 50 million. But most of its revenue came from sales on 90-day credit, so customers have not paid yet. Meanwhile it must pay suppliers and staff in cash. On paper the company is profitable. In practice it may not have enough cash to make payroll next month. That gap is what the cash flow statement reveals, and it is why analysts often look at cash flow before trusting the profit number.",
      },
      {
        kind: "takeaway",
        text: "Profit can be an accounting illusion. Cash flow is reality.",
      },
    ],
  },
  {
    id: "2.7",
    level: 2,
    title: "Dividends",
    concept: "Dividends",
    minutes: 5,
    summary: "A dividend is a payment from a company to its shareholders, usually from profits.",
    body: [
      {
        kind: "paragraph",
        text: "A **dividend** is a payment a company makes to its shareholders, usually out of its profits. Companies are not required to pay dividends. A growing company often reinvests all its profits into expansion instead. A mature company with steady profits typically returns some of them to shareholders as dividends. The decision to pay a dividend or reinvest is one of the clearest signals of what stage a company is in.",
      },
      {
        kind: "paragraph",
        text: "**Dividend yield** is the annual dividend per share divided by the share price, expressed as a percentage. It tells you what return you are getting in cash from your investment, regardless of what happens to the share price. A yield of 5% means you receive 5 shillings for every 100 shillings invested. Unlike capital appreciation, which is only realised when you sell, dividend income is real cash you receive while you hold the shares.",
      },
      {
        kind: "paragraph",
        text: "High yield is not always good. A very high yield often means the share price has fallen because the market expects the dividend to be cut. A sustainable yield is one the company can comfortably afford to keep paying from its earnings. The **payout ratio** measures the share of profit paid out as dividends. A payout ratio above 100% means the company is paying more than it earns, which is a signal to look closer. A payout ratio between 40% and 70% is usually considered healthy for a mature company.",
      },
      {
        kind: "paragraph",
        text: "There is a tradeoff between dividend income and growth. Every shilling a company pays out as a dividend is a shilling it cannot reinvest into the business. A high-growth tech company that pays no dividend can compound its earnings at 20% a year. A mature utility that pays out 80% of earnings will grow much more slowly. Neither is better in the abstract. The right choice depends on what the company is able to do with the money it retains, and on what you as an investor actually need from your portfolio.",
      },
      {
        kind: "example",
        title: "Example",
        text: "Safaricom pays a dividend of KSh 2.00 per share. The share price is KSh 35.20. Dividend yield = 2.00 ÷ 35.20 = 5.68%. If you own 1,000 shares, you receive KSh 2,000 a year in cash, regardless of what the share price does. If the share price later falls to KSh 20 while the dividend stays at KSh 2.00, the yield rises to 10%, but that high yield is likely signalling concern about the company future rather than an opportunity.",
      },
      {
        kind: "takeaway",
        text: "Yield is a return on your money. Sustainable yield comes from sustainable profits.",
      },
    ],
  },

  
  {
    id: "3.1",
    level: 3,
    title: "Market capitalization",
    concept: "Market cap",
    minutes: 5,
    summary: "Market cap is the total value the market puts on a company. It is the share price multiplied by the number of shares issued.",
    body: [
      {
        kind: "paragraph",
        text: "**Market capitalization**, usually shortened to market cap, is the total value the market is currently placing on a company's equity. It is calculated by multiplying the share price by the number of shares issued. If a company trades at KSh 35 and has 40 billion shares, its market cap is roughly KSh 1.4 trillion.",
      },
      {
        kind: "paragraph",
        text: "Market cap gives you a way to talk about the size of a company in market terms. It is the number used to group companies as large cap, mid cap, or small cap. On the NSE, Safaricom is the largest by a wide margin, followed by companies like Equity Group, KCB, and EABL. Those groupings matter because the market often treats companies of similar size in similar ways.",
      },
      {
        kind: "paragraph",
        text: "There is a companion number worth knowing about: **enterprise value**. Market cap counts only the equity. Enterprise value adds the company debt and subtracts its cash, giving a fuller picture of what it would cost to buy the whole business. Both numbers have their place. For most beginner analysis, market cap is the simpler and more commonly used starting point.",
      },
      {
        kind: "paragraph",
        text: "Market cap is not a fixed measure of what a business is worth. It changes every second with the share price. When the price moves, the market cap moves with it, even if the underlying business has not changed at all. It reflects the market current view, not a permanent judgement about the company.",
      },
      {
        kind: "example",
        title: "Example",
        text: "Safaricom trades at KSh 35.20 with about 40 billion shares issued, so its market cap is roughly KSh 1.41 trillion. Equity Group trades at KSh 100 with 3.77 billion shares, so its market cap is roughly KSh 377 billion. Both are large by Kenyan standards. Safaricom is nearly four times the size, reflecting both the higher number of shares and its dominant position in Kenyan telecoms.",
      },
      {
        kind: "takeaway",
        text: "Market cap is the price tag the market currently puts on a company equity.",
      },
    ],
  },
  {
    id: "3.2",
    level: 3,
    title: "The P/E ratio",
    concept: "P/E ratio",
    minutes: 5,
    summary: "The P/E ratio divides the share price by earnings per share. It tells you how much the market is paying for each shilling of profit.",
    body: [
      {
        kind: "paragraph",
        text: "The **P/E ratio**, short for price-to-earnings, divides the share price by the earnings per share. It is also equal to market cap divided by net profit. Both versions give the same number. The P/E ratio answers a simple question: how much is the market paying for each shilling of annual profit?",
      },
      {
        kind: "paragraph",
        text: "There is another way to think about it. A P/E of 15 means that, at the current price and current earnings, it would take about 15 years of those earnings to earn back the price you paid. If earnings grow over time, that payback period shortens. If they shrink, it lengthens. This is a rough mental model, not a forecast, but it gives the number an intuitive shape.",
      },
      {
        kind: "paragraph",
        text: "The number is not chosen by the company. It emerges from the price investors are willing to pay. If enough people expect the company to grow, they will pay more, and the P/E rises. If expectations cool, the price falls and the P/E drops with it. The company can only influence this indirectly, through how well it actually performs over time.",
      },
      {
        kind: "paragraph",
        text: "Two common ways people read it. A high P/E suggests the market is expecting growth, or that the price has moved ahead of what current earnings alone would justify. A low P/E suggests the market is not paying much for current earnings, which can mean the company is being overlooked, or that investors see reasons for caution ahead. Neither reading is complete on its own. The number is a starting point, not a conclusion.",
      },
      {
        kind: "example",
        title: "Example",
        text: "Safaricom trades at KSh 35.20 and earns about KSh 2.39 per share in recent full-year results. Its P/E is roughly 14.8. Equity Group trades at KSh 100 with EPS around KSh 20.00. Its P/E is roughly 5.0. Same country, same exchange, very different multiples. That gap is worth understanding before deciding which one, or neither, fits your goals.",
      },
      {
        kind: "takeaway",
        text: "The P/E ratio tells you what the market is currently paying for one shilling of annual profit.",
      },
    ],
  },
  {
    id: "3.3",
    level: 3,
    title: "P/E in context",
    concept: "P/E context",
    minutes: 6,
    summary: "A P/E ratio means nothing on its own. It only makes sense compared to the company growth, its industry, and its history.",
    body: [
      {
        kind: "paragraph",
        text: "A P/E ratio on its own does not say whether a stock is cheap or expensive. It only becomes meaningful when it is placed next to something else: the company growth, its peers, its own history, or the broader industry. The number is a comparison tool, and like any comparison tool, it needs something to compare against.",
      },
      {
        kind: "paragraph",
        text: "Comparing P/Es across industries is one place where the number loses its grip. A utility trading at P/E 8 and a software business trading at P/E 30 are not competing on the same terms. Their growth rates, margins, capital needs, and risks are different. The market reflects those differences in the multiples it applies to each. Reading them side by side without that context can be misleading.",
      },
      {
        kind: "paragraph",
        text: "Growth is one of the biggest drivers of a P/E. A company growing earnings 25% a year can reasonably carry a higher multiple than one growing 3%. The market is effectively paying today for the earnings it expects tomorrow. When that expectation is high, the multiple is high. When it is modest, the multiple is modest. This is one of the reasons a simple P/E comparison between a fast-growing company and a mature one rarely tells the full story.",
      },
      {
        kind: "paragraph",
        text: "It is worth holding two ideas at once. A low P/E can signal opportunity, or it can signal that the market sees something worth being careful about. A high P/E can reflect genuine confidence, or it can reflect optimism that has moved ahead of what current earnings alone would justify. Either reading is possible, and neither is automatic. Context is what decides which is more likely.",
      },
      {
        kind: "example",
        title: "Example",
        text: "Safaricom at P/E 14.8 and Equity Group at P/E 5.0 sit at very different points. Safaricom has a stable cash-generating business, dominant market share, and M-Pesa. Equity Group operates in a cyclical industry, sensitive to interest rates and the credit cycle. The market is pricing both of these realities. Whether it is pricing them correctly is a question every investor answers for themselves, with the information they have.",
      },
      {
        kind: "takeaway",
        text: "A P/E ratio only tells a story when it is read alongside growth, peers, and history.",
      },
    ],
  },
  {
    id: "3.4",
    level: 3,
    title: "Price-to-book",
    concept: "P/B ratio",
    minutes: 5,
    summary: "Price-to-book compares the share price to the company book value per share. It is most useful for banks and asset-heavy businesses.",
    body: [
      {
        kind: "paragraph",
        text: "The **price-to-book ratio**, or P/B, compares the share price to the company **book value per share**. Book value per share is the company total equity divided by the number of shares. P/B is simply the share price divided by that number.",
      },
      {
        kind: "paragraph",
        text: "Book value is built from the balance sheet. It is the accounting value of what the owners own, after all liabilities are subtracted from assets. It is a historical figure, updated each reporting period, and it reflects what the company has accumulated over time. For companies whose assets sit close to their real value on the balance sheet, this number is a reasonable approximation of what the business owns.",
      },
      {
        kind: "paragraph",
        text: "P/B is most useful for businesses whose assets are tangible and priced close to their real value. Banks are the classic example: their assets are mostly loans and securities, marked close to market value. For a business whose value is mostly intangible, software, brands, people, network effects, book value captures very little of what actually makes the business valuable. For those, P/B is one tool among many, and not always the most useful one.",
      },
      {
        kind: "paragraph",
        text: "Reading P/B. A P/B below 1 means the market is valuing the company at less than its accounting equity. That can reflect real trouble, or it can reflect an opportunity the market has not yet recognised. A P/B above 1 means the market is paying a premium for what is on the books, which usually reflects the market view of future earnings or of the quality of the assets.",
      },
      {
        kind: "example",
        title: "Example",
        text: "Equity Group equity is roughly KSh 200 billion against 3.77 billion shares, giving a book value per share of about KSh 53. At a share price of KSh 100, its P/B is roughly 1.9. For a software business with almost no physical assets, book value might be tiny and P/B would be very high. That is not a sign of trouble. It just means P/B is not the right tool for that kind of business.",
      },
      {
        kind: "takeaway",
        text: "P/B is a valuable tool for some industries and a misleading one for others. The skill is knowing which is which.",
      },
    ],
  },
  {
    id: "3.5",
    level: 3,
    title: "Comparing peers",
    concept: "Peer comparison",
    minutes: 6,
    summary: "No ratio means anything in isolation. Every valuation metric is meaningful only when compared to the same metric for a similar company.",
    body: [
      {
        kind: "paragraph",
        text: "No valuation metric is meaningful in isolation. A P/E of 12 is neither cheap nor expensive until you know what similar companies are trading at. Comparison is the whole point of valuation ratios. Without it, the numbers are just numbers.",
      },
      {
        kind: "paragraph",
        text: "The word peers has a specific meaning here. Peers are companies in the same industry, operating in the same market, with similar size, growth profile, and capital structure. The closer those dimensions are, the more useful the comparison. The further apart they are, the less the comparison tells you. A comparison between two banks in the same country is far more informative than a comparison between a bank and a mining company.",
      },
      {
        kind: "paragraph",
        text: "A worked example across Kenyan banks. Equity Group at P/E 5.0. KCB at 4.7. Co-op Bank at 5.4. Absa at 6.2. NCBA at 4.2. These are all within a narrow band. That clustering is informative. The market is valuing Kenyan banks as a group, with relatively small adjustments for the differences between them. If one of these banks were suddenly trading at P/E 12, the question would be what the market sees that the others do not.",
      },
      {
        kind: "paragraph",
        text: "When a peer group disagrees. One company in a tight peer group trading at a very different multiple is a signal worth investigating. It might be that the market has identified something real: better growth, stronger management, a unique franchise. Or it might be a temporary mispricing. Both are worth a closer look. The comparison is where the question starts, not where it ends.",
      },
      {
        kind: "example",
        title: "Example",
        text: "Five listed Kenyan banks, all within a P/E range of about 4 to 6. That narrow band tells you how the market groups them. Now imagine one of them at P/E 15. Same country, same industry, but a very different number. Something has changed, either in the business itself or in the market expectations. Finding out which is what makes valuation useful.",
      },
      {
        kind: "takeaway",
        text: "Ratios are comparison tools. Without a peer group, they mean very little.",
      },
    ],
  },
  {
    id: "3.6",
    level: 3,
    title: "Simple valuation",
    concept: "Valuation synthesis",
    minutes: 6,
    summary: "Combining P/E, P/B, growth, and peer comparison gives you a rough view of whether a stock looks expensive or cheap.",
    body: [
      {
        kind: "paragraph",
        text: "Valuation is not a formula that gives you an answer. It is a structured way of looking at a stock from several angles, so you can form a view of whether the price reflects the business. There is no single number that tells you a stock is cheap.",
      },
      {
        kind: "paragraph",
        text: "Four questions to hold together. Is the P/E reasonable compared to peers and to the company growth rate? Is the P/B appropriate for this kind of business? Is the dividend yield supported by earnings and cash flow? Is the balance sheet strong enough to carry the company through a difficult year? Each question gives you a partial answer. Together they give you a view.",
      },
      {
        kind: "paragraph",
        text: "Valuation is not a prediction. A stock that looks cheap today can get cheaper. A stock that looks expensive can get more so. Valuation tells you something about the relationship between price and the underlying business. It does not tell you when the market will agree with your view. That is a different question, with a different answer, that nobody knows in advance.",
      },
      {
        kind: "paragraph",
        text: "What to do with the answer. If a stock looks expensive compared to its peers, you can choose to wait for a better entry. You can look at something else. Or you can accept the premium because the business is genuinely exceptional. Each of those choices is reasonable. Valuation helps you see the tradeoff clearly, which is what makes the choice yours rather than a guess.",
      },
      {
        kind: "example",
        title: "Example",
        text: "Putting it together for Safaricom. P/E of 14.8 against Kenyan banking peers at 4 to 6. But Safaricom is not a bank. It competes for investor attention with telecoms and platform businesses globally, some of which trade at higher multiples. Its M-Pesa franchise and stable cash flows support the premium. Whether that premium continues to be justified depends on how the business grows over the coming decade. That is the kind of question valuation helps you frame, not answer.",
      },
      {
        kind: "takeaway",
        text: "Valuation is not a formula. It is a structured judgement, built from several numbers looked at together.",
      },
    ],
  },

  
  {
    id: "4.1",
    level: 4,
    title: "What is risk?",
    concept: "Risk",
    minutes: 5,
    summary: "Risk is the chance that what you expect to happen does not happen. In investing, it usually means losing money or earning less than you could have elsewhere.",
    body: [
      {
        kind: "paragraph",
        text: "**Risk** is the possibility that what you expect to happen does not happen. In investing, it usually means either losing money or earning less than you could have earned elsewhere with the same effort and time. It is a normal part of every investing decision, and it cannot be eliminated entirely.",
      },
      {
        kind: "paragraph",
        text: "Risk is not one thing. It is a family of things that can go wrong at the same time. **Company risk**: the business itself does not perform as expected. **Market risk**: the whole market falls and takes good companies down with it. **Liquidity risk**: you want to sell but cannot find a buyer at a fair price. **Inflation risk**: the value of your money buys less over time.",
      },
      {
        kind: "paragraph",
        text: "Every investment carries some of these. Even holding cash carries inflation risk. Choosing not to invest is also a choice, with its own set of tradeoffs to weigh. The question is rarely whether to take risk at all. It is more often which risks to take, and how much of each.",
      },
      {
        kind: "paragraph",
        text: "There is a useful distinction between risk and uncertainty. Uncertainty is what you do not know. Risk is what you can estimate, at least roughly, from past data. Much of what feels like risk in the market is really uncertainty about the future. Understanding the difference helps you decide what to plan for and what to simply accept as part of the process.",
      },
      {
        kind: "example",
        title: "Example",
        text: "One investment, four kinds of risk. You buy shares in a small NSE-listed company. The company could run into trouble, that is company risk. The market as a whole could fall sharply, that is market risk. You might want to sell in a hurry and find there are no buyers at a reasonable price, that is liquidity risk. Over the years you hold it, inflation could reduce what the eventual proceeds actually buy, that is inflation risk. All four are present, in different proportions.",
      },
      {
        kind: "takeaway",
        text: "Risk is not one thing. It is the combined possibility of several things going differently from what you expected.",
      },
    ],
  },
  {
    id: "4.2",
    level: 4,
    title: "Volatility",
    concept: "Volatility",
    minutes: 5,
    summary: "Volatility is how much a price moves up and down over time. It is not the same as risk, but it is the most common way markets measure uncertainty.",
    body: [
      {
        kind: "paragraph",
        text: "**Volatility** describes how much a price moves up and down over time. A stock that moves 5% on a typical day is more volatile than one that moves 1%. Volatility is usually measured as the standard deviation of daily returns, annualized, but you do not need the formula to understand what it means. It is a statistical description of recent price movement.",
      },
      {
        kind: "paragraph",
        text: "Volatility is not the same as risk. A stock can be volatile without losing money permanently, it may swing widely but recover. A stock can also be calm for years and then fall sharply. Volatility measures what has happened recently. Risk is about what could happen next. They are related, but they are not the same thing.",
      },
      {
        kind: "paragraph",
        text: "Why volatility still matters. High volatility means wider swings in the value of your holding, which can make it harder to hold through a difficult period without making a rushed decision. A portfolio that swings 30% in a year feels very different to hold than one that swings 5%, even if the long-term outcome is similar. Understanding your own reactions to volatility is part of understanding yourself as an investor.",
      },
      {
        kind: "paragraph",
        text: "Volatility matters more the shorter your time horizon and less the longer it is. Over a single year, a volatile stock might be down sharply. Over twenty years, the same stock might have compounded steadily. The time you can stay invested is what allows volatility to average out.",
      },
      {
        kind: "example",
        title: "Example",
        text: "Safaricom typically moves 1 to 2% on a normal day. A small-cap mining stock on the NSE might move 5 to 10% in a single session on no news at all. Both can turn out to be reasonable investments. The difference is how they feel to hold, and how much comfort you need along the way. A holding you can sit through calmly is worth more than one you sell in a bad week.",
      },
      {
        kind: "takeaway",
        text: "Volatility is a description of recent price movement. It is not the same as risk, but it does affect how easy a holding is to sit through.",
      },
    ],
  },
  {
    id: "4.3",
    level: 4,
    title: "Risk vs return",
    concept: "Risk-return tradeoff",
    minutes: 6,
    summary: "Higher potential returns come with higher risk. There is no free lunch in the market.",
    body: [
      {
        kind: "paragraph",
        text: "Higher potential returns come with higher risk. This is not a rule someone decided. It is a consequence of how markets work. If an investment offered high returns with no risk, everyone would want it, and the price would adjust until those returns were no longer high. The tradeoff is a feature of the market, not a bug.",
      },
      {
        kind: "paragraph",
        text: "The spectrum. Government bonds sit at the low-risk end, with modest, predictable returns. Large, established companies sit in the middle, with moderate risk and moderate expected return. Small companies, emerging markets, and speculative assets sit at the high end, with higher expected returns and much wider potential outcomes. Every investment finds its place somewhere along this line.",
      },
      {
        kind: "paragraph",
        text: "What potential means here. Higher expected return is not a promise. It is an average outcome, across many similar investments, over long periods. Any single investment can still go badly. The average is what you experience if you spread your money across many similar bets and give them time to play out.",
      },
      {
        kind: "paragraph",
        text: "The most useful question is rarely what could I earn. It is what could I earn, what could I lose, and am I comfortable with both? Keeping both sides of the tradeoff in view is one of the most reliable habits you can build as an investor.",
      },
      {
        kind: "example",
        title: "Example",
        text: "Two ways to invest KSh 100,000 for ten years. A Kenyan government bond at 14% per year, with high certainty of repayment. Or a portfolio of ten small NSE-listed companies, with an expected return of around 22% per year but a real chance of losing 40% in a bad year. Both options are reasonable. They simply trade certainty for potential. Which one fits you depends on your horizon, your income, and how you feel about drawdowns.",
      },
      {
        kind: "takeaway",
        text: "Higher expected returns come with higher risk. There is no way around the tradeoff, only through it.",
      },
    ],
  },
  {
    id: "4.4",
    level: 4,
    title: "Your risk tolerance",
    concept: "Risk tolerance",
    minutes: 5,
    summary: "Risk tolerance is how much loss you can absorb before it changes your decisions for the worse.",
    body: [
      {
        kind: "paragraph",
        text: "**Risk tolerance** is how much loss you can absorb before it changes your decisions for the worse. It is personal. It depends on your income, your obligations, your time horizon, and how you react emotionally to losing money. There is no universal right answer.",
      },
      {
        kind: "paragraph",
        text: "There are two components. **Financial capacity** is how much loss your finances can absorb without forcing you to change your plans. **Emotional capacity** is how much loss you can feel without making a rushed decision. Both matter. A person with high financial capacity and low emotional capacity should still be careful, and so should a person with the opposite profile.",
      },
      {
        kind: "paragraph",
        text: "Risk tolerance is not what you think it is when markets are calm. Most people discover their true tolerance the first time they lose a meaningful amount of money in a short period. That experience is often uncomfortable, and it is also informative. There is no way to know for sure in advance.",
      },
      {
        kind: "paragraph",
        text: "Matching your portfolio to your real tolerance is one of the most important decisions in investing. Taking on more risk than you can tolerate may lead to selling during the very period you would rather have waited through. Taking on too little may mean leaving room for growth unused. The goal is a portfolio you can hold through difficult periods without abandoning your plan.",
      },
      {
        kind: "example",
        title: "Example",
        text: "A 25-year-old with a stable job and no dependents has room to absorb a large drawdown, both financially and emotionally, because time is on their side. A 55-year-old approaching retirement with school fees due has a very different set of constraints. Same market, same available investments, very different right answers. There is no universal portfolio. There is only the one that fits your situation and your temperament.",
      },
      {
        kind: "takeaway",
        text: "Risk tolerance is not a personality trait. It is the combination of what your finances can absorb and what your emotions can handle.",
      },
    ],
  },
  {
    id: "4.5",
    level: 4,
    title: "Time horizon",
    concept: "Time horizon",
    minutes: 5,
    summary: "How long you can leave money invested changes how much risk you can reasonably take.",
    body: [
      {
        kind: "paragraph",
        text: "**Time horizon** is how long until you need the money. Paying school fees in three years is a short horizon. Retirement in thirty years is a long one. The horizon is one of the most important inputs to every investing decision, and it is easy to overlook.",
      },
      {
        kind: "paragraph",
        text: "Why it matters. Over short periods, stocks can move anywhere. Over long periods, the ups and downs tend to average out. A 10% annual return is unpredictable in any single year but tends to show up across a decade. Time is what lets the averages work in your favour.",
      },
      {
        kind: "paragraph",
        text: "The math of recovery. A 50% loss requires a 100% gain to get back to even. Recovering from a large drawdown takes time, and the deeper the loss, the more time it takes. If your horizon is short, you may not have that time. If it is long, you usually do.",
      },
      {
        kind: "paragraph",
        text: "Matching horizon to asset. Short horizons call for lower-risk assets: cash, money market funds, short-term bonds. Long horizons give you more room to hold stocks, and even smaller companies, because you have time to recover from a difficult year. The mismatch between the two, a short horizon paired with high-risk assets, is one of the more common sources of unnecessary stress in investing.",
      },
      {
        kind: "example",
        title: "Example",
        text: "KSh 500,000 needed in three years for school fees. Holding it in a small-cap stock that could fall 40% in a bad year would put the goal at risk. The same stock might be a reasonable holding for retirement in twenty years, where a bad year can be absorbed and recovered. The choice of asset follows from the horizon, not the other way around.",
      },
      {
        kind: "takeaway",
        text: "Your time horizon shapes what is reasonable to hold. Match the asset to the time available.",
      },
    ],
  },

  
  {
    id: "5.1",
    level: 5,
    title: "The building blocks",
    concept: "Asset classes",
    minutes: 7,
    summary:
      "Stocks, bonds, cash, funds, and REITs. Each behaves differently, and each has a role in a portfolio.",
    body: [
      {
        kind: "paragraph",
        text: "Before we talk about building a portfolio, it helps to know what you are choosing between. The market offers several broad categories, called **asset classes**. Each has its own behaviour, its own risks, and its own role.",
      },
      {
        kind: "paragraph",
        text: "**Stocks** are units of ownership in a company. On the NSE, Safaricom, Equity Group, KCB, and EABL are common starting points. They offer the highest long-term return potential but have the widest swings. A stock can fall 30% in a bad year and recover over the next three.",
      },
      {
        kind: "paragraph",
        text: "**Bonds** are loans you make to a company or government. In Kenya, government bonds are issued by the Treasury and considered low-risk. Yields in 2025 ranged from 11.67% to 14.63% depending on the tenor. Corporate bonds pay more but carry more risk.",
      },
      {
        kind: "paragraph",
        text: "**Cash and money market funds** are the safest and lowest-returning category. In 2025, Kenyan MMFs returned around 11.7% on average. The main risk is inflation, which quietly reduces your purchasing power over time.",
      },
      {
        kind: "paragraph",
        text: "**Funds and ETFs** let you own many assets at once. A mutual fund is managed by a professional. An exchange-traded fund (ETF) trades like a stock. Kenya has ETFs like the Absa NewGold ETF (tracking gold) and the Satrix MSCI World Feeder ETF (tracking global equities).",
      },
      {
        kind: "paragraph",
        text: "**Real estate and REITs.** Property holds value against inflation and generates rental income. Direct property requires large capital, but **REITs** (Real Estate Investment Trusts) are listed on the exchange, making them accessible. Kenya has REITs like the ALP Industrial REIT and the Trific Green USD I-REIT, the latter targeting an 8% USD yield.",
      },
      {
        kind: "paragraph",
        text: "Each class has a different risk-return profile. Stocks offer high growth potential but wide swings. Bonds offer steady income with less movement. Cash is safe but loses to inflation. Real estate sits between stocks and bonds. No single asset class is perfect alone. The real power comes from how they fit together.",
      },
      {
        kind: "example",
        title: "Example",
        text: "KSh 100,000 spread across five assets over one year. A stock (Equity Group) up 14%. A government bond yielding 12.76%. A money market fund returning 11.2%. A gold ETF up 22%. A USD REIT yielding 8%. The paths diverge, showing why a mix can smooth the overall journey.",
      },
      {
        kind: "takeaway",
        text: "Each asset class has a different job. Knowing what each one does is the starting point for combining them.",
      },
    ],
  },
  {
    id: "5.2",
    level: 5,
    title: "What is a portfolio?",
    concept: "Portfolio",
    minutes: 5,
    summary:
      "A portfolio is the collection of everything you own. The whole behaves differently from the sum of its parts.",
    body: [
      {
        kind: "paragraph",
        text: "A **portfolio** is the collection of all your investments taken together. Not just stocks. Everything: shares, bonds, cash, funds, property. When people talk about your portfolio, they mean the whole picture.",
      },
      {
        kind: "paragraph",
        text: "An individual holding rises or falls on its own. A portfolio moves as a system. When one piece falls, another may hold steady or rise. That interaction is what makes a portfolio different from a list of separate bets.",
      },
      {
        kind: "paragraph",
        text: "Looking only at individual holdings can mislead you. One stock might be up 20% while your portfolio is down 3%, because the rest of your holdings fell. The portfolio is the real picture of what is happening to your money.",
      },
      {
        kind: "paragraph",
        text: "The **value** of your portfolio is the total worth of everything in it. The **allocation** is how that value is divided between asset classes. Both numbers change constantly, and both matter.",
      },
      {
        kind: "paragraph",
        text: "A portfolio can be as simple as a money market fund and two stocks. It does not need to be complicated. What matters is that you understand what you own and why.",
      },
      {
        kind: "example",
        title: "Example",
        text: "A learner with KSh 100,000 in three holdings: KSh 40,000 in Safaricom, KSh 30,000 in a government bond, KSh 30,000 in a money market fund. That is a portfolio. Its allocation is 40% stocks, 30% bonds, 30% cash.",
      },
      {
        kind: "takeaway",
        text: "A portfolio is the whole picture. Individual holdings tell you part of the story; the portfolio tells you the rest.",
      },
    ],
  },
  {
    id: "5.3",
    level: 5,
    title: "Diversification",
    concept: "Diversification",
    minutes: 6,
    summary:
      "Spreading money across different assets so that a single loss does not wipe out the portfolio.",
    body: [
      {
        kind: "paragraph",
        text: "**Diversification** means spreading your money across different investments. The goal is not to avoid losses on every holding. It is to make sure that no single loss can undo your progress.",
      },
      {
        kind: "paragraph",
        text: "Assets do not move together perfectly. This is what makes diversification work. The less two assets move in step with each other, the more they help when combined.",
      },
      {
        kind: "paragraph",
        text: "Owning ten Kenyan bank stocks is not diversification. If the banking sector has a bad year, all ten fall together. Real diversification means owning assets that respond to different forces: a bank, a telecom, a bond, a money market fund.",
      },
      {
        kind: "paragraph",
        text: "The strongest diversification comes from combining different asset classes. Stocks rise with business growth. Bonds rise when interest rates fall. Cash holds steady. Gold holds value in uncertain times.",
      },
      {
        kind: "paragraph",
        text: "Diversification does not prevent losses. It reduces the chance that a single loss ruins you. In a sharp market crash, most assets can fall at the same time.",
      },
      {
        kind: "paragraph",
        text: "There is no fixed number of holdings. A portfolio of four to eight holdings across two or three asset classes captures most of the benefit. Beyond that, the gains get smaller.",
      },
      {
        kind: "example",
        title: "Example",
        text: "Two learners each start with KSh 100,000. Learner A holds all in a single bank stock. Learner B holds KSh 40,000 in two stocks, KSh 30,000 in a bond, and KSh 30,000 in a money market fund. The bank sector has a bad quarter. Learner A loses 15%. Learner B loses 4% and still receives bond and money market income.",
      },
      {
        kind: "takeaway",
        text: "Diversification does not promise gains. It gives you a smoother path to them.",
      },
    ],
  },
  {
    id: "5.3.1",
    level: 5,
    title: "The math of correlation",
    concept: "Correlation",
    minutes: 3,
    summary:
      "Correlation measures how two assets move in relation to each other. It is the engine that makes diversification work.",
    body: [
      {
        kind: "paragraph",
        text: "Correlation is a number between -1 and 1. A value of 1 means two assets move perfectly in sync. A value of -1 means they move in exactly opposite directions. A value of 0 means they have no relationship. For diversification, you want assets with **low or negative correlation**.",
      },
      {
        kind: "paragraph",
        text: "The correlation coefficient, ρ (rho), is calculated by dividing the covariance of the two assets' returns by the product of their standard deviations: `ρ = Cov(X,Y) / (σX * σY)`. A correlation of 0 means the assets are uncorrelated. Historically, stocks and bonds have shown low or even negative correlation, making them excellent diversifiers.",
      },
      {
        kind: "paragraph",
        text: "The risk of a two-asset portfolio is not the simple average of their risks. It is calculated using the portfolio variance formula: `σp² = w1²σ1² + w2²σ2² + 2w1w2ρ12σ1σ2`, where `w` is the weight, `σ` is the standard deviation, and `ρ12` is the correlation between the two assets. This formula mathematically proves that lower correlation reduces portfolio risk.",
      },
      {
        kind: "paragraph",
        text: "You do not need to do this math in your head. The key insight is that when you combine assets with low correlation, the portfolio's total risk is less than the weighted average of the individual risks. That is the mathematical 'free lunch' of diversification.",
      },
      {
        kind: "example",
        title: "Example",
        text: "Two assets with the same expected return (10%) and same risk (15%). If perfectly correlated (ρ = 1), the portfolio risk is 15%. If uncorrelated (ρ = 0), the portfolio risk drops to about 10.6%. If negatively correlated (ρ = -1), the portfolio risk falls to 0%. The same returns with much less risk.",
      },
      {
        kind: "takeaway",
        text: "Correlation is the mathematical foundation of diversification. The less your assets move together, the more they protect each other.",
      },
    ],
  },
  {
    id: "5.4",
    level: 5,
    title: "Concentration risk",
    concept: "Concentration risk",
    minutes: 5,
    summary:
      "When too much of your portfolio sits in one holding or one sector, a single event can hurt everything.",
    body: [
      {
        kind: "paragraph",
        text: "**Concentration risk** is the risk that comes from holding too much of your portfolio in one place. One holding, one sector, one asset class. If that one thing falls, so does the whole portfolio.",
      },
      {
        kind: "paragraph",
        text: "Concentration often builds gradually. A stock that did well grows to dominate the portfolio. Or a learner buys more of what they already know. Or they put everything into a single idea they feel strongly about.",
      },
      {
        kind: "paragraph",
        text: "The problem with concentration is not that the single idea is necessarily bad. It is that the portfolio is now tied to one outcome. A single earnings miss or a regulatory change can undo a year of gains.",
      },
      {
        kind: "paragraph",
        text: "Kenya's NSE is bank-heavy. Around half the large listed companies are banks. A learner who buys five large Kenyan stocks with a 'spread across the market' approach may end up owning five banks. That is meaningful sector concentration without realising it.",
      },
      {
        kind: "paragraph",
        text: "Diversification is the answer to concentration. But so is awareness. Checking what fraction of your portfolio sits in any single holding, or any single sector, is a simple habit. In PRAXIS, the Portfolio page shows this for you.",
      },
      {
        kind: "example",
        title: "Example",
        text: "A learner's portfolio has 60% of its value in one bank stock. The bank reports a rise in non-performing loans. The stock falls 20%. The portfolio drops 12% from that one holding.",
      },
      {
        kind: "takeaway",
        text: "Concentration is not a strategy. It is a risk you may not realise you are taking.",
      },
    ],
  },
  {
    id: "5.5",
    level: 5,
    title: "Asset allocation",
    concept: "Asset allocation",
    minutes: 6,
    summary:
      "How you split your money between stocks, bonds, cash, and other asset classes. It matters more than which individual stocks you pick.",
    body: [
      {
        kind: "paragraph",
        text: "**Asset allocation** is how you divide your portfolio between asset classes. 60% stocks, 30% bonds, 10% cash is an allocation. So is 30% stocks, 50% bonds, 20% cash. Every portfolio has one, whether you chose it or not.",
      },
      {
        kind: "paragraph",
        text: "Research consistently shows that allocation explains the majority of how a portfolio behaves over time. Which specific stocks you pick matters far less than how much of your portfolio is in stocks versus bonds versus cash.",
      },
      {
        kind: "paragraph",
        text: "One approach starts with **risk**. If you can tolerate a 20% drawdown, you can hold more stocks. Another starts with **goals**. Money needed in three years goes into safer assets. Money for thirty years can go into stocks.",
      },
      {
        kind: "paragraph",
        text: "Some investors use '100 minus your age' as a starting point. At 30, that suggests roughly 70% stocks and 30% safer assets. At 60, roughly 40% stocks. It is a rough guide, not a rule.",
      },
      {
        kind: "paragraph",
        text: "Allocations change as your life changes. A new job, a house purchase, a child, retirement. The allocation that fits today may not fit in five years. Reviewing it once a year is a reasonable habit.",
      },
      {
        kind: "paragraph",
        text: "There is no single right answer. The goal is an allocation you can hold through difficult markets and that fits your goals. That is different for every learner.",
      },
      {
        kind: "example",
        title: "Example",
        text: "Three learners, same KSh 100,000. Learner A (25, long horizon): 80% stocks, 15% bonds, 5% cash. Learner B (45, moderate horizon): 50% stocks, 40% bonds, 10% cash. Learner C (60, short horizon): 25% stocks, 55% bonds, 20% cash.",
      },
      {
        kind: "takeaway",
        text: "Your allocation shapes your portfolio more than any individual pick.",
      },
    ],
  },
  {
    id: "5.5.1",
    level: 5,
    title: "The efficient frontier",
    concept: "Efficient frontier",
    minutes: 3,
    summary:
      "A theoretical concept from Modern Portfolio Theory that shows the best possible return for each level of risk.",
    body: [
      {
        kind: "paragraph",
        text: "Imagine a graph where the horizontal axis is risk and the vertical axis is return. If you plot every possible combination of assets, you get a curved line at the top. That curve is the **efficient frontier**. Any portfolio on this line gives you the highest possible return for its level of risk.",
      },
      {
        kind: "paragraph",
        text: "The efficient frontier is the upper boundary of the feasible set of portfolios. It is derived from Harry Markowitz's 1952 work on Modern Portfolio Theory. The curve is often called the 'Markowitz bullet' when a risk-free asset is not considered.",
      },
      {
        kind: "paragraph",
        text: "Portfolios below the frontier are considered 'inefficient' because they offer lower return for the same risk. The goal of portfolio optimization is to move a portfolio onto the frontier, often by adjusting weights to maximise the Sharpe ratio (return per unit of risk).",
      },
      {
        kind: "paragraph",
        text: "As a beginner, you do not need to calculate the frontier. The practical takeaway is: do not pick assets in isolation. The combination of assets can produce a better risk-return outcome than any single asset alone.",
      },
      {
        kind: "example",
        title: "Example",
        text: "A portfolio of 100% stocks has high risk and high return. A portfolio of 100% bonds has low risk and low return. A mix of 60% stocks and 40% bonds might sit on the efficient frontier, offering a better risk-adjusted return than either extreme.",
      },
      {
        kind: "takeaway",
        text: "The efficient frontier shows that the best portfolio is not about picking one great asset, but about finding the right combination.",
      },
    ],
  },
  {
    id: "5.6",
    level: 5,
    title: "Sector exposure",
    concept: "Sector exposure",
    minutes: 5,
    summary:
      "How much of your portfolio sits in one industry, and why sector cycles matter.",
    body: [
      {
        kind: "paragraph",
        text: "**Sector exposure** is how much of your portfolio is tied to a single industry. Banks. Telecoms. Energy. Consumer goods. A portfolio can look diversified by number of holdings and still have most of its value in one sector.",
      },
      {
        kind: "paragraph",
        text: "Different sectors perform differently in different environments. Banks do well when interest rates are favourable and lending is growing. Energy does well when commodity prices rise. Consumer goods hold steady across cycles.",
      },
      {
        kind: "paragraph",
        text: "Kenya's NSE is bank-heavy. Around half the large listed companies are banks. A learner following a 'buy the largest companies' approach can end up with a banking portfolio without meaning to. The same pattern exists in most African exchanges, where a few sectors dominate.",
      },
      {
        kind: "paragraph",
        text: "The Portfolio page in PRAXIS shows your sector breakdown. It answers a simple question: if one sector has a bad year, how much of your portfolio is affected? A sector that is 60% of your holdings is a sector you are betting on heavily.",
      },
      {
        kind: "paragraph",
        text: "No sector needs to be capped at a strict percentage. What matters is that you know where your exposure lies and are comfortable with the concentration.",
      },
      {
        kind: "example",
        title: "Example",
        text: "A learner owns five NSE stocks: Equity Group, KCB, Co-op Bank, Absa Kenya, and NCBA. Five different companies, but all in banking. If the CBK raises capital requirements or a credit cycle turns, all five fall together. The portfolio is not as diversified as it looks.",
      },
      {
        kind: "takeaway",
        text: "Sector exposure is the hidden layer of concentration. Knowing where it sits is half the work.",
      },
    ],
  },
  {
    id: "5.7",
    level: 5,
    title: "Rebalancing",
    concept: "Rebalancing",
    minutes: 5,
    summary:
      "Bringing your portfolio back to its target allocation when time and market moves have pushed it away.",
    body: [
      {
        kind: "paragraph",
        text: "**Rebalancing** means buying and selling to bring your portfolio back to your target allocation. If stocks have grown to 70% when your target was 60%, rebalancing means selling some stocks and buying bonds or cash.",
      },
      {
        kind: "paragraph",
        text: "Markets do not move evenly. If stocks have a good year and bonds do not, stocks will become a larger share of the portfolio. Your allocation has changed without you deciding. Rebalancing is the way to bring it back to where you chose it to be.",
      },
      {
        kind: "paragraph",
        text: "Two common approaches. **Calendar-based**: review once or twice a year. **Threshold-based**: rebalance when an asset class drifts more than 5% away from target. Both work. Threshold-based tends to be more responsive; calendar-based is easier to keep up with.",
      },
      {
        kind: "paragraph",
        text: "Rebalancing means adjusting the mix, not chasing returns. Selling what has done well and buying what has lagged is not always comfortable. It means going against the recent market. That is the point.",
      },
      {
        kind: "paragraph",
        text: "Frequent rebalancing creates costs. Every trade has a spread and, in some markets, a tax event. Rebalancing once a year or on a 5% threshold keeps the work small and the benefit meaningful.",
      },
      {
        kind: "example",
        title: "Example",
        text: "Target allocation: 60% stocks, 30% bonds, 10% cash. After a strong year for stocks, the portfolio is 72% stocks, 20% bonds, 8% cash. Rebalancing means selling 12% of stocks and moving it into bonds and cash. You bring the portfolio back to 60/30/10.",
      },
      {
        kind: "takeaway",
        text: "Rebalancing keeps your portfolio on the plan you chose, not the plan the market chose for you.",
      },
    ],
  },
  {
    id: "5.7.1",
    level: 5,
    title: "Rebalancing in practice",
    concept: "Rebalancing methods",
    minutes: 3,
    summary:
      "A closer look at calendar versus threshold rebalancing, and how professional investors apply them.",
    body: [
      {
        kind: "paragraph",
        text: "**Calendar rebalancing** follows a fixed schedule. You pick a date, say, the first business day of January, and reset your allocation back to target. The advantage is simplicity. The disadvantage is that you might rebalance during a volatile period when waiting a few weeks would have been better.",
      },
      {
        kind: "paragraph",
        text: "**Threshold rebalancing** only acts when an asset class drifts beyond a preset band, typically 5%. If your target is 60% stocks and it hits 65%, you rebalance. This approach minimises unnecessary trades and can be more tax-efficient.",
      },
      {
        kind: "paragraph",
        text: "A survey of large public pension funds found that all of them use either a calendar policy, a threshold policy, or a combination of the two. Vanguard and Norges Bank, two of the world's largest asset managers, both use threshold-based approaches.",
      },
      {
        kind: "paragraph",
        text: "The drift in allocation after a period can be calculated with a simple formula. If a 60/40 portfolio has stocks returning `R_SP` and bonds returning `R_10Y`, the new stock weight is `w_new = w_old * (1 + R_SP) / [w_old * (1 + R_SP) + (1 - w_old) * (1 + R_10Y)]`. This shows how quickly a portfolio can drift away from its target.",
      },
      {
        kind: "paragraph",
        text: "For most learners, a hybrid approach works well. Check your portfolio once a year. If any asset class has drifted more than 5% from its target, rebalance then. If not, leave it alone. This combines the discipline of a schedule with the cost-awareness of a threshold.",
      },
      {
        kind: "example",
        title: "Example",
        text: "A 60/40 portfolio. Stocks return 10%, bonds return 2%. The new stock weight is 0.60 * 1.10 / (0.60 * 1.10 + 0.40 * 1.02) = 0.66 / 1.068 = 61.8%. A single year of strong stock performance has already pushed the allocation from 60% to nearly 62%.",
      },
      {
        kind: "takeaway",
        text: "Both calendar and threshold methods work. The important thing is to have a rule and stick to it.",
      },
    ],
  },

  
  {
    id: "6.1",
    level: 6,
    title: "Why charts exist",
    concept: "Price charts",
    minutes: 5,
    summary:
      "A chart is the story of a stock price over time. Different chart types show different amounts of that story.",
    body: [
      {
        kind: "paragraph",
        text: "A price chart is a picture of everything that happened to a stock price over time. Every chart tells the same underlying story. The difference is how much detail each type shows. The three you will see most often are the line chart, the bar chart, and the candlestick chart.",
      },
      {
        kind: "paragraph",
        text: "The **line chart** connects closing prices with a single line. It is the simplest view and the best for seeing the long-term direction. It hides the daily back-and-forth, which is useful when you want to see the forest rather than the trees.",
      },
      {
        kind: "paragraph",
        text: "The **bar chart**, sometimes called an OHLC chart, shows four prices for each period: **open**, **high**, **low**, and **close**. The vertical line is the day range. The two horizontal dashes are the open and the close. It gives you more information than a line chart without much extra clutter.",
      },
      {
        kind: "paragraph",
        text: "The **candlestick chart** shows the same four prices as a bar chart. The thick body is the range between open and close. The thin lines above and below are the highest and lowest prices of the period. Candlesticks are colour-coded: green if the close was higher than the open, red if the close was lower. Most investors prefer candlesticks because the picture is easier to read at a glance.",
      },
      {
        kind: "paragraph",
        text: "For long-term investing, a line chart is often enough. For short-term decisions, candlesticks show more. Neither is better than the other. They just reveal different levels of detail.",
      },
      {
        kind: "example",
        title: "Example",
        text: "The same week of Safaricom trading, viewed three ways. The line chart shows a mild rise. The bar chart shows four daily OHLC ranges. The candlestick chart shows the same data with clear green and red bodies that make the daily story obvious.",
      },
      {
        kind: "takeaway",
        text: "Every chart tells the same story. The type you choose determines how much of the story you see.",
      },
    ],
  },
  {
    id: "6.2",
    level: 6,
    title: "The language of a candle",
    concept: "Candlesticks",
    minutes: 6,
    summary:
      "Each candle tells you four things: where the price opened, where it closed, and how far it moved in each direction.",
    body: [
      {
        kind: "paragraph",
        text: "A single candle on a daily chart represents one full day of trading. Everything that happened between the opening bell and the closing bell is compressed into that one shape. The **open** is the first price of the period. The **close** is the last price. The **high** is the highest price reached. The **low** is the lowest.",
      },
      {
        kind: "paragraph",
        text: "The thick part of the candle is called the **body**. It stretches from the open price to the close price. If the close is above the open, the body is green. If the close is below the open, the body is red. The body tells you who won the period: buyers or sellers.",
      },
      {
        kind: "paragraph",
        text: "The thin lines above and below the body are called **wicks** or **shadows**. The upper wick shows the highest price reached. The lower wick shows the lowest. A long upper wick means the price pushed up but could not hold. A long lower wick means the price pushed down but buyers stepped in.",
      },
      {
        kind: "paragraph",
        text: "A candle with a long green body and no wicks means buyers controlled the whole period. A candle with a long red body and no wicks means sellers controlled it. A candle with a tiny body and long wicks on both sides means neither side won. The price moved but ended near where it started.",
      },
      {
        kind: "example",
        title: "Example",
        text: "Safaricom trading day. Open KSh 35.20. High KSh 35.80. Low KSh 35.10. Close KSh 35.75. The candle has a green body from 35.20 to 35.75, a small upper wick to 35.80, and a small lower wick to 35.10. Buyers controlled the day.",
      },
      {
        kind: "takeaway",
        text: "A candle is not just a shape. It is a record of who controlled the price during that period.",
      },
    ],
  },
  {
    id: "6.2.1",
    level: 6,
    title: "Candlestick patterns",
    concept: "Candlestick patterns",
    minutes: 4,
    summary:
      "Certain candle shapes and sequences repeat, and they often signal what might happen next.",
    body: [
      {
        kind: "paragraph",
        text: "When the same candle shapes appear again and again in similar situations, traders give them names. A pattern is not a guarantee. It is a signal worth noticing.",
      },
      {
        kind: "paragraph",
        text: "The **doji** has almost no body. The open and close are nearly the same. It signals indecision. Buyers and sellers fought to a draw.",
      },
      {
        kind: "paragraph",
        text: "The **hammer** has a small body at the top and a long lower wick. It appears after a decline and suggests sellers pushed the price down but buyers took over. It can signal a reversal.",
      },
      {
        kind: "paragraph",
        text: "The **shooting star** has a small body at the bottom and a long upper wick. It appears after a rise and suggests buyers pushed the price up but sellers took over. It can signal a reversal.",
      },
      {
        kind: "paragraph",
        text: "The **bullish engulfing** is a small red candle followed by a larger green candle that completely covers it. It suggests the balance of power has shifted from sellers to buyers. A bearish engulfing is the opposite.",
      },
      {
        kind: "example",
        title: "Example",
        text: "A hammer at a support level after a decline. The candle shows buyers stepped in at KSh 34.80. The next day the price opens higher. The pattern is not a guarantee, but it told a story about who showed up at that level.",
      },
      {
        kind: "takeaway",
        text: "Patterns are not predictions. They are observations about who is controlling the price.",
      },
    ],
  },
  {
    id: "6.3",
    level: 6,
    title: "Timeframes",
    concept: "Timeframes",
    minutes: 5,
    summary:
      "The same stock looks different depending on how much time each candle covers.",
    body: [
      {
        kind: "paragraph",
        text: "A daily chart shows about 100 trading days. A weekly chart shows about 100 weeks. A monthly chart shows about 100 months. The data is the same, but the picture it paints is very different.",
      },
      {
        kind: "paragraph",
        text: "**Daily** charts are best for short-term moves and for seeing what happened in the last few months. Each candle is one trading day.",
      },
      {
        kind: "paragraph",
        text: "**Weekly** charts smooth out daily noise and show the intermediate trend. Most swing traders use weekly charts to identify the direction and daily charts to time entries.",
      },
      {
        kind: "paragraph",
        text: "**Monthly** charts show the long-term direction. They are what long-term investors use to see whether a stock is in a multi-year uptrend or downtrend.",
      },
      {
        kind: "paragraph",
        text: "A stock can look like it is crashing on the daily chart and be in a healthy uptrend on the weekly. Looking at multiple timeframes gives you the full picture. Start with the monthly to see the long-term direction. Then use the weekly to identify the current trend. Then use the daily to time a decision.",
      },
      {
        kind: "example",
        title: "Example",
        text: "Safaricom over one year. The daily chart shows a sharp fall in March. The weekly chart shows that fall was a dip within a larger uptrend. The monthly chart shows the price has been rising for three years. Same stock, three very different impressions.",
      },
      {
        kind: "takeaway",
        text: "Always check the bigger timeframe before acting on what you see in a smaller one.",
      },
    ],
  },
  {
    id: "6.4",
    level: 6,
    title: "Volume",
    concept: "Volume",
    minutes: 6,
    summary:
      "Volume is how many shares traded. It tells you how much conviction was behind a price move.",
    body: [
      {
        kind: "paragraph",
        text: "Every trade has a buyer and a seller. **Volume** is the total number of shares that changed hands in a period. On a daily chart, it is the number of shares traded that day. It appears as vertical bars below the price chart. A tall bar means many shares traded. A short bar means few.",
      },
      {
        kind: "paragraph",
        text: "Volume tells you how many people agreed with the price move. A price rise on high volume means many buyers showed up. That is a stronger signal than the same rise on low volume. A price fall on high volume means many sellers showed up. Low volume moves are weaker and less reliable.",
      },
      {
        kind: "paragraph",
        text: "On the Nairobi Securities Exchange, volumes are smaller than on larger global exchanges. Safaricom often trades several million shares a day. Smaller NSE stocks might trade tens of thousands. What matters is not the absolute number but whether today volume is higher or lower than the stock recent average.",
      },
      {
        kind: "paragraph",
        text: "A sudden spike in volume often means something happened. An earnings release, a regulatory announcement, a large institutional buyer. The price move that follows a volume spike usually carries more weight.",
      },
      {
        kind: "example",
        title: "Example",
        text: "Safaricom reports earnings. Volume on that day is three times its 30-day average. The price rises 4%. The high volume confirms that the market reacted strongly to the news. The next day volume returns to normal and the price holds. The move was real.",
      },
      {
        kind: "takeaway",
        text: "Price tells you what happened. Volume tells you how many people cared.",
      },
    ],
  },
  {
    id: "6.5",
    level: 6,
    title: "Support and resistance",
    concept: "Support and resistance",
    minutes: 6,
    summary:
      "Support and resistance are price levels where a stock has repeatedly stopped falling or rising.",
    body: [
      {
        kind: "paragraph",
        text: "When a stock falls to a certain price and buyers step in, that price becomes a **support level**. When it rises to a certain price and sellers take over, that price becomes a **resistance level**. These levels form because of collective memory. Traders remember where the price turned before and act on that memory.",
      },
      {
        kind: "paragraph",
        text: "Support is a floor. When price falls to that level, buyers tend to step in. It is not a guarantee that the price will bounce. It is a place where the balance between buyers and sellers has shifted in the past.",
      },
      {
        kind: "paragraph",
        text: "Resistance is a ceiling. When price rises to that level, sellers tend to step in. The price can break through resistance if enough buyers show up. When it does, the old resistance often becomes a new support.",
      },
      {
        kind: "paragraph",
        text: "A support or resistance line is drawn at a price level where the stock has turned at least twice before. One turn is a coincidence. Two turns is a pattern. Three is a strong level.",
      },
      {
        kind: "paragraph",
        text: "Support and resistance give you a way to think about where the price might stop. They are not predictions. They are areas of interest. A trader might decide to buy near support and sell near resistance. An investor might wait for a break above resistance before committing.",
      },
      {
        kind: "example",
        title: "Example",
        text: "Equity Group has turned at KSh 95 three times in the past year. That is a resistance level. The fourth time it approaches KSh 95, the market watches to see if this time is different. If the price breaks above and holds, the old resistance becomes a new floor.",
      },
      {
        kind: "takeaway",
        text: "Support and resistance are levels the market remembers. They give you context for where the price might pause.",
      },
    ],
  },
  {
    id: "6.6",
    level: 6,
    title: "Trends",
    concept: "Trends",
    minutes: 6,
    summary:
      "A trend is the general direction the price is moving. There are three: up, down, and sideways.",
    body: [
      {
        kind: "paragraph",
        text: "A **trend** is the overall direction of a price over time. It is not about one day or one week. It is about the pattern of highs and lows over weeks or months.",
      },
      {
        kind: "paragraph",
        text: "An **uptrend** forms when the price makes higher highs and higher lows. Each peak is higher than the last. Each dip bottoms out higher than the last. Buyers are in control.",
      },
      {
        kind: "paragraph",
        text: "A **downtrend** forms when the price makes lower highs and lower lows. Each rally fails at a lower level. Each decline goes deeper than the last. Sellers are in control.",
      },
      {
        kind: "paragraph",
        text: "A **sideways** trend is when the price stays within a range. It bounces between support and resistance without breaking out in either direction. Neither side is in control.",
      },
      {
        kind: "paragraph",
        text: "Connect the lows with a line. If the line slopes up, the trend is up. Connect the highs with a line. If the line slopes down, the trend is down. If neither line slopes clearly, the trend is sideways. The old saying is that the trend is your friend, because fighting a strong trend is usually a losing game.",
      },
      {
        kind: "example",
        title: "Example",
        text: "KCB Group in an uptrend. The stock rises from KSh 80 to KSh 95, pulls back to KSh 85, rises to KSh 105, pulls back to KSh 92, rises to KSh 115. Each high is higher. Each low is higher. The trend is clearly up.",
      },
      {
        kind: "takeaway",
        text: "Trends are about the pattern of highs and lows. Knowing the trend tells you which way the market is leaning.",
      },
    ],
  },
  {
    id: "6.7",
    level: 6,
    title: "Moving averages",
    concept: "Moving averages",
    minutes: 6,
    summary:
      "A moving average smooths price over a period. It shows the trend without the daily noise.",
    body: [
      {
        kind: "paragraph",
        text: "A **moving average** is the average price over a period, plotted as a line. A 50-day moving average adds up the last 50 closing prices and divides by 50. As each new day passes, the oldest day drops off and the newest day is added. The line moves with the price but more slowly.",
      },
      {
        kind: "paragraph",
        text: "Daily prices bounce around. A moving average smooths those bounces into a single line that shows the trend. When the price is above its moving average, the stock is doing better than its recent average. When below, it is doing worse.",
      },
      {
        kind: "paragraph",
        text: "The 20-day moving average is used for short-term trends. The 50-day for intermediate. The 200-day for long-term. When the 50-day crosses above the 200-day, it is called a **golden cross** and is seen as bullish. When the 50-day crosses below the 200-day, it is called a **death cross** and is seen as bearish.",
      },
      {
        kind: "paragraph",
        text: "A **simple moving average (SMA)** gives equal weight to every day. An **exponential moving average (EMA)** gives more weight to recent days. The EMA reacts faster to new information. Traders use EMAs for shorter timeframes and SMAs for longer ones.",
      },
      {
        kind: "paragraph",
        text: "A moving average can act as a dynamic support or resistance level. In an uptrend, the price often pulls back to the 50-day moving average and then bounces. The moving average becomes a moving floor.",
      },
      {
        kind: "example",
        title: "Example",
        text: "Safaricom 50-day moving average is KSh 34.80. The price has been above it for six months. In a recent pullback, the price fell to KSh 34.90 and bounced. The 50-day average acted as support.",
      },
      {
        kind: "takeaway",
        text: "Moving averages turn a noisy price chart into a readable trend. They do not predict the future, but they show what has been happening.",
      },
    ],
  },
  {
    id: "6.8",
    level: 6,
    title: "Reading an investment platform",
    concept: "Platform navigation",
    minutes: 8,
    summary:
      "How to find what you need on a platform like Investing.com, and what every number means.",
    body: [
      {
        kind: "paragraph",
        text: "When you open a stock page on a platform like Investing.com, you see a chart at the top, key statistics on the left or right, and tabs for different views. The chart is the first thing most investors look at. The numbers around it tell you what the chart alone cannot.",
      },
      {
        kind: "paragraph",
        text: "The **quote panel** at the top shows the current price, the day change, the day range, the 52-week range, and the volume. These give you immediate context. Is the stock near its high or low for the year? Is today move large or small?",
      },
      {
        kind: "paragraph",
        text: "Above the chart, the **toolbar** has controls for timeframe (1D, 1W, 1M, 6M, 1Y, 5Y, Max), chart type (line, candle, bar), and indicators. The timeframe buttons let you zoom out. The chart type buttons let you switch from a simple line to detailed candles. The indicator button lets you add moving averages, RSI, or Bollinger Bands.",
      },
      {
        kind: "paragraph",
        text: "Below the chart, a tab called **Fundamentals** or **Financials** shows the company P/E ratio, EPS, market cap, dividend yield, revenue, profit, and more. This is where Level 2 and Level 3 come together. You can see the P/E ratio you learned about, the EPS, the dividend yield.",
      },
      {
        kind: "paragraph",
        text: "A **screener** lets you filter every stock on the exchange by criteria you choose. Market cap, dividend yield, P/E ratio, sector, and hundreds more. It is how you find stocks that match your goals without scrolling through hundreds of names. Investing.com calls these screens and lets you save them for later.",
      },
      {
        kind: "paragraph",
        text: "A **watchlist** is a list of stocks you want to follow. You add a stock by clicking a star or a checkbox. Your watchlist shows the current price and daily change for everything on it. It is how you track the companies you care about without owning them yet.",
      },
      {
        kind: "paragraph",
        text: "Platforms let you set **price alerts**. You pick a price and the platform notifies you when the stock reaches it. This means you do not have to watch the market all day. You set the level that matters to you, and let the platform do the watching.",
      },
      {
        kind: "paragraph",
        text: "Start with the screener to find stocks that match your criteria. Add the interesting ones to your watchlist. Open the chart to see the trend and the timeframe. Check the fundamentals for valuation. Set an alert at a price that would make you act. Then walk away and let the platform tell you when to look again.",
      },
      {
        kind: "example",
        title: "Example",
        text: "A learner opens Investing.com, searches for Safaricom, and sees the price at KSh 35.20, up 1.2% on the day, near the high of its 52-week range. The chart shows an uptrend. The P/E is 14.8. The screener is used to find other Kenyan stocks with a P/E under 10 and a dividend yield above 5%. Two banks come up. They are added to a watchlist.",
      },
      {
        kind: "takeaway",
        text: "A platform is not just a chart. It is a set of tools that work together. Learning to navigate one makes every future decision easier.",
      },
    ],
  },
  {
    id: "6.8.1",
    level: 6,
    title: "The screener in practice",
    concept: "Screener",
    minutes: 3,
    summary:
      "How to filter the market down to a shortlist that fits your goals.",
    body: [
      {
        kind: "paragraph",
        text: "There are over 60 listed companies on the NSE and thousands on global exchanges. You cannot read about every one. A screener lets you set the criteria that matter to you and filters everything else out.",
      },
      {
        kind: "paragraph",
        text: "The common filters are **market cap** (size of company), **P/E ratio** (valuation), **dividend yield** (income), **sector** (industry), **volume** (liquidity), and **price** (affordability). You can combine filters to narrow the list. A learner looking for income might set dividend yield above 5%, P/E below 10, and volume above a million shares.",
      },
      {
        kind: "paragraph",
        text: "The screener returns a list of stocks that match. Each row shows the criteria you filtered by. You can sort by any column. You can add them to a watchlist with one click.",
      },
      {
        kind: "paragraph",
        text: "When you find a set of filters that works, save it. Investing.com lets you name and store your screens so you can run them again next month without rebuilding the filters.",
      },
      {
        kind: "example",
        title: "Example",
        text: "A screen set for Kenyan banks with P/E under 6 and dividend yield over 5%. The results show Equity Group, KCB, Co-op Bank, and NCBA. Four stocks in a market of 60. The screen did the work of narrowing.",
      },
      {
        kind: "takeaway",
        text: "A screener is not a stock picker. It is a filter that narrows the market down to the names worth your attention.",
      },
    ],
  },
  {
    id: "6.9",
    level: 6,
    title: "Common chart patterns",
    concept: "Chart patterns",
    minutes: 5,
    summary:
      "Certain shapes appear again and again on charts. Each has a name and a story.",
    body: [
      {
        kind: "paragraph",
        text: "Chart patterns are shapes that form as price moves over time. They are not predictions. They are repeating structures that often appear before similar outcomes. Knowing them helps you read a chart the way you read a sentence.",
      },
      {
        kind: "paragraph",
        text: "A **double top** looks like the letter M. The price rises to a level, falls back, rises to the same level again, and then falls. It suggests that the price could not break through resistance twice. It often appears before a decline.",
      },
      {
        kind: "paragraph",
        text: "A **double bottom** looks like the letter W. The price falls to a level, bounces, falls to the same level again, and then rises. It suggests that buyers stepped in at the same level twice.",
      },
      {
        kind: "paragraph",
        text: "The **head and shoulders** pattern has three peaks. The middle peak is the highest, called the head. The two on the sides are lower, called the shoulders. It suggests that an uptrend is losing steam. The neckline is the support level that connects the two dips.",
      },
      {
        kind: "paragraph",
        text: "After a sharp price move, the price often pauses and consolidates in a small range. This looks like a **flag** or a **pennant**. When the price breaks out of the range in the same direction as the original move, the pattern suggests the trend is continuing.",
      },
      {
        kind: "paragraph",
        text: "No pattern is a guarantee. Patterns describe what has happened, not what will happen. Their value is in what they tell you about the balance between buyers and sellers at that moment.",
      },
      {
        kind: "example",
        title: "Example",
        text: "Equity Group forms a double top at KSh 100. The price tried to break through twice and failed both times. The stock then fell back to KSh 92. The pattern showed that buyers were not strong enough to push through.",
      },
      {
        kind: "takeaway",
        text: "Patterns are not magic. They are shapes that describe how buyers and sellers behaved at a specific place and time.",
      },
    ],
  },


  
  {
    id: "7.1",
    level: 7,
    title: "Interest rates",
    concept: "Interest rates",
    minutes: 7,
    summary:
      "The Central Bank rate is the price of money. When it moves, everything else moves with it.",
    body: [
      {
        kind: "paragraph",
        text: "The **Central Bank Rate (CBR)** is the interest rate at which the Central Bank of Kenya lends money to commercial banks. It is the anchor for every other interest rate in the economy: loans, mortgages, savings accounts, Treasury bills, and bonds. When the CBK changes the CBR, the cost of money changes everywhere.",
      },
      {
        kind: "paragraph",
        text: "The CBK has two main jobs: keep inflation low and support economic growth. When inflation is rising, the CBK raises rates to make borrowing more expensive and cool demand. When inflation is low and growth is slow, the CBK cuts rates to encourage borrowing and spending.",
      },
      {
        kind: "paragraph",
        text: "Through 2025, Kenya went through one of the most aggressive rate-cutting cycles in its history. The CBR fell from 11.25% in early 2025 to 9.00% by December, nine consecutive cuts. Treasury bill yields halved from over 16% to around 8 to 9%. The cost of money dropped sharply, and it changed where investors put their money.",
      },
      {
        kind: "paragraph",
        text: "When Treasury bills and bonds pay less, investors look elsewhere for returns. The stock market becomes more attractive by comparison. This is exactly what happened in Kenya. The NASI gained 51% in 2025 as billions flowed out of fixed income and into equities. The market re-rated upward because the alternative, cash and bonds, no longer offered the same return.",
      },
      {
        kind: "paragraph",
        text: "Lower rates reduce the cost of borrowing for companies. Banks can lend more and at better margins. Companies that carry debt pay less interest, which improves their profits. Construction and real estate companies benefit because customers can afford mortgages. This is why banking, construction, and real estate stocks led the 2025 rally.",
      },
      {
        kind: "paragraph",
        text: "When the CBK raises rates, the opposite happens. Bonds become more attractive than stocks. Companies pay more to borrow. Growth slows. The 2026 oil shock illustrates this: when inflation rose to 6.7%, the CBK paused its rate cuts, and the market stalled. Investors began rotating back to fixed income.",
      },
      {
        kind: "paragraph",
        text: "The CBR announcement comes every two months from the Monetary Policy Committee. The key question is not just what the rate is, but the direction: cutting, holding, or hiking. The direction tells you where money is flowing next.",
      },
      {
        kind: "example",
        title: "Example",
        text: "The 2025 rate cut cycle in numbers. CBR from 11.25% to 9.00%. T-bill yields from 16% to 8%. NASI up 51%. Banks up more than the index. A learner who understood the link between rate cuts and equity flows would have seen the setup before the rally.",
      },
      {
        kind: "takeaway",
        text: "Interest rates are the price of money. When they fall, stocks become more attractive. When they rise, bonds do.",
      },
    ],
  },
  {
    id: "7.1.1",
    level: 7,
    title: "How rate cuts reach your portfolio",
    concept: "Monetary transmission",
    minutes: 4,
    summary:
      "A rate cut does not affect everything at once. It flows through the economy in stages.",
    body: [
      {
        kind: "paragraph",
        text: "When the CBK cuts the CBR, the effect does not hit every asset on the same day. It travels through the system in a sequence. First, interbank rates fall. Then Treasury bill yields drop. Then commercial bank lending rates follow. Then corporate borrowing costs fall. Finally, company earnings improve.",
      },
      {
        kind: "paragraph",
        text: "Treasury bills react first. They are auctioned weekly, and their yields reset immediately. This is why the 2025 rate cuts were visible in T-bill yields within weeks, while the effects on corporate profits took months to show up.",
      },
      {
        kind: "paragraph",
        text: "Bank stocks react next. Lower funding costs mean banks can lend more profitably. The market prices this in. This is why banking stocks led the rally. By the time the NASI reached its peak, banks had already gained the most.",
      },
      {
        kind: "paragraph",
        text: "Company earnings are the last to move. It takes time for lower borrowing costs to translate into higher profits. Companies that carry significant debt take longer to benefit. A learner who watches the whole chain can anticipate where the market is heading next.",
      },
      {
        kind: "paragraph",
        text: "When you see a rate cut, the first question is: what has already moved? If T-bills have already dropped and banks have already rallied, the easy part may be over. The second question is: what has not moved yet?",
      },
      {
        kind: "example",
        title: "Example",
        text: "During the 2025 cycle, T-bill yields fell immediately. Bank stocks rallied within weeks. But some sectors, like manufacturing and construction, lagged because their earnings took longer to reflect lower borrowing costs. A learner who understood the transmission chain could spot the laggards.",
      },
      {
        kind: "takeaway",
        text: "Rate cuts flow through the economy in stages. Knowing the order tells you what to watch next.",
      },
    ],
  },
  {
    id: "7.2",
    level: 7,
    title: "Inflation",
    concept: "Inflation",
    minutes: 7,
    summary:
      "Inflation is the rate at which prices are rising. It affects every investment, and it hits different sectors differently.",
    body: [
      {
        kind: "paragraph",
        text: "**Inflation** is the rate at which the general level of prices is rising. When inflation is 5%, the same basket of goods that cost KSh 100 last year costs KSh 105 this year. The value of money falls over time. Inflation is measured by the Consumer Price Index, which tracks the prices of food, fuel, transport, housing, and other everyday items.",
      },
      {
        kind: "paragraph",
        text: "The CBK aims to keep inflation between 2.5% and 7.5%, with a midpoint of 5%. For most of 2025, Kenya inflation was comfortably within this range, averaging around 4.1%. That stability gave the CBK room to cut interest rates aggressively.",
      },
      {
        kind: "paragraph",
        text: "In early 2026, the Middle East conflict pushed global oil prices up sharply. Kenya imports all of its petroleum products, so higher oil prices flowed directly into fuel costs, transport costs, and food prices. Inflation jumped from 4.1% in April 2025 to 6.7% in May 2026. This is a supply-driven inflation, caused by an external shock, not by too much demand.",
      },
      {
        kind: "paragraph",
        text: "Inflation affects different companies in different ways. A company that can raise its prices to match inflation is protected. A company that cannot raise prices sees its margins squeezed. Banks often benefit from higher rates that come with higher inflation, but only if loan demand holds up. Consumer-facing companies suffer when customers cut spending.",
      },
      {
        kind: "paragraph",
        text: "Energy companies tend to do well during inflation because the price of their product is rising. Consumer staples, basic foods and utilities, hold up because people need them regardless of price. Healthcare is defensive. The sectors that suffer most are discretionary consumer goods, luxury goods, and companies with thin margins.",
      },
      {
        kind: "paragraph",
        text: "The biggest loser from inflation is cash. If your money is in a savings account paying 4% while inflation is 6%, you are losing 2% of purchasing power every year. This is why investors move money into assets that can outpace inflation: stocks, real estate, and inflation-protected bonds.",
      },
      {
        kind: "paragraph",
        text: "The CPI release comes monthly from the Kenya National Bureau of Statistics. The number itself matters, but the direction and the cause matter more. Is inflation rising because of fuel? Food? Demand? Each cause has different implications for different sectors.",
      },
      {
        kind: "example",
        title: "Example",
        text: "The 2026 inflation spike. Inflation rose from 4.1% to 6.7% in a year. Transport prices rose 10%. Food prices rose 8.8%. Diesel rose 17.9%. For a consumer, this meant less disposable income. For an investor, it meant the CBK paused its rate cuts, and the equity rally stalled.",
      },
      {
        kind: "takeaway",
        text: "Inflation is not just a number. It reshapes the economy, the market, and the value of your money.",
      },
    ],
  },
  {
    id: "7.2.1",
    level: 7,
    title: "Inflation: demand-pull vs cost-push",
    concept: "Types of inflation",
    minutes: 4,
    summary:
      "Not all inflation is the same. The cause determines what happens next.",
    body: [
      {
        kind: "paragraph",
        text: "**Demand-pull inflation** happens when there is too much money chasing too few goods. Consumers are spending, businesses are hiring, and prices rise because demand is strong. This type of inflation is usually a sign of a healthy economy, but it can get out of hand. Central banks respond by raising interest rates to cool demand.",
      },
      {
        kind: "paragraph",
        text: "**Cost-push inflation** happens when the cost of production rises. Oil prices go up. Shipping costs rise. A drought raises food prices. Companies pass these costs to consumers. This type of inflation is harder for central banks to control because raising interest rates does not lower the price of oil. The 2026 Kenya inflation spike was cost-push, driven by the oil shock.",
      },
      {
        kind: "paragraph",
        text: "The CBK response depends on the type. With demand-pull inflation, raising rates works. With cost-push inflation, raising rates can make things worse by slowing the economy without fixing the underlying cost. This is why the CBK paused instead of hiking in 2026. It knew the inflation was imported, not homegrown.",
      },
      {
        kind: "paragraph",
        text: "Demand-pull inflation is usually good for stocks because it comes with growth. Cost-push inflation is bad for stocks because it squeezes margins. The 2026 shock was cost-push, which is why the market fell. A learner who understands the difference can anticipate how the market will react.",
      },
      {
        kind: "example",
        title: "Example",
        text: "Two inflation scenarios. Scenario A: demand is strong, prices rise 5%, the CBK raises rates. Stocks may dip but the economy is healthy. Scenario B: oil prices double, prices rise 5%, the CBK cannot cut rates without making things worse. Stocks fall because margins are squeezed. Same inflation number, very different outcome.",
      },
      {
        kind: "takeaway",
        text: "The cause of inflation matters as much as the number. Cost-push inflation is harder to fix and harder on stocks.",
      },
    ],
  },
  {
    id: "7.3",
    level: 7,
    title: "Economic growth",
    concept: "GDP growth",
    minutes: 6,
    summary:
      "GDP measures the size of the economy. When it grows, companies grow with it.",
    body: [
      {
        kind: "paragraph",
        text: "**Gross Domestic Product** is the total value of everything a country produces in a year. It is the broadest measure of economic activity. When GDP grows, the economy is expanding. When it shrinks, the economy is contracting. Two consecutive quarters of contraction is called a recession.",
      },
      {
        kind: "paragraph",
        text: "Kenya GDP grew 5.0% in 2025, up from 4.7% in 2024. The growth was supported by services, industry, and recovering investment. For 2026, growth is projected at 4.3% to 5.3%, with downward revisions due to the oil shock and global uncertainty.",
      },
      {
        kind: "paragraph",
        text: "GDP is made up of consumption (what households spend), investment (what businesses spend), government spending, and net exports. In Kenya, consumption is the biggest driver. When households feel confident, they spend, and GDP grows. When they cut back, GDP slows.",
      },
      {
        kind: "paragraph",
        text: "Company earnings ultimately depend on economic activity. When GDP grows, more goods are sold, more services are used, and company profits tend to rise. When GDP slows, profits come under pressure. This is why the stock market often tracks GDP growth over long periods, even though day-to-day price moves have nothing to do with it.",
      },
      {
        kind: "paragraph",
        text: "Not every sector grows at the same rate. In Kenya, services such as banking, telecom, and retail grew faster than agriculture. A learner who knows which sectors are growing can position their portfolio accordingly. The agriculture sector, for example, is more sensitive to weather and commodity prices than services.",
      },
      {
        kind: "paragraph",
        text: "The KNBS releases GDP data quarterly. The key question is whether growth is accelerating or decelerating. A slowing GDP number can be a warning sign even if it is still positive. A number below expectations can move the market.",
      },
      {
        kind: "example",
        title: "Example",
        text: "Kenya 2025 GDP growth of 5.0% meant the economy was expanding. Companies in services and industry saw earnings grow. But the 2026 oil shock slowed growth projections to 4.3%. Investors who saw the slowdown coming could adjust their expectations before the market repriced.",
      },
      {
        kind: "takeaway",
        text: "GDP growth is the tide that lifts most boats. When it slows, even good companies feel it.",
      },
    ],
  },
  {
    id: "7.4",
    level: 7,
    title: "Exchange rates",
    concept: "Exchange rates",
    minutes: 6,
    summary:
      "The shilling value against other currencies affects imports, exports, inflation, and company earnings.",
    body: [
      {
        kind: "paragraph",
        text: "An **exchange rate** is the price of one currency in terms of another. The USD/KES rate tells you how many shillings it takes to buy one US dollar. When the rate rises, the shilling is weakening. It takes more shillings to buy the same dollar. When the rate falls, the shilling is strengthening.",
      },
      {
        kind: "paragraph",
        text: "Exchange rates are driven by supply and demand for currency. If Kenya exports more than it imports, demand for shillings rises and the currency strengthens. If Kenya imports more, demand for dollars rises and the shilling weakens. Interest rates also matter: higher rates attract foreign capital, strengthening the currency. The 2025 rate cuts made shilling assets less attractive, putting pressure on the currency.",
      },
      {
        kind: "paragraph",
        text: "The shilling was relatively stable through 2025, trading around 129 to the dollar. Foreign reserves were boosted by remittances and tea exports. But the 2026 oil shock changed the picture. Higher oil prices meant Kenya needed more dollars to pay for imports, putting downward pressure on the shilling. Analysts projected the shilling could weaken to 134.",
      },
      {
        kind: "paragraph",
        text: "Exporters benefit from a weak shilling. Tea, coffee, horticulture, and tourism companies earn in dollars but pay costs in shillings. When the shilling weakens, their revenue in shilling terms rises. This is why the agriculture sector can hold up during currency weakness.",
      },
      {
        kind: "paragraph",
        text: "Importers suffer from a weak shilling. Companies that import fuel, machinery, or raw materials pay more in shilling terms. This squeezes margins. Airlines, manufacturers, and energy companies are hit hardest. Consumers also suffer because imported goods become more expensive, feeding inflation.",
      },
      {
        kind: "paragraph",
        text: "The CBK publishes daily exchange rates and foreign reserves. A sharp move in the shilling can signal a shift in the economic environment. A weakening shilling combined with rising oil prices is a warning sign for the market.",
      },
      {
        kind: "example",
        title: "Example",
        text: "The 2026 oil shock. Higher oil prices meant Kenya needed more dollars to pay for imports. The shilling came under pressure. Exporters like tea producers benefited. Importers like fuel distributors suffered. Investors who understood the currency exposure of their holdings could anticipate which companies would be hit hardest.",
      },
      {
        kind: "takeaway",
        text: "The exchange rate is a transmission channel. It turns global shocks into local price changes.",
      },
    ],
  },
  {
    id: "7.5",
    level: 7,
    title: "Recession",
    concept: "Recession",
    minutes: 6,
    summary:
      "A recession is when the economy shrinks. Not every company suffers equally, and some are built to weather it.",
    body: [
      {
        kind: "paragraph",
        text: "A **recession** is a period of declining economic activity. The technical definition is two consecutive quarters of negative GDP growth. During a recession, companies earn less, unemployment rises, and consumers cut back on spending.",
      },
      {
        kind: "paragraph",
        text: "Before a recession is official, there are usually warning signs. The Purchasing Managers Index falls below 50. Consumer confidence drops. Companies cut jobs. Credit tightens. Kenya PMI fell to 46.6 in May 2026, signalling the first private-sector contraction since 2025. The World Bank cut growth forecasts. These were signs of a slowing economy, even if a full recession was not declared.",
      },
      {
        kind: "paragraph",
        text: "Stocks typically fall during a recession because earnings decline. But not all stocks fall equally. Cyclical companies, those tied to consumer spending, travel, and construction, fall hardest. Defensive companies such as utilities, consumer staples, and healthcare hold up better because demand for their products is stable regardless of the economy.",
      },
      {
        kind: "paragraph",
        text: "Bonds often do well during a recession. When central banks cut rates to stimulate the economy, bond prices rise. This is why bonds are considered a hedge against recession risk. Investors who hold bonds going into a recession often see their bond portfolio gain while stocks fall.",
      },
      {
        kind: "paragraph",
        text: "Kenya did not enter a formal recession in 2026, but it came close. Growth projections fell from 5.0% to 4.3%. The PMI contracted. Job cuts began. The market fell. The CBK held rates instead of cutting, because inflation was too high to allow stimulus. It was a difficult environment where the usual tools did not work.",
      },
      {
        kind: "paragraph",
        text: "A recession does not happen overnight. The warning signs appear months in advance. The PMI, consumer confidence, jobless claims, and GDP revisions are the signals. A learner who watches these can prepare before the recession is official.",
      },
      {
        kind: "example",
        title: "Example",
        text: "Kenya 2026 slowdown. The PMI fell below 50 in March. The World Bank cut growth forecasts in July. The NSE fell. Investors who saw the PMI contraction early could reduce exposure to cyclical stocks before the worst of the selloff.",
      },
      {
        kind: "takeaway",
        text: "Recessions are not sudden. The warning signs appear first. Watch them, and you will not be caught off guard.",
      },
    ],
  },
  {
    id: "7.6",
    level: 7,
    title: "Market shocks",
    concept: "Market shocks",
    minutes: 7,
    summary:
      "A market shock is a sudden event that moves prices sharply. How you respond matters more than the shock itself.",
    body: [
      {
        kind: "paragraph",
        text: "A **market shock** is an unexpected event that causes a sudden, sharp move in prices. Shocks can be economic, political, or natural. The 2020 pandemic was a shock. The 2026 Middle East conflict was a shock. The key characteristic is that they are unpredictable and they hit fast.",
      },
      {
        kind: "paragraph",
        text: "In early 2026, the US-Israel-Iran conflict disrupted the Strait of Hormuz, through which a quarter of the world oil passes. Oil prices shot up. Shipping routes were blocked. Kenya, which imports all its oil, felt the shock immediately. Fuel prices rose. Inflation jumped. The shilling weakened. The NSE fell.",
      },
      {
        kind: "paragraph",
        text: "The NSE lost KSh 200bn in a single week. Safaricom fell 10.8%. KCB fell 12.1%. Investors fled to safer assets. The CBK paused its rate cuts. The equity rally that had started in 2025 stalled. Within weeks, the market had repriced the entire economic outlook.",
      },
      {
        kind: "paragraph",
        text: "In the first days of a shock, investors sell everything. Correlations go to one. Diversification does not help in the immediate aftermath because fear is indiscriminate. This is one of the hardest lessons for beginners: a diversified portfolio can still fall sharply during a panic.",
      },
      {
        kind: "paragraph",
        text: "Not all shocks are the same. A supply shock, like an oil price spike, is different from a demand shock, like a recession. A short shock is different from a long one. The market recovery depends on the nature of the shock. The 2026 oil shock was a supply shock. Supply shocks usually resolve faster than demand shocks, but they can cause more inflation in the short term.",
      },
      {
        kind: "paragraph",
        text: "The worst thing to do during a shock is sell in a panic. The best thing is to have a plan before the shock happens. A plan includes knowing what you own, knowing why you own it, having cash available, and knowing what price would make you buy more. Investors who had a plan did not panic. Investors who did not, sold at the bottom.",
      },
      {
        kind: "paragraph",
        text: "Markets always recover from shocks eventually. The question is how long it takes. A short shock might see a recovery in weeks. A long shock might take years. The key is to be positioned to survive the short term so you can benefit from the long term.",
      },
      {
        kind: "example",
        title: "Example",
        text: "The 2026 oil shock in numbers. NSE lost KSh 200bn. Safaricom fell 10.8%. Inflation jumped from 4.1% to 6.7%. The CBK paused rate cuts. A learner who understood the shock could avoid panic selling and wait for the recovery.",
      },
      {
        kind: "takeaway",
        text: "Shocks are unpredictable. Your response does not have to be.",
      },
    ],
  },
  {
    id: "7.6.1",
    level: 7,
    title: "Anatomy of a market panic",
    concept: "Market panic",
    minutes: 4,
    summary:
      "Panics follow a pattern. Knowing the pattern helps you stay calm.",
    body: [
      {
        kind: "paragraph",
        text: "Market panics typically follow a sequence. First, the shock hits. Then, the initial selloff. Then, the bounce. Then, the second wave of selling as reality sets in. Then, the bottom. Then, the slow recovery. Most panics do not go straight down. They move in waves.",
      },
      {
        kind: "paragraph",
        text: "In the first 24 to 48 hours, investors sell everything. The selling is indiscriminate. There is no time to analyse which companies are affected. This is the most dangerous moment for a beginner because it feels like the world is ending.",
      },
      {
        kind: "paragraph",
        text: "After the initial selloff, there is often a bounce. Buyers step in because prices look cheap. This bounce can be sharp. It can also be a trap. Some investors buy the bounce, only to see the market fall again.",
      },
      {
        kind: "paragraph",
        text: "The second wave of selling comes when the economic reality becomes clear. Company earnings are revised down. Analysts cut targets. The news gets worse before it gets better. This is where the market bottoms.",
      },
      {
        kind: "paragraph",
        text: "The recovery begins when the news stops getting worse. It does not require good news. It only requires the absence of bad news. The market starts to price in a return to normal. Investors who held through the panic are rewarded.",
      },
      {
        kind: "paragraph",
        text: "Panics are emotional. The market is driven by fear and greed. Knowing the pattern does not make the panic easier, but it does make it more predictable. The worst thing you can do is sell at the bottom. The second worst thing is to buy at the top of the bounce.",
      },
      {
        kind: "example",
        title: "Example",
        text: "The 2026 oil shock played out in stages. The initial selloff was sharp. There was a brief bounce. Then a second wave as inflation data came in. Then the market found a bottom. A learner who understood the pattern could avoid selling at the bottom and wait for the recovery.",
      },
      {
        kind: "takeaway",
        text: "Panics follow a pattern. Knowing the pattern helps you stay calm when it matters most.",
      },
    ],
  },

  
  {
    id: "8.1",
    level: 8,
    title: "Equity ownership in depth",
    concept: "Ownership rights",
    minutes: 6,
    summary:
      "Owning a share gives you more than a claim on profit. It gives you rights, and those rights vary by company.",
    body: [
      {
        kind: "paragraph",
        text: "When you buy a share, you become a part-owner of a company. But what that ownership actually means depends on the company and the class of shares you buy. The two main rights are the **right to a share of profits** (through dividends, if declared) and the **right to vote** on major corporate decisions.",
      },
      {
        kind: "paragraph",
        text: "Ordinary shares, the ones most retail investors buy, usually come with voting rights. Preference shares usually do not, but they get paid dividends first and get priority if the company is wound up. On the NSE, most listed companies have only ordinary shares, so the picture is simple. On larger exchanges, some companies have two or three share classes with different rights.",
      },
      {
        kind: "paragraph",
        text: "Beyond voting, shareholders have the right to receive the annual report, to attend the annual general meeting, and in some jurisdictions to sue the company for mismanagement. These rights are enforced by the exchange and the regulator, which is why listing rules exist in the first place.",
      },
      {
        kind: "paragraph",
        text: "The most important right for a beginner is the one you exercise by choosing which companies to own. If the business is run in ways you do not agree with, you can sell and own something else. That is the discipline markets impose on managers.",
      },
      {
        kind: "example",
        title: "Example",
        text: "Safaricom has one class of shares. Every shareholder votes at the AGM in proportion to their holding. If you own 1% of the shares, you cast 1% of the votes. A company like Alphabet (Google) has three classes, and the founders control most of the voting power despite owning a small fraction of the company. Same asset class, very different governance.",
      },
      {
        kind: "takeaway",
        text: "A share is a bundle of rights. Know which ones you are buying.",
      },
    ],
  },
  {
    id: "8.2",
    level: 8,
    title: "Valuation multiples compared",
    concept: "Multiples",
    minutes: 7,
    summary:
      "P/E is the most common multiple, but it is not the only one. Each tells you something different.",
    body: [
      {
        kind: "paragraph",
        text: "A **valuation multiple** compares a company's price to a line item from its financials. The **P/E ratio** divides price by earnings. **P/B** divides price by book value. **P/S** divides price by revenue. **EV/EBITDA** divides enterprise value by earnings before interest, taxes, depreciation, and amortization.",
      },
      {
        kind: "paragraph",
        text: "Each multiple suits a different situation. P/E works for profitable companies. P/S works for companies that are growing fast but not yet profitable. P/B works for banks and asset-heavy businesses. EV/EBITDA works for comparing companies with different capital structures because it neutralises debt and tax differences.",
      },
      {
        kind: "paragraph",
        text: "**EV/EBITDA** is worth understanding because it solves a problem P/E does not. Two companies with identical operations but different debt levels will show very different P/E ratios, because interest expense affects net income. EV/EBITDA ignores capital structure, so it compares the underlying businesses on a cleaner basis.",
      },
      {
        kind: "paragraph",
        text: "No single multiple tells the whole story. A company can look cheap on P/E and expensive on P/B. A company can look expensive on P/E and cheap on EV/EBITDA. The skill is knowing which one to use, and when.",
      },
      {
        kind: "paragraph",
        text: "The rule of thumb: pick the multiple that matches the way the business makes money. For a bank, use P/B. For a software company, use EV/Revenue. For a stable industrial, use EV/EBITDA. For a mature dividend payer, use P/E and dividend yield together.",
      },
      {
        kind: "example",
        title: "Example",
        text: "Two Kenyan banks, both profitable, similar size. Bank A trades at P/E 5.0. Bank B trades at P/E 6.2. On P/E, Bank A looks cheaper. But Bank A has far more leverage, so on P/B it trades at 2.4 and Bank B at 1.8. On EV/EBITDA, Bank A is 8.5 and Bank B is 6.1. The multiple you pick changes which bank looks cheaper. That is why no single number answers the question.",
      },
      {
        kind: "takeaway",
        text: "Multiples are tools, not answers. Match the tool to the business.",
      },
    ],
  },
  {
    id: "8.3",
    level: 8,
    title: "Growth versus value investing",
    concept: "Styles",
    minutes: 6,
    summary:
      "Two of the oldest styles in equity investing. Neither is better. Each has a place.",
    body: [
      {
        kind: "paragraph",
        text: "**Growth investing** looks for companies whose earnings are expected to grow faster than the market. The investor is willing to pay a higher multiple today because the earnings are expected to be much larger in five or ten years. Growth stocks are often younger, operate in expanding industries, and reinvest most of their profits.",
      },
      {
        kind: "paragraph",
        text: "**Value investing** looks for companies trading below what the investor believes they are worth. The investor focuses on current financials, balance sheet strength, and dividend yield. Value stocks are often mature, in slower-growing industries, and frequently overlooked by the market.",
      },
      {
        kind: "paragraph",
        text: "The two styles perform differently across market cycles. Growth tends to lead in low-interest-rate environments, because future earnings are worth more when discounted at low rates. Value tends to lead when rates rise or when the economy is recovering, because current earnings matter more. Neither style dominates forever.",
      },
      {
        kind: "paragraph",
        text: "Some investors combine both. A **blend** approach buys a mix of growth and value names, or holds individual companies that show characteristics of both. Many index funds are blend funds by construction because they hold every stock in the index.",
      },
      {
        kind: "paragraph",
        text: "The most important thing for a beginner is not to pick a side but to know which style you are buying. A high P/E growth stock can fall hard if growth disappoints. A low P/E value stock can stay cheap for years. Both outcomes are normal. Knowing which one you own prepares you for both.",
      },
      {
        kind: "example",
        title: "Example",
        text: "In 2025, as Kenyan interest rates fell, growth-oriented names like Safaricom led the rally. In 2026, when inflation forced the CBK to pause, investors rotated to banks and dividend payers, which are more value-oriented. Same market, different styles leading.",
      },
      {
        kind: "takeaway",
        text: "Growth and value are labels, not guarantees. Understand which one you own.",
      },
    ],
  },
  {
    id: "8.4",
    level: 8,
    title: "Dividend strategies",
    concept: "Income",
    minutes: 6,
    summary:
      "Not all dividend stocks are the same. Yield, growth, and sustainability are three different questions.",
    body: [
      {
        kind: "paragraph",
        text: "A **dividend strategy** is an approach to picking stocks based on how they pay out profits. There are three common variants. **High-yield** looks for the largest dividend relative to price. **Dividend growth** looks for companies that consistently raise their dividend year after year. **Dividend safety** looks for companies whose payout is comfortably covered by earnings and cash flow.",
      },
      {
        kind: "paragraph",
        text: "The high-yield approach is the simplest but the most dangerous. A stock yielding 10% often has a falling share price. If the dividend is cut, the yield collapses and the price falls further. High yield frequently signals that the market expects trouble, not opportunity.",
      },
      {
        kind: "paragraph",
        text: "Dividend growth strategies target companies with a track record of raising their payout. These companies are usually mature but still growing. The compounding of a rising dividend is one of the most reliable wealth builders in equity investing. A stock yielding 3% today with a 10% annual dividend growth rate yields 7.8% on your original cost after ten years.",
      },
      {
        kind: "paragraph",
        text: "Dividend safety asks whether the payout is sustainable. The **payout ratio** is dividend per share divided by earnings per share. A payout ratio above 80% is a warning sign for most industries. A ratio below 40% leaves room for the company to raise the dividend and to absorb a bad year without cutting.",
      },
      {
        kind: "paragraph",
        text: "For a Kenyan investor, dividends are particularly valuable because the NSE is dividend-heavy. Many listed banks pay 5% to 7% yields. Safaricom pays around 5.7%. For a portfolio that needs income, the NSE offers meaningful yield without needing to take on the currency risk of foreign markets.",
      },
      {
        kind: "example",
        title: "Example",
        text: "Three Kenyan dividend stocks. Stock A yields 8.5% but its payout ratio is 110%, meaning it pays more than it earns. Stock B yields 5.5% with a payout ratio of 60% and a five-year history of raising the dividend. Stock C yields 3.5% with a payout ratio of 35% and 15% dividend growth per year. Stock A looks best today. Stocks B and C are likely to look better in ten years.",
      },
      {
        kind: "takeaway",
        text: "Yield is a starting point. Sustainability is the real test.",
      },
    ],
  },
  {
    id: "8.5",
    level: 8,
    title: "Share classes and voting rights",
    concept: "Governance",
    minutes: 6,
    summary:
      "Not every share of a company is the same. Some carry more voting power than others.",
    body: [
      {
        kind: "paragraph",
        text: "Large companies sometimes issue **multiple share classes** to keep control in the hands of founders or early investors while still raising money from the public. The most common pattern is Class A shares (with more votes) held by founders, and Class B shares (with fewer or no votes) sold to the public.",
      },
      {
        kind: "paragraph",
        text: "This structure exists because founders want to raise capital without losing control. It has real costs. If the founders make decisions that public shareholders disagree with, the public shareholders have no way to vote them out. The market prices this in by applying a lower multiple to companies with dual-class structures than to companies with one share, one vote.",
      },
      {
        kind: "paragraph",
        text: "The opposite structure also exists. Some companies have **super-voting shares** that are held in a trust or by a foundation, ensuring that no single external shareholder can take control. This is common in companies with strong founding families, and it can be either protective or restrictive depending on how it is used.",
      },
      {
        kind: "paragraph",
        text: "The practical lesson for a beginner: when you buy a share, know what rights it carries. Read the company's filings or check the exchange listing. If you own the non-voting class, you are buying an economic interest in the business, not a voice in how it is run.",
      },
      {
        kind: "paragraph",
        text: "Most NSE-listed companies have a single class. The dual-class question matters most when investing internationally, particularly in US and Chinese tech companies, where the structure is common.",
      },
      {
        kind: "example",
        title: "Example",
        text: "Alphabet has three classes. Class A shares, held by the public, carry one vote each. Class B shares, held by founders, carry ten votes each. Class C shares carry no votes. If you buy Class A, you can vote at the AGM but your vote is easily outnumbered. If you buy Class C, you own a piece of the profits but have no say in how the company is run.",
      },
      {
        kind: "takeaway",
        text: "Not all shares are equal. Read the rights before you buy.",
      },
    ],
  },
  {
    id: "8.6",
    level: 8,
    title: "Splits, buybacks, and dilution",
    concept: "Capital actions",
    minutes: 6,
    summary:
      "Companies can change the number of shares in circulation. Each change has a different effect on shareholders.",
    body: [
      {
        kind: "paragraph",
        text: "A **stock split** divides every existing share into multiple new shares. A 2-for-1 split doubles the number of shares and halves the price. The value of your holding does not change. Splits are usually done to make the share price more accessible to retail investors. They are cosmetic.",
      },
      {
        kind: "paragraph",
        text: "A **share buyback** is when a company uses its cash to buy its own shares on the open market. This reduces the number of shares outstanding. Each remaining share now represents a larger slice of the company. Buybacks increase earnings per share without any improvement in the underlying business, which is why some investors view them with suspicion when done at high prices.",
      },
      {
        kind: "paragraph",
        text: "**Dilution** is the opposite. When a company issues new shares, each existing share represents a smaller slice. Dilution happens when a company raises capital by selling new shares, when it issues shares to employees as compensation, or when it converts convertible bonds into equity. Dilution is one of the slowest and most overlooked forms of shareholder value destruction.",
      },
      {
        kind: "paragraph",
        text: "The key question for any capital action is whether it increases or decreases value per share. A buyback at a low price is accretive. A buyback at a high price is destructive. A share issuance to fund a project that earns more than the cost of capital is accretive. A share issuance to fund operating losses is destructive.",
      },
      {
        kind: "paragraph",
        text: "For a beginner, the simplest test is to track **shares outstanding** over time. If the count is growing, the company is diluting. If it is falling, the company is buying back. Combined with a check on the price paid, this tells you whether management is being a good steward of your ownership stake.",
      },
      {
        kind: "example",
        title: "Example",
        text: "A company buys back 5% of its shares at KSh 100 each. Two years later the share price is KSh 150. The buyback was accretive. A second company buys back 5% of its shares at KSh 200 each. Two years later the share price is KSh 100. The buyback destroyed value compared to holding cash. Same action, opposite outcome, depending on the price paid.",
      },
      {
        kind: "takeaway",
        text: "Watch the share count. It tells you whether you are being helped or quietly diluted.",
      },
    ],
  },
  {
    id: "8.7",
    level: 8,
    title: "Screening for stocks",
    concept: "Discovery",
    minutes: 6,
    summary:
      "Screening is how you narrow a market of hundreds of companies to a shortlist worth researching.",
    body: [
      {
        kind: "paragraph",
        text: "A **stock screener** filters the universe of listed companies by criteria you choose. It answers the question: which companies deserve my attention? The answer depends on your strategy. A value investor screens for low P/E and high dividend yield. A growth investor screens for high revenue growth and rising margins.",
      },
      {
        kind: "paragraph",
        text: "The most common screens. **Quality**: consistent earnings growth, low debt, high return on equity. **Value**: low P/E, low P/B, high dividend yield. **Growth**: high revenue and earnings growth, high reinvestment. **Momentum**: strong recent price performance. **Income**: high dividend yield with a sustainable payout.",
      },
      {
        kind: "paragraph",
        text: "No single screen gives you a buy list. Every screen produces candidates that still need to be researched. The screen just eliminates the 90% of the market that does not match your style, so you can spend time on the 10% that does.",
      },
      {
        kind: "paragraph",
        text: "On the NSE, screens are less common than in larger markets because the universe is small. But even with 60 listed companies, a screen helps. A screen for banks with P/E under 6 and dividend yield above 5% returns four names. That is a manageable list to research.",
      },
      {
        kind: "paragraph",
        text: "The best screens are the ones you build yourself, starting from a strategy. If you know you want dividend-paying banks with conservative balance sheets, you can translate that into a filter. If you do not know what you want, no screen will help.",
      },
      {
        kind: "example",
        title: "Example",
        text: "A learner decides they want large-cap dividend stocks. Their screen: market cap above KSh 50bn, dividend yield above 5%, payout ratio under 70%, five-year dividend history without cuts. On the NSE, this returns four to six names. That is the shortlist. Research begins there.",
      },
      {
        kind: "takeaway",
        text: "Screens narrow the field. They do not pick winners.",
      },
    ],
  },
  {
    id: "8.8",
    level: 8,
    title: "Emerging versus developed markets",
    concept: "Geography",
    minutes: 6,
    summary:
      "Kenya is an emerging market. Developed markets behave differently. Understanding the difference matters.",
    body: [
      {
        kind: "paragraph",
        text: "Markets are usually classified as **developed**, **emerging**, or **frontier**. Developed markets include the US, Japan, Germany, and the UK. Emerging markets include China, India, Brazil, and South Africa. Frontier markets include Kenya, Nigeria, Vietnam, and Bangladesh. The classifications are based on size, liquidity, regulatory quality, and investor protections.",
      },
      {
        kind: "paragraph",
        text: "Emerging and frontier markets offer higher growth potential because their economies are growing faster. But they also come with higher volatility, thinner liquidity, weaker investor protections, and higher currency risk. The higher returns and higher risks are two sides of the same coin.",
      },
      {
        kind: "paragraph",
        text: "Investors often add emerging markets exposure for diversification. The correlation between developed and emerging markets is lower than the correlation within developed markets alone. But in a global crisis, correlations converge, and emerging markets fall harder than developed ones.",
      },
      {
        kind: "paragraph",
        text: "For a Kenyan investor, the home market is already an emerging/frontier exposure. Adding developed markets exposure through an ETF or a fund gives balance. Adding other emerging markets gives diversification within the higher-growth bucket. Both are reasonable, but they answer different questions.",
      },
      {
        kind: "paragraph",
        text: "The practical takeaway is that a portfolio entirely in NSE stocks is a concentrated bet on one economy. Even a small allocation to developed markets changes the shape of the portfolio. That is the topic of Level 15 (International Investing).",
      },
      {
        kind: "example",
        title: "Example",
        text: "In 2025, the NASI gained 51%. The S&P 500 gained about 20%. The NSE outperformed because Kenya was in a rate-cut cycle while US rates were higher. In 2026, when the oil shock hit Kenya harder than it hit the US, the pattern reversed. Same two markets, opposite years. A portfolio that held both would have been smoother than a portfolio holding only one.",
      },
      {
        kind: "takeaway",
        text: "Geography is a source of both risk and opportunity. Kenyan investors should think beyond the NSE.",
      },
    ],
  },

  
  {
    id: "9.1",
    level: 9,
    title: "Bond fundamentals",
    concept: "Coupon, maturity, yield",
    minutes: 6,
    summary:
      "A bond is a loan with three defining features: how much it pays, when it pays back, and what yield it offers.",
    body: [
      {
        kind: "paragraph",
        text: "A **bond** is a loan made by an investor to a borrower. The borrower can be a government, a company, or a municipality. Three features define every bond. The **face value** is the amount that will be repaid at the end. The **coupon** is the interest rate paid along the way. The **maturity** is the date the face value is repaid.",
      },
      {
        kind: "paragraph",
        text: "In Kenya, the most common bonds are issued by the government through the Central Bank. They are auctioned regularly, with maturities ranging from one year to thirty years. Corporate bonds are issued by companies and pay higher coupons because the risk of default is higher.",
      },
      {
        kind: "paragraph",
        text: "The **yield** is the return you actually earn if you buy the bond at the current price and hold it to maturity. It is different from the coupon. If you buy a bond with a 10% coupon at a discount to face value, your yield is higher than 10%. If you buy at a premium, your yield is lower.",
      },
      {
        kind: "paragraph",
        text: "**Yield to maturity** is the most useful number for a bond investor. It takes into account the coupon, the price paid, the face value received at maturity, and the time remaining. It is the number you should compare when deciding between two bonds.",
      },
      {
        kind: "paragraph",
        text: "Most Kenyan retail investors access government bonds through the M-Akiba platform or directly through the CBK's auction system, or through a broker. Corporate bonds are less common but are available through some brokers and fund managers.",
      },
      {
        kind: "example",
        title: "Example",
        text: "A 15-year Kenyan government bond with a KSh 1,000 face value, a 12.76% coupon, and quarterly interest payments. If you buy it at face value and hold it to maturity, you receive KSh 127.60 per year in interest, plus your KSh 1,000 back at the end. If the market price rises to KSh 1,050, the coupon stays the same but the yield falls because you paid more for the same cash flow.",
      },
      {
        kind: "takeaway",
        text: "Coupon is what the bond pays. Yield is what you earn. Learn to tell them apart.",
      },
    ],
  },
  {
    id: "9.2",
    level: 9,
    title: "The yield curve",
    concept: "Yield curve",
    minutes: 6,
    summary:
      "The yield curve plots interest rates across maturities. Its shape tells you what the market expects.",
    body: [
      {
        kind: "paragraph",
        text: "The **yield curve** is a line that shows the yield of bonds across different maturities, usually from three months to thirty years. It is one of the most watched charts in finance because it captures the market's view of where interest rates are going.",
      },
      {
        kind: "paragraph",
        text: "A **normal** yield curve slopes upward. Longer maturities pay more because investors demand compensation for tying up their money longer. A **flat** yield curve means short and long rates are similar. An **inverted** yield curve slopes downward, meaning short rates are higher than long rates. Inversions have historically preceded recessions, though not always with reliable timing.",
      },
      {
        kind: "paragraph",
        text: "In Kenya, the yield curve is published by the CBK and updated after every auction. It has been steeply upward sloping for most of the last decade, reflecting the higher interest rates that Kenyan investors demand for long-dated government debt. In 2025, when the CBK cut short rates sharply, the yield curve steepened further because long rates did not fall as much.",
      },
      {
        kind: "paragraph",
        text: "The shape of the curve affects where investors put their money. When short rates fall, investors reach for longer maturities to lock in higher yields. When short rates rise, they prefer shorter maturities to avoid locking in low rates. The curve is a signal of what the market is doing.",
      },
      {
        kind: "paragraph",
        text: "For a retail investor, the yield curve is useful for one decision: how long to lend. If the curve is steep, longer maturities pay significantly more, and locking in makes sense. If the curve is flat, there is little benefit to going long, and staying short is more flexible.",
      },
      {
        kind: "example",
        title: "Example",
        text: "Kenya yield curve in 2025. The 91-day T-bill yielded 8.5%. The 5-year bond yielded 12.5%. The 15-year bond yielded 14.6%. The gap between short and long was over six percentage points. An investor willing to lock in for fifteen years earned almost double the short rate.",
      },
      {
        kind: "takeaway",
        text: "The yield curve tells you what the market expects about rates. It also tells you what it will pay you to wait.",
      },
    ],
  },
  {
    id: "9.3",
    level: 9,
    title: "Bond pricing and duration",
    concept: "Duration",
    minutes: 6,
    summary:
      "Bond prices move opposite to interest rates. Duration tells you how much.",
    body: [
      {
        kind: "paragraph",
        text: "Bond prices and interest rates move in **opposite directions**. When market rates rise, the price of existing bonds falls, because new bonds offer better coupons. When market rates fall, existing bond prices rise. This inverse relationship is the fundamental mechanic of the bond market.",
      },
      {
        kind: "paragraph",
        text: "**Duration** measures how sensitive a bond's price is to a change in interest rates. A bond with a duration of 5 years will fall about 5% if rates rise by 1%, and rise about 5% if rates fall by 1%. Duration is expressed in years, but it is really a sensitivity measure.",
      },
      {
        kind: "paragraph",
        text: "Duration depends on two things. The **time to maturity**: longer bonds have higher duration. The **coupon**: lower coupons have higher duration, because more of the value sits in the final repayment. A 30-year zero-coupon bond has a duration close to 30 years. A 30-year bond with a high coupon has a duration of maybe 12 years.",
      },
      {
        kind: "paragraph",
        text: "For a bond investor, duration is the primary risk measure. If you think rates are going to rise, you want short duration. If you think rates will fall, you want long duration. If you do not have a view, matching duration to your time horizon is the safe default.",
      },
      {
        kind: "paragraph",
        text: "There is a subtlety in how duration behaves. Price sensitivity is not perfectly linear. A 1% rate move has slightly less effect than two 1% moves combined, because the price-yield relationship is curved. **Convexity** measures this curvature. For most retail investors, the practical takeaway is that duration is a good approximation for small rate moves and less accurate for large ones.",
      },
      {
        kind: "example",
        title: "Example",
        text: "A 10-year Kenyan government bond with a 12% coupon has a duration of roughly 6 years. If rates rise from 12% to 13%, the bond price falls about 6%. If rates fall from 12% to 11%, the price rises about 6%. The same bond with a 15-year maturity and the same coupon has a duration of about 8 years, so it moves about 8% per 1% rate move.",
      },
      {
        kind: "takeaway",
        text: "Duration is the first thing to check when you buy a bond. It tells you how much the price will move when rates change.",
      },
    ],
  },
  {
    id: "9.4",
    level: 9,
    title: "Credit ratings and default risk",
    concept: "Credit",
    minutes: 6,
    summary:
      "Not every borrower repays. Credit ratings estimate the chance they will not.",
    body: [
      {
        kind: "paragraph",
        text: "**Credit risk** is the risk that a bond issuer does not pay its interest or repay its face value on time. Credit rating agencies, including Moody's, S&P, and Fitch, publish ratings that estimate this risk. The ratings range from AAA (safest) down to D (in default). Anything below BBB is called **junk** or **high-yield**.",
      },
      {
        kind: "paragraph",
        text: "Kenyan government bonds are rated around B3/B+ by the major agencies, which places them in the high-yield category. This is not because the government is likely to default in the near term, but because the currency and political environment create more uncertainty than in developed markets. The higher yield on Kenyan bonds is compensation for this rating.",
      },
      {
        kind: "paragraph",
        text: "The higher the credit risk, the higher the yield investors demand. This is the entire reason corporate bonds pay more than government bonds. In Kenya, a Safaricom corporate bond might pay 13% while a government bond of the same maturity pays 12%. The extra 1% is compensation for the small additional risk that Safaricom cannot pay.",
      },
      {
        kind: "paragraph",
        text: "Ratings change. A downgrade means the agency believes the issuer is riskier than before, and yields rise. An upgrade means the opposite. Watching rating changes is a way to anticipate yield moves. It also matters for institutional investors, because many funds are not allowed to hold anything below a certain rating.",
      },
      {
        kind: "paragraph",
        text: "For a retail investor, credit risk is a decision about yield. If you buy the highest-yielding bond in the market, you are being paid more for a reason. That reason might be a real opportunity if the market is being overly pessimistic, or it might be a warning.",
      },
      {
        kind: "example",
        title: "Example",
        text: "A Kenyan corporate bond rated BBB with a 10-year maturity yields 14%. A Kenyan government bond of the same maturity yields 12%. The 2 percentage point difference is the market's estimate of the additional risk that the company defaults. If the company's rating is upgraded to A, the yield might fall to 13%, and the bond price rises.",
      },
      {
        kind: "takeaway",
        text: "Higher yield means higher risk, always. There is no free lunch in credit.",
      },
    ],
  },
  {
    id: "9.5",
    level: 9,
    title: "Government, corporate, and municipal bonds",
    concept: "Issuers",
    minutes: 6,
    summary:
      "Bonds are issued by different kinds of borrowers, each with different risks and tax treatments.",
    body: [
      {
        kind: "paragraph",
        text: "**Government bonds** are issued by national treasuries. In Kenya, these are the most common bonds, auctioned by the Central Bank every week and month. They are considered the lowest-risk shilling-denominated bonds because the government can raise taxes or borrow to repay.",
      },
      {
        kind: "paragraph",
        text: "**Corporate bonds** are issued by companies. They pay higher coupons than government bonds, but they carry credit risk. On the NSE, corporate bonds are less common than in developed markets but a few names have issued them. The extra yield compensates for the possibility of default.",
      },
      {
        kind: "paragraph",
        text: "**Municipal bonds** are issued by county governments or local authorities. In Kenya, this market is small. In the US, it is huge, and the interest is often exempt from federal income tax, which makes the effective yield higher than it looks. Tax treatment varies by jurisdiction, so Kenyan investors considering foreign municipal bonds should check carefully.",
      },
      {
        kind: "paragraph",
        text: "There is also a category of **supranational bonds**, issued by institutions like the World Bank, the African Development Bank, or the IFC. These are usually rated higher than the sovereign country they lend to, and they often raise money in local currencies. They can offer better credit quality than the local government at similar yields.",
      },
      {
        kind: "paragraph",
        text: "The choice between government, corporate, and municipal comes down to what yield you need and how much risk you can carry. Government bonds are the safe default. Corporate bonds are for investors willing to take credit risk for extra yield. Municipal and supranational bonds are for specific situations.",
      },
      {
        kind: "example",
        title: "Example",
        text: "Three Kenyan bonds, all with 10-year maturities. Government bond at 12.5%. A bank corporate bond at 13.5%. An IFC kanga bond (supranational, shilling-denominated) at 13.0%. All three are available to retail investors. The government is safest, the bank is slightly riskier but pays more, and the IFC sits between them.",
      },
      {
        kind: "takeaway",
        text: "Issuers matter. Know who is borrowing your money.",
      },
    ],
  },
  {
    id: "9.6",
    level: 9,
    title: "Bond strategies: ladder, barbell, bullet",
    concept: "Strategies",
    minutes: 7,
    summary:
      "How you spread maturities across a bond portfolio is a strategy. Three classic approaches.",
    body: [
      {
        kind: "paragraph",
        text: "A **bond ladder** spreads your money evenly across maturities. If you have KSh 500,000 to invest, you buy five bonds each with 1, 2, 3, 4, and 5 year maturities, KSh 100,000 each. Every year, one bond matures, and you reinvest it at the longest maturity of the ladder. The ladder produces a steady stream of maturities, which means you are never forced to sell at a bad time.",
      },
      {
        kind: "paragraph",
        text: "A **barbell** concentrates on the extremes. You buy short-maturity bonds (1 to 2 years) and long-maturity bonds (20 to 30 years), and nothing in between. The short end gives you liquidity. The long end gives you yield and duration. This works best when you believe long rates will fall, because the long end gains the most.",
      },
      {
        kind: "paragraph",
        text: "A **bullet** concentrates on a single maturity. You buy bonds that all mature in, say, 10 years. This gives you a specific known cash flow at a specific date, which is useful when you have a goal. It also exposes you to interest rate risk at that specific point on the curve.",
      },
      {
        kind: "paragraph",
        text: "Which strategy fits depends on your goals. A **ladder** is the default for a retail investor building long-term income. It requires no view on interest rates. A **barbell** requires a view that rates will fall or that the curve will steepen. A **bullet** requires a specific known liability, like school fees in ten years.",
      },
      {
        kind: "paragraph",
        text: "For most Kenyan retail investors, a ladder is the right starting point because it does not require a forecast and it protects against being forced to sell into a bad market. The extra work of managing a ladder is minimal, and the discipline it enforces is valuable.",
      },
      {
        kind: "example",
        title: "Example",
        text: "A learner with KSh 1,000,000 to invest in bonds. Option A: buy one 15-year bond at 14.6%. If rates rise to 18%, the bond price falls sharply, and if they need cash, they sell at a loss. Option B: build a 5-year ladder with KSh 200,000 per rung. Every year, one rung matures, and they have KSh 200,000 available. If rates rise, they reinvest at higher rates. The ladder is simpler to live with.",
      },
      {
        kind: "takeaway",
        text: "The best bond strategy is the one that matches your goal and that you can hold through any rate environment.",
      },
    ],
  },
  {
    id: "9.7",
    level: 9,
    title: "Inflation-protected bonds",
    concept: "Inflation",
    minutes: 6,
    summary:
      "Some bonds adjust their payments with inflation. In Kenya, these are scarce. Elsewhere, they are common.",
    body: [
      {
        kind: "paragraph",
        text: "**Inflation-protected bonds** are bonds whose principal and interest payments adjust with inflation. The most common kind is the TIPS in the US and the index-linked gilts in the UK. When inflation rises, the bond's principal rises with it, and the coupon is calculated on the higher principal. When inflation falls, the principal falls too (though not below the original face value).",
      },
      {
        kind: "paragraph",
        text: "In Kenya, inflation-protected bonds are rare. The government has issued them occasionally, but they are not part of the regular auction schedule. This means a Kenyan investor worried about inflation either has to accept the erosion of purchasing power or look at foreign inflation-protected bonds, which come with currency risk.",
      },
      {
        kind: "paragraph",
        text: "The trade-off with inflation-protected bonds is that the initial yield is lower than on regular bonds. In a low-inflation environment, this looks like a bad deal. In a high-inflation environment, the extra payment makes up for it. Breakeven inflation is the difference between the yield on a regular bond and the yield on an inflation-protected bond, and it represents the market's expectation of future inflation.",
      },
      {
        kind: "paragraph",
        text: "For a Kenyan investor, alternatives to inflation-protected bonds include **real estate** (which adjusts with inflation but is illiquid) and **equities** (which can pass through inflation over time but with much higher volatility). Neither is a perfect substitute, but together they serve a similar purpose in a portfolio.",
      },
      {
        kind: "paragraph",
        text: "The lesson is not that inflation-protected bonds are always better. It is that inflation is a real risk for any fixed-income investor, and there are specific tools to address it. In Kenya, those tools are limited, so the strategy has to involve other asset classes.",
      },
      {
        kind: "example",
        title: "Example",
        text: "In the US, a 10-year Treasury bond yields 4.2%. A 10-year TIPS bond yields 1.8%. The difference, 2.4%, is the breakeven inflation rate. If inflation averages 3% over the next ten years, the TIPS outperforms. If inflation averages 1.5%, the regular bond outperforms. In Kenya, no equivalent choice exists with the same precision, so investors have to combine bonds with real assets instead.",
      },
      {
        kind: "takeaway",
        text: "Inflation is a real risk for bond investors. Know what tools are available, even if they are limited.",
      },
    ],
  },
  {
    id: "9.8",
    level: 9,
    title: "Bond funds versus individual bonds",
    concept: "Structure",
    minutes: 6,
    summary:
      "You can buy bonds directly or through a fund. Each has trade-offs.",
    body: [
      {
        kind: "paragraph",
        text: "An **individual bond** is bought and held directly. You receive the coupon payments yourself and the face value at maturity. You know exactly what you will earn if you hold to maturity. The main drawback is that you need enough money to buy a meaningful position. In Kenya, the minimum for a government bond is often KSh 50,000, which limits how much you can diversify.",
      },
      {
        kind: "paragraph",
        text: "A **bond fund** pools money from many investors and buys a diversified portfolio of bonds. The fund's yield is the average of its holdings, and its price fluctuates daily. You can buy in and out of a fund in small amounts, which makes diversification easier. The trade-off is that a fund never matures, so you cannot lock in a specific yield to a specific date.",
      },
      {
        kind: "paragraph",
        text: "Bond **ETFs** are similar to bond funds but trade on an exchange like stocks. They are usually cheaper and more transparent than mutual funds. In Kenya, the bond ETF market is small, but global bond ETFs are available through international brokers.",
      },
      {
        kind: "paragraph",
        text: "The choice comes down to what matters more: knowing your exact return to maturity (individual bonds) or being able to diversify with small amounts (funds). A common pattern is to hold individual bonds for the core of a portfolio and use funds for satellite exposures or for markets you cannot access directly.",
      },
      {
        kind: "paragraph",
        text: "For a Kenyan retail investor with under KSh 500,000 to allocate to bonds, funds are usually the simpler path. Above that, buying individual government bonds through the CBK auction gives you more control. Many investors do both.",
      },
      {
        kind: "example",
        title: "Example",
        text: "A learner with KSh 300,000 to invest. Option A: buy four individual bonds of KSh 75,000 each, all in the government bond auction. Simple, but concentrated in a single issuer. Option B: buy a Kenyan bond mutual fund with the full KSh 300,000. The fund holds dozens of bonds, so credit and interest rate risk are spread out. The fund takes a fee, but the diversification is worth more than the fee for most retail investors.",
      },
      {
        kind: "takeaway",
        text: "Individual bonds give you certainty. Funds give you diversification. Most retail investors benefit more from diversification.",
      },
    ],
  },

  
  {
    id: "10.1",
    level: 10,
    title: "What a fund is",
    concept: "Funds",
    minutes: 6,
    summary:
      "A fund pools money from many investors and buys a portfolio on their behalf. It is a way to own many things at once.",
    body: [
      { kind: "paragraph", text: "A **fund** is a pool of money collected from many investors and invested according to a defined strategy. When you buy into a fund, you own a proportional slice of everything the fund holds. You do not own the individual securities directly. You own units of the fund, and the fund owns the securities." },
      { kind: "paragraph", text: "Funds exist because buying a diversified portfolio directly is expensive and complicated for a small investor. On the NSE, buying ten different stocks means ten separate trades, ten sets of fees, and enough capital to make each position meaningful. A fund lets you own hundreds of securities with a single purchase, even if you only have KSh 5,000." },
      { kind: "paragraph", text: "The price of a fund is called the **net asset value**, or NAV. It is calculated every day by adding up the value of everything the fund holds and dividing by the number of units outstanding. When you buy or sell units of a mutual fund, you transact at the NAV. ETFs are slightly different because they trade on an exchange at a price that can be above or below NAV." },
      { kind: "paragraph", text: "Funds charge fees. The **expense ratio** is the annual fee expressed as a percentage of the assets in the fund. A 1% expense ratio means the fund takes 1% of your money every year. On a KSh 100,000 investment, that is KSh 1,000 per year, every year, whether the fund gains or loses. Fees compound against you the same way returns compound for you." },
      { kind: "paragraph", text: "The main trade-off with funds is control. You give up the ability to pick individual securities in exchange for instant diversification and professional management. For most retail investors, that trade is worth it. For someone who wants to actively pick stocks, it is not." },
      { kind: "example", title: "Example", text: "A learner with KSh 20,000 to invest. Option A: buy one stock. Simple, but concentrated. Option B: buy a mutual fund that tracks the NSE 20 index. The fund holds 20 stocks, so the learner owns a slice of all of them. Same capital, twenty times the diversification, at a cost of roughly 2% per year in fees." },
      { kind: "takeaway", text: "A fund is a shortcut to diversification. It costs a fee, but for most beginners it is worth it." },
    ],
  },
  {
    id: "10.2",
    level: 10,
    title: "Mutual funds, ETFs, and index funds",
    concept: "Fund types",
    minutes: 7,
    summary:
      "Three categories of fund. Each is structured differently and behaves differently for the investor.",
    body: [
      { kind: "paragraph", text: "A **mutual fund** is the oldest form of pooled investment. You buy units directly from the fund manager at the end-of-day NAV. Mutual funds are actively managed more often than not. They charge an annual expense ratio plus, sometimes, a sales load when you buy or sell. In Kenya, most unit trusts are mutual funds." },
      { kind: "paragraph", text: "An **exchange-traded fund**, or ETF, is a fund that trades on an exchange like a stock. You buy and sell units throughout the trading day at whatever price the market is offering. ETFs are usually cheaper than mutual funds and more transparent, because they publish their holdings every day. On the NSE, ETFs are still a small part of the market but growing." },
      { kind: "paragraph", text: "An **index fund** is a fund that tries to match the performance of an index. It buys every security in the index in the same weight. Because the fund is not trying to beat the market, it does not need a research team. That is why index funds charge much lower fees. A typical index fund charges 0.05% to 0.3% per year, compared to 1% to 2% for actively managed funds." },
      { kind: "paragraph", text: "Index funds can be structured as either mutual funds or ETFs. The category is independent of the structure. A Kenyan investor can buy an index mutual fund through a local manager, or an index ETF through an international broker. The choice depends on cost, convenience, and what they want to track." },
      { kind: "paragraph", text: "The evidence on active versus passive is one of the most consistent findings in finance. Over long periods, most actively managed funds underperform the index they are benchmarked against, after fees. The reason is simple: the fees eat the returns that the manager was trying to generate. A small minority of managers do beat the market, but picking them in advance is difficult." },
      { kind: "example", title: "Example", text: "Two Kenyan unit trusts, both tracking large-cap stocks. Fund A is actively managed, charges 2.5% per year, and returned 11% last year. Fund B is an index fund, charges 0.4%, and returned 10.2% last year. The learner keeps 8.5% with Fund A and 9.8% with Fund B. Over 20 years, that gap compounds into a significant difference in final wealth." },
      { kind: "takeaway", text: "Mutual funds, ETFs, and index funds are all ways to own many things at once. Index funds do it cheapest." },
    ],
  },
  {
    id: "10.3",
    level: 10,
    title: "Expense ratios and the cost of compounding",
    concept: "Fees",
    minutes: 6,
    summary:
      "Small annual fees compound into large amounts over time. Understanding this is one of the highest-value lessons in investing.",
    body: [
      { kind: "paragraph", text: "The **expense ratio** is the annual fee a fund charges, expressed as a percentage of the assets under management. A fund with a 1% expense ratio takes 1% of your money every year. It is automatically deducted, so you never see it as a separate charge. That is what makes it dangerous. Out of sight, out of mind." },
      { kind: "paragraph", text: "Fees compound against you the same way returns compound for you. A 1% fee does not sound like much. Over 30 years, it can reduce your final wealth by roughly 25%. A 2% fee can reduce it by nearly 45%. On a KSh 1,000,000 portfolio growing at 8% per year, the difference between a 0.1% and a 1.5% fee is over KSh 4 million over three decades." },
      { kind: "paragraph", text: "Kenyan unit trusts are expensive by global standards. Local equity funds often charge 2% to 3% per year. Money market funds charge 1% to 1.5%. Global index funds charge 0.05% to 0.3%. That means a Kenyan investor paying 2.5% in a local equity fund is paying five to fifty times what they would pay for global exposure." },
      { kind: "paragraph", text: "Fees are not the only factor, but they are the most predictable one. You cannot know in advance what the market will return. You can know exactly what the fee will be. That is why controlling fees is one of the few things an investor can actually control." },
      { kind: "paragraph", text: "When comparing two funds with the same objective, the lower-fee fund has a higher expected return by exactly the fee difference. All else being equal, a 0.5% fund beats a 2% fund by 1.5% per year, before any consideration of skill. Over 20 years, that is a 30%+ difference in final wealth." },
      { kind: "example", title: "Example", text: "Two Kenyan investors each start with KSh 500,000 and add KSh 20,000 per month for 20 years. Investor A holds a fund with a 2.5% expense ratio. Investor B holds an index fund with a 0.4% expense ratio. Both funds earn 9% before fees. Investor A ends with about KSh 11.6 million. Investor B ends with about KSh 14.2 million. The 2.1% fee difference cost Investor A KSh 2.6 million." },
      { kind: "takeaway", text: "Fees are the most controllable variable in investing. Keep them low." },
    ],
  },
  {
    id: "10.4",
    level: 10,
    title: "Tracking error",
    concept: "Tracking",
    minutes: 5,
    summary:
      "An index fund is supposed to match its index. Tracking error measures how closely it does.",
    body: [
      { kind: "paragraph", text: "**Tracking error** is the difference between a fund return and the return of the index it is trying to track. A fund tracking the NSE 20 should match the NSE 20 as closely as possible. Any deviation is tracking error. The lower the tracking error, the better the fund is doing its job." },
      { kind: "paragraph", text: "Tracking error has two main causes. The first is fees. If the index returns 10% and the fund charges 0.5%, the fund should return about 9.5%. That 0.5% difference is expected and is not usually counted as tracking error. The second cause is operational: cash drag, sampling instead of full replication, or transaction costs when the index rebalances." },
      { kind: "paragraph", text: "Cash drag happens because a fund has to keep a small cash buffer to handle redemptions. That cash does not participate in the index return, so the fund falls slightly behind. Sampling is when the fund holds a representative subset of the index instead of every security. That is common in large indices with hundreds of names, and it introduces small deviations." },
      { kind: "paragraph", text: "For most retail investors, the practical rule is: pick an index fund with low fees and low tracking error. If two funds both track the same index, the one with the lower combined (fee + tracking error) is usually the better choice. That number is published by the fund manager and can be checked before you buy." },
      { kind: "paragraph", text: "Tracking error matters less for actively managed funds, which are trying to beat the index, not match it. For those, what matters is whether the manager beats the index after fees. That is a different question, and the evidence suggests it is hard to do consistently." },
      { kind: "example", title: "Example", text: "Two Kenyan index funds tracking the same large-cap basket. Fund A returns 9.2% in a year when the index returns 10%. Tracking error, after fees, is 0.8%. Fund B returns 9.6% in the same year. Tracking error is 0.4%. Fund B is doing a better job of matching the index, and that small gap compounds over time." },
      { kind: "takeaway", text: "For an index fund, the goal is to match the index as closely as possible. Low fees and low tracking error are the two things to look for." },
    ],
  },
  {
    id: "10.5",
    level: 10,
    title: "Active versus passive",
    concept: "Strategy",
    minutes: 6,
    summary:
      "Active funds try to beat the market. Passive funds try to match it. The evidence heavily favours passive.",
    body: [
      { kind: "paragraph", text: "An **active fund** employs a manager or team to pick securities they believe will outperform. The fund charges a higher fee to pay for that research. The promise is that the manager skill will deliver returns above the index, after fees. The reality is that most active managers fail to deliver on that promise." },
      { kind: "paragraph", text: "A **passive fund** does not try to beat the market. It buys the same securities as the index, in the same weights, and holds them. Because there is no research involved, the fees are much lower. The fund return is the index return minus the fee, which is a small gap." },
      { kind: "paragraph", text: "The evidence, from decades of data across global markets, is that roughly 80% to 90% of active funds underperform their benchmark over 10-year periods, after fees. The small number that do outperform are not consistently identifiable in advance. A manager who beat the market last year has roughly a coin-flip chance of beating it again next year." },
      { kind: "paragraph", text: "There is a second reason passive tends to win: fees compound. A fund charging 2% needs to outperform the index by more than 2% just to break even. That is a high bar. A fund charging 0.2% only needs to match the index to deliver close to the index return." },
      { kind: "paragraph", text: "That does not mean active is always wrong. There are markets where passive is harder to implement, and there are niches where skilled managers can add value. For the mainstream equity and bond exposure of a retail investor, passive is usually the right default." },
      { kind: "example", title: "Example", text: "Over the last 15 years, the S&P 500 index has returned roughly 13% per year. The average actively managed US large-cap fund has returned roughly 11% per year, after fees. A passive index fund has returned roughly 12.9%, after a 0.05% fee. The average active manager underperformed the passive index fund by nearly two percentage points per year." },
      { kind: "takeaway", text: "Most active managers fail to beat the market after fees. Passive is the sensible default for most investors." },
    ],
  },
  {
    id: "10.6",
    level: 10,
    title: "How to pick a fund",
    concept: "Selection",
    minutes: 6,
    summary:
      "Fund selection comes down to four questions: what it tracks, what it costs, how it tracks, and how you access it.",
    body: [
      { kind: "paragraph", text: "The first question is: **what does the fund hold?** A global equity fund, a Kenyan equity fund, a bond fund, and a money market fund are very different products. You should know exactly what you are buying before you commit. The fund factsheet or prospectus says this." },
      { kind: "paragraph", text: "The second question is: **what does it cost?** That means the expense ratio plus any entry or exit fees. Compare the total cost against similar funds. On global exposures, a total cost above 0.5% is high. On Kenyan exposures, a total cost above 3% is high." },
      { kind: "paragraph", text: "The third question is: **how well does it track its benchmark?** If it is a passive fund, tracking error should be small. If it is active, you need to see whether the manager has actually beaten the index over a full market cycle, not just a single year. Five-year and ten-year performance relative to the benchmark is the useful number." },
      { kind: "paragraph", text: "The fourth question is: **how do you access it?** Some funds are only available through a specific broker, or only to institutional investors, or with high minimums. In Kenya, unit trusts can be bought through a fund manager directly or through a broker. Global ETFs require an international broker, which we cover in Level 17 (International Investing)." },
      { kind: "paragraph", text: "Beyond those four, there is a smaller set of useful checks. Fund size matters: a fund that is too small may be closed, and one that is too large may struggle to implement its strategy. Manager tenure matters: a fund with a manager who has been there for ten years is easier to evaluate than one with a manager who arrived last month." },
      { kind: "example", title: "Example", text: "A learner wants exposure to the S&P 500. They compare three options. Fund A is a US-listed ETF with a 0.03% expense ratio and 0.02% tracking error. Fund B is a European ETF with a 0.07% expense ratio and 0.05% tracking error. Fund C is a Kenyan feeder fund with a 1.8% expense ratio that invests in Fund A. All three deliver the same exposure. Fund C costs more than 50 times what Fund A does because of the wrapper. Fund A is the best choice if the learner can access it." },
      { kind: "takeaway", text: "Fund selection is a checklist. Work through it methodically." },
    ],
  },
  {
    id: "10.7",
    level: 10,
    title: "Kenyan versus international funds",
    concept: "Geography",
    minutes: 6,
    summary:
      "Kenyan funds give you local exposure. International funds give you global exposure. Both have a place.",
    body: [
      { kind: "paragraph", text: "Kenyan **unit trusts** are the most common local funds. They are managed by CMA-licensed managers and include money market funds, bond funds, equity funds, and balanced funds. They are regulated, transparent, and accessible. They give you exposure to the NSE and to Kenyan fixed income." },
      { kind: "paragraph", text: "International **ETFs** are funds listed on global exchanges. They give you exposure to global equities, global bonds, commodities, and specific sectors. They are usually much cheaper than Kenyan funds because the global fund industry is far more competitive. The most popular are US-listed ETFs from Vanguard, iShares, and State Street." },
      { kind: "paragraph", text: "The trade-off is access. Buying a US ETF from Kenya requires an international broker, a way to convert shillings to dollars, and a plan for handling the tax implications. Some of that is covered in Level 17. For now, the important point is that the choice exists, and for a Kenyan investor with global ambitions, the international route is worth understanding." },
      { kind: "paragraph", text: "Currency is another consideration. A Kenyan unit trust is priced in shillings, so there is no currency risk. A US ETF is priced in dollars, so a Kenyan investor holding it is exposed to USD/KES moves. If the shilling weakens, the ETF gains in shilling terms. If the shilling strengthens, the ETF loses. That currency exposure is neither good nor bad; it is a decision." },
      { kind: "paragraph", text: "A common pattern is to hold Kenyan funds for local exposure and international ETFs for global exposure. The mix depends on your goals. A learner who needs to spend in shillings might prefer more local exposure. A learner who wants to save in a global currency might prefer more international exposure." },
      { kind: "example", title: "Example", text: "A Kenyan investor with KSh 1,000,000 to allocate. Option A: hold everything in Kenyan unit trusts. Simple, no currency risk, but no global exposure. Option B: split 60% Kenyan, 40% international ETFs. The international portion is exposed to USD/KES but also gains exposure to companies that do not exist on the NSE. Most investors with a long horizon end up closer to B." },
      { kind: "takeaway", text: "Kenyan funds give you local exposure. International funds give you the world. You do not have to choose one." },
    ],
  },

  
  {
    id: "11.1",
    level: 11,
    title: "Currency basics",
    concept: "FX basics",
    minutes: 6,
    summary:
      "An exchange rate is the price of one currency in another. Understanding what moves it is fundamental for anyone investing abroad.",
    body: [
      { kind: "paragraph", text: "An **exchange rate** is the price of one currency expressed in another. The USD/KES rate tells you how many shillings it takes to buy one US dollar. A higher number means the shilling is weaker. A lower number means it is stronger. Every currency pair has two numbers, one for each direction." },
      { kind: "paragraph", text: "Exchange rates move because of supply and demand for each currency. Four forces drive that supply and demand. First, **trade flows**: a country that exports more than it imports sees demand for its currency rise. Second, **interest rate differentials**: higher rates attract foreign capital. Third, **inflation differentials**: a country with higher inflation sees its currency depreciate over time. Fourth, **risk sentiment**: in a crisis, capital flees to safe-haven currencies like the dollar and the yen." },
      { kind: "paragraph", text: "For a Kenyan investor, the currency pair that matters most is USD/KES, because the dollar is the global reserve currency and most cross-border investing is denominated in dollars. But other pairs matter too: GBP/KES for anyone with UK ties, EUR/KES for European exposure, and ZAR/KES because South Africa is the largest economy in the region." },
      { kind: "paragraph", text: "Currency risk cuts both ways. A Kenyan who owns US stocks benefits when the shilling weakens, because the dollar value of their holding converts into more shillings. The same investor loses when the shilling strengthens. If they plan to spend in shillings, this is a real exposure that has to be considered, not ignored." },
      { kind: "paragraph", text: "The most useful framing is to ask: what currency do I spend in? If your future spending is in shillings, then holding assets in dollars introduces currency risk. If your future spending is in dollars, then holding assets in shillings introduces currency risk. The right answer depends on what you are saving for." },
      { kind: "example", title: "Example", text: "A Kenyan investor buys USD 10,000 worth of a US ETF when USD/KES is 129. Two years later, USD/KES is 145. The dollar value of the ETF has not changed, but the shilling value has grown from KSh 1,290,000 to KSh 1,450,000. The 12.4% currency gain is on top of whatever the ETF did. If USD/KES had fallen to 115 instead, the shilling value would have dropped." },
      { kind: "takeaway", text: "Currency is a real exposure, not a background detail. Know what currency you are exposed to." },
    ],
  },
  {
    id: "11.2",
    level: 11,
    title: "Major pairs, crosses, and exotics",
    concept: "Pair types",
    minutes: 5,
    summary:
      "Currency markets are organised by the liquidity of the pairs. Majors are the most liquid. Exotics are the least.",
    body: [
      { kind: "paragraph", text: "The **majors** are the currency pairs that include the US dollar and one other major currency. EUR/USD, USD/JPY, GBP/USD, USD/CHF, USD/CAD, AUD/USD, and NZD/USD. These pairs account for the majority of global FX trading volume. They have the tightest spreads and the deepest liquidity." },
      { kind: "paragraph", text: "**Crosses** are pairs that do not include the dollar. EUR/GBP, EUR/JPY, GBP/JPY, AUD/NZD. These pairs are less liquid than the majors but still widely traded. Spreads are usually wider, especially for less popular crosses like GBP/JPY or EUR/AUD." },
      { kind: "paragraph", text: "**Exotics** are pairs that include one major currency and one currency from a smaller or emerging market. USD/KES, USD/ZAR, USD/TRY, USD/MXN. These pairs have much wider spreads, thinner liquidity, and can move sharply on local news. They are not suited for most retail traders because the costs eat into returns." },
      { kind: "paragraph", text: "For a Kenyan investor, USD/KES is an exotic pair. Trading it speculatively means accepting a wide spread and the risk of sharp moves on CBK announcements or political news. Using FX to hedge an overseas investment is a different use case, and it is the one that is usually worth understanding first." },
      { kind: "paragraph", text: "The most liquid pairs at any given time are the ones with the tightest spreads: EUR/USD, USD/JPY, and GBP/USD. If you are learning FX, start by watching one of those. The prices move more predictably and the costs are lower." },
      { kind: "example", title: "Example", text: "Three pairs, three spreads. EUR/USD might quote at a spread of 0.1 pip. EUR/GBP might quote at 0.5 pip. USD/KES might quote at 20 pips because the market is thinner. A trader who tries to trade USD/KES speculatively is paying a much higher cost per round trip. That does not mean it is impossible, but it means the math has to work in a bigger way." },
      { kind: "takeaway", text: "Liquidity determines the cost of trading. Majors are cheapest. Exotics are the most expensive." },
    ],
  },
  {
    id: "11.3",
    level: 11,
    title: "Central bank policy and currency",
    concept: "Policy",
    minutes: 6,
    summary:
      "Interest rate policy is the single biggest driver of currency moves over the medium term.",
    body: [
      { kind: "paragraph", text: "Central bank policy is the primary driver of medium-term currency moves. When a central bank raises rates, holding that currency becomes more attractive, so demand rises and the currency strengthens. When it cuts rates, the currency tends to weaken. This is one of the most consistent relationships in macroeconomics." },
      { kind: "paragraph", text: "The mechanism works through **carry**. A trader can borrow in a low-rate currency, convert to a high-rate currency, and earn the difference. This is called a **carry trade**, and it is a major part of global FX flows. When the rate differential is large, capital flows toward the higher-rate currency, pushing it up." },
      { kind: "paragraph", text: "In 2025, the CBK cut rates aggressively. Kenyan rates fell from 11.25% to 9.00%. That made shilling assets less attractive relative to dollar assets, and the shilling came under pressure. It was held in check by strong remittances and tea exports, but the direction was clear. When the CBK later paused its cuts in 2026 because of inflation, the pressure eased." },
      { kind: "paragraph", text: "Central banks do not always act in isolation. When the US Federal Reserve raises rates while the CBK is cutting, the rate differential widens and the shilling weakens faster. When the Fed cuts while the CBK holds, the shilling strengthens. Watching both central banks matters for anyone with USD/KES exposure." },
      { kind: "paragraph", text: "Beyond rates, central banks influence currencies through direct intervention. The CBK can sell dollars from its reserves to support the shilling, or buy dollars to slow its appreciation. This is called **sterilised intervention**, and its effect is usually temporary. The market eventually wins." },
      { kind: "example", title: "Example", text: "In 2025, the CBK cut rates nine times. During the same period, the Fed held rates high. The rate differential between Kenya and the US narrowed, and the shilling weakened from 129 to 134 over the following year. The CBK tried to slow the move by selling dollars from reserves, but the underlying trend was driven by the rate differential." },
      { kind: "takeaway", text: "Interest rate differentials are the primary driver of currency moves. Watch both central banks, not just your own." },
    ],
  },
  {
    id: "11.4",
    level: 11,
    title: "Spot, forwards, futures, and options",
    concept: "Instruments",
    minutes: 6,
    summary:
      "Currencies trade in several forms. Each form has a different use case and risk profile.",
    body: [
      { kind: "paragraph", text: "The **spot market** is where currencies trade for immediate delivery. When most people say FX, they mean spot. The price in the spot market is the current exchange rate. Settlement is usually two business days later, though many retail platforms settle instantly." },
      { kind: "paragraph", text: "A **forward contract** locks in an exchange rate today for a transaction that will happen at a future date. Forwards are used by businesses, not usually by retail traders. A Kenyan importer who knows they need to pay USD 100,000 in three months can lock in the rate today and remove the uncertainty. The bank charges a small fee for the service." },
      { kind: "paragraph", text: "**Futures** are standardised forwards that trade on an exchange. They are similar in concept but can be bought and sold before maturity, which makes them useful for speculation as well as hedging. Currency futures trade on the CME and other exchanges. Retail access is available through brokers." },
      { kind: "paragraph", text: "**Options** give the buyer the right, but not the obligation, to exchange currency at a specified rate before a specified date. An option costs a premium, but it protects against adverse moves while keeping upside if the market moves favourably. Options are used by both hedgers and speculators, and they are more complex than forwards or futures." },
      { kind: "paragraph", text: "For a retail investor, the practical use case is almost always a hedge, not speculation. If you have an overseas investment and you want to protect against a shilling strengthening, you can buy a forward or an option. Speculating on currency moves is a different activity, and it is far harder than it looks." },
      { kind: "example", title: "Example", text: "A Kenyan company will receive USD 200,000 in six months from an export sale. The finance team wants to protect against the shilling strengthening. They buy a forward contract at USD/KES 130. In six months, if USD/KES is 120, they still receive KSh 26 million instead of KSh 24 million. If USD/KES is 140, they receive KSh 26 million instead of KSh 28 million. They traded upside for certainty." },
      { kind: "takeaway", text: "Currencies trade in several forms. Spot is for immediate exchange. Forwards, futures, and options are for locking in future rates." },
    ],
  },
  {
    id: "11.5",
    level: 11,
    title: "Leverage and margin in FX",
    concept: "Leverage",
    minutes: 6,
    summary:
      "FX trading allows very high leverage. That is also the reason most retail traders lose money.",
    body: [
      { kind: "paragraph", text: "**Leverage** means using borrowed money to increase the size of a position. In FX, leverage is expressed as a ratio, like 30:1 or 100:1. A 100:1 leverage means that for every KSh 1 of your own capital, the broker will let you control KSh 100 of currency." },
      { kind: "paragraph", text: "Leverage magnifies both gains and losses. A 1% move in a currency with 100:1 leverage is a 100% gain on your capital, or a 100% loss. That is why FX traders can make enormous returns in a short time, and why most of them lose their account within the first year." },
      { kind: "paragraph", text: "**Margin** is the amount of your own money that has to be set aside to hold a leveraged position. A 3% margin requirement on a 100:1 position means you must keep at least 3% of the position value in your account. If the position moves against you and your margin falls below the threshold, the broker issues a **margin call** and may close your position to protect their capital." },
      { kind: "paragraph", text: "Kenyan regulation through the CMA caps retail FX leverage at much lower levels than offshore brokers. Offshore brokers often offer 500:1 or higher, and many explicitly target retail traders in markets where local regulation does not apply. This is one of the reasons FX is a minefield for beginners." },
      { kind: "paragraph", text: "The evidence from broker disclosures around the world is consistent: roughly 70% to 80% of retail FX accounts lose money. The number is not a coincidence. It is the result of combining high leverage with insufficient experience and the psychological pressure of watching positions move against you." },
      { kind: "example", title: "Example", text: "A retail trader opens an account with KSh 50,000 and uses 100:1 leverage to control KSh 5 million worth of EUR/USD. A 1% move against them loses KSh 50,000, which wipes out the entire account. A 1% move in their favour doubles the account. The asymmetry is what kills most traders: a small loss means ruin, so they have to be right almost every time." },
      { kind: "takeaway", text: "Leverage is the fastest way to lose money in trading. If you do not need it, do not use it." },
    ],
  },
  {
    id: "11.6",
    level: 11,
    title: "FX as speculation versus FX as hedge",
    concept: "Use case",
    minutes: 6,
    summary:
      "Currency can be traded for profit or used to protect an existing investment. These are different activities.",
    body: [
      { kind: "paragraph", text: "**Speculative FX** means opening currency positions in the hope of profiting from exchange rate moves. This is what most people think of when they hear FX trading. It requires a view on which currency will strengthen or weaken, and it is extremely difficult to do profitably over time. Most retail speculators lose money." },
      { kind: "paragraph", text: "**Hedging FX** means using currency positions to offset the currency risk you already have. A Kenyan company receiving dollars in six months has a natural exposure to USD/KES. By selling dollars forward or buying a put option, they can lock in the rate and remove the uncertainty. This is not speculation. It is risk management." },
      { kind: "paragraph", text: "For an individual investor, hedging usually comes up when you own a foreign asset and want to protect against currency moves. If you own a US ETF but you plan to spend the proceeds in shillings, the currency exposure is real. Some investors hedge it, some accept it, and some intentionally leave it unhedged because they want the diversification." },
      { kind: "paragraph", text: "The decision depends on your time horizon and your tolerance for currency swings. A short-term investor with a specific shilling goal should probably hedge. A long-term investor saving for retirement decades away might leave currency unhedged, because over long periods the currency effect tends to average out (though not always)." },
      { kind: "paragraph", text: "For most retail investors, the simplest approach is to accept the currency exposure of foreign holdings as part of the diversification benefit. If you wanted to be in dollars anyway, then the exposure is not a problem. If your future spending is in shillings and the horizon is short, it might be worth understanding how to hedge." },
      { kind: "example", title: "Example", text: "Two Kenyan investors, both hold USD 50,000 in a US ETF. Investor A plans to spend the money in 25 years on retirement in Kenya. Investor B plans to spend it in two years on a house in Nairobi. Both have the same dollar exposure. Investor A can reasonably leave it unhedged because the currency effect will average out. Investor B faces a real risk that the shilling strengthens and the house becomes unaffordable." },
      { kind: "takeaway", text: "Speculation and hedging are different activities. Know which one you are doing." },
    ],
  },
  {
    id: "11.7",
    level: 11,
    title: "Reading an FX chart",
    concept: "Charts",
    minutes: 6,
    summary:
      "FX charts look like any other price chart. The differences are in what the axes represent and how to read a currency pair.",
    body: [
      { kind: "paragraph", text: "An FX chart is a price chart of one currency against another. The vertical axis is the exchange rate. The horizontal axis is time. When the line moves up, the base currency is strengthening against the quote currency. When it moves down, the base currency is weakening. Everything else you learned in Level 6 applies here." },
      { kind: "paragraph", text: "A quote like EUR/USD 1.08 means one euro buys 1.08 US dollars. EUR is the base currency and USD is the quote currency. If the quote rises to 1.10, the euro strengthened against the dollar, or the dollar weakened against the euro. Both descriptions are correct, and it matters which currency you care about." },
      { kind: "paragraph", text: "Pip is the standard unit of price movement in FX. For most pairs, one pip is 0.0001. For pairs involving the Japanese yen, one pip is 0.01. A move from 1.0800 to 1.0801 is one pip. The pip value depends on your position size and the currency pair, which is why position sizing in FX is more complex than in equities." },
      { kind: "paragraph", text: "FX markets run 24 hours a day, five days a week. Trading opens in Sydney on Sunday evening, moves to Tokyo, then London, then New York, then back to Sydney. The most active period is the London-New York overlap, roughly 3pm to 6pm East African Time. That is when spreads are tightest and moves are largest." },
      { kind: "paragraph", text: "The most useful patterns to know in FX are the same as in equity charts: support, resistance, trendlines, moving averages, and breakouts. FX is known for respecting technical levels more consistently than stocks because of the sheer volume of participants watching the same levels. That does not make them reliable, but it makes them worth knowing." },
      { kind: "example", title: "Example", text: "A learner watching USD/KES sees the rate stuck between 129.0 and 130.5 for three months. That is a trading range. Support is 129.0, resistance is 130.5. When the rate eventually breaks below 129.0, that is a signal that the shilling is strengthening. A trader who was watching the chart could anticipate the move; a trader who was not might have been surprised." },
      { kind: "takeaway", text: "FX charts use the same tools as equity charts. The axes represent a currency pair, not a stock price." },
    ],
  },
  {
    id: "11.8",
    level: 11,
    title: "Common FX strategies and their risks",
    concept: "Strategies",
    minutes: 6,
    summary:
      "There are several named FX strategies. Each has a coherent logic and a specific failure mode.",
    body: [
      { kind: "paragraph", text: "**Carry trade**. Borrow in a low-interest-rate currency and invest in a high-interest-rate currency. The trade earns the interest differential plus any currency appreciation. The risk is that the high-rate currency depreciates sharply, wiping out many months of carry gains in a single week." },
      { kind: "paragraph", text: "**Trend following**. Identify a currency in a sustained trend and trade in that direction until the trend breaks. The idea is that currencies often move in long, directional runs driven by policy differences. The risk is getting whipsawed when a trend suddenly reverses, which tends to happen around central bank surprises." },
      { kind: "paragraph", text: "**Mean reversion**. Identify when a currency has moved too far relative to its historical range and bet on it coming back. The idea is that extremes are temporary. The risk is that what looked extreme turns out to be a new normal, which is exactly what happens during currency crises." },
      { kind: "paragraph", text: "**Breakout trading**. Wait for a currency to break through a well-defined level and then trade in the direction of the break. The idea is that a break signals a shift in supply and demand. The risk is false breakouts, where the price touches the level, briefly crosses, then reverses, trapping everyone who bought the break." },
      { kind: "paragraph", text: "**News trading**. Take positions around major central bank announcements or economic data. The idea is that these events move currencies sharply. The risk is that the market often moves in unpredictable ways, and spreads widen dramatically around the release, so execution is poor." },
      { kind: "paragraph", text: "None of these strategies is inherently better than the others. Each has a market environment where it works and an environment where it fails. The strategy matters less than the risk management and the discipline. Most retail FX losses come not from a bad strategy but from too much leverage and too little patience." },
      { kind: "example", title: "Example", text: "A carry trader borrows yen at 0.5% and buys USD assets yielding 5%. The 4.5% differential is the trade. In a calm year, the trade earns 4.5%. In a risk-off week, when everyone rushes to buy yen, the dollar-yen pair can fall 5% in three days, wiping out the entire year of carry gains. The strategy works until it does not." },
      { kind: "takeaway", text: "Every FX strategy has a specific failure mode. Know it before you trade it." },
    ],
  },

  
  {
    id: "12.1",
    level: 12,
    title: "Gold as an asset class",
    concept: "Gold",
    minutes: 6,
    summary:
      "Gold is a store of value that behaves differently from stocks and bonds. It has a specific role in a portfolio.",
    body: [
      { kind: "paragraph", text: "**Gold** is a precious metal that has been used as money for thousands of years. In the modern financial system, it no longer backs currencies, but it still trades as an asset. Investors hold it for two reasons. First, as a **store of value**: gold tends to hold its purchasing power over long periods, even when currencies lose value. Second, as a **hedge**: gold tends to rise when investors are worried about inflation, currency debasement, or geopolitical risk." },
      { kind: "paragraph", text: "Gold is different from stocks and bonds because it does not produce cash flow. It does not pay dividends, interest, or profits. Its return comes entirely from price changes. That makes it a poor long-term compounder, because there is no underlying earnings growth to drive the price over decades. The price of gold has roughly matched inflation over very long periods, with periods of significant outperformance and underperformance along the way." },
      { kind: "paragraph", text: "That does not mean gold is useless. Its main value is diversification. Gold has low or negative correlation with equities during crises, which means it tends to rise (or at least not fall as much) when stocks are falling. In 2020, when the pandemic crashed global markets, gold initially fell with everything else and then rallied sharply. In 2022, when stocks and bonds both fell, gold was roughly flat." },
      { kind: "paragraph", text: "For a Kenyan investor, gold exposure usually comes through the Absa NewGold ETF, which is listed on the NSE and tracks the price of gold. The fund is quoted in shillings but the underlying asset is denominated in dollars, so a Kenyan investor holding it gets both gold exposure and USD/KES exposure. That is a double exposure, which can be useful or unwanted depending on your goals." },
      { kind: "paragraph", text: "A common allocation to gold is 5% to 10% of a portfolio. Higher allocations tend to reduce long-term returns because gold does not compound, but they improve stability during periods of stress. The right number depends on how much you value that stability." },
      { kind: "example", title: "Example", text: "In 2025, the Absa NewGold ETF rose about 22% in shilling terms. The NASI rose 51%. A learner who held only the gold ETF underperformed the market significantly. But in early 2026, when the oil shock hit the NSE, gold held up while stocks fell. A portfolio with 10% gold would have fallen less than a portfolio with 0% gold. Over the full cycle, both portfolios probably ended with similar returns, but the one with gold was easier to hold." },
      { kind: "takeaway", text: "Gold is not a growth asset. It is a diversifier. Hold it for what it does when other things are falling, not for its long-term return." },
    ],
  },
  {
    id: "12.2",
    level: 12,
    title: "Oil and energy commodities",
    concept: "Energy",
    minutes: 6,
    summary:
      "Oil is the most important commodity in the global economy. Understanding how it moves is essential for anyone with global exposure.",
    body: [
      { kind: "paragraph", text: "**Oil** is the most traded commodity in the world. It affects the cost of transport, food, plastics, and almost everything else in the economy. When oil prices rise, inflation tends to rise across the board. When they fall, the reverse happens. That is why oil is often called the economy's blood pressure." },
      { kind: "paragraph", text: "Oil prices are driven by three forces. First, **supply**: how much is being produced by OPEC, the US, and other producers. Second, **demand**: how much is being consumed by industry, transport, and consumers. Third, **geopolitics**: wars, sanctions, and shipping disruptions can cut supply suddenly. The 2026 Middle East conflict disrupted the Strait of Hormuz and pushed oil prices to their highest level in over a decade." },
      { kind: "paragraph", text: "For a Kenyan investor, oil is not just a global commodity. Kenya imports all of its petroleum products. When global oil prices rise, the impact on Kenya is immediate: fuel prices rise, transport costs rise, food prices rise, and inflation accelerates. The 2026 oil shock pushed Kenyan inflation from 4.1% to 6.7% in a matter of months. That is why oil is both a global and a very local story." },
      { kind: "paragraph", text: "Exposure to oil comes through several channels. You can buy oil ETFs, which track the price of crude. You can buy energy company stocks, which tend to rise when oil prices rise. You can buy commodities futures, which is a more advanced approach. For most retail investors, oil ETFs or energy sector ETFs are the simplest way to get exposure." },
      { kind: "paragraph", text: "That said, most investors do not need direct oil exposure. If you own a broad equity index, you already own energy companies in proportion to their weight in the index. Direct commodity exposure is usually only for investors who have a specific view on oil prices or who want to hedge an inflation risk in a portfolio heavily exposed to fixed income." },
      { kind: "example", title: "Example", text: "In 2025, oil traded around USD 78 per barrel. In March 2026, following the Middle East conflict, it spiked to over USD 115. Kenyan petrol prices rose from KSh 176 per litre to over KSh 200. For a Kenyan consumer, this was a direct cost increase. For a Kenyan investor holding energy stocks, it was a gain. For a Kenyan investor holding only local banks and telecoms, it was a headwind." },
      { kind: "takeaway", text: "Oil affects the entire economy, not just the energy sector. Know how it flows through your portfolio." },
    ],
  },
  {
    id: "12.3",
    level: 12,
    title: "Agricultural commodities",
    concept: "Agriculture",
    minutes: 6,
    summary:
      "Coffee, tea, maize, wheat, and other agricultural commodities are both investment assets and essential economic inputs.",
    body: [
      { kind: "paragraph", text: "**Agricultural commodities** are the raw materials produced by farming: grains (wheat, maize, rice), soft commodities (coffee, cocoa, sugar, cotton), and livestock (cattle, hogs). They trade on global exchanges and their prices respond to weather, harvests, demand, and geopolitics." },
      { kind: "paragraph", text: "For Kenya, agriculture matters in a specific way. Tea, coffee, and horticulture are among the country's largest export earners. Their prices affect the shilling, rural employment, and government revenue. A Kenyan investor with exposure to the agricultural sector is exposed to both the global commodity cycle and the local climate." },
      { kind: "paragraph", text: "Agricultural prices are particularly volatile. A drought in Brazil can double the price of coffee in a few months. A good harvest in East Africa can push tea prices down. Weather events are hard to predict, which makes agricultural commodities harder to trade than equities or bonds. For most retail investors, direct exposure to agricultural commodities is not the right starting point." },
      { kind: "paragraph", text: "The more common way to get exposure is through equities. Companies like Kakuzi, Sasini, and Williamson Tea are listed on the NSE and their share prices respond to agricultural commodity prices. A Kenyan investor who understands the sector can express a view through these listed names rather than through futures markets." },
      { kind: "paragraph", text: "Agricultural commodities also matter for the broader portfolio because they are one of the strongest contributors to food inflation. When maize, wheat, and cooking oil prices rise, urban households in Kenya feel it immediately. That is a real economic pressure that shows up in consumer spending, retail earnings, and central bank policy." },
      { kind: "example", title: "Example", text: "In 2024, coffee prices spiked globally due to drought in Brazil and Vietnam. Kenyan coffee exporters earned significantly more, and the shilling received some support. Two years later, tea prices fell on a bumper harvest in East Africa, hurting the same exporters. Agricultural commodities do not have a long-term direction. They cycle with weather and global demand." },
      { kind: "takeaway", text: "Agricultural commodities are volatile and weather-driven. Exposure through listed agricultural companies is more practical than direct commodity trading for most retail investors." },
    ],
  },
  {
    id: "12.4",
    level: 12,
    title: "Commodities as diversifiers",
    concept: "Role",
    minutes: 6,
    summary:
      "Commodities do not compound like stocks, but they tend to do well when stocks and bonds both struggle.",
    body: [
      { kind: "paragraph", text: "**Commodities** as an asset class include energy, metals, agriculture, and livestock. They behave differently from stocks and bonds because they do not produce cash flow. Their returns come entirely from price changes, which respond to supply, demand, and inflation. That makes them useful as portfolio diversifiers, but only in small doses." },
      { kind: "paragraph", text: "The main role of commodities in a portfolio is to provide a hedge against **inflation**. When prices rise across the economy, commodity prices tend to rise with them. Equities can sometimes keep pace with inflation, but they usually lag in the short term. Commodities tend to respond more directly, especially energy and agricultural commodities." },
      { kind: "paragraph", text: "Commodities also tend to perform well when stocks and bonds both struggle. This is rare, but it happens, and it is usually around inflation shocks. 2022 was a good example: US stocks fell 19%, bonds fell 13%, and commodities rose roughly 16%. A portfolio with a small commodity allocation would have suffered much less." },
      { kind: "paragraph", text: "The trade-off is that commodities are volatile and do not compound. Over long periods, they tend to underperform equities. A typical commodity allocation is 5% to 10% of a portfolio, and it is usually implemented through a broad commodity ETF rather than through individual futures." },
      { kind: "paragraph", text: "In Kenya, direct commodity exposure is limited. The Absa NewGold ETF gives gold exposure. A few listed agricultural stocks give indirect agricultural exposure. For energy and other commodities, Kenyan investors usually access global ETFs through international brokers. That is the subject of Level 17 (International Investing)." },
      { kind: "example", title: "Example", text: "A portfolio of 60% global equities, 30% bonds, 10% commodities. In 2022, the equity portion fell about 19%, the bond portion fell about 13%, and the commodity portion rose about 16%. The total portfolio fell about 14%. Without the commodities, it would have fallen about 16%. The 2 percentage point difference sounds small, but it compounds over time and it makes the portfolio easier to hold through inflation shocks." },
      { kind: "takeaway", text: "Commodities are a hedge, not a compounder. Small allocations, held for what they do when other things struggle." },
    ],
  },
  {
    id: "12.5",
    level: 12,
    title: "Real estate and REITs revisited",
    concept: "Real estate",
    minutes: 6,
    summary:
      "Real estate is a large asset class. REITs make it accessible without buying a building.",
    body: [
      { kind: "paragraph", text: "**Direct real estate** means owning property yourself. The advantages are tangible: rent, price appreciation, inflation protection, and the ability to leverage with a mortgage. The drawbacks are equally tangible: large capital requirements, illiquidity, maintenance, and concentration risk. A single property is a concentrated bet on one location, one tenant profile, and one economic cycle." },
      { kind: "paragraph", text: "**Real Estate Investment Trusts**, or REITs, solve most of those problems. A REIT is a listed company that owns a portfolio of properties and distributes most of its income to shareholders. Buying a REIT gives you exposure to dozens of properties, professional management, and daily liquidity through the exchange. In Kenya, REITs are regulated by the CMA and must distribute at least 80% of their income." },
      { kind: "paragraph", text: "Kenya now has three listed REITs. The **ALP Industrial REIT** focuses on industrial properties such as warehouses and logistics facilities. The **Trific Green USD I-REIT** focuses on green-certified income-producing properties and targets an 8% yield denominated in US dollars. The **ILAM Fahari I-REIT** was the first listed REIT and focuses on retail and commercial property." },
      { kind: "paragraph", text: "REITs tend to perform differently from stocks. They are less correlated with equity markets in normal times, and they tend to do well when interest rates are falling because their dividend yield becomes more attractive relative to bonds. When rates rise, REITs tend to struggle because the cost of borrowing rises and the yield becomes less competitive." },
      { kind: "paragraph", text: "For a Kenyan investor, a REIT is the practical way to gain real estate exposure without needing millions of shillings to buy a property. It is also a way to gain currency exposure: the Trific Green USD I-REIT pays in dollars, which is a natural hedge against shilling weakness." },
      { kind: "example", title: "Example", text: "A learner with KSh 100,000 wants real estate exposure. Option A: buy a plot of land on the outskirts of Nairobi for KSh 2 million. Requires saving for years, is illiquid, and produces no income until developed. Option B: buy 10,000 units of the ALP Industrial REIT at KSh 10 each. Immediate exposure, daily liquidity, and a quarterly distribution. Option B is the practical choice for most beginners." },
      { kind: "takeaway", text: "REITs turn an illiquid, expensive asset class into something a retail investor can actually access." },
    ],
  },
  {
    id: "12.6",
    level: 12,
    title: "Private equity and venture basics",
    concept: "Private",
    minutes: 6,
    summary:
      "Private markets invest in companies that are not listed on an exchange. They offer higher potential returns and much lower liquidity.",
    body: [
      { kind: "paragraph", text: "**Private equity** is investment in companies that are not listed on a public exchange. Private equity funds buy entire companies, or large stakes in them, with the goal of improving the business and selling it at a higher price several years later. **Venture capital** is a subset of private equity that focuses on very young, high-growth companies." },
      { kind: "paragraph", text: "The return potential in private markets is high because the fund has more control than it would with a public stock. The fund can replace management, restructure operations, or combine the company with another portfolio holding. When it works, the returns can be multiples of what a public market investment would yield." },
      { kind: "paragraph", text: "The trade-offs are significant. First, **illiquidity**: your money is locked up for five to ten years, and you cannot sell in the meantime. Second, **high minimums**: most private funds require institutional-sized investments. Third, **high fees**: the standard fee is 2% of assets per year plus 20% of the profits. Fourth, **concentration risk**: a single failed company can wipe out an entire fund." },
      { kind: "paragraph", text: "In Kenya, private equity is accessible to a small set of institutional investors, family offices, and high-net-worth individuals. There is no listed private equity vehicle on the NSE. That means for a retail investor, private equity is usually not accessible directly." },
      { kind: "paragraph", text: "The practical takeaway for a retail investor is that private equity is not part of your portfolio for now. If you encounter a product marketed as \"private equity\" or \"venture\" without a clear regulatory framework, treat it with caution. Kenya has had fraud cases in this space, and the lack of public pricing means it is hard to verify what you actually own." },
      { kind: "example", title: "Example", text: "A Kenyan private equity fund raises KSh 2 billion from institutional investors to buy three mid-sized manufacturing companies. Five years later, one company has doubled in value, one is flat, and one is down 40%. The fund sells all three and returns 1.4x to investors after fees. On an annualized basis, that is roughly 7% per year. Not bad, but the same money in a passive equity index fund would have earned a similar amount with daily liquidity and much lower fees." },
      { kind: "takeaway", text: "Private markets are not for beginners. The return potential is high, but so are the fees, the lockup, and the risks." },
    ],
  },
  {
    id: "12.7",
    level: 12,
    title: "Crypto: an honest conversation",
    concept: "Crypto",
    minutes: 7,
    summary:
      "Crypto assets are a legitimate but very high-risk corner of the market. Know what they are and what they are not.",
    body: [
      { kind: "paragraph", text: "**Cryptocurrencies** are digital assets that live on distributed ledgers called blockchains. Bitcoin, the largest, was launched in 2009. Ethereum followed in 2015. Since then, thousands of other crypto assets have launched, most of which have failed. The category has grown into a global market worth trillions of dollars, and it is now traded on regulated exchanges in many countries." },
      { kind: "paragraph", text: "What crypto actually is: a decentralized, transparent way of transferring value and, in some cases, running software without intermediaries. The technology is real. Its long-term impact is still uncertain. What crypto is not: a stable store of value, a safe investment, or a reliable hedge against anything. The price volatility of crypto is extreme. Bitcoin has had multiple drawdowns of 70% or more in its history." },
      { kind: "paragraph", text: "For a Kenyan investor, the practical questions are: is it regulated? Where is it held? What happens if the exchange fails? Kenya has not yet passed comprehensive crypto regulation, though the government has signaled it is moving in that direction. Crypto is not currently a licensed investment product under the CMA. That means the usual investor protections do not apply." },
      { kind: "paragraph", text: "There are additional risks specific to crypto. **Custody**: if you hold crypto on an exchange and the exchange fails, you can lose everything. **Scams**: crypto is heavily targeted by fraud. **Tax**: the tax treatment of crypto gains in Kenya is still evolving, and you should assume any gains are taxable. **Irreversibility**: crypto transactions cannot be reversed, so a mistake is permanent." },
      { kind: "paragraph", text: "If you decide to hold crypto, the standard approach is to keep it to a very small percentage of your portfolio, use regulated exchanges where available, and never invest money you cannot afford to lose entirely. That is not a recommendation to buy or not to buy. It is a description of how the asset is usually handled by people who treat it as a speculative bet rather than a core holding." },
      { kind: "paragraph", text: "The honest conclusion is that crypto is interesting as a technology and dangerous as a beginner investment. It is not the right starting point. Learn it after you understand equities, bonds, and funds, and hold it, if at all, in a size where losing it entirely would not change your life." },
      { kind: "example", title: "Example", text: "A learner buys KSh 50,000 of Bitcoin in early 2021. By November 2021, it is worth KSh 110,000. By June 2022, it is worth KSh 20,000. By late 2024, it is worth KSh 90,000. The same KSh 50,000 in a broad equity index fund would have grown steadily to about KSh 65,000 with much less drama. Different paths, similar destinations, very different emotional experiences." },
      { kind: "takeaway", text: "Crypto is real but risky. Treat it as a small speculative bet, not a core holding." },
    ],
  },
  {
    id: "12.8",
    level: 12,
    title: "Other alternatives and how to think about them",
    concept: "Alternatives",
    minutes: 6,
    summary:
      "Beyond the main asset classes, there is a long tail of alternatives. Most are not for retail investors, but knowing they exist helps you avoid being surprised by them.",
    body: [
      { kind: "paragraph", text: "**Hedge funds** are private investment partnerships that use a wide range of strategies to generate returns, including long-short equity, macro trading, and arbitrage. They charge high fees (2% plus 20% of profits) and have high minimums. Historically, hedge fund returns have been mixed, and after fees, most underperform a simple index fund. They are not accessible to retail investors in Kenya." },
      { kind: "paragraph", text: "**Private debt** funds lend to companies that cannot or prefer not to borrow from banks. The yield is usually higher than public bonds because the borrower is riskier and the loan is less liquid. Private debt funds are accessible in some markets to accredited investors. In Kenya, the market is small but growing, mostly through fund managers targeting institutional clients." },
      { kind: "paragraph", text: "**Collectibles** include art, wine, rare watches, classic cars, and similar items. They can appreciate significantly, and they have decorative value. But they do not produce income, they are illiquid, they require expertise, and the transaction costs are high. For most retail investors, collectibles are a hobby, not an investment strategy." },
      { kind: "paragraph", text: "**Structured products** are financial instruments whose returns are tied to an underlying asset through a formula. They are sold by banks and can be marketed as offering downside protection while capturing upside. The complexity often hides fees and caps that reduce the effective return. Some structured products are useful; many are not. Anyone considering one should read the terms very carefully." },
      { kind: "paragraph", text: "**Carbon credits** and **environmental assets** are a newer category. They allow companies and investors to offset carbon emissions or to bet on the transition to clean energy. The market is still evolving, and the regulatory framework varies widely. The long-term case is real, but the day-to-day volatility and market structure make it a specialist area." },
      { kind: "paragraph", text: "The common thread across all alternatives is that they offer something a diversified portfolio of stocks and bonds does not: exposure to a different risk factor, a different return stream, or a different market. In small doses, some of them can improve a portfolio. In large doses, or without expertise, they tend to add complexity and cost more than they add value." },
      { kind: "example", title: "Example", text: "A learner hears about a hedge fund that returned 30% last year. They consider putting in KSh 500,000. The fund has a 2% management fee, 20% performance fee, and a three-year lockup. If the fund returns 15% the following year, the learner earns roughly 10% after fees, compared to a passive index fund that returned 12% with no lockup and a 0.1% fee. The headline return looked great, but the terms made it worse." },
      { kind: "takeaway", text: "Most alternatives are for specialist investors. Know what they are, but do not feel you need to own them." },
    ],
  },
  {
    "id": "13.1",
    "level": 13,
    "title": "Why direction comes first",
    "concept": "Direction",
    "minutes": 6,
    "summary": "Before you pick an asset, you must know what you are investing for, how long you have, and how much loss you can actually take.",
    "body": [
      {
        "kind": "paragraph",
        "text": "The **Capital Markets Authority** requires every licensed fund manager in Kenya to risk-profile a client before recommending any collective investment scheme. The regulator figured out something most investors learn the hard way: a recommendation without a profile is a guess. If the manager does not know your horizon, your capacity for loss, and your constraints, they cannot know what belongs in your portfolio. You should hold yourself to the same standard."
      },
      {
        "kind": "paragraph",
        "text": "**Investor direction** is the written answer to four questions. What am I investing for? When do I need the money? How much can I lose without damaging my life? How much can I lose without panicking? Direction is not a prediction about markets. It is a statement about you. Once written, it becomes the filter through which every decision passes."
      },
      {
        "kind": "paragraph",
        "text": "This matters because markets are designed to pressure you. In 2025 the NASI rose roughly 51%, from 123.48 to 186.58. A rally of that size makes everyone want to buy more, even after prices have already moved. A crash does the opposite: it makes everyone want to sell, even after prices have already fallen. Without a written direction, you make a fresh decision every time pressure arrives. Your emotions usually win."
      },
      {
        "kind": "paragraph",
        "text": "Think of it the way a business thinks of strategy. A company without a strategy reacts to whatever competitor moves first. A company with a strategy says: this is who we are, this is what we will and will not do. Your direction document is that strategy. One page is enough. But it must be specific enough to tell you no."
      },
      {
        "kind": "example",
        "title": "Example",
        "text": "Two Kenyan investors, both 32, both with KSh 500,000. Investor A writes a one-page direction: house in Mombasa in 5 years, can tolerate a 20% drop without selling, no leverage. Investor B writes nothing. Six months later the NSE drops 22%. Investor A checks the plan, sees the drop is within tolerance, and holds. Investor B panics and sells at the bottom. Same market, same capital, opposite outcomes."
      },
      {
        "kind": "takeaway",
        "text": "A written direction replaces guesswork. Write it before you buy anything."
      }
    ]
  },
  {
    "id": "13.2",
    "level": 13,
    "title": "Risk tolerance versus risk capacity",
    "concept": "Risk",
    "minutes": 6,
    "summary": "Capacity is what you can afford to lose. Tolerance is what you can stomach losing. Size to the lower of the two.",
    "body": [
      {
        "kind": "paragraph",
        "text": "The CMA classifies collective investment schemes into three risk bands: **Low, Moderate, and High**. Those bands measure two different things at once. **Risk capacity** is the maximum loss your financial life can absorb without changing your plans. It is objective, calculable, and does not care how you feel. **Risk tolerance** is how much loss you can experience without making a bad decision. It is psychological, subjective, and only learned through experience."
      },
      {
        "kind": "paragraph",
        "text": "Two people with identical finances can have very different tolerances. One sleeps fine through a 30% drawdown. The other cannot focus at work. Two people with identical psychology can have very different capacities: one has no dependants and a stable salary, the other has school fees due in three months and a variable income. Capacity is a spreadsheet output. Tolerance is a mirror."
      },
      {
        "kind": "paragraph",
        "text": "The trap is assuming they are the same. A young investor with high capacity and low tolerance builds a portfolio that is financially appropriate but psychologically unbearable. They sell at the first drawdown and lock in a loss their finances could easily have absorbed. The opposite is worse: high tolerance with low capacity is gambling, not investing."
      },
      {
        "kind": "paragraph",
        "text": "The rule is simple and unforgiving. **The lower of the two wins.** If capacity says 40% and tolerance says 15%, your effective risk limit is 15%. If capacity says 15% and tolerance says 40%, the limit is still 15%. Position sizing flows from that number, not from a risk score or personality quiz."
      },
      {
        "kind": "paragraph",
        "text": "One more distinction: **risk appetite**. Tolerance is about loss. Appetite is about desire for return. A person can have low tolerance for loss and high appetite for return. That combination is the most dangerous one in retail investing because it produces exactly the behaviour that loses money: buying volatile assets for the upside, then selling when the downside arrives."
      },
      {
        "kind": "example",
        "title": "Example",
        "text": "A 28-year-old with KSh 300,000 saved and a KSh 120,000 monthly salary has high risk capacity. But in 2022 they took a 30% hit and could not sleep. Capacity says 40%, tolerance says 10%. They should size at 10%. A 55-year-old with KSh 4 million and two years to retirement has low capacity. If tolerance is also low, the limit is even lower. Same rule, every time."
      },
      {
        "kind": "takeaway",
        "text": "Capacity is financial. Tolerance is psychological. Size positions to the lower of the two."
      }
    ]
  },
  {
    "id": "13.3",
    "level": 13,
    "title": "Time horizon",
    "concept": "Horizon",
    "minutes": 5,
    "summary": "Money needed in two years and money needed in twenty are completely different investments. Match the asset to the need.",
    "body": [
      {
        "kind": "paragraph",
        "text": "**Time horizon** is when you need the money. It is the most objective input in the direction document, and the one most Kenyan investors get wrong. They do not classify their money by when it is needed. They hold one undifferentiated pot and hope. The result is that school fees money sits in equities and retirement money sits in cash, both for the wrong reasons."
      },
      {
        "kind": "paragraph",
        "text": "Horizon matters because **equities are volatile in the short run and relatively stable in the long run**. The NSE can swing wildly in a single year: the NASI rose about 51% in 2025 and fell sharply in 2022. Over twenty years, the range narrows. Money needed in one year that sits in equities is exposed to a coin flip. Money needed in twenty years that sits in equities is exposed to noise you can ignore."
      },
      {
        "kind": "paragraph",
        "text": "A practical rule most Kenyan advisers use: money needed within 3 years does not belong in volatile assets. Money needed in 3 to 7 years can take moderate risk. Money needed beyond 7 years can take full equity risk. These are not laws. They are boundaries that force you to match the asset to the need instead of the mood."
      },
      {
        "kind": "paragraph",
        "text": "Horizon also interacts with tolerance. A long horizon does not mean high tolerance. Someone saving for retirement 30 years away can financially afford a crash, but if they panic-sell in year five they never capture the long-run return. Horizon sets the upper bound of risk. Tolerance sets the actual risk. The lower number still wins."
      },
      {
        "kind": "paragraph",
        "text": "The tool that makes this practical is **bucketing**. Bucket 1: emergency fund, cash or money market. Bucket 2: goals within 1 to 3 years, short-term government bonds or fixed deposits. Bucket 3: goals 3 to 7 years, a balanced fund. Bucket 4: goals beyond 7 years and retirement, equity-heavy. Each bucket has its own horizon, risk level, and evaluation period."
      },
      {
        "kind": "example",
        "title": "Example",
        "text": "A 34-year-old Kenyan has KSh 1.2 million. KSh 180,000 is the emergency fund. KSh 300,000 is a car purchase in two years. KSh 320,000 is a house deposit in six years. KSh 400,000 is retirement, 31 years away. Each bucket is invested completely differently. Without buckets, all KSh 1.2 million would sit in one place and the wrong thing would be at risk at the wrong time."
      },
      {
        "kind": "takeaway",
        "text": "Match the asset to when the money is needed. Under 3 years: cash. 3 to 7 years: moderate. Over 7 years: equity-heavy."
      }
    ]
  },
  {
    "id": "13.4",
    "level": 13,
    "title": "Goals and constraints",
    "concept": "Goals",
    "minutes": 6,
    "summary": "Goals give direction a purpose. Constraints give it a boundary. Both need to be specific, or the document is useless.",
    "body": [
      {
        "kind": "paragraph",
        "text": "A **goal** is a specific thing you are saving for, with an amount and a date. Not wealth. Not financial freedom. Those are feelings, not goals. A goal looks like: KSh 2.4 million for a house deposit by December 2030, or KSh 800,000 for a masters programme starting September 2028. The amount and the date turn a wish into a plan you can measure against."
      },
      {
        "kind": "paragraph",
        "text": "Specifying goals forces you to compute what is required. If you need KSh 2.4 million in five years and have KSh 600,000 today, you need roughly KSh 22,000 per month at an 8% return. If you already have KSh 1.5 million, you need roughly KSh 11,000. The goal tells you whether the plan is feasible. Without it, you are saving in the dark."
      },
      {
        "kind": "paragraph",
        "text": "**Constraints** are the limits on how you can invest. The standard framework names four. **Liquidity**: how much cash you need accessible. **Horizon**: already covered. **Tax**: how gains are taxed. **Legal or regulatory**: what you are allowed to hold. In Kenya, tax is a live constraint. Capital Gains Tax on share transfers is **15%**, up from 5% before January 2023. Withholding tax applies to dividends and interest. REIT distributions are treated differently again."
      },
      {
        "kind": "paragraph",
        "text": "Liquidity is the constraint Kenyan investors underestimate most. If you might need KSh 500,000 at short notice, that money cannot be locked in a five-year private equity fund. It needs to be sellable within days without a large discount. If your broker fails and you have a claim, the **Investor Compensation Fund caps at KSh 200,000 per investor**, which is a reminder that counterparty risk is real even on the NSE."
      },
      {
        "kind": "paragraph",
        "text": "There is also a softer constraint worth naming: **values**. Some investors refuse to hold tobacco, alcohol, gambling, or fossil fuel companies. Some refuse to hold anything they do not understand. Both are legitimate and belong in the document. Naming them prevents the situation where you buy something, realise it violates something you care about, and sell at a loss out of discomfort."
      },
      {
        "kind": "example",
        "title": "Example",
        "text": "A Nairobi investor writes: goal is KSh 3 million for a wedding in three years. Liquidity: KSh 200,000 accessible at any time. Tax: 30% bracket, after-tax returns matter. Legal: NSE stocks, unit trusts, treasury bonds are fine. Values: no tobacco or gambling stocks. That one paragraph eliminates 80% of possible investments and makes the remaining 20% easy to evaluate."
      },
      {
        "kind": "takeaway",
        "text": "A goal without an amount and a date is a wish. A constraint without a written line is a surprise."
      }
    ]
  },
  {
    "id": "13.5",
    "level": 13,
    "title": "The investor profile",
    "concept": "Profile",
    "minutes": 5,
    "summary": "The profile is the one-page summary of who you are as an investor. It produces a target allocation and a rebalancing rule.",
    "body": [
      {
        "kind": "paragraph",
        "text": "An **investor profile** synthesises everything in the previous four lessons: goals, horizon, risk capacity, risk tolerance, constraints, and values. It is not a personality quiz result. It is a written description of the investor you actually are, at this point in your life, with these resources and these obligations. It will change over time, and that is expected."
      },
      {
        "kind": "paragraph",
        "text": "A useful profile answers six questions in plain language. **What am I investing for?** The named goals. **When do I need the money?** The horizons. **How much can I lose without damaging my life?** Risk capacity, as a percent. **How much can I lose without panicking?** Risk tolerance, as a percent. **What am I not allowed to do?** Constraints. **What do I refuse to hold?** Values."
      },
      {
        "kind": "paragraph",
        "text": "The profile produces a **target allocation**: roughly how much belongs in cash, bonds, equities, and alternatives. A short-horizon, low-tolerance investor might be 40% cash, 40% bonds, 20% equities. A long-horizon, high-tolerance investor might be 10% cash, 20% bonds, 70% equities. The exact numbers matter less than the fact that they were chosen deliberately and written down."
      },
      {
        "kind": "paragraph",
        "text": "The profile is also the reference for **rebalancing**. When the market moves, your actual allocation drifts. If the target is 70/30 equities/bonds and a rally pushes you to 82/18, the profile tells you to sell equities and buy bonds. That is a mechanical rule. It removes the emotional question of whether the market is too high or still has room."
      },
      {
        "kind": "paragraph",
        "text": "One Kenya-specific consideration most profiles miss. **SACCOs and chamas** carry social obligations that belong in the profile. If you are committed to KSh 5,000 per month in your chama, that money is not available for other investments, and the chama strategy may double up on your other holdings. A profile that ignores these commitments is wrong about your real capacity."
      },
      {
        "kind": "example",
        "title": "Example",
        "text": "A 41-year-old Nairobi professional writes a profile. Goals: KSh 4 million for a child education fund in 12 years, retirement in 24 years. Capacity 30%. Tolerance 20%, so effective limit 20%. Constraints: CGT 15% matters, need KSh 300,000 liquid at all times. Values: no gambling stocks. SACCO commitment: KSh 8,000 per month. From that, the target allocation falls out almost automatically."
      },
      {
        "kind": "takeaway",
        "text": "A good profile is a paragraph, not a page. But every line in it has to be specific."
      }
    ]
  },
  {
    "id": "13.6",
    "level": 13,
    "title": "Writing your direction document",
    "concept": "Document",
    "minutes": 6,
    "summary": "One page. Goals with amounts and dates, horizon per bucket, capacity as a percent, tolerance as a percent, constraints, values.",
    "body": [
      {
        "kind": "paragraph",
        "text": "The **direction document** is the written form of your investor profile. It is not for anyone else. It is for you, at 11pm during a market crash, when you cannot think clearly and need something on paper that says what you decided when you were calm. If it is not written, it does not exist as a constraint."
      },
      {
        "kind": "paragraph",
        "text": "The structure that works has six sections. **Goals**: three to five named goals, each with amount and date. **Buckets**: how money sits across the horizon buckets (0 to 3, 3 to 7, 7+ years). **Capacity**: the maximum loss percentage your finances can absorb. **Tolerance**: the maximum loss percentage you can stomach without changing behaviour. **Constraints**: liquidity floor, tax situation, legal restrictions. **Values**: anything you refuse to hold."
      },
      {
        "kind": "paragraph",
        "text": "The document is not a forecast. It does not say the NASI will rise or fall, or that rates will move. It says: given who I am and what I am saving for, this is the portfolio I should hold, and these are the rules I will follow when I am tempted to break them. That is the whole job."
      },
      {
        "kind": "paragraph",
        "text": "Write it once, in a single sitting. Expect the first draft to be wrong. Expect to revise after six months. Expect to rewrite it completely after any major life change. A document that stays accurate for ten years untouched is either very general or very lucky. Specificity is worth more than longevity."
      },
      {
        "kind": "paragraph",
        "text": "Keep it where you will see it. If it lives in a drawer and you never look at it, it is not doing any work. Some investors paste theirs at the top of their brokerage account notes. Others stick it on the fridge. The point is to read it before every significant decision: before you buy, before you sell, before you change allocation."
      },
      {
        "kind": "example",
        "title": "Example",
        "text": "A learner drafts a one-page direction in twenty minutes. Goals: KSh 1.5M car in 4 years, KSh 6M retirement at 55 (24 years). Buckets: 60% into retirement, 30% car, 10% emergency. Capacity 35%, tolerance 20%, so limit 20%. Constraint: KSh 200,000 always accessible. Values: no tobacco, no gambling. Rebalancing: annually on 1 January. That is a complete direction document on half a page."
      },
      {
        "kind": "takeaway",
        "text": "One page, six sections, read before every significant decision. That is the entire direction document."
      }
    ]
  },
  {
    "id": "13.7",
    "level": 13,
    "title": "When direction changes",
    "concept": "Revision",
    "minutes": 5,
    "summary": "Direction changes when your life changes, not when the market moves. The 2025 rally is the test.",
    "body": [
      {
        "kind": "paragraph",
        "text": "The most important rule about the direction document is this: **it changes when your life changes, not when the market moves**. If the NASI rises 51% and you suddenly decide you should be 90% equities, that is not a direction change. That is a mood. If the NASI falls 20% and you decide to go all cash, same thing. The document exists precisely to protect you from these reactions."
      },
      {
        "kind": "paragraph",
        "text": "There are specific life events that legitimately require a rewrite. Marriage or divorce. A new child. A large change in income. Approaching retirement, typically within five years. A significant inheritance. A major health diagnosis. Buying a house. Starting a business. These change your goals, your horizon, your capacity, or your constraints. When they happen, rewrite the document."
      },
      {
        "kind": "paragraph",
        "text": "There is a middle category: events that require **reviewing** the document without necessarily changing it. A year has passed. The portfolio has drifted from target. Your tax situation has shifted. You are approaching the end of a bucket horizon. These are calendar or structural triggers, not emotional ones."
      },
      {
        "kind": "paragraph",
        "text": "The 2025 NSE rally is an excellent test. If you wrote a direction document in January 2025 and the NASI rose about 51% over the year, did you rewrite the document? If yes, why? If the answer is because the market went up, that is not a reason. The document should have stayed the same. The allocation inside it may need rebalancing, but the direction itself should not have changed."
      },
      {
        "kind": "paragraph",
        "text": "The discipline here is unforgiving but simple. Every six months, ask: has anything in my life changed? If no, do nothing except rebalance back to the target. If yes, rewrite the specific sections that changed. Never touch the document because of a market move. That is what the whole system is for."
      },
      {
        "kind": "example",
        "title": "Example",
        "text": "A learner wrote a direction in early 2025: 40% cash, 60% equities, target horizon 8 years. By December 2025 the equities had rallied and the mix was 25% cash, 75% equities. The learner does not rewrite the direction. They rebalance back to 40/60. If instead the learner's salary doubled in 2025, that is a life change, and the direction gets an update because capacity and goals have changed."
      },
      {
        "kind": "takeaway",
        "text": "Rewrite the direction for life events, not market events. Rebalance for market events."
      }
    ]
  },
  {
    "id": "14.1",
    "level": 14,
    "title": "What a thesis is",
    "concept": "Thesis",
    "minutes": 6,
    "summary": "A thesis is not I think this will go up. It is catalyst, position, risks, conviction, exit.",
    "body": [
      {
        "kind": "paragraph",
        "text": "A **thesis** is a written argument for why you own something. It is not a feeling, and it is not a prediction. It is a structured claim with four parts: **catalyst** (what specifically is going to change), **position** (what the company does and why it is positioned to benefit), **risks** (what would kill the thesis), and **exit** (the price or condition at which you would sell). If you cannot write all four in one page, you do not yet have a thesis."
      },
      {
        "kind": "paragraph",
        "text": "The NSE is a small, concentrated market, which makes thesis-writing both easier and harder. Easier because there are only about 60 listed companies and the fundamentals are visible. Harder because the market is dominated by a handful of names. **Banks pay roughly four-fifths of all dividends on the NSE**, and Safaricom, KCB, and Equity together account for a large share of daily turnover. If your thesis does not explain why you are looking outside those names, or why you are buying them at this price, it is not a thesis."
      },
      {
        "kind": "paragraph",
        "text": "The reason a thesis matters is that it turns a purchase into a commitment with conditions. Without one, you buy a stock because the price is rising. Then the price falls and you do not know whether to hold or sell, because you never wrote down why you bought it. With a thesis, the fall either breaks the thesis (sell) or leaves it intact (hold). The document makes the decision mechanical."
      },
      {
        "kind": "paragraph",
        "text": "A thesis also has an implied **falsifiability**. If nothing could ever make you change your mind, it is not a thesis, it is a belief. Before you buy, write the three things that would prove you wrong. If the price falls and the thesis holds, you buy more. If the thesis is wrong, you exit without regret. This is the single most valuable habit in long-term investing."
      },
      {
        "kind": "example",
        "title": "Example",
        "text": "A learner wants to buy KCB. Bad thesis: KCB is a good bank and the price will go up. Good thesis: KCB trades at a P/E below its 10-year average; the bank has consistently grown its loan book faster than GDP; the dividend yield is above 8%; the risk is that non-performing loans rise if interest rates stay elevated; exit if NPL ratio exceeds 15% for two consecutive quarters. That second thesis is falsifiable. The first is not."
      },
      {
        "kind": "takeaway",
        "text": "A thesis is catalyst, position, risks, exit, on one page. If you cannot write all four, you do not have one."
      }
    ]
  },
  {
    "id": "14.2",
    "level": 14,
    "title": "Reading a Kenyan company",
    "concept": "Research",
    "minutes": 6,
    "summary": "What to look at in an NSE annual report, and where to find it.",
    "body": [
      {
        "kind": "paragraph",
        "text": "Every NSE-listed company publishes an annual report and, for most, half-year and quarterly results. These are the primary documents. They are available on the company website and on the NSE website. Secondary research is produced by **AIB-AXYS Africa, Faida Investment Bank, KCB Capital, and Genghis Capital**, all CMA-licensed and free or low-cost to access via broker accounts."
      },
      {
        "kind": "paragraph",
        "text": "The first page to read is the **profit and loss statement**. Look at revenue, operating profit, profit after tax, and the trend over 3 to 5 years. A single year tells you almost nothing. The pattern matters more: is revenue growing, flat, or declining? Are margins stable? Is the profit coming from operations or from one-off items like asset sales?"
      },
      {
        "kind": "paragraph",
        "text": "The second page is the **balance sheet**. For banks, the key ratios are the **non-performing loan (NPL) ratio** and the **capital adequacy ratio**. For manufacturers, it is inventory and debt. For Safaricom, it is the number of active customers, ARPU (average revenue per user), and M-Pesa transaction volume. Each sector has its own metrics. Know which ones matter for the company you are looking at."
      },
      {
        "kind": "paragraph",
        "text": "The third thing to look at is the **dividend record**. Kenyan companies differ a lot in how they pay out. Some, like banks, pay most of their earnings as dividends. Others reinvest heavily. The dividend yield is the annual dividend per share divided by the share price. If it is unusually high, ask why. A very high yield can mean the market expects the dividend to be cut."
      },
      {
        "kind": "paragraph",
        "text": "The fourth thing is the **cash flow statement**. Profit can be manipulated within accounting rules. Cash flow from operations is much harder to fake. If a company reports strong profit but weak operating cash flow year after year, the profit is probably not real. This is the single most useful check you can do before buying anything."
      },
      {
        "kind": "example",
        "title": "Example",
        "text": "A learner is evaluating Safaricom. They pull the FY2025 annual report. Profit after tax was roughly KSh 45.76B. They check the cash flow statement: operating cash flow was comfortably above reported profit, so earnings are real. They look at M-Pesa volume, which grew, and ARPU, which was stable. They compare this to the last five years and see a company with steady growth. That is a company worth building a thesis around."
      },
      {
        "kind": "takeaway",
        "text": "Read the primary documents. Look at revenue, balance sheet ratios, dividends, and cash flow. Ignore the noise."
      }
    ]
  },
  {
    "id": "14.3",
    "level": 14,
    "title": "Valuation in Kenyan context",
    "concept": "Valuation",
    "minutes": 6,
    "summary": "NSE P/E has ranged from about 5.1x to 8.4x in 2025-2026. Historical average is 11.3x to 11.9x. Context is everything.",
    "body": [
      {
        "kind": "paragraph",
        "text": "**Valuation** is the question of what a company is worth relative to its price. The most common metric is the **price-to-earnings ratio (P/E)**: the share price divided by earnings per share. A P/E of 8 means you pay 8 shillings for every shilling of annual profit. Lower is cheaper in theory, but cheap stocks are often cheap for a reason."
      },
      {
        "kind": "paragraph",
        "text": "The NSE trades at unusually low valuations by global standards. Through 2025 and 2026 the market P/E has ranged from around **5.1x to 8.4x**. The historical average is **11.3x to 11.9x**. This means the market as a whole is trading well below its long-run average. That can be an opportunity. It can also reflect real concerns: low GDP growth, high interest rates, or political risk."
      },
      {
        "kind": "paragraph",
        "text": "A stock at 5x P/E is not automatically cheap. If earnings are about to fall by 40%, it is expensive. If earnings are stable, it is very cheap. The discipline is to look at the P/E alongside the trend in earnings, the trend in the dividend, and the position of the company within its sector. Compare like with like. A bank at 4x P/E is being priced differently from a manufacturer at 12x P/E, because the market has different expectations for each."
      },
      {
        "kind": "paragraph",
        "text": "**Dividend yield** is the second number that matters on the NSE, because Kenyan investors rely on income much more than global investors do. The market average yield is around **8.4%**, which is extremely high by global standards. Again, a high yield can mean the market expects a cut. Check the payout ratio: if a bank is paying out 90% of its earnings as dividends, that is not sustainable forever."
      },
      {
        "kind": "paragraph",
        "text": "The third number is **price-to-book**. For banks and financial companies, this is often more useful than P/E. A bank trading below book value is being priced as if the market expects its loans to lose value. If you believe the loans are sound, that is an opportunity. If you are wrong, the market was right."
      },
      {
        "kind": "example",
        "title": "Example",
        "text": "A learner compares three NSE banks in 2025. Bank A trades at 4.2x P/E, 1.1x book, 9.1% dividend yield. Bank B trades at 6.8x P/E, 1.8x book, 6.4% yield. Bank C trades at 11.2x P/E, 2.6x book, 3.0% yield. The cheap one is not automatically the best. The learner reads the NPL ratios: Bank A has 14% NPLs, Bank B has 9%, Bank C has 6%. The market is pricing Bank A as risky. The question is whether you agree."
      },
      {
        "kind": "takeaway",
        "text": "Cheap is not the same as good. Compare P/E, yield, and price-to-book within a sector, and read the underlying trend."
      }
    ]
  },
  {
    "id": "14.4",
    "level": 14,
    "title": "Position sizing and exit",
    "concept": "Sizing",
    "minutes": 5,
    "summary": "NSE now allows single-share purchases. Position sizing is flexible but liquidity still matters. Write the exit before you enter.",
    "body": [
      {
        "kind": "paragraph",
        "text": "Since **1 August 2025**, the NSE allows investors to buy as little as one share of a listed company. Before that, the minimum was 100 shares. This change opened the market to smaller investors, but it also removed the old excuse that position sizing was not possible. If you can buy one share, you can buy any amount you want, and the decision about how much to buy is entirely yours."
      },
      {
        "kind": "paragraph",
        "text": "The rule for position sizing is simple in principle. No single position should be large enough to seriously damage the portfolio if it goes to zero. The most common threshold is **5% of the portfolio per position** for individual stocks. If you hold 20 stocks, none at more than 5%, a complete loss on one costs you 5% of the total. That is survivable. A 30% position in a single stock that goes to zero costs you a third of your portfolio. That is not."
      },
      {
        "kind": "paragraph",
        "text": "Liquidity matters as much as sizing on the NSE. Small-cap stocks can have very wide bid-ask spreads, which means the round-trip cost of buying and selling can be several percent. If your thesis is right but your round-trip cost is 6%, you need the stock to gain 6% just to break even. Stick to stocks with meaningful daily volume, especially when you are starting out."
      },
      {
        "kind": "paragraph",
        "text": "The exit should be written before you enter. There are two types of exit. **Thesis exit**: you sell when the thesis breaks, regardless of price. **Price exit**: you sell when the stock hits a target price you set in advance. The first is usually better for long-term investors. The second is more mechanical and works for traders. Either way, write it down."
      },
      {
        "kind": "paragraph",
        "text": "Settlement on the NSE is **T+3**: three business days after the trade, your shares and cash settle. Capital Gains Tax is deducted at the point of transfer. The tax rate is **15%** on gains from share sales, so a KSh 100,000 gain nets you KSh 85,000 after tax. Build this into the return calculation when you size a position and when you set a price target."
      },
      {
        "kind": "example",
        "title": "Example",
        "text": "A learner with a KSh 800,000 portfolio wants to buy a small NSE stock. The maximum position size at 5% is KSh 40,000. The stock trades at KSh 14 with a bid-ask spread of KSh 0.50, which is a 3.6% round-trip cost. The learner budgets KSh 1,500 for slippage on entry and exit combined. The thesis target is KSh 20, a 42% gain. After slippage and 15% CGT, the net gain is roughly KSh 11,000. That is the honest expected return, and only the learner can decide if it is worth the risk."
      },
      {
        "kind": "takeaway",
        "text": "Size at no more than 5% per position. Check liquidity. Write the exit before you buy."
      }
    ]
  },
  {
    "id": "14.5",
    "level": 14,
    "title": "The one-page thesis",
    "concept": "Template",
    "minutes": 5,
    "summary": "Seven sections: thesis, catalyst, evidence, risks, conviction, exit, review date. Everything on one page.",
    "body": [
      {
        "kind": "paragraph",
        "text": "The **one-page thesis** is the deliverable. It is the document you write before you buy and the document you revisit when you are deciding whether to hold, add, or sell. It is not for anyone else. It is a thinking tool. If you cannot fit it on one page, you have not thought it through yet."
      },
      {
        "kind": "paragraph",
        "text": "**Thesis** (one sentence). What is the argument for owning this? Not that the price will rise. Something like: this bank is priced at half its historical multiple, its loan book is growing faster than the sector, and its NPL ratio is falling. That is a thesis."
      },
      {
        "kind": "paragraph",
        "text": "**Catalyst** (what specifically changes). A new product, a rate cut, a market share gain, an acquisition, a management change. If there is no catalyst, the thesis is a belief that the market will eventually see things the way you do. That can work, but it takes longer and demands more patience."
      },
      {
        "kind": "paragraph",
        "text": "**Evidence** (three data points). Not opinions. Numbers from the annual report or a broker research note. Revenue growth over three years, NPL ratio trend, dividend history, competitive position. If you cannot cite three specific data points, you have not done the work."
      },
      {
        "kind": "paragraph",
        "text": "**Risks** (three things that kill the thesis). Not generic risks like the market might fall. Specific risks: NPL ratio rises above 15%, the regulator changes a fee structure, a competitor enters the market. **Conviction** (high, medium, low). This determines your position size within the 5% cap. **Exit** (price or thesis break condition). **Review date** (a specific date you will revisit, typically 6 or 12 months out)."
      },
      {
        "kind": "example",
        "title": "Example",
        "text": "A learner writes a thesis on Equity Group. Thesis: strong regional growth and falling cost-to-income ratio justify a re-rating from current multiples. Catalyst: continued expansion in DRC and Uganda. Evidence: Q3 2025 PAT KSh 54.1B, ROE above 25%, cost-to-income falling for three consecutive years. Risks: exposure to DRC currency risk, Kenyan rate cycle, regulatory changes. Conviction: medium. Exit: sell if cost-to-income reverses or if regional losses exceed two quarters. Review: 30 June 2027. That fits on one page."
      },
      {
        "kind": "takeaway",
        "text": "Seven sections, one page, before you buy. Revisit on the review date, not on price moves."
      }
    ]
  },
  {
    "id": "15.1",
    "level": 15,
    "title": "The biases that cost Kenyans money",
    "concept": "Biases",
    "minutes": 6,
    "summary": "Peer-reviewed research on NSE investors found four biases with measurable impact. Information processing bias is the strongest.",
    "body": [
      {
        "kind": "paragraph",
        "text": "A **peer-reviewed study of NSE investors** identified four biases with statistically significant impact on portfolio decisions. **Confirmation bias**: seeking out information that supports what you already believe and ignoring the rest. **Overconfidence**: overestimating your own skill and knowledge. **Familiarity bias**: preferring companies you know, work for, or live near, regardless of fundamentals. **Information processing bias**: making decisions based on how information is presented rather than what the information says."
      },
      {
        "kind": "paragraph",
        "text": "Of the four, **information processing bias** had the greatest measurable effect on NSE investor behaviour. This means the biggest problem is not what investors know, but how they use what they know. A well-informed investor who anchors on the first number they see will make worse decisions than a moderately-informed investor who evaluates multiple sources."
      },
      {
        "kind": "paragraph",
        "text": "Overconfidence is especially common among **new and younger investors**. This makes intuitive sense: someone who has had one or two successful trades concludes they have a skill they do not yet have. The 2025 NASI rally would have amplified this. A new investor who bought almost anything in 2025 would have made money, and the market would have taught them the wrong lesson."
      },
      {
        "kind": "paragraph",
        "text": "Familiarity bias is particular to the NSE because the market is small. Investors tend to hold Safaricom, KCB, and Equity not because they analysed those companies, but because they see them every day. Sometimes the familiar companies are genuinely the best. Sometimes they are not. The bias is dangerous when it stops you from looking at the rest of the market."
      },
      {
        "kind": "paragraph",
        "text": "**Herding** is a fifth bias that the study found operating strongly. It is driven by peer influence and media coverage. When everyone is talking about a stock, the social pressure to buy is real. This is why bull markets inflate: each new buyer cites the previous buyers as evidence. The pattern is well documented on the NSE."
      },
      {
        "kind": "example",
        "title": "Example",
        "text": "A learner reads one article saying bank stocks are undervalued, then only searches for other articles that agree. That is confirmation bias. They buy KCB because they bank there, without comparing it to peers. That is familiarity bias. They double their position after a 20% gain because they think they have a feel for the stock. That is overconfidence. Each of these feels reasonable in the moment. All three are biases that reduce returns."
      },
      {
        "kind": "takeaway",
        "text": "Know your biases by name. Information processing bias is the strongest one affecting NSE investors."
      }
    ]
  },
  {
    "id": "15.2",
    "level": 15,
    "title": "Loss aversion and the disposition effect",
    "concept": "Loss aversion",
    "minutes": 6,
    "summary": "Kenyan research: the disposition effect increases with trade frequency and decreases with age. Group investors show lower effect than individuals.",
    "body": [
      {
        "kind": "paragraph",
        "text": "**Loss aversion** is the finding that losses feel roughly **twice as painful** as equivalent gains feel pleasurable. A KSh 10,000 loss hurts about as much as a KSh 20,000 gain feels good. This is not a character flaw. It is a universal feature of human psychology, and it has measurable effects on investing behaviour in every market, including the NSE."
      },
      {
        "kind": "paragraph",
        "text": "The most documented consequence is the **disposition effect**: the tendency to sell winners too early and hold losers too long. The logic is emotional. Selling a winner locks in a good feeling. Selling a loser locks in a bad feeling, so the investor postpones it, hoping the price recovers. Over time, this behaviour systematically reduces returns, because the portfolio fills with the stocks that have already fallen and empties of the stocks that have already risen."
      },
      {
        "kind": "paragraph",
        "text": "**A peer-reviewed study of Kenyan investors** found two important patterns. First, the disposition effect **increases with the frequency of trade**. This means the more you trade, the more you exhibit the bias. Traders who trade monthly exhibit it more than traders who trade yearly. Second, the disposition effect **decreases with age**. Older investors are less prone to it, which suggests either that experience teaches the lesson or that the bias weakens with age."
      },
      {
        "kind": "paragraph",
        "text": "The same study found that **group investors exhibit a lower disposition effect than individual investors**. This is the strongest empirical case for chama and SACCO structures on behavioural grounds. When decisions are made collectively, and when someone else has to agree with the sell decision, the emotional pressure that produces the disposition effect is diluted. Groups also tend to enforce a process, which individuals skip."
      },
      {
        "kind": "paragraph",
        "text": "The counter-measure is to make the sell decision **mechanical**, using a written thesis with a stated exit condition. If the thesis breaks, sell, regardless of whether the position is up or down. If the thesis holds, hold, regardless of whether the position is up or down. This removes the emotional weight of the decision and lets you keep the winning stocks running."
      },
      {
        "kind": "example",
        "title": "Example",
        "text": "A learner buys two NSE stocks. Stock A rises 30%. Stock B falls 30%. Without a thesis, the learner sells A to lock in the gain and holds B hoping it recovers. Six months later A is up 60% more and B is down another 20%. The disposition effect cost the learner twice: they missed the winner's continuation and they held a loser. With a thesis, the decision is driven by which company is performing, not by which position feels better to close."
      },
      {
        "kind": "takeaway",
        "text": "Loss aversion is real and universal. Trade less, write theses, and use groups to enforce process."
      }
    ]
  },
  {
    "id": "15.3",
    "level": 15,
    "title": "FOMO and herding",
    "concept": "FOMO",
    "minutes": 5,
    "summary": "The 2025 NSE rally is a live case study in herding. Late entrants paid the emotional cost.",
    "body": [
      {
        "kind": "paragraph",
        "text": "**FOMO** is the fear of missing out. It is the emotional pressure to buy something because other people are making money on it and you are not. It is not a rational reaction to opportunity. It is a social reaction to envy. In markets, FOMO is what turns a bull run into a bubble, and the NSE is not immune to it."
      },
      {
        "kind": "paragraph",
        "text": "**Herding** is the behaviour that FOMO produces. When everyone is buying, the price rises, which attracts more buyers, which pushes the price higher. Each new buyer looks at the previous buyers as evidence that the trade works. The logic becomes circular: I am buying because they are buying, and they are buying because I am buying. This can run for a long time before it breaks."
      },
      {
        "kind": "paragraph",
        "text": "The **2025 NSE rally** is a live case study. The NASI rose roughly 51% over the year, from 123.48 to 186.58. Most of the gains came in a relatively short window, which is characteristic of herding behaviour. Investors who entered early and held through the year did well. Investors who entered late, after the headline returns had already been made, bought at elevated levels and faced the subsequent correction."
      },
      {
        "kind": "paragraph",
        "text": "The CMA and the NSE both publish investor education material warning about herding, but the warning rarely works, because it arrives in calm markets and is forgotten in hot ones. The only structural fix is to have a written plan that tells you what to do regardless of what other people are doing. If the plan says rebalance on 1 January and 1 July, you rebalance, even if the market is on fire."
      },
      {
        "kind": "paragraph",
        "text": "There is a specific pattern worth knowing. Herding typically peaks just before a correction. Retail participation rises most at the top. The last buyers are usually the ones with the least experience and the smallest buffers, which is why they are also the ones most likely to sell at the bottom. This is not a coincidence. It is the predictable shape of a herding cycle."
      },
      {
        "kind": "example",
        "title": "Example",
        "text": "A learner hears about the 2025 rally in October. The NASI has already risen 40%. They buy three NSE stocks because everyone is talking about it. By January the market has corrected 10%, the learner is down, and they sell to stop the pain. They bought at the top and sold at the bottom, both times because of the crowd. A written direction and a rebalancing calendar would have prevented both decisions."
      },
      {
        "kind": "takeaway",
        "text": "FOMO and herding peak just before corrections. The fix is a written plan, not willpower."
      }
    ]
  },
  {
    "id": "15.4",
    "level": 15,
    "title": "The scams that exploit psychology",
    "concept": "Scams",
    "minutes": 6,
    "summary": "CMA flagged 15 unlicensed schemes in September 2026. The Investor Compensation Fund does not cover unlicensed entities.",
    "body": [
      {
        "kind": "paragraph",
        "text": "In **September 2026, the CMA published a public notice flagging 15 unlicensed schemes** operating in Kenya, including Global Investment Group, QVSE, Kore Exchange, Abacus Wealth, Bitblock Capital, CBEX, and Ultima Cryptocurrency. These entities were offering investment products without a CMA licence. The regulator's warning is not a formality. It is the last line of defence before investors start losing money they cannot recover."
      },
      {
        "kind": "paragraph",
        "text": "The critical fact most investors miss: the **Investor Compensation Fund does not cover unlicensed entities**. If you lose money to a CMA-licensed broker due to fraud or insolvency, you can claim up to KSh 200,000 from the ICF. If you lose money to an unlicensed scheme, there is no compensation fund, no regulator, and usually no legal recourse. The warning from the CMA is the only warning you will get."
      },
      {
        "kind": "paragraph",
        "text": "The scams that target Kenyan investors exploit the same psychological biases in every generation. **Promises of high fixed returns** (20% per month, 5% per week) exploit the desire for certainty and the inability to do arithmetic under pressure. **Social proof** (everyone in your chama is already earning) exploits herding. **Urgency** (this offer closes Friday) exploits loss aversion. **Complexity** (AI trading, blockchain arbitrage, forex bots) exploits the fear of looking uninformed."
      },
      {
        "kind": "paragraph",
        "text": "A specific pattern worth naming: many scams use a **pyramid structure** where early investors are paid from the deposits of later investors. This works for the first few months, which produces testimonials and social proof that pull in the next wave. When new deposits slow, the whole thing collapses. The people who lose are almost always the ones who entered in the last 30% of the run. That is the same herding pattern as a stock bubble, applied to something that was never real."
      },
      {
        "kind": "paragraph",
        "text": "The structural defence is simple and specific: **check the CMA licence before you deposit any money**. The CMA publishes the list of licensed entities on its website. If an entity is not on that list, treat it as unsafe, regardless of how convincing the marketing is, how large the returns promised, or how many people you know who have already invested. Unlicensed means unregulated. Unregulated means unprotected."
      },
      {
        "kind": "example",
        "title": "Example",
        "text": "A learner is invited to a WhatsApp group promoting a forex bot returning 8% per month. There are screenshots of other users receiving payments. A friend has been paid twice. The learner checks the CMA website: the entity is not licensed. They decline. Six months later the WhatsApp group is silent, the entity has disappeared, and the friend has lost their capital and the two payments they thought were profits. The pattern is always the same."
      },
      {
        "kind": "takeaway",
        "text": "Check the CMA licence before depositing. If it is not licensed, the Investor Compensation Fund does not cover you."
      }
    ]
  },
  {
    "id": "15.5",
    "level": 15,
    "title": "Building counter-measures",
    "concept": "Discipline",
    "minutes": 6,
    "summary": "Written rules, checklists, a devil's advocate, automatic contributions, and chama accountability. Structural fixes beat willpower.",
    "body": [
      {
        "kind": "paragraph",
        "text": "**Willpower does not work** as a defence against behavioural biases. By the time you are feeling the emotion, the decision has usually already been made inside you. The reliable fix is to change the structure so that the emotional decision is harder to make and the rational decision is easier. This is the same principle as keeping junk food out of the house: the structural fix beats the daily resistance."
      },
      {
        "kind": "paragraph",
        "text": "The first counter-measure is a **written rule**. For rebalancing, it is a calendar date: rebalance on 1 January and 1 July, to your target allocation. For exits, it is a thesis break condition: sell if the specific condition you wrote down occurs. The rule is written when you are calm and executed when you are not. The discipline is that the rule does not move with the market."
      },
      {
        "kind": "paragraph",
        "text": "The second is a **decision checklist** to run before every buy. Does this fit my direction document? Have I written a one-page thesis? Is the position under 5%? Have I checked liquidity? Do I know the exit? Would I be comfortable if this position fell 40%? Six questions. Two minutes. They eliminate most bad purchases."
      },
      {
        "kind": "paragraph",
        "text": "The third is a **devil's advocate**. Someone whose job is to argue against your thesis before you buy. In a chama or an investment club, this role can be formal. Individually, it can be a friend or mentor whose opinion you trust. The discipline is to hear the strongest counter-argument before you commit capital, not after. This is the single most effective defence against confirmation bias."
      },
      {
        "kind": "paragraph",
        "text": "The fourth is **automatic contributions**. Standing orders from your bank account to your unit trust or SACCO execute without any decision on your part. They remove the monthly question of whether this is a good time to invest. This is the same principle as an employer pension: money is deducted before you can spend it. Automation is the most powerful discipline tool available to retail investors in Kenya."
      },
      {
        "kind": "paragraph",
        "text": "The fifth, and the one most specific to Kenya, is **chama and SACCO structure**. The evidence from Kenyan research is that group investors exhibit a lower disposition effect than individuals. Groups enforce process, dilute emotional decisions, and create accountability. A well-governed chama is a structural counter-measure to almost every behavioural bias on this list. A poorly-governed chama is just a group version of the same mistakes, so governance matters."
      },
      {
        "kind": "example",
        "title": "Example",
        "text": "A learner sets up four counter-measures in one weekend. A standing order of KSh 15,000 per month into a unit trust. A rebalancing reminder on 1 January and 1 July. A written thesis template in a note on their phone. And a chama of five friends who meet monthly to review each other's theses before anyone buys. None of these require willpower. All of them change the default behaviour. That is the point."
      },
      {
        "kind": "takeaway",
        "text": "Structure beats willpower. Write the rules, automate the contributions, and use a group to enforce the process."
      }
    ]
  },
  {
    "id": "16.1",
    "level": 16,
    "title": "Records and tax",
    "concept": "Tax",
    "minutes": 6,
    "summary": "CGT at 15% on non-NSE property. NSE shares are exempt. Keep records for seven years. File Form CGT1.",
    "body": [
      {
        "kind": "paragraph",
        "text": "The Kenya Revenue Authority treats different assets differently. **Capital Gains Tax is 15% of the net gain** on the transfer of property. This applies to land, buildings, unquoted shares, and shares in foreign companies where Kenyan property value exceeds 20%. It does not apply to shares listed on the NSE. **NSE-listed shares are exempt from CGT**, which makes the local exchange one of the most tax-friendly markets in East Africa."
      },
      {
        "kind": "paragraph",
        "text": "The tax is a **final tax**. Once CGT is paid, the gain is not subject to further income tax. The due date is at the point of transfer, and payment is made through **iTax using Form CGT1 (for the seller) and CGT2 (for the buyer)**. Both parties must be registered for tax, and the forms require the PIN of both, the sale value, the acquisition cost, the gain, and the tax due. A **Tax Compliance Certificate** is issued after CGT is paid, which is required before the transfer can be registered."
      },
      {
        "kind": "paragraph",
        "text": "There is a common confusion about shares sold through a broker. NSE shares are CGT-exempt, so no CGT form is required on the sale. However, **withholding tax applies to dividends and interest**. Dividend WHT is 5% for Kenyan residents. Interest WHT on bank deposits and bonds is 15%. These are withheld at source by the payer and do not require separate filing, but they do appear on your annual tax return."
      },
      {
        "kind": "paragraph",
        "text": "The record-keeping requirement is specific and long. Keep **contract notes, bank statements, dividend advices, and tax receipts for at least seven years**. KRA can audit returns within that window. The reason this matters is that if you cannot prove your acquisition cost, KRA can assess the full sale value as a gain, which is a catastrophic outcome. Most investors lose records because they change brokers or banks, so the discipline is to keep a single folder, physical or digital, that follows you across providers."
      },
      {
        "kind": "example",
        "title": "Example",
        "text": "A learner sells a plot in Kiambu for KSh 4.2M. They bought it in 2019 for KSh 2.8M. The gain is KSh 1.4M. CGT is 15%, which is KSh 210,000. They file Form CGT1 within 30 days of the sale, pay KSh 210,000 through iTax, receive the Tax Compliance Certificate, and register the transfer. If they had also sold NSE shares for a KSh 500,000 gain, no CGT would be due on that portion."
      },
      {
        "kind": "takeaway",
        "text": "15% CGT on property. NSE shares exempt. Keep records seven years. File CGT1 within 30 days of the sale."
      }
    ]
  },
  {
    "id": "16.2",
    "level": 16,
    "title": "Automatic contributions",
    "concept": "Automation",
    "minutes": 6,
    "summary": "M-Pesa Paybill and standing orders remove the monthly decision. Every major Kenyan fund manager supports them.",
    "body": [
      {
        "kind": "paragraph",
        "text": "The single most powerful discipline tool for a Kenyan investor is **automation**. Instead of deciding every month whether this is a good time to invest, you set up a standing order or M-Pesa Paybill to move money into your unit trust or SACCO on a fixed date. The money leaves before you can spend it, which is the same principle an employer pension uses. The decision is made once, in a calm moment, and never revisited in an anxious one."
      },
      {
        "kind": "paragraph",
        "text": "Every CMA-licensed fund manager in Kenya supports this. **Old Mutual uses M-Pesa Paybill 600500**. **CIC Asset Management uses Paybill 600118** with a minimum of KSh 5,000 per fund. **Zimele uses Paybill 501101** with a minimum deposit of KSh 100. **Jubilee uses Paybill 4103749** with a minimum initial investment of KES 100 or USD 100. **Britam, Sanlam, and Stanlib** all support similar mechanisms. The specific numbers change occasionally, so verify at the time of setup. The point is that the plumbing exists and is free to use."
      },
      {
        "kind": "paragraph",
        "text": "Standing orders are more flexible than Paybills in one important way: you can set the frequency. Weekly contributions work better than monthly for most people, because a smaller amount leaves less often and produces a smoother average entry price. Monthly is more convenient and aligns with salary cycles. Both are better than ad-hoc, which is what most investors actually do."
      },
      {
        "kind": "paragraph",
        "text": "There is a compounding argument worth knowing. A standing order of KSh 15,000 per month at 10% annual return produces roughly **KSh 11.4M after 20 years**, of which only KSh 3.6M is contributions and the rest is growth. If instead you contribute KSh 180,000 once per year, the same total money produces roughly **KSh 10.2M**, because you lose the monthly compounding. This is a KSh 1.2M difference produced entirely by the frequency of contribution."
      },
      {
        "kind": "paragraph",
        "text": "The behavioural argument is even stronger than the mathematical one. Automatic contributions eliminate the four biggest behavioural failures in retail investing: forgetting to invest, waiting for the right moment, timing the market, and spending the money instead. None of these are solved by willpower. All four are solved by standing order."
      },
      {
        "kind": "example",
        "title": "Example",
        "text": "A learner sets up a KSh 8,000 weekly standing order into a money market fund on Monday. Over a year, that is KSh 416,000 invested at 52 different entry prices. Some weeks the price is high, some low. The average is the average of the year, which is better than trying to time an entry. The learner never makes a decision after setup, which is why it works."
      },
      {
        "kind": "takeaway",
        "text": "Set up a standing order or M-Pesa Paybill. Decide once, execute forever. Frequency compounds."
      }
    ]
  },
  {
    "id": "16.3",
    "level": 16,
    "title": "The annual review",
    "concept": "Review",
    "minutes": 5,
    "summary": "Two rebalancing dates a year. One full IPS review a year. Life changes trigger a rewrite. Nothing else.",
    "body": [
      {
        "kind": "paragraph",
        "text": "**Review** is different from monitoring. Monitoring is watching prices and news, which produces anxiety and bad decisions. Review is looking at your plan against its rules, on a calendar schedule, without reference to what the market has done in the last week. An investor who reviews twice a year will almost always outperform one who monitors daily, because the reviewer is not making emotional decisions in between."
      },
      {
        "kind": "paragraph",
        "text": "The standard schedule is **two rebalancing dates per year**, typically 1 January and 1 July. On each date, you compare your actual allocation to your target allocation and move money to bring them back into line. If equities have risen, sell some and buy bonds. If equities have fallen, sell some bonds and buy equities. This is mechanical. It is also counter-intuitive, because it forces you to buy the thing that just went down."
      },
      {
        "kind": "paragraph",
        "text": "Once per year, on top of the rebalancing dates, do a **full IPS review**. Check that your goals still match your life. Check that your horizon estimates are still accurate. Check that your tax situation has not changed (a new job, a new bracket). Check that nothing in your constraint list has shifted. This is not a market review. It is a life review."
      },
      {
        "kind": "paragraph",
        "text": "The only triggers for rewriting the IPS are **life events**: marriage, divorce, new child, major income change, approaching retirement, inheritance, major health diagnosis, buying a house, starting a business. Nothing that happens in the market is a rewrite trigger. If the NASI drops 30% or rises 50%, you rebalance on the next calendar date. You do not rewrite the plan."
      },
      {
        "kind": "paragraph",
        "text": "There is one more review worth doing annually: **the thesis review**. For every individual stock position, check whether the thesis still holds. Did the catalyst happen? Did the risks you named materialize? Is it time to exit, hold, or add? This is the one review that requires reading, not just looking at numbers. It is also the most valuable, because it catches the positions that should have been sold six months ago."
      },
      {
        "kind": "example",
        "title": "Example",
        "text": "A learner's calendar has three reminders. **1 January**: rebalance to target allocation. **30 June**: rebalance again. **31 December**: full IPS review plus thesis check on each position. Total time per year: about six hours. The learner has not opened a brokerage app between those dates. Over ten years, this habit produces a portfolio that reflects their actual life, not their emotional reactions to news."
      },
      {
        "kind": "takeaway",
        "text": "Two rebalancing dates. One full IPS review. Thesis checks annually. Nothing else."
      }
    ]
  },
  {
    "id": "16.4",
    "level": 16,
    "title": "When to get help",
    "concept": "Advice",
    "minutes": 6,
    "summary": "A licensed adviser does risk profiling and documentation. An unlicensed one sells products. Know the difference.",
    "body": [
      {
        "kind": "paragraph",
        "text": "Kenyan investors have access to a growing pool of investment advice, but the quality varies enormously. **A CMA-licensed investment adviser** is legally required to do a risk profile, document your goals, and recommend only products that fit your profile. They cannot sell you a fund that does not match your stated tolerance. They must disclose fees. They are subject to inspection and complaint procedures."
      },
      {
        "kind": "paragraph",
        "text": "**An unlicensed adviser** operates outside all of this. They may be a friend, a WhatsApp group admin, a marketing representative, or someone calling themselves a wealth manager without a licence. They have no risk-profiling obligation, no fee disclosure requirement, and no accountability if their advice loses your money. Many operate on commission from the products they sell, which creates a direct conflict of interest."
      },
      {
        "kind": "paragraph",
        "text": "The cost of advice in Kenya varies widely. A **fee-only adviser** charges a flat rate or a percentage of assets under advice, typically 0.5% to 1.5% per year, and takes no commission from product providers. A **commission-based adviser** is paid by the fund manager whose product they sell, which can be 1% to 3% upfront plus trail fees. Both models exist legally. Only the fee-only model is free of product bias."
      },
      {
        "kind": "paragraph",
        "text": "A good adviser does four specific things. First, they spend the first meeting asking questions, not pitching products. Second, they write down your goals, horizon, capacity, and tolerance. Third, they show you why a specific product matches that profile, in writing. Fourth, they disclose all fees, including any commission. If any of those four are missing, the meeting is a sales call, not advice."
      },
      {
        "kind": "paragraph",
        "text": "There is a specific threshold where advice becomes worth it. Below roughly **KSh 2M in investable assets**, most investors can do it themselves with the framework from Level 13. Between KSh 2M and KSh 20M, a fee-only adviser usually pays for itself through better tax handling, allocation discipline, and behavioural coaching. Above KSh 20M, specialist advice on estate planning, cross-border structuring, and succession becomes essential, because the mistakes are expensive."
      },
      {
        "kind": "example",
        "title": "Example",
        "text": "A learner with KSh 1.5M meets two advisers. **Adviser A** opens with a pitch for a specific unit trust paying 4% upfront commission to the adviser. **Adviser B** spends the first hour asking about goals, horizon, and constraints, quotes a 0.8% annual fee, and takes no commission. Adviser B is 10x more valuable, even though the fee looks higher, because the products recommended will actually match the plan."
      },
      {
        "kind": "takeaway",
        "text": "Fee-only advisers work for you. Commission advisers work for the product. Verify CMA licence before any engagement."
      }
    ]
  },
  {
    "id": "16.5",
    "level": 16,
    "title": "Avoiding scams",
    "concept": "Fraud",
    "minutes": 5,
    "summary": "The CMA publishes scam alerts. Verify licence at cma.or.ke. The ICF does not cover unlicensed entities.",
    "body": [
      {
        "kind": "paragraph",
        "text": "The **Capital Markets Authority maintains a public register of licensed entities** at cma.or.ke. Before you deposit money with any firm, checking that register takes about 30 seconds. If the entity is on the list, you have CMA oversight, ICF protection, and a complaints process. If it is not on the list, you have none of those. This is the single most important scam check available."
      },
      {
        "kind": "paragraph",
        "text": "The CMA issues regular scam alerts. In **July 2025**, it published a public warning about unlicensed online trading platforms. In **September 2026**, it flagged 15 more, including Global Investment Group, QVSE, Kore Exchange, Abacus Wealth, Bitblock Capital, CBEX, and Ultima Cryptocurrency. The regulator has also stated explicitly that **it never asks for payment through WhatsApp or SMS**, which is a signal you can use to spot impersonation."
      },
      {
        "kind": "paragraph",
        "text": "The Investor Compensation Fund is the reason the licence matters. The ICF protects investors up to **KSh 200,000 per investor** if a CMA-licensed broker fails or commits fraud. It does not protect you at all if the entity was never licensed. This is not a small distinction. Almost every major fraud in Kenya's investment history involved entities that were either unlicensed or operating outside their licence."
      },
      {
        "kind": "paragraph",
        "text": "The five red flags that appear in almost every scam are consistent. **Promises of specific high returns** (20% per month, guaranteed 15%). **Social proof** (screenshots of payments, testimonials from members). **Urgency** (offer closes Friday, only 3 slots left). **Complexity** (AI trading bots, blockchain arbitrage, forex signals). And the biggest: **not being on the CMA licensed list**. Any one of these is a warning. Two or more is a near-certainty."
      },
      {
        "kind": "paragraph",
        "text": "Pyramid structure is the mechanism behind most investment scams in Kenya. Early investors are paid from the deposits of later investors, which produces real testimonials for the first few months. When new deposits slow, the whole thing collapses. The people who lose are always the ones who entered in the last 30% of the run, which is also when the marketing is loudest. This is the same herding pattern as a stock bubble, applied to something that was never real."
      },
      {
        "kind": "example",
        "title": "Example",
        "text": "A learner is invited to a WhatsApp group promoting a forex bot offering 8% per month. Screenshots of payments are shared daily. A friend has been paid twice. The learner checks cma.or.ke and the entity is not listed. They decline. Six months later, the WhatsApp group is silent, the entity has disappeared, and the friend has lost their capital. The pattern is identical to the 2025 and 2026 CMA alerts."
      },
      {
        "kind": "takeaway",
        "text": "Check cma.or.ke before depositing. If unlicensed, the ICF does not cover you. Every time."
      }
    ]
  },
  {
    "id": "16.6",
    "level": 16,
    "title": "Building the habit",
    "concept": "Habit",
    "minutes": 5,
    "summary": "Consistency beats timing. Small monthly amounts compound. Over 75% of Kenyans are under 35, start early.",
    "body": [
      {
        "kind": "paragraph",
        "text": "The math of starting early is brutal and cannot be overstated. **Over 75% of Kenya's population is under 35**, which means most potential investors have a 30-year horizon available if they start now. The difference between starting at 25 and starting at 35 is not linear. It is exponential, because every year you delay is a year of compounding lost, and the lost years are the ones with the largest multiplicative effect."
      },
      {
        "kind": "paragraph",
        "text": "A concrete illustration. Investor A starts at 25, contributes KSh 5,000 per month, stops at 35 (10 years of contributions, KSh 600,000 total), and lets it grow to age 55 at 10%. Investor B starts at 35, contributes KSh 5,000 per month for 20 years (KSh 1.2M total), also at 10%, to age 55. Investor A ends with roughly **KSh 5.1M**. Investor B ends with roughly **KSh 3.8M**. Investor A contributed half as much and ended with 34% more, because the money had 20 extra years to compound."
      },
      {
        "kind": "paragraph",
        "text": "The corollary is that **the amount matters less than the consistency**. Someone contributing KSh 2,000 per month for 30 years will beat someone contributing KSh 20,000 per month for 3 years, almost always. This is why automation (Lesson 16.2) is the highest-leverage habit in the entire level. It converts intention into behaviour without requiring willpower, and it converts irregular amounts into a consistent stream."
      },
      {
        "kind": "paragraph",
        "text": "The CMA has invested heavily in youth investor education, including university forums, a Capital Markets National Trivia Competition, and county-level engagements. The regulator's own research identified youth as the highest-potential segment for market growth, which is why so much of the education work is directed there. The practical takeaway is that a young Kenyan investor today has more educational material, cheaper access, and lower minimums than any previous generation."
      },
      {
        "kind": "paragraph",
        "text": "The habits that produce long-term success are boring and few. **Contribute consistently**, weekly or monthly, via standing order. **Do not check prices daily**, it produces anxiety with no return. **Rebalance on schedule**, two dates per year. **Read one company or fund per month**, over a decade that is 120 businesses you understand. None of these require special skill. All of them require only that you keep doing them."
      },
      {
        "kind": "example",
        "title": "Example",
        "text": "A 24-year-old graduate earning KSh 60,000 per month sets up three habits in one weekend. **KSh 5,000 weekly** to a money market fund via M-Pesa Paybill. **A monthly reminder** to read one company annual report on the 1st. **A calendar entry** for 1 January and 1 July to rebalance. That is the entire system. Thirty years later, the compounding of KSh 5,000 per week alone, at 10%, is over KSh 45M. None of it came from a great decision."
      },
      {
        "kind": "takeaway",
        "text": "Start now, contribute consistently, do not check prices daily. The habit matters more than the amount."
      }
    ]
  },
  {
    "id": "16.7",
    "level": 16,
    "title": "Your investment policy statement",
    "concept": "IPS",
    "minutes": 6,
    "summary": "The IPS is the direction document, formalised. Six sections, one page, reviewed annually.",
    "body": [
      {
        "kind": "paragraph",
        "text": "The **Investment Policy Statement** is the formal version of the direction document from Level 13. Where the direction document is written for you, the IPS is written as if it will be handed to someone else if you are unable to make decisions. It is the document that any adviser, spouse, or executor would need to manage your money the way you would have wanted. This is why professionals insist on writing it."
      },
      {
        "kind": "paragraph",
        "text": "The IPS has six sections. **Objectives**: what the money is for, with amounts and dates. **Constraints**: liquidity, horizon, tax, legal, and values. **Risk**: capacity and tolerance, with the lower of the two stated as the binding limit. **Target allocation**: percentage bands for cash, bonds, equities, and alternatives, with allowed drift. **Rebalancing rule**: the specific dates and the threshold that triggers action. **Review**: the annual date, the thesis checklist, and the triggers that require a rewrite."
      },
      {
        "kind": "paragraph",
        "text": "The target allocation should be expressed as **bands, not point estimates**. Cash 5-10%. Bonds 20-30%. Equities 60-75%. This matters because a target of exactly 70% equities would require you to rebalance every time the market moved, which is expensive and pointless. A band of 65-75% means you rebalance only when you drift outside the range. The band is the discipline; the specific number inside it is not."
      },
      {
        "kind": "paragraph",
        "text": "The rebalancing rule should be **calendar-based, not threshold-based**, for most investors. The simple version is: check on 1 January and 1 July, and rebalance if you are outside the band. The more complex version includes a threshold trigger, e.g. rebalance any time a single position exceeds 10% of portfolio value. Threshold triggers are useful in volatile markets but produce more trades. Pick one method and stay with it."
      },
      {
        "kind": "paragraph",
        "text": "Write the IPS once, sign and date it, and store it with your will and other important documents. The signed version is what an executor would follow. If you have not signed it, it does not exist as a legal instruction. If you have signed it, anyone managing your money on your behalf has a clear framework and a clear set of restrictions."
      },
      {
        "kind": "example",
        "title": "Example",
        "text": "A learner's IPS fits on one page. **Objectives**: KSh 2.4M house deposit by Dec 2030; KSh 6M retirement at 55. **Constraints**: KSh 300,000 liquid at all times; CGT 15% on non-NSE property; no tobacco or gambling stocks. **Risk**: capacity 30%, tolerance 20%, binding limit 20%. **Allocation**: cash 5-10%, bonds 20-30%, equities 60-75%, no alternatives. **Rebalancing**: 1 Jan and 1 Jul. **Review**: 31 Dec each year, thesis check on all positions. Signed and dated, filed with the will."
      },
      {
        "kind": "takeaway",
        "text": "The IPS is the direction document, formalised and signed. Six sections, one page, reviewed annually."
      }
    ]
  },
  {
    "id": "17.1",
    "level": 17,
    "title": "Why go international",
    "concept": "Diversification",
    "minutes": 6,
    "summary": "Kenyan pension funds hold Sh104.99B offshore, up 25% year on year. Offshore assets outperformed domestic over 3 and 5 years.",
    "body": [
      {
        "kind": "paragraph",
        "text": "The case for international investing is not about a lack of patriotism. It is about **diversification**. The NSE represents roughly 60 listed companies, concentrated in banking, telecoms, and a handful of manufacturers. The Kenyan economy is a single economy, with a single currency, a single interest rate cycle, and a single political cycle. Holding 100% of your wealth inside that system means every shock to Kenya is a shock to your entire portfolio."
      },
      {
        "kind": "paragraph",
        "text": "The evidence from Kenyan institutions is unambiguous. **Kenyan pension funds' offshore holdings rose 25% in the year to June 2026 to reach Sh104.99 billion**. The largest allocations are to the **BlackRock ISF Developed World Index Fund (Sh14.95 billion)** and the **Franklin US Opportunities Fund (Sh9.66 billion)**. These are not speculative positions. They are the strategic allocations of the most conservative institutional investors in the country."
      },
      {
        "kind": "paragraph",
        "text": "The performance case is also documented. **Offshore investments returned 11.5% in Q2 2025**, up from 1.6% in Q2 2024. Over three years, offshore holdings returned **22.2% annualised**. Over five years, **13.9%**. Both figures were the top-performing asset class in the pension industry over those windows, ahead of domestic equities and bonds. The RBA has concluded that diversified strategies including offshore assets have a positive impact on fund value in the Kenyan context."
      },
      {
        "kind": "paragraph",
        "text": "The regulatory ceiling for pension funds is **15% of assets offshore**. Current allocation is **about 3.3%**, well below the limit. This means Kenyan institutions are still in the early stages of international allocation. Retail investors who follow the same logic are aligning with the direction that institutional money is already moving."
      },
      {
        "kind": "paragraph",
        "text": "For an individual Kenyan investor, the case has three parts. First, **currency diversification**: your wealth is no longer entirely exposed to the shilling. Second, **sector diversification**: global markets include technology, healthcare, energy, and consumer companies that barely exist on the NSE. Third, **rule-of-law diversification**: your assets sit in jurisdictions with different legal and political risk profiles than your home country."
      },
      {
        "kind": "example",
        "title": "Example",
        "text": "A learner with KSh 1M holds everything in NSE stocks. In 2022, the NASI fell roughly 20%, and the shilling weakened. Both losses hit at once. If the learner had held 70% in NSE stocks and 30% in a global equity ETF, the ETF portion would have appreciated in shilling terms as the shilling weakened, partially offsetting the NSE loss. The same amount of money, less concentrated risk."
      },
      {
        "kind": "takeaway",
        "text": "International investing is diversification, not speculation. Kenyan pension funds are already moving there."
      }
    ]
  },
  {
    "id": "17.2",
    "level": 17,
    "title": "Access routes",
    "concept": "Access",
    "minutes": 6,
    "summary": "PandaPanda, Hisa, Ndovu, AIB-AXYS/Scope Markets, Bitget tokenised stocks. All licensed. All accessible from Kenya.",
    "body": [
      {
        "kind": "paragraph",
        "text": "For a long time, the main barrier to international investing from Kenya was access. That barrier has largely fallen. There are now **multiple CMA-licensed or internationally-regulated platforms** that let a Kenyan resident open an account, fund it in shillings, and buy fractional shares of US-listed companies and ETFs. This lesson names the main ones as examples. It is not an endorsement. Every platform must be checked for current licence status before you deposit."
      },
      {
        "kind": "paragraph",
        "text": "**PandaPanda** was founded in 2024 and uses Alpaca's Broker API to offer over **2,000 US stocks and ETFs**, including companies like Nike, Apple, and Google. It offers **commission-free investing** and **fractional investing from as little as $1 USD** (roughly KSh 130). The platform is designed mobile-first for African users, with local funding options."
      },
      {
        "kind": "paragraph",
        "text": "**Hisa App** is a Kenyan platform that offers trading in both local and international markets, including stocks and ETFs. It is designed to give Kenyan retail investors direct access to global markets through a mobile app, with educational content integrated alongside trading."
      },
      {
        "kind": "paragraph",
        "text": "**Ndovu Wealth** is a CMA-licensed platform that integrates with mobile money and aims to unify access to pan-African and global stocks and ETFs. It positions itself as a one-stop shop for Kenyan retail investors who want both local and international exposure."
      },
      {
        "kind": "paragraph",
        "text": "**AIB-AXYS Africa**, one of Kenya's oldest stockbrokers, has partnered with **Scope Markets Kenya** to offer offshore products including ETFs to Kenyan clients. This is the institutional-grade route, typically with higher minimums but with the same broker relationship you would use for NSE trades."
      },
      {
        "kind": "paragraph",
        "text": "**Bitget**, a global crypto exchange, has partnered with Ondo Finance to offer **tokenised US stocks**. This route is newer and higher risk, because it involves both equity exposure and tokenisation risk. It is included here for completeness, not as a recommendation. Most Kenyan investors are better served by the equity-exposure-through-licensed-broker routes above."
      },
      {
        "kind": "example",
        "title": "Example",
        "text": "A learner with KSh 20,000 wants US equity exposure. Through PandaPanda, they can buy fractional shares of an S&P 500 ETF for as little as $1 USD per trade. Through AIB-AXYS/Scope Markets, the minimum is higher but the broker relationship is more established. Through Hisa, the app handles both NSE and US trades. All three are viable. The choice depends on which fee structure and interface the learner prefers."
      },
      {
        "kind": "takeaway",
        "text": "Access is no longer the barrier. Verify licence, check fees, and pick the route that fits your amount and interface preference."
      }
    ]
  },
  {
    "id": "17.3",
    "level": 17,
    "title": "Currency risk",
    "concept": "Currency",
    "minutes": 6,
    "summary": "USD/KES volatility is 1.6%, versus 10.5% for ZAR. Analyst projections range from 132 to 134. Currency cuts both ways.",
    "body": [
      {
        "kind": "paragraph",
        "text": "When you buy a US ETF from Kenya, you are making two decisions: which asset to buy, and which currency to hold. The asset decision is what you researched. The currency decision is often invisible, but it affects your return as much as the asset itself. If the shilling weakens against the dollar, your US holdings gain in shilling terms. If it strengthens, they lose. The currency exposure is real, whether you think about it or not."
      },
      {
        "kind": "paragraph",
        "text": "The shilling has been **relatively stable by regional standards**. One-year volatility was **1.6%**, compared with **10.5% for the South African rand**. This means the currency risk of holding USD assets from Kenya is lower than the currency risk of holding USD assets from South Africa, but it is not zero. Over multi-year horizons, small annual moves compound into large cumulative shifts."
      },
      {
        "kind": "paragraph",
        "text": "Analyst projections through 2026 point toward gradual shilling weakness. **Standard Chartered projected the shilling could weaken to 132 per dollar by year end**. **S&P Global Ratings projected depreciation from roughly 129 to 134** due to rising debt servicing needs. **Citigroup and Societe Generale** have flagged the shilling's frailty as oil prices put pressure on the import bill. These are projections, not forecasts. They have been wrong before and will be wrong again."
      },
      {
        "kind": "paragraph",
        "text": "The important insight is that **currency cuts both ways**. If the shilling strengthens (which happens when tourism, remittances, or tea exports are strong), a Kenyan holding US assets loses in shilling terms. The investor who assumes the shilling will always weaken is making a directional bet, not a diversification decision. The point of international investing is to reduce concentration, not to bet against the shilling."
      },
      {
        "kind": "paragraph",
        "text": "There are three practical stances. **Unhedged**: accept the currency exposure as part of the diversification benefit. Most retail investors should default to this. **Hedged**: use a currency-hedged ETF, which removes the currency effect but costs more in fees. **Partially hedged**: hold some unhedged, some hedged, and rebalance. This is what institutional investors do, and it is the most sophisticated stance."
      },
      {
        "kind": "example",
        "title": "Example",
        "text": "A learner invests KSh 500,000 into a US ETF when USD/KES is 129. Two years later, USD/KES is 145. The dollar value of the ETF has not changed, but the shilling value has grown to KSh 562,000. That is a KSh 62,000 currency gain, on top of whatever the ETF did. If USD/KES had fallen to 115 instead, the shilling value would have dropped to KSh 446,000. Both outcomes are possible. Only one feels like a win."
      },
      {
        "kind": "takeaway",
        "text": "Currency is a real exposure. Do not assume it will always move in your favour. Choose hedged or unhedged deliberately."
      }
    ]
  },
  {
    "id": "17.4",
    "level": 17,
    "title": "Tax on foreign income",
    "concept": "DTA",
    "minutes": 6,
    "summary": "Kenya has 14 double taxation agreements. Treaty WHT on dividends is typically 10%. The new Singapore DTA is 8% from 2027.",
    "body": [
      {
        "kind": "paragraph",
        "text": "When you earn dividends or interest from a foreign source, two countries may want to tax it: the country where the income is earned, and Kenya, where you are tax-resident. Without an agreement, you could be taxed twice. **Double Taxation Agreements (DTAs)** exist to prevent this. Kenya has **14 DTAs in force**, with France, Germany, India, Norway, South Africa, Sweden, the United Kingdom, Zambia, the UAE, Qatar, South Korea, Denmark, and Canada."
      },
      {
        "kind": "paragraph",
        "text": "The mechanism works through **withholding tax rates**. Under most treaties, Kenya-resident investors receiving dividends from treaty partners face a WHT of **10%**. The UAE is more generous at **5%**. Iran is also 5%. The US does not have a DTA with Kenya, so US-source dividends face the standard **30% US withholding**, which can be reduced only through a specific treaty that does not exist. This is one of the reasons US-listed ETFs are less tax-efficient than Irish-domiciled ETFs for Kenyan investors, because Ireland and Kenya do not have a DTA either, but Ireland's own tax treaties with the US reduce the US-side withholding to 15% at the fund level."
      },
      {
        "kind": "paragraph",
        "text": "A newer development is the **Kenya-Singapore DTA**, which sets withholding tax at **8% for dividends, 10% for interest, and 10% for royalties**. Kenya will apply the treaty from **1 January 2027**. This is the most favourable dividend rate Kenya has agreed to, and it may influence where Kenyan investors choose to hold funds."
      },
      {
        "kind": "paragraph",
        "text": "The **foreign tax credit** mechanism is what prevents double taxation. If you pay 10% WHT in a treaty country, and your Kenyan marginal rate is 30%, you pay the difference (20%) to KRA. If your Kenyan marginal rate is lower than the treaty WHT, you may be able to claim a refund. This requires filing the foreign income on your Kenyan tax return and claiming the credit under the specific DTA article."
      },
      {
        "kind": "paragraph",
        "text": "There is one more rule that catches Kenyan investors by surprise. **Foreign companies selling shares where the value of Kenyan property exceeds 20%** are subject to CGT in Kenya on the portion attributable to the Kenyan property. This means that if you own shares in a foreign holding company that primarily holds Kenyan real estate, the sale is subject to Kenyan CGT even though the company itself is foreign. This is aimed at preventing avoidance of Kenyan CGT through offshore structures."
      },
      {
        "kind": "example",
        "title": "Example",
        "text": "A learner holds an Irish-domiciled S&P 500 ETF. Dividends from US companies are taxed at 15% at the fund level (US-Ireland treaty), and the fund distributes to the Kenyan investor without further Irish WHT. The learner reports the dividend as foreign income in Kenya. Because there is no Kenya-Ireland DTA, the foreign tax credit may not apply to the 15% paid at the fund level. The effective tax drag is roughly 15% to 45% depending on structure. Compare to a US-listed ETF, where the WHT is 30% but partially creditable. This is why the choice of fund domicile matters more than most Kenyan investors realise."
      },
      {
        "kind": "takeaway",
        "text": "Treaty WHT is typically 10%. US-source dividends face 30% WHT. Fund domicile matters as much as the underlying assets."
      }
    ]
  },
  {
    "id": "17.5",
    "level": 17,
    "title": "Practical logistics",
    "concept": "Logistics",
    "minutes": 5,
    "summary": "Fund via M-Pesa or bank transfer. Fractional from $1. Source-of-funds documentation for larger amounts.",
    "body": [
      {
        "kind": "paragraph",
        "text": "The practical steps to open an international account from Kenya are now straightforward. You choose a platform (see 17.2), complete KYC with your national ID or passport, provide proof of address, and fund the account. Funding is usually through **M-Pesa, bank transfer, or debit card**, depending on the platform. Most CMA-licensed or partnered platforms accept M-Pesa directly, which is the fastest and cheapest route for small amounts."
      },
      {
        "kind": "paragraph",
        "text": "**Minimum amounts have fallen dramatically**. PandaPanda offers fractional investing from $1 USD. Hisa and Ndovu have minimums in the KSh 1,000 to KSh 5,000 range for initial deposits. AIB-AXYS/Scope Markets has higher minimums (typically $500 to $1,000) because it operates at a different service level. A learner with KSh 5,000 can now own a fraction of a global ETF, which was impossible even five years ago."
      },
      {
        "kind": "paragraph",
        "text": "**Source of funds documentation** becomes relevant for larger transfers. Kenyan banks and international platforms must comply with anti-money-laundering rules. For transfers above roughly **$15,000 USD**, expect to provide proof of source: payslips, sale contracts, business records, or tax returns. This is not a barrier, but it is a step that requires planning. Keep documentation ready before you initiate the transfer."
      },
      {
        "kind": "paragraph",
        "text": "**Currency conversion costs** are worth checking carefully. The spread on USD/KES varies significantly between banks, forex bureaus, and platforms. A 1% spread on a $10,000 transfer is $100, small in percentage terms but meaningful over time. Compare the total cost (spread + transfer fee + platform fee) across at least two routes before you commit to regular funding."
      },
      {
        "kind": "paragraph",
        "text": "**Withdrawals** follow the reverse path, but they can take longer. International brokers typically take 2 to 5 business days to process a withdrawal, and the funds then need to arrive in a Kenyan bank or M-Pesa account. Some platforms charge a withdrawal fee. It is worth testing a small withdrawal once before you need to withdraw a large amount, so you know the timing and the fee."
      },
      {
        "kind": "example",
        "title": "Example",
        "text": "A learner opens a PandaPanda account with KSh 5,000. They complete KYC online with their national ID, fund the account via M-Pesa, and buy fractional shares of an S&P 500 ETF. Total cost: M-Pesa transaction fee of roughly KSh 30, FX spread of roughly KSh 50, and no platform commission. Effective cost, about 1.6%. For larger transfers via bank wire, the cost drops below 0.5%. Match the funding route to the transfer size."
      },
      {
        "kind": "takeaway",
        "text": "Fractional investing from $1. Fund via M-Pesa for small amounts, bank transfer for large. Test a small withdrawal first."
      }
    ]
  },
  {
    "id": "17.6",
    "level": 17,
    "title": "Global ETFs explained",
    "concept": "ETFs",
    "minutes": 6,
    "summary": "Global ETFs hold hundreds of companies and charge 0.03% to 0.30% per year. Kenyan unit trusts charge 1.5% to 2.5%.",
    "body": [
      {
        "kind": "paragraph",
        "text": "A **global ETF** is an exchange-traded fund that tracks an index of companies across multiple countries. The most common are the S&P 500 (US large-cap), the MSCI World (developed markets), the FTSE All-World (developed plus emerging), and sector-specific ETFs for technology, healthcare, or energy. When you buy one share of an S&P 500 ETF, you own a proportional slice of 500 of the largest US companies in a single trade."
      },
      {
        "kind": "paragraph",
        "text": "**Expense ratios** are dramatically lower than Kenyan equivalents. The largest US ETFs charge **0.03% to 0.10%** per year. Broad developed-market ETFs charge **0.05% to 0.20%**. Sector ETFs and emerging-market ETFs charge **0.20% to 0.60%**. Compare this to Kenyan unit trusts, which typically charge **1.5% to 2.5%** per year. On a KSh 1M portfolio over 20 years, the difference between 0.10% and 2.0% is over KSh 1.5M in final wealth."
      },
      {
        "kind": "paragraph",
        "text": "**Dividend handling** is a key difference. Kenyan unit trusts often reinvest dividends automatically. Global ETFs typically distribute dividends as cash unless you choose an accumulating version. Accumulating ETFs reinvest automatically, which is better for long-term investors because it avoids a separate reinvestment decision. This is worth checking before you buy, because the tax treatment differs slightly depending on the structure."
      },
      {
        "kind": "paragraph",
        "text": "**Trading and settlement** work like stocks. You can buy and sell during market hours at whatever price the market offers. There is no end-of-day NAV, unlike a mutual fund. The bid-ask spread is typically a few cents per share on liquid ETFs, which is negligible on a round trip. This means global ETFs are more liquid and more transparent than most Kenyan unit trusts."
      },
      {
        "kind": "paragraph",
        "text": "**Domicile matters for tax**. Irish-domiciled ETFs are the most common choice for non-US investors because Ireland's tax treaties with the US reduce US-side dividend withholding to 15% at the fund level, and Ireland does not impose additional withholding on distributions to non-Irish investors. US-domiciled ETFs face 30% US WHT on dividends for Kenyan investors because there is no US-Kenya DTA. This is a material difference in long-term returns, often 0.3% to 0.5% per year."
      },
      {
        "kind": "example",
        "title": "Example",
        "text": "A learner has KSh 500,000 to invest globally. **Option A**: a Kenyan global equity feeder fund charging 1.8% per year. **Option B**: an Irish-domiciled S&P 500 ETF charging 0.07% per year. Both deliver similar exposure. Over 20 years at 9% gross return, Option A produces roughly KSh 2.4M net. Option B produces roughly KSh 2.8M net. The difference of KSh 400,000 is produced entirely by the fee difference."
      },
      {
        "kind": "takeaway",
        "text": "Global ETFs cost 10 to 30 times less than Kenyan unit trusts. Irish-domiciled is usually the tax-optimal choice."
      }
    ]
  },
  {
    "id": "17.7",
    "level": 17,
    "title": "Common pitfalls",
    "concept": "Pitfalls",
    "minutes": 5,
    "summary": "Over-concentration in US tech. Ignoring WHT. Currency timing. Estate and succession issues.",
    "body": [
      {
        "kind": "paragraph",
        "text": "**Over-concentration in US technology** is the most common mistake. Global equity indices are heavily weighted toward US tech giants, and a learner who buys an S&P 500 ETF is effectively making a 30% bet on a handful of companies. This is fine if deliberate. It is dangerous if unnoticed. Diversifying across regions and sectors, MSCI World plus emerging markets, or FTSE All-World, reduces the concentration without sacrificing the global exposure."
      },
      {
        "kind": "paragraph",
        "text": "**Ignoring withholding tax** is the second. The difference between a 15% US WHT (via Irish-domiciled fund) and a 30% US WHT (via US-domiciled fund) is 0.3% to 0.5% per year on returns. Over 20 years, that is 6% to 10% of your final wealth. Kenyan investors often choose US-listed ETFs because they are familiar, without realising the tax drag. Check the fund domicile before you buy."
      },
      {
        "kind": "paragraph",
        "text": "**Currency timing** is the third. Some Kenyan investors delay investing because they think the shilling will strengthen and they want a better exchange rate. This is a bet that almost never pays. Historically, the shilling has weakened more often than it has strengthened, and the years of waiting cost more in missed returns than the shilling gained. Invest on schedule, at whatever the current rate is. Do not time the currency."
      },
      {
        "kind": "paragraph",
        "text": "**Estate and succession** is the fourth, and the one most Kenyan investors only discover when it is too late. If you hold US-domiciled assets above **$60,000 USD**, US estate tax can apply at rates up to **40%** on the value of those assets at death, even for non-US persons. Holding the same assets through an Irish-domiciled ETF or a Kenyan wrapper structure avoids this entirely. This is a specialist area and worth a consultation once your international holdings pass **$50,000 USD**."
      },
      {
        "kind": "paragraph",
        "text": "**Reporting and record-keeping** is the fifth. Kenyan tax residents must declare foreign income on their annual return. Foreign assets above certain thresholds must be disclosed. Brokerage statements, dividend advices, and transfer confirmations should be kept for seven years, matching the CGT record-keeping rule. The failure to declare foreign income is a common audit trigger."
      },
      {
        "kind": "example",
        "title": "Example",
        "text": "A learner holds $80,000 in a US-domiciled S&P 500 ETF. At death, the US estate tax exposure on assets above $60,000 could be up to 40% of the excess, which is $8,000. The same $80,000 held in an Irish-domiciled version has no US estate tax exposure. The learner may not have known this when they bought the US-listed version. Ten minutes of research before purchase would have saved their heirs $8,000."
      },
      {
        "kind": "takeaway",
        "text": "Watch concentration, WHT, currency timing, estate tax, and reporting. All five are avoidable with planning."
      }
    ]
  },
  {
    "id": "17.8",
    "level": 17,
    "title": "Building a global portfolio",
    "concept": "Allocation",
    "minutes": 6,
    "summary": "Kenyan pension funds are at 3.3% offshore against a 15% cap. Retail can go higher. The mix depends on your goals.",
    "body": [
      {
        "kind": "paragraph",
        "text": "The allocation question is: **how much of your portfolio should be international?** There is no universal answer, but there are anchors. Kenyan pension funds are currently at **about 3.3% offshore**, well below the **15% regulatory cap**. This is a conservative starting point, appropriate for schemes with immediate payout obligations. A retail investor with a 20-year horizon and no near-term liabilities can reasonably hold more."
      },
      {
        "kind": "paragraph",
        "text": "The framework from Level 13 applies directly. Your international allocation should be determined by your goals and your currency needs. If your future spending is mostly in shillings (school fees, medical, house in Nairobi), then a large international allocation introduces currency risk that has to be managed. If your future spending is likely to include dollars or euros (education abroad, international travel, emigration), then international exposure is a natural match, not a risk."
      },
      {
        "kind": "paragraph",
        "text": "A common allocation for a Kenyan retail investor with a long horizon is **60% to 70% Kenyan assets and 30% to 40% international**. The Kenyan portion provides tax-free NSE equity exposure, local currency matching for local liabilities, and familiarity. The international portion provides sector diversification, currency diversification, and access to companies that do not exist on the NSE."
      },
      {
        "kind": "paragraph",
        "text": "Within the international portion, **the simplest structure is one broad global ETF**. A single MSCI World or FTSE All-World ETF gives exposure to 1,500 to 3,000 companies across developed and emerging markets at a fee of 0.05% to 0.20%. Adding complexity, sector bets, regional tilts, factor funds, rarely improves returns for retail investors and usually adds cost. Start simple, stay simple."
      },
      {
        "kind": "paragraph",
        "text": "**Rebalancing across borders** requires attention to currency. If you rebalance quarterly in shillings, you are effectively making a currency bet each time. Most advisers recommend rebalancing international holdings once or twice a year, on the same calendar schedule as domestic rebalancing, to avoid excessive currency trading. Let the currency drift between rebalances be part of the diversification, not a signal to trade."
      },
      {
        "kind": "example",
        "title": "Example",
        "text": "A learner with a 20-year horizon sets a target of 65% Kenyan equities, 10% Kenyan bonds, 25% international ETF. On 1 January each year, they rebalance to this target. In 2026, the Kenyan portion rose sharply, so they sell some and buy the international ETF. In 2027, the shilling weakened, so the international portion grew in shilling terms, and they sell some and buy Kenyan. The mechanical discipline is the whole system."
      },
      {
        "kind": "takeaway",
        "text": "30% to 40% international is reasonable for a long-horizon Kenyan retail investor. Keep the structure simple."
      }
    ]
  },
  {
    "id": "17.9",
    "level": 17,
    "title": "When you need specialist help",
    "concept": "Specialist",
    "minutes": 5,
    "summary": "Cross-border tax, estate planning, and residency changes need a specialist. Simple portfolios do not.",
    "body": [
      {
        "kind": "paragraph",
        "text": "International investing has a complexity threshold, and it is worth knowing where it is. **Below $50,000 USD in international holdings**, most Kenyan investors can handle everything themselves with the framework from this level. The tax situation is simple (report foreign income, claim treaty credits where applicable), the estate situation is unlikely to trigger US estate tax, and the rebalancing discipline is the same as domestic."
      },
      {
        "kind": "paragraph",
        "text": "**Between $50,000 and $200,000 USD**, three questions start to matter. First, **estate tax exposure**: US-domiciled assets above $60,000 can trigger US estate tax. Second, **succession planning**: who inherits the international holdings, and how does Kenyan succession law interact with the foreign jurisdiction. Third, **currency hedging**: is a fully unhedged position appropriate given the size and the spending plan. A specialist consultation at this stage is worth the fee."
      },
      {
        "kind": "paragraph",
        "text": "**Above $200,000 USD**, and especially above $500,000, the complexity grows faster than the returns. Cross-border tax planning, trust structures, residency considerations (if you might move to or from Kenya), and compliance with both KRA and the foreign jurisdiction's rules all need professional handling. This is the point where the cost of a mistake (double taxation, estate tax, invalid succession) exceeds the cost of the advice by a wide margin."
      },
      {
        "kind": "paragraph",
        "text": "**Residency changes** are the most common trigger. If you are a Kenyan resident planning to move to the UK, Canada, or the UAE, the tax treatment of your existing holdings changes on the day you become non-resident. Some countries tax worldwide income immediately; others have transition rules. Some have exit taxes on unrealised gains. This is a specialist area and the timing matters. Consult before you move, not after."
      },
      {
        "kind": "paragraph",
        "text": "**Who to consult**. For Kenyan tax questions, a CPA(K) with cross-border experience. For foreign tax questions, a tax adviser licensed in that jurisdiction. For estate and succession, a lawyer experienced in both Kenyan and the relevant foreign law. No single adviser covers all three, and the temptation to use a generalist can be expensive. Ask for specific cross-border experience before engaging."
      },
      {
        "kind": "example",
        "title": "Example",
        "text": "A learner has $30,000 USD in an Irish-domiciled global ETF. They handle everything themselves: report the dividends on their KRA return, keep records, rebalance annually. No specialist needed. Two years later, they have $120,000 and are considering a move to the UK. Now the questions are: when does UK tax residency start, what is the treatment of the existing holdings, and what is the succession plan. This is the point at which a specialist consultation is worth the fee."
      },
      {
        "kind": "takeaway",
        "text": "Under $50K, do it yourself. $50K to $200K, get a consultation. Above $200K, get a specialist. Residency changes always warrant advice."
      }
    ]
  },

  
  {
    id: "13.1",
    level: 13,
    title: "Why direction comes first",
    concept: "Investor direction",
    minutes: 4,
    summary: "Before you buy anything, decide who you are as an investor. What you own should follow from that, not the other way around.",
    body: [
      { kind: "paragraph", text: "Before you buy anything, decide who you are as an investor. What you own should follow from that, not the other way around. This lesson is part of the investor direction module, and takes roughly four minutes to complete." },
      { kind: "paragraph", text: "Work through the idea slowly. The goal is not to memorise the term but to see how it shows up in decisions you will actually make." },
      { kind: "takeaway", text: "Before you buy anything, decide who you are as an investor. What you own should follow from that, not the other way around." },
    ],
  },
  {
    id: "13.2",
    level: 13,
    title: "Risk tolerance vs risk capacity",
    concept: "Risk tolerance",
    minutes: 4,
    summary: "Tolerance is what you can stomach. Capacity is what you can afford to lose. They are not the same, and confusing them causes most bad decisions.",
    body: [
      { kind: "paragraph", text: "Tolerance is what you can stomach. Capacity is what you can afford to lose. They are not the same, and confusing them causes most bad decisions. This lesson is part of the risk tolerance module, and takes roughly four minutes to complete." },
      { kind: "paragraph", text: "Work through the idea slowly. The goal is not to memorise the term but to see how it shows up in decisions you will actually make." },
      { kind: "takeaway", text: "Tolerance is what you can stomach. Capacity is what you can afford to lose. They are not the same, and confusing them causes most bad decisions." },
    ],
  },
  {
    id: "13.3",
    level: 13,
    title: "Naming your horizon",
    concept: "Time horizon",
    minutes: 4,
    summary: "Are you investing for 3 years or 30? Every other decision follows from this one number.",
    body: [
      { kind: "paragraph", text: "Are you investing for 3 years or 30? Every other decision follows from this one number. This lesson is part of the time horizon module, and takes roughly four minutes to complete." },
      { kind: "paragraph", text: "Work through the idea slowly. The goal is not to memorise the term but to see how it shows up in decisions you will actually make." },
      { kind: "takeaway", text: "Are you investing for 3 years or 30? Every other decision follows from this one number." },
    ],
  },
  {
    id: "13.4",
    level: 13,
    title: "The one-page direction document",
    concept: "Direction document",
    minutes: 4,
    summary: "One page. Six sections. Goals, horizon, capacity, tolerance, constraints, values. Write it once, revisit annually.",
    body: [
      { kind: "paragraph", text: "One page. Six sections. Goals, horizon, capacity, tolerance, constraints, values. Write it once, revisit annually. This lesson is part of the direction document module, and takes roughly four minutes to complete." },
      { kind: "paragraph", text: "Work through the idea slowly. The goal is not to memorise the term but to see how it shows up in decisions you will actually make." },
      { kind: "takeaway", text: "One page. Six sections. Goals, horizon, capacity, tolerance, constraints, values. Write it once, revisit annually." },
    ],
  },
  {
    id: "13.5",
    level: 13,
    title: "Constraints are not obstacles",
    concept: "Constraints",
    minutes: 4,
    summary: "Rules you set on yourself are the cheapest form of risk management. Use them.",
    body: [
      { kind: "paragraph", text: "Rules you set on yourself are the cheapest form of risk management. Use them. This lesson is part of the constraints module, and takes roughly four minutes to complete." },
      { kind: "paragraph", text: "Work through the idea slowly. The goal is not to memorise the term but to see how it shows up in decisions you will actually make." },
      { kind: "takeaway", text: "Rules you set on yourself are the cheapest form of risk management. Use them." },
    ],
  },
  {
    id: "13.6",
    level: 13,
    title: "Values and what you refuse to own",
    concept: "Values",
    minutes: 4,
    summary: "There are businesses you will not fund regardless of return. Write them down so future-you does not forget.",
    body: [
      { kind: "paragraph", text: "There are businesses you will not fund regardless of return. Write them down so future-you does not forget. This lesson is part of the values module, and takes roughly four minutes to complete." },
      { kind: "paragraph", text: "Work through the idea slowly. The goal is not to memorise the term but to see how it shows up in decisions you will actually make." },
      { kind: "takeaway", text: "There are businesses you will not fund regardless of return. Write them down so future-you does not forget." },
    ],
  },
  {
    id: "13.7",
    level: 13,
    title: "Tolerance is learned, not declared",
    concept: "Learning tolerance",
    minutes: 4,
    summary: "Nobody knows their risk tolerance until they have lost real money. Start small, learn slowly.",
    body: [
      { kind: "paragraph", text: "Nobody knows their risk tolerance until they have lost real money. Start small, learn slowly. This lesson is part of the learning tolerance module, and takes roughly four minutes to complete." },
      { kind: "paragraph", text: "Work through the idea slowly. The goal is not to memorise the term but to see how it shows up in decisions you will actually make." },
      { kind: "takeaway", text: "Nobody knows their risk tolerance until they have lost real money. Start small, learn slowly." },
    ],
  },
  {
    id: "13.8",
    level: 13,
    title: "When direction changes",
    concept: "Revision",
    minutes: 4,
    summary: "Direction documents are living things. Life events change them. Rewrite when circumstances shift, not when markets do.",
    body: [
      { kind: "paragraph", text: "Direction documents are living things. Life events change them. Rewrite when circumstances shift, not when markets do. This lesson is part of the revision module, and takes roughly four minutes to complete." },
      { kind: "paragraph", text: "Work through the idea slowly. The goal is not to memorise the term but to see how it shows up in decisions you will actually make." },
      { kind: "takeaway", text: "Direction documents are living things. Life events change them. Rewrite when circumstances shift, not when markets do." },
    ],
  },
  {
    id: "13.9",
    level: 13,
    title: "Direction in practice",
    concept: "Direction in practice",
    minutes: 4,
    summary: "A portfolio without a direction is just a collection of decisions made at different times by different versions of you.",
    body: [
      { kind: "paragraph", text: "A portfolio without a direction is just a collection of decisions made at different times by different versions of you. This lesson is part of the direction in practice module, and takes roughly four minutes to complete." },
      { kind: "paragraph", text: "Work through the idea slowly. The goal is not to memorise the term but to see how it shows up in decisions you will actually make." },
      { kind: "takeaway", text: "A portfolio without a direction is just a collection of decisions made at different times by different versions of you." },
    ],
  },

  
  {
    id: "14.1",
    level: 14,
    title: "What a thesis is not",
    concept: "Thesis basics",
    minutes: 4,
    summary: "A thesis is not a hunch, a headline, or a chart pattern. It is a falsifiable claim about a business.",
    body: [
      { kind: "paragraph", text: "A thesis is not a hunch, a headline, or a chart pattern. It is a falsifiable claim about a business. This lesson is part of the thesis basics module, and takes roughly four minutes to complete." },
      { kind: "paragraph", text: "Work through the idea slowly. The goal is not to memorise the term but to see how it shows up in decisions you will actually make." },
      { kind: "takeaway", text: "A thesis is not a hunch, a headline, or a chart pattern. It is a falsifiable claim about a business." },
    ],
  },
  {
    id: "14.2",
    level: 14,
    title: "The three questions",
    concept: "Core questions",
    minutes: 4,
    summary: "What does the business do? Why will it keep doing it? What could stop it? Answer those three or you do not have a thesis.",
    body: [
      { kind: "paragraph", text: "What does the business do? Why will it keep doing it? What could stop it? Answer those three or you do not have a thesis. This lesson is part of the core questions module, and takes roughly four minutes to complete." },
      { kind: "paragraph", text: "Work through the idea slowly. The goal is not to memorise the term but to see how it shows up in decisions you will actually make." },
      { kind: "takeaway", text: "What does the business do? Why will it keep doing it? What could stop it? Answer those three or you do not have a thesis." },
    ],
  },
  {
    id: "14.3",
    level: 14,
    title: "Catalysts and timing",
    concept: "Catalysts",
    minutes: 4,
    summary: "A thesis without a catalyst is an opinion. Name what will change and roughly when.",
    body: [
      { kind: "paragraph", text: "A thesis without a catalyst is an opinion. Name what will change and roughly when. This lesson is part of the catalysts module, and takes roughly four minutes to complete." },
      { kind: "paragraph", text: "Work through the idea slowly. The goal is not to memorise the term but to see how it shows up in decisions you will actually make." },
      { kind: "takeaway", text: "A thesis without a catalyst is an opinion. Name what will change and roughly when." },
    ],
  },
  {
    id: "14.4",
    level: 14,
    title: "The falsifiable risk",
    concept: "Falsifiable risk",
    minutes: 4,
    summary: "State the specific thing that would prove you wrong. If nothing could, you are not investing, you are believing.",
    body: [
      { kind: "paragraph", text: "State the specific thing that would prove you wrong. If nothing could, you are not investing, you are believing. This lesson is part of the falsifiable risk module, and takes roughly four minutes to complete." },
      { kind: "paragraph", text: "Work through the idea slowly. The goal is not to memorise the term but to see how it shows up in decisions you will actually make." },
      { kind: "takeaway", text: "State the specific thing that would prove you wrong. If nothing could, you are not investing, you are believing." },
    ],
  },
  {
    id: "14.5",
    level: 14,
    title: "The one-page thesis",
    concept: "One-page thesis",
    minutes: 4,
    summary: "One page is enough. Seven sections. It becomes your contract with yourself.",
    body: [
      { kind: "paragraph", text: "One page is enough. Seven sections. It becomes your contract with yourself. This lesson is part of the one-page thesis module, and takes roughly four minutes to complete." },
      { kind: "paragraph", text: "Work through the idea slowly. The goal is not to memorise the term but to see how it shows up in decisions you will actually make." },
      { kind: "takeaway", text: "One page is enough. Seven sections. It becomes your contract with yourself." },
    ],
  },

  
  {
    id: "15.1",
    level: 15,
    title: "The mind is the market",
    concept: "Behavioural basics",
    minutes: 4,
    summary: "Your brain evolved to avoid loss and follow crowds. Both instincts are expensive in markets.",
    body: [
      { kind: "paragraph", text: "Your brain evolved to avoid loss and follow crowds. Both instincts are expensive in markets. This lesson is part of the behavioural basics module, and takes roughly four minutes to complete." },
      { kind: "paragraph", text: "Work through the idea slowly. The goal is not to memorise the term but to see how it shows up in decisions you will actually make." },
      { kind: "takeaway", text: "Your brain evolved to avoid loss and follow crowds. Both instincts are expensive in markets." },
    ],
  },
  {
    id: "15.2",
    level: 15,
    title: "Loss aversion",
    concept: "Loss aversion",
    minutes: 4,
    summary: "Losses hurt roughly twice as much as equivalent gains feel good. This is why investors sell winners and hold losers.",
    body: [
      { kind: "paragraph", text: "Losses hurt roughly twice as much as equivalent gains feel good. This is why investors sell winners and hold losers. This lesson is part of the loss aversion module, and takes roughly four minutes to complete." },
      { kind: "paragraph", text: "Work through the idea slowly. The goal is not to memorise the term but to see how it shows up in decisions you will actually make." },
      { kind: "takeaway", text: "Losses hurt roughly twice as much as equivalent gains feel good. This is why investors sell winners and hold losers." },
    ],
  },
  {
    id: "15.3",
    level: 15,
    title: "The disposition effect",
    concept: "Disposition effect",
    minutes: 4,
    summary: "You sell winners too early and hold losers too long because you want to feel right and avoid feeling wrong.",
    body: [
      { kind: "paragraph", text: "You sell winners too early and hold losers too long because you want to feel right and avoid feeling wrong. This lesson is part of the disposition effect module, and takes roughly four minutes to complete." },
      { kind: "paragraph", text: "Work through the idea slowly. The goal is not to memorise the term but to see how it shows up in decisions you will actually make." },
      { kind: "takeaway", text: "You sell winners too early and hold losers too long because you want to feel right and avoid feeling wrong." },
    ],
  },
  {
    id: "15.4",
    level: 15,
    title: "Anchoring on entry price",
    concept: "Anchoring",
    minutes: 4,
    summary: "The price you paid is irrelevant to whether the stock is a good buy today. Your brain disagrees. Overrule it.",
    body: [
      { kind: "paragraph", text: "The price you paid is irrelevant to whether the stock is a good buy today. Your brain disagrees. Overrule it. This lesson is part of the anchoring module, and takes roughly four minutes to complete." },
      { kind: "paragraph", text: "Work through the idea slowly. The goal is not to memorise the term but to see how it shows up in decisions you will actually make." },
      { kind: "takeaway", text: "The price you paid is irrelevant to whether the stock is a good buy today. Your brain disagrees. Overrule it." },
    ],
  },
  {
    id: "15.5",
    level: 15,
    title: "The action bias",
    concept: "Action bias",
    minutes: 4,
    summary: "Doing nothing feels lazy. In investing, it is often the correct choice.",
    body: [
      { kind: "paragraph", text: "Doing nothing feels lazy. In investing, it is often the correct choice. This lesson is part of the action bias module, and takes roughly four minutes to complete." },
      { kind: "paragraph", text: "Work through the idea slowly. The goal is not to memorise the term but to see how it shows up in decisions you will actually make." },
      { kind: "takeaway", text: "Doing nothing feels lazy. In investing, it is often the correct choice." },
    ],
  },

  
  {
    id: "16.1",
    level: 16,
    title: "Records and tax",
    concept: "Records",
    minutes: 4,
    summary: "Keep every trade record. Your future self, your accountant, and the tax authority will all want them.",
    body: [
      { kind: "paragraph", text: "Keep every trade record. Your future self, your accountant, and the tax authority will all want them. This lesson is part of the records module, and takes roughly four minutes to complete." },
      { kind: "paragraph", text: "Work through the idea slowly. The goal is not to memorise the term but to see how it shows up in decisions you will actually make." },
      { kind: "takeaway", text: "Keep every trade record. Your future self, your accountant, and the tax authority will all want them." },
    ],
  },
  {
    id: "16.2",
    level: 16,
    title: "Contributions beat timing",
    concept: "Contributions",
    minutes: 4,
    summary: "Regular, automatic contributions outperform almost every attempt to time the market.",
    body: [
      { kind: "paragraph", text: "Regular, automatic contributions outperform almost every attempt to time the market. This lesson is part of the contributions module, and takes roughly four minutes to complete." },
      { kind: "paragraph", text: "Work through the idea slowly. The goal is not to memorise the term but to see how it shows up in decisions you will actually make." },
      { kind: "takeaway", text: "Regular, automatic contributions outperform almost every attempt to time the market." },
    ],
  },
  {
    id: "16.3",
    level: 16,
    title: "The annual review",
    concept: "Annual review",
    minutes: 4,
    summary: "Once a year, review every position against its original thesis. Sell what no longer matches.",
    body: [
      { kind: "paragraph", text: "Once a year, review every position against its original thesis. Sell what no longer matches. This lesson is part of the annual review module, and takes roughly four minutes to complete." },
      { kind: "paragraph", text: "Work through the idea slowly. The goal is not to memorise the term but to see how it shows up in decisions you will actually make." },
      { kind: "takeaway", text: "Once a year, review every position against its original thesis. Sell what no longer matches." },
    ],
  },
  {
    id: "16.4",
    level: 16,
    title: "Rebalancing without trading",
    concept: "Rebalancing",
    minutes: 4,
    summary: "Two dates a year. Not when the market moves. Not when you feel like it.",
    body: [
      { kind: "paragraph", text: "Two dates a year. Not when the market moves. Not when you feel like it. This lesson is part of the rebalancing module, and takes roughly four minutes to complete." },
      { kind: "paragraph", text: "Work through the idea slowly. The goal is not to memorise the term but to see how it shows up in decisions you will actually make." },
      { kind: "takeaway", text: "Two dates a year. Not when the market moves. Not when you feel like it." },
    ],
  },
  {
    id: "16.5",
    level: 16,
    title: "When to get help",
    concept: "Getting help",
    minutes: 4,
    summary: "There is a point where a professional is cheaper than your own mistakes. Know where that point is for you.",
    body: [
      { kind: "paragraph", text: "There is a point where a professional is cheaper than your own mistakes. Know where that point is for you. This lesson is part of the getting help module, and takes roughly four minutes to complete." },
      { kind: "paragraph", text: "Work through the idea slowly. The goal is not to memorise the term but to see how it shows up in decisions you will actually make." },
      { kind: "takeaway", text: "There is a point where a professional is cheaper than your own mistakes. Know where that point is for you." },
    ],
  },
  {
    id: "16.6",
    level: 16,
    title: "Building the habit",
    concept: "Habits",
    minutes: 4,
    summary: "Consistency beats intensity. A boring process repeated for twenty years beats a brilliant one followed for two.",
    body: [
      { kind: "paragraph", text: "Consistency beats intensity. A boring process repeated for twenty years beats a brilliant one followed for two. This lesson is part of the habits module, and takes roughly four minutes to complete." },
      { kind: "paragraph", text: "Work through the idea slowly. The goal is not to memorise the term but to see how it shows up in decisions you will actually make." },
      { kind: "takeaway", text: "Consistency beats intensity. A boring process repeated for twenty years beats a brilliant one followed for two." },
    ],
  },
  {
    id: "16.7",
    level: 16,
    title: "Writing your annual letter",
    concept: "Annual letter",
    minutes: 4,
    summary: "Write a letter to yourself each year: what worked, what did not, what you will do differently. It is the cheapest feedback you will ever get.",
    body: [
      { kind: "paragraph", text: "Write a letter to yourself each year: what worked, what did not, what you will do differently. It is the cheapest feedback you will ever get. This lesson is part of the annual letter module, and takes roughly four minutes to complete." },
      { kind: "paragraph", text: "Work through the idea slowly. The goal is not to memorise the term but to see how it shows up in decisions you will actually make." },
      { kind: "takeaway", text: "Write a letter to yourself each year: what worked, what did not, what you will do differently. It is the cheapest feedback you will ever get." },
    ],
  },

  
  {
    id: "17.1",
    level: 17,
    title: "Why invest beyond Kenya",
    concept: "International investing",
    minutes: 4,
    summary: "The NSE is small. The world is large. Diversifying across currencies, sectors, and economies reduces risk without reducing return.",
    body: [
      { kind: "paragraph", text: "The NSE is small. The world is large. Diversifying across currencies, sectors, and economies reduces risk without reducing return. This lesson is part of the international investing module, and takes roughly four minutes to complete." },
      { kind: "paragraph", text: "Work through the idea slowly. The goal is not to memorise the term but to see how it shows up in decisions you will actually make." },
      { kind: "takeaway", text: "The NSE is small. The world is large. Diversifying across currencies, sectors, and economies reduces risk without reducing return." },
    ],
  },
  {
    id: "17.2",
    level: 17,
    title: "Access routes",
    concept: "Access routes",
    minutes: 4,
    summary: "PandaPanda, Hisa, Ndovu, AIB-AXYS/Scope. Each has different fees, minimums, and asset access. Pick for your situation.",
    body: [
      { kind: "paragraph", text: "PandaPanda, Hisa, Ndovu, AIB-AXYS/Scope. Each has different fees, minimums, and asset access. Pick for your situation. This lesson is part of the access routes module, and takes roughly four minutes to complete." },
      { kind: "paragraph", text: "Work through the idea slowly. The goal is not to memorise the term but to see how it shows up in decisions you will actually make." },
      { kind: "takeaway", text: "PandaPanda, Hisa, Ndovu, AIB-AXYS/Scope. Each has different fees, minimums, and asset access. Pick for your situation." },
    ],
  },
  {
    id: "17.3",
    level: 17,
    title: "Currency risk",
    concept: "Currency risk",
    minutes: 4,
    summary: "A 10% move in USD/KES moves your US holdings 10% in shilling terms, regardless of how the underlying did.",
    body: [
      { kind: "paragraph", text: "A 10% move in USD/KES moves your US holdings 10% in shilling terms, regardless of how the underlying did. This lesson is part of the currency risk module, and takes roughly four minutes to complete." },
      { kind: "paragraph", text: "Work through the idea slowly. The goal is not to memorise the term but to see how it shows up in decisions you will actually make." },
      { kind: "takeaway", text: "A 10% move in USD/KES moves your US holdings 10% in shilling terms, regardless of how the underlying did." },
    ],
  },
  {
    id: "17.4",
    level: 17,
    title: "Tax treaties",
    concept: "Tax",
    minutes: 4,
    summary: "Withholding taxes on US dividends are reduced for Kenyan residents under the treaty. The reduction is not automatic — you have to file for it.",
    body: [
      { kind: "paragraph", text: "Withholding taxes on US dividends are reduced for Kenyan residents under the treaty. The reduction is not automatic — you have to file for it. This lesson is part of the tax module, and takes roughly four minutes to complete." },
      { kind: "paragraph", text: "Work through the idea slowly. The goal is not to memorise the term but to see how it shows up in decisions you will actually make." },
      { kind: "takeaway", text: "Withholding taxes on US dividends are reduced for Kenyan residents under the treaty. The reduction is not automatic — you have to file for it." },
    ],
  },
  {
    id: "17.5",
    level: 17,
    title: "Practical logistics",
    concept: "Logistics",
    minutes: 4,
    summary: "How money actually moves: your KSh to a broker, to a foreign custodian, back again. Each step has a fee and a delay.",
    body: [
      { kind: "paragraph", text: "How money actually moves: your KSh to a broker, to a foreign custodian, back again. Each step has a fee and a delay. This lesson is part of the logistics module, and takes roughly four minutes to complete." },
      { kind: "paragraph", text: "Work through the idea slowly. The goal is not to memorise the term but to see how it shows up in decisions you will actually make." },
      { kind: "takeaway", text: "How money actually moves: your KSh to a broker, to a foreign custodian, back again. Each step has a fee and a delay." },
    ],
  },
  {
    id: "17.6",
    level: 17,
    title: "Picking a market",
    concept: "Market selection",
    minutes: 4,
    summary: "US, UK, EU, or emerging? Each has its own access rules, currency, and tax quirks.",
    body: [
      { kind: "paragraph", text: "US, UK, EU, or emerging? Each has its own access rules, currency, and tax quirks. This lesson is part of the market selection module, and takes roughly four minutes to complete." },
      { kind: "paragraph", text: "Work through the idea slowly. The goal is not to memorise the term but to see how it shows up in decisions you will actually make." },
      { kind: "takeaway", text: "US, UK, EU, or emerging? Each has its own access rules, currency, and tax quirks." },
    ],
  },
  {
    id: "17.7",
    level: 17,
    title: "ETFs as the default",
    concept: "ETFs",
    minutes: 4,
    summary: "A single global ETF gives you more diversification than 50 hand-picked NSE stocks. Fees matter more than selection at this scale.",
    body: [
      { kind: "paragraph", text: "A single global ETF gives you more diversification than 50 hand-picked NSE stocks. Fees matter more than selection at this scale. This lesson is part of the etfs module, and takes roughly four minutes to complete." },
      { kind: "paragraph", text: "Work through the idea slowly. The goal is not to memorise the term but to see how it shows up in decisions you will actually make." },
      { kind: "takeaway", text: "A single global ETF gives you more diversification than 50 hand-picked NSE stocks. Fees matter more than selection at this scale." },
    ],
  },
  {
    id: "17.8",
    level: 17,
    title: "When international is wrong",
    concept: "When to stay local",
    minutes: 4,
    summary: "If your horizon is short, your liabilities are in KSh, or your amounts are small, international exposure can cost more than it adds.",
    body: [
      { kind: "paragraph", text: "If your horizon is short, your liabilities are in KSh, or your amounts are small, international exposure can cost more than it adds. This lesson is part of the when to stay local module, and takes roughly four minutes to complete." },
      { kind: "paragraph", text: "Work through the idea slowly. The goal is not to memorise the term but to see how it shows up in decisions you will actually make." },
      { kind: "takeaway", text: "If your horizon is short, your liabilities are in KSh, or your amounts are small, international exposure can cost more than it adds." },
    ],
  },
  {
    id: "17.9",
    level: 17,
    title: "The long view",
    concept: "Long view",
    minutes: 4,
    summary: "Investing globally is a twenty-year decision. Act like it.",
    body: [
      { kind: "paragraph", text: "Investing globally is a twenty-year decision. Act like it. This lesson is part of the long view module, and takes roughly four minutes to complete." },
      { kind: "paragraph", text: "Work through the idea slowly. The goal is not to memorise the term but to see how it shows up in decisions you will actually make." },
      { kind: "takeaway", text: "Investing globally is a twenty-year decision. Act like it." },
    ],
  },
  {
    id: "13.10",
    level: 13,
    title: "Direction and regret",
    concept: "Regret",
    minutes: 4,
    summary: "The decisions you will regret most are the ones that broke your own rules. Direction prevents that.",
    body: [
      { kind: "paragraph", text: "The decisions you will regret most are the ones that broke your own rules. Direction prevents that." },
      { kind: "paragraph", text: "This is part of the regret thread, and takes about four minutes." },
      { kind: "takeaway", text: "The decisions you will regret most are the ones that broke your own rules. Direction prevents that." },
    ],
  },
  {
    id: "13.11",
    level: 13,
    title: "The five-year question",
    concept: "Long view",
    minutes: 4,
    summary: "If you cannot hold it five years, do not buy it today.",
    body: [
      { kind: "paragraph", text: "If you cannot hold it five years, do not buy it today." },
      { kind: "paragraph", text: "This is part of the long view thread, and takes about four minutes." },
      { kind: "takeaway", text: "If you cannot hold it five years, do not buy it today." },
    ],
  },
  {
    id: "14.6",
    level: 14,
    title: "When the thesis breaks",
    concept: "Thesis breaks",
    minutes: 4,
    summary: "A broken thesis is a sell signal regardless of price. Do not wait for the market to confirm what the business has already told you.",
    body: [
      { kind: "paragraph", text: "A broken thesis is a sell signal regardless of price. Do not wait for the market to confirm what the business has already told you." },
      { kind: "paragraph", text: "This is part of the thesis breaks thread, and takes about four minutes." },
      { kind: "takeaway", text: "A broken thesis is a sell signal regardless of price. Do not wait for the market to confirm what the business has already told you." },
    ],
  },
  {
    id: "15.6",
    level: 15,
    title: "Herd behaviour",
    concept: "Herding",
    minutes: 4,
    summary: "Buying because others are buying is the most expensive form of social proof.",
    body: [
      { kind: "paragraph", text: "Buying because others are buying is the most expensive form of social proof." },
      { kind: "paragraph", text: "This is part of the herding thread, and takes about four minutes." },
      { kind: "takeaway", text: "Buying because others are buying is the most expensive form of social proof." },
    ],
  },
  {
    id: "16.8",
    level: 16,
    title: "The cost of doing nothing",
    concept: "Inaction",
    minutes: 4,
    summary: "Staying invested through a bad quarter almost always beats selling and waiting for certainty.",
    body: [
      { kind: "paragraph", text: "Staying invested through a bad quarter almost always beats selling and waiting for certainty." },
      { kind: "paragraph", text: "This is part of the inaction thread, and takes about four minutes." },
      { kind: "takeaway", text: "Staying invested through a bad quarter almost always beats selling and waiting for certainty." },
    ],
  },
  {
    id: "16.9",
    level: 16,
    title: "The investor's notebook",
    concept: "Notebook",
    minutes: 4,
    summary: "The habit that separates serious investors is writing. Not reading. Writing.",
    body: [
      { kind: "paragraph", text: "The habit that separates serious investors is writing. Not reading. Writing." },
      { kind: "paragraph", text: "This is part of the notebook thread, and takes about four minutes." },
      { kind: "takeaway", text: "The habit that separates serious investors is writing. Not reading. Writing." },
    ],
  },
];
