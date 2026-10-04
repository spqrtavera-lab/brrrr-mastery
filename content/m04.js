BIBLE.register({
  id: "m04",
  part: 2,
  title: "Deal Math",
  icon: "🧮",
  summary: "ARV, MAO, the 75% test, DSCR, cash flow, NOI, cap rate, cash-on-cash, GRM, the quick rules and their limits, sensitivity testing, and a 60-second method — the numbers you must know cold before you make an offer.",
  minutes: 95,
  lessons: [
    {
      id: "m04-01",
      title: "ARV: The North Star",
      minutes: 7,
      blocks: [
        { h: "After-Repair Value", p: "ARV is what the property will sell for after all repairs are complete and it looks like the renovated houses around it. It is the single most important number in every deal, because your offer price, your rehab budget, and your refinance loan are all calculated from it. Get ARV wrong by ten percent and every other number in the deal is wrong by at least that much." },
        { h: "Pulling Comps", p: "A comparable sale, or comp, is a nearby house similar to yours that has already sold. Use sold prices only, never asking prices, because a listing is an opinion and a sale is a fact. Pull three to six comps within half a mile to one mile, sold within the last six months, with similar bedrooms, bathrooms, square footage, age, and style, and in renovated condition. In a dense neighborhood tighten the radius and the time window. In a rural area you may have to widen both, and your confidence should drop when you do." },
        { h: "Adjusting and Price per Square Foot", p: "No comp is identical, so you adjust. If a comp has a garage and your house does not, subtract the value of a garage from that comp's price. If a comp has one fewer bathroom, add. Then divide each adjusted sale price by its square footage to get price per square foot, average those, and multiply by your subject's square footage. Round down. Appraisers lean conservative and so should you. When one comp sits far from the others, ask why before you include it." },
        { formula: "ARV = Average adjusted $/sqft of sold comps × Subject sqft" },
        { example: "Three renovated comps sold at $142, $148, and $151 per square foot. Average $147. Subject is 1,050 square feet. ARV = $147 × 1,050 = $154,350. Round down and underwrite at $150,000." },
        { carry: "Three to six sold, renovated comps, within a mile, within six months, adjusted, then price per square foot. Round down." },
        { trap: "Using active listings or the one high sale on the block as your ARV. Appraisers use closed sales and the median, not the dream." }
      ]
    },
    {
      id: "m04-02",
      title: "MAO: Maximum Allowable Offer",
      minutes: 6,
      blocks: [
        { h: "The 70% Rule", p: "The maximum allowable offer, or MAO, is the most you can pay for a property and still have the deal work. The classic rule of thumb is seventy percent of ARV minus the cost of repairs. The thirty percent you hold back is not profit. It covers your purchase closing costs, the cost of the money while you hold the house, the refinance closing costs, and the margin that protects you when something goes wrong. The rule is a screen, not a final analysis, but it is a very good screen." },
        { h: "Why Some Markets Use 65%", p: "Closing costs are not the same everywhere. In states where transfer taxes, title insurance, and recording fees run high, you pay those costs twice, once when you buy and again when you refinance, and they eat into the thirty percent buffer. Investors in those states often tighten the rule to sixty-five percent to keep the same real margin. Ask a local title company for a closing cost estimate on a sample purchase and refinance. If the two together exceed about five percent of ARV, use sixty-five." },
        { formula: "MAO = (ARV × 0.70) − Rehab | High-cost states: MAO = (ARV × 0.65) − Rehab" },
        { example: "ARV $150,000, rehab $30,000. At 70%: $105,000 − $30,000 = $75,000. At 65%: $97,500 − $30,000 = $67,500. Anything above your MAO is a pass, no matter how nice the house is." },
        { carry: "MAO = (ARV × 0.70) − Rehab. Tighten to 65% where buying and refinancing together cost more than about 5% of ARV." },
        { trap: "Bending MAO because you like the house or the seller is nice. The seller's feelings do not pay the hard money interest." }
      ]
    },
    {
      id: "m04-03",
      title: "Rehab Budgeting",
      minutes: 5,
      blocks: [
        { h: "Never Guess", p: "The rehab number inside MAO has to be real. Walk the property with a contractor before you offer and build a scope of work, which is a written list of every repair with a price beside it. Organize it in four buckets: structural, such as roof, foundation, and framing; mechanical, such as heating and cooling, electrical, and plumbing; cosmetic, such as flooring, paint, kitchen, baths, and fixtures; and safety, such as smoke detectors, railings, and the water heater. Get at least two bids on the same scope." },
        { h: "Contingency", p: "Older houses always hide something, so every budget needs a contingency, meaning money set aside for surprises. Add ten percent for a house you have inspected thoroughly and fifteen percent for one with unknowns such as an old roof or an unopened wall. If you do not spend it, it becomes extra cushion at refinance. If you skip it, the surprise comes out of your margin." },
        { h: "Build Your Own Per-Square-Foot Ranges", p: "After a few bids you will notice your contractor's cosmetic rehabs cluster around one cost per square foot and the heavy ones around another. Write those ranges down and use them for quick screening before you bother the contractor. Your numbers will be local and current, which is better than any national guess." },
        { formula: "Rehab Budget = Contractor Bid + Contingency (10–15%)" },
        { example: "Bid $35,000. Add 15% contingency, $5,250. Budget $40,250. Use $40,250 inside your MAO, not $35,000." },
        { carry: "Scope every line item, get two bids, add 10 to 15 percent. The budget inside MAO includes the contingency." }
      ]
    },
    {
      id: "m04-04",
      title: "All-In, the 75% Test, and Cash Left In",
      minutes: 7,
      blocks: [
        { h: "All-In Cost", p: "All-in is everything you have spent to get the property rented: purchase price, rehab including contingency, closing costs on the purchase, and holding costs such as loan interest, insurance, utilities, and taxes while you fix and lease it. Beginners count purchase plus rehab and forget the rest, then wonder where fifteen thousand dollars went. Count it all." },
        { h: "The 75% Test", p: "Most lenders will refinance an investment property up to about seventy-five percent of its appraised value, though the exact cap is set by each lender. So the test is simple: divide your all-in by ARV. If that percentage is at or below seventy-five, the refinance can return every dollar. If it is above seventy-five, the difference stays in the deal. All-in percentage is the one number that tells you whether this is a true BRRRR or just a rental you bought with extra steps." },
        { h: "Cash Left in the Deal", p: "Cash left in is your all-in minus the refinance loan, plus the refinance closing costs. It is the amount of your money still inside the house after the refinance, and it is the denominator of your cash-on-cash return later. Zero or negative is the goal; negative means you walked away with more than you put in. A small positive number is fine if the cash flow is strong. A large positive number means you overpaid." },
        { formula: "All-In % = All-In ÷ ARV | Refinance Loan = ARV × 0.75 | Cash Left In = All-In − Refinance Loan + Refi Closing Costs" },
        { example: "Purchase $95,000, rehab $35,000, closing and holding $10,000. All-in $140,000 on a $200,000 ARV is 70%. Refinance at 75% is $150,000. Cash left in = $140,000 − $150,000 + $5,000 refi costs = −$5,000, meaning you got all your money back plus $5,000. If all-in had been $160,000, that is 80%, and $15,000 would stay in the deal." },
        { carry: "All-In ÷ ARV at or below 75% means your capital comes back. Cash left in = all-in minus the refinance loan plus refi costs." },
        { trap: "Forgetting holding and closing costs in all-in. Ten thousand dollars of forgotten costs on a $200,000 ARV moves you five full points toward failing the test." }
      ]
    },
    {
      id: "m04-05",
      title: "Rent and DSCR",
      minutes: 7,
      blocks: [
        { h: "Market Rent, Conservatively", p: "Before you buy, find out what renovated houses like yours actually rent for by calling two or three local property managers and studying current listings that have been up for a few weeks, which tells you what the market will not pay. Use a conservative number, not the best case. Rent drives DSCR, cash flow, and the refinance, so a hopeful rent estimate poisons every number downstream." },
        { h: "Debt Service Coverage Ratio", p: "DSCR is monthly rent divided by the full monthly payment, called PITIA: principal, interest, taxes, insurance, and association dues. A DSCR of 1.00 means rent exactly covers the payment. A DSCR of 1.25 means rent is twenty-five percent more than the payment. DSCR lenders qualify the loan on this ratio instead of on your personal income, which is why they matter for investors. Each lender sets its own minimum, often somewhere around 1.20 to 1.25, so get the number from your lender rather than assuming." },
        { h: "The Interest-Only Effect", p: "Some DSCR lenders offer an interest-only period, where for several years you pay only interest and no principal. Because the payment is lower, the DSCR on the same rent is higher, and a deal that misses the minimum on a fully amortizing payment can clear it on an interest-only payment. Whether a lender calculates DSCR on the interest-only payment or on the amortizing payment is lender-specific, so ask. And remember the trade: interest-only builds no equity through paydown and the payment rises when the period ends." },
        { formula: "DSCR = Monthly Rent ÷ PITIA | PITIA = Principal + Interest + Taxes + Insurance + Association" },
        { example: "Rent $1,500. A $150,000 loan at 7.5% for 30 years is about $1,049 a month; add $250 taxes and insurance for PITIA of $1,299. DSCR = 1,500 ÷ 1,299 = 1.15. Interest-only on the same loan is $937.50; PITIA $1,187.50; DSCR = 1,500 ÷ 1,187.50 = 1.26. The interest-only payment moves the deal from failing a 1.25 minimum to passing it." },
        { carry: "DSCR = Rent ÷ PITIA. Lenders commonly want about 1.20 to 1.25. Interest-only lowers the payment and raises the ratio, at the cost of no paydown." },
        { trap: "Using the seller's old tax bill. Taxes are often reassessed after a sale, and a higher bill raises PITIA and lowers DSCR. Estimate taxes on your purchase price, not theirs." }
      ]
    },
    {
      id: "m04-06",
      title: "The Core Four: Review and Practice",
      minutes: 5,
      blocks: [
        { h: "Four Formulas That Run Every Deal", p: "Everything so far reduces to four lines you should be able to say from memory. MAO tells you what to offer. All-in percentage tells you whether the refinance returns your money. DSCR tells you whether the lender will make the loan. The refinance loan tells you how much comes back. If you can run these four in your head on a listing, you can screen a deal in a minute and know whether it deserves another hour." },
        { formula: "MAO = (ARV × 0.70) − Rehab | All-In % = All-In ÷ ARV, target ≤ 75% | DSCR = Rent ÷ PITIA, target ≥ lender minimum | Refinance Loan = ARV × 0.75" },
        { example: "ARV $180,000, rehab $30,000. MAO = $126,000 − $30,000 = $96,000. You buy at $90,000 and all-in lands at $125,000, which is 69% of ARV. Refinance at 75% is $135,000, so about $10,000 comes back before refi costs. Rent $1,600 against PITIA $1,180 gives DSCR 1.36. All four pass." },
        { h: "Practice Exercise", p: "Find a distressed listing in a neighborhood you know. Pull three sold, renovated comps and compute ARV by price per square foot. Estimate rehab using your per-square-foot ranges. Compute MAO and compare it to the list price. Estimate rent from current listings and compute DSCR at a 75% refinance. Write down whether you would offer and why. Do this twice a week and the formulas become reflexes." },
        { carry: "MAO, All-In %, DSCR, Refinance Loan. Four lines, from memory, on every listing." }
      ]
    },
    {
      id: "m04-07",
      title: "Monthly Cash Flow With Real Reserves",
      minutes: 7,
      blocks: [
        { h: "Cash Flow Is Not Rent Minus Mortgage", p: "Cash flow is what you actually keep each month after every cost of owning the property, including the costs that do not show up every month. A roof fails once in twenty years, but it fails, and a tenant leaves once every few years, but they leave. If you do not set aside money every month for those events, your cash flow is a fiction that ends the first time something breaks." },
        { h: "The Reserve Lines", p: "Vacancy is the share of the year the unit sits empty between tenants; a planning assumption of five to eight percent of rent is common. Repairs are the small fixes, commonly budgeted around five percent of rent. Capital expenditures, or capex, are the big-ticket replacements such as roof, heating and cooling, and water heater, also commonly around five percent. Management is what a property manager charges, typically a percentage of rent that you should budget even if you self-manage, because your time is not free. Then taxes and insurance at the real post-sale numbers, and the loan payment." },
        { formula: "Cash Flow = Rent − Vacancy − Repairs − Capex − Management − Taxes − Insurance − Loan Payment" },
        { example: "Rent $1,700. Vacancy 7% $119, repairs 5% $85, capex 5% $85, management 10% $170, taxes $180, insurance $120, loan payment $798 on $120,000 at 7% for 30 years. Total $1,557. Cash flow $143 a month. Rent minus mortgage alone would have shown $902, which is why beginners buy deals that lose money." },
        { carry: "Reserve for vacancy, repairs, capex, and management every month, roughly a quarter of rent combined, before you call anything cash flow." },
        { trap: "Self-managing and leaving management out of the math. The day you hire a manager, or get too busy to manage, the deal has to still work." }
      ]
    },
    {
      id: "m04-11",
      title: "NOI and Cap Rate",
      minutes: 6,
      blocks: [
        { h: "Net Operating Income", p: "Net operating income, or NOI, is the property's annual income after all operating expenses and before any loan payment. It measures the property itself, independent of how you financed it, which is why lenders, appraisers, and buyers of larger properties speak in NOI. Operating expenses include vacancy, repairs, capex reserves, management, taxes, and insurance. They never include principal and interest." },
        { h: "Cap Rate", p: "The capitalization rate, or cap rate, is NOI divided by the property's value or price. It is the unlevered return, meaning the return you would earn if you paid all cash. A higher cap rate means more income per dollar of price, which usually also means a riskier area or an older building. Cap rates are most useful for comparing two income properties or checking whether a price is sane for the income. For single-family BRRRR they are a secondary check, but you need to speak the language." },
        { formula: "NOI = Annual Rent − Vacancy − Operating Expenses (no debt) | Cap Rate = NOI ÷ Value" },
        { example: "Rent $1,700 a month is $20,400 a year. Vacancy $1,428, repairs $1,020, capex $1,020, management $2,040, taxes $2,160, insurance $1,440 total $9,108. NOI = $11,292. On a $160,000 value, cap rate = 11,292 ÷ 160,000 = 7.1%. On your $115,000 all-in cost, the cap rate on cost is 9.8%, which is the number that shows the value you created." },
        { carry: "NOI = income minus operating expenses, before debt. Cap Rate = NOI ÷ Value. Cap rate on cost shows the equity you built." },
        { trap: "Comparing a cap rate you computed with full reserves to a seller's cap rate computed with none. Sellers' pro formas routinely omit vacancy, capex, and management. Rebuild NOI yourself." }
      ]
    },
    {
      id: "m04-08",
      title: "Cash-on-Cash and Total Return",
      minutes: 6,
      blocks: [
        { h: "Cash-on-Cash Return", p: "Cash-on-cash return is your annual cash flow divided by the cash you still have in the deal after the refinance. It answers the only question a passive investor really asks: what do I earn on the money I actually have at risk? In BRRRR the denominator is cash left in, not purchase price, so a modest cash flow on a small amount of trapped cash can produce a very high return. If you pulled every dollar out, cash left in is zero and the return is undefined, which investors call infinite. Say it carefully. It means your capital is free, not that the deal is risk free." },
        { h: "Total Return Has Four Parts", p: "Cash flow is only one of four ways a rental pays you. Loan paydown is the principal your tenant's rent retires every month. Appreciation is the rise in value over time, which you should never underwrite on but will likely receive. Tax benefits come mainly from depreciation, a deduction for the wearing out of the building that often shelters some or all of the cash flow from tax. Confirm your own tax picture with a CPA. A deal that looks thin on cash flow alone can be strong on total return, but cash flow is the part that keeps you in the game, so it comes first." },
        { formula: "Cash-on-Cash = Annual Cash Flow ÷ Cash Left In | Total Return = Cash Flow + Loan Paydown + Appreciation + Tax Benefits" },
        { example: "Cash flow $143 a month is $1,716 a year. If $7,500 is left in the deal, cash-on-cash = 1,716 ÷ 7,500 = 22.9%. If $0 is left in, the return is undefined and your capital is fully recycled into the next deal." },
        { carry: "Cash-on-Cash = Annual Cash Flow ÷ Cash Left In. Underwrite on cash flow; treat appreciation as a bonus." }
      ]
    },
    {
      id: "m04-12",
      title: "GRM, the 1% Rule, and the 50% Rule",
      minutes: 6,
      blocks: [
        { h: "Gross Rent Multiplier", p: "The gross rent multiplier, or GRM, is price divided by annual gross rent. It tells you how many years of gross rent it takes to pay the price. A lower GRM means more rent per dollar of price. It ignores expenses and financing entirely, so it is only useful as a fast first sort of many listings or to compare properties in the same neighborhood with similar expenses." },
        { h: "The 1% Rule", p: "The one percent rule says monthly rent should be at least one percent of the total price, meaning purchase plus rehab or, for a finished house, the value. A $160,000 house should rent for at least $1,600. It is a screen for whether a property can possibly cash flow with leverage at typical rates. It fails in high-tax or high-insurance areas where one percent still loses money, and it is nearly impossible in expensive markets, where investors use it to decide where not to buy rather than what to buy." },
        { h: "The 50% Rule", p: "The fifty percent rule says operating expenses, not counting the loan payment, run about half of gross rent over time once you include vacancy, repairs, capex, management, taxes, and insurance. So NOI is roughly half of rent, and if your loan payment is less than half of rent you probably cash flow. It is a sanity check, not a budget. Taxes and insurance vary enormously by location, and a cheap old house can run well above fifty percent while a newer one runs below." },
        { formula: "GRM = Price ÷ Annual Gross Rent | 1% Rule: Monthly Rent ≥ 1% × Total Price | 50% Rule: NOI ≈ 50% × Gross Rent" },
        { example: "Price $160,000, rent $1,700 a month, $20,400 a year. GRM = 160,000 ÷ 20,400 = 7.8. One percent of $160,000 is $1,600, and $1,700 passes. Fifty percent rule says NOI about $850 a month; the full build-up earlier gave $941. The quick rule was close, which is all it is for." },
        { carry: "GRM, the 1% rule, and the 50% rule are screens for the first thirty seconds. Never buy on them. Build the real numbers." },
        { trap: "Treating the 1% rule as proof of cash flow. In a high-tax, high-insurance area a 1% property can lose money every month. Run the full cash flow line by line." }
      ]
    },
    {
      id: "m04-13",
      title: "Sensitivity Testing",
      minutes: 6,
      blocks: [
        { h: "Every Input Is a Guess", p: "ARV, rehab, rent, rate, and appraisal are all estimates made before you own the house. Sensitivity testing means changing one estimate at a time in the bad direction and watching what happens to the result. A good deal bends. A bad deal breaks on the first push. Run the test before you offer, because after you close the only lever left is price, and you no longer control it." },
        { h: "The Four Shocks", p: "Shock the appraisal down ten percent and recompute the refinance loan and cash left in. Shock rent down ten percent and recompute DSCR and cash flow. Shock the rate up one full point and recompute the payment. Shock rehab up twenty percent and recompute all-in. A deal that stays positive under each single shock is sound. Then run two shocks together, such as rent down and rate up, to see how much cushion really exists." },
        { formula: "Shock 1: Appraisal −10% | Shock 2: Rent −10% | Shock 3: Rate +1 point | Shock 4: Rehab +20%" },
        { example: "Base deal: ARV $160,000, all-in $115,000, loan $120,000 at 7%, rent $1,700, cash flow $143. Rate to 8%: payment rises to about $881 and cash flow drops to about $61. Rent to $1,530: cash flow drops to about $19. Appraisal to $144,000: the loan is $108,000 and $7,000 stays in. Rehab to $36,000: all-in $121,000, $1,000 stays in. Rent down and rate up together: cash flow goes to about negative $64. Each single shock survives, but barely. The right response is to negotiate price down, not to hope." },
        { carry: "One shock at a time, then two together. If cash flow goes negative under one shock, the price is too high." }
      ]
    },
    {
      id: "m04-09",
      title: "Full Deal Walkthrough",
      minutes: 7,
      blocks: [
        { h: "The Deal", p: "ARV $145,000. Rehab $25,000 including contingency. Purchase $65,000. Market rent $1,450. Refinance available at 7.5% for 30 years. Taxes and insurance together $275 a month. Work every number before you read the answer, then compare." },
        { h: "Buy and Refinance Numbers", p: "MAO is $145,000 times seventy percent, which is $101,500, minus $25,000, which is $76,500. The $65,000 purchase is well under it. All-in is $90,000, which is sixty-two percent of ARV, so the 75% test passes with room. The maximum refinance is $145,000 times seventy-five percent, which is $108,750, so up to $18,750 could come back before refinance costs." },
        { formula: "MAO = (145,000 × 0.70) − 25,000 = $76,500 | All-In % = 90,000 ÷ 145,000 = 62% | Max Refi = 145,000 × 0.75 = $108,750" },
        { h: "Two Ways to Finish", p: "Option one, take the maximum loan. The payment on $108,750 is about $760. Reserves at twenty-seven percent of rent for vacancy, repairs, capex, and management are about $392. Cash flow is $1,450 minus $760 minus $275 minus $392, about $23 a month, with $18,750 cash back and a DSCR of 1.40. Option two, borrow only your all-in of $90,000. The payment drops to about $629, cash flow rises to about $155, DSCR is 1.60, and no cash comes back. Both are valid. The point is that you choose how much cash to pull based on the cash flow you want, and you do not have to max the loan." },
        { example: "Max loan: CF = 1,450 − 760 − 275 − 392 = $23, cash back $18,750. Loan at cost: CF = 1,450 − 629 − 275 − 392 = $154, cash back $0, every dollar of your capital recycled with a healthier rental." },
        { carry: "Run MAO, All-In %, Refi, DSCR, and full-reserve cash flow on every deal. Then size the loan to the cash flow you want, not the maximum the lender offers." }
      ]
    },
    {
      id: "m04-10",
      title: "Screening Listings Fast",
      minutes: 5,
      blocks: [
        { h: "Set the Filter", p: "Most listings are not deals and you should spend seconds on them, not hours. Filter the portals for your target neighborhoods and price band, three bedrooms or more, long days on market, and recent price reductions. Open each one and run a quick ARV from price per square foot and a quick rehab bucket from the photos using your contractor's ranges. That gives you a rough MAO in under a minute." },
        { h: "The Decision Rule", p: "Compare the list price to your MAO. If the list price is at or below MAO, call today and make an offer. If it is above MAO by a small margin, say under ten percent, make your offer at MAO and explain the math; stale listings often take it. If it is far above MAO, more than fifteen or twenty percent, skip it unless the days on market are extreme. Spend your hours on the first two groups." },
        { formula: "Spread = (List Price − MAO) ÷ MAO | Spread ≤ 0: offer now | Spread under 10%: offer at MAO and show math | Spread over 15–20%: skip" },
        { example: "ARV $130,000, rehab $22,000, MAO $69,000. List at $89,000 is 29% over MAO: skip. List at $72,000 is 4% over: offer $69,000 with the math. List at $65,000 is under MAO: call now." },
        { carry: "Quick ARV, quick rehab, quick MAO, then compare to list. Chase small spreads, skip large ones." },
        { trap: "Spending an hour on a listing 30% over MAO because the photos are pretty. Pretty photos are why it is 30% over MAO." }
      ]
    },
    {
      id: "m04-14",
      title: "The 60-Second Analysis",
      minutes: 5,
      blocks: [
        { h: "One Page, Six Lines", p: "You will see far more deals than you can fully underwrite, so you need a one-page method you can run in a minute to decide which ones earn the full workup. Six lines, in order. First, ARV from price per square foot times the subject's square footage, rounded down. Second, rehab from your per-square-foot bucket: light, medium, or heavy. Third, MAO. Fourth, all-in versus seventy-five percent of ARV using the list price or your likely offer. Fifth, rent against the one percent rule and a quick DSCR using a rough payment. Sixth, the decision: pursue, offer low, or pass." },
        { formula: "1. ARV = $/sqft × sqft | 2. Rehab bucket | 3. MAO = 0.70 × ARV − Rehab | 4. All-In ÷ ARV ≤ 75%? | 5. Rent ≥ 1% and quick DSCR | 6. Pursue / Offer low / Pass" },
        { example: "1,100 square feet at $145 is $159,500, call it $160,000. Medium rehab, $30,000. MAO $82,000. List $79,000, so all-in about $115,000 with costs, which is 72%: pass the test. Rent $1,700 is 1.06%: pass. Rough payment $800 plus $300 taxes and insurance gives DSCR about 1.55: pass. Decision: pursue, walk it with the contractor this week." },
        { h: "What the Minute Is For", p: "The sixty-second analysis is not how you buy. It is how you decide what to spend the next three hours on. Any deal that passes gets the full treatment: real comps, a contractor walk, verified rent, full-reserve cash flow, and a sensitivity test. Any deal that fails gets a polite pass and you move on to the next one without regret." },
        { carry: "ARV, rehab, MAO, 75% test, rent and DSCR, decide. Sixty seconds to sort, three hours to underwrite only the ones that pass." }
      ]
    }
  ],
  cards: [
    { id: "m04-c01", type: "term", q: "What is ARV?", a: "After-repair value: what the property will sell for once repairs are complete and it matches renovated comps. Example: comps at $147 per square foot times 1,050 square feet is about $154,000." },
    { id: "m04-c02", type: "term", q: "What is a comp?", a: "A comparable sale: a nearby, similar house that has already sold. Use closed sales within a mile and six months, in renovated condition, never active listings." },
    { id: "m04-c03", type: "term", q: "What is MAO?", a: "Maximum allowable offer: the most you can pay and still have the deal work, commonly 70% of ARV minus rehab. Example: ARV $150,000, rehab $30,000, MAO $75,000." },
    { id: "m04-c04", type: "term", q: "What is all-in cost?", a: "Everything spent to get the property rented: purchase, rehab with contingency, purchase closing costs, and holding costs. Example: $95,000 + $35,000 + $10,000 = $140,000." },
    { id: "m04-c05", type: "term", q: "What is LTV?", a: "Loan-to-value: loan amount divided by appraised value. A 75% LTV on a $200,000 appraisal is a $150,000 loan." },
    { id: "m04-c06", type: "term", q: "What is LTC?", a: "Loan-to-cost: loan amount divided by your total project cost. Hard money lenders often quote LTC for the purchase and rehab loan, while refinance lenders quote LTV." },
    { id: "m04-c07", type: "term", q: "What is PITIA?", a: "Principal, interest, taxes, insurance, and association dues: the full monthly payment used in DSCR. Example: $798 loan payment plus $180 taxes plus $120 insurance is $1,098." },
    { id: "m04-c08", type: "term", q: "What is DSCR?", a: "Debt service coverage ratio: monthly rent divided by PITIA. 1.00 means rent exactly covers the payment; lenders commonly want about 1.20 to 1.25." },
    { id: "m04-c09", type: "term", q: "What is a DSCR loan?", a: "A loan qualified on the property's rent rather than the borrower's personal income. Investors use it for the refinance phase; each lender sets its own minimum ratio." },
    { id: "m04-c10", type: "term", q: "What is an interest-only period?", a: "Years during which you pay only interest and no principal, lowering the payment and raising DSCR, but building no equity through paydown. Example: $150,000 at 7.5% is $937.50 interest-only versus $1,049 amortizing." },
    { id: "m04-c11", type: "term", q: "What is NOI?", a: "Net operating income: annual rent minus vacancy and all operating expenses, before any loan payment. Example: $20,400 rent minus $9,108 expenses is $11,292." },
    { id: "m04-c12", type: "term", q: "What is cap rate?", a: "Capitalization rate: NOI divided by value, the return if you paid all cash. Example: $11,292 ÷ $160,000 is 7.1%." },
    { id: "m04-c13", type: "term", q: "What is cash-on-cash return?", a: "Annual cash flow divided by the cash you still have in the deal after refinance. Example: $1,716 a year on $7,500 left in is 22.9%." },
    { id: "m04-c14", type: "term", q: "What is GRM?", a: "Gross rent multiplier: price divided by annual gross rent, a quick sort that ignores expenses. Example: $160,000 ÷ $20,400 is 7.8." },
    { id: "m04-c15", type: "term", q: "What is capex?", a: "Capital expenditures: big-ticket replacements such as roof, heating and cooling, and water heater, reserved monthly. A common planning reserve is around 5% of rent." },
    { id: "m04-c16", type: "term", q: "What is a vacancy reserve?", a: "Money set aside each month for the time a unit sits empty between tenants. A common planning assumption is 5 to 8 percent of rent." },
    { id: "m04-c17", type: "term", q: "What is cash left in the deal?", a: "All-in minus the refinance loan plus refinance closing costs: your money still inside the house after the refi. Zero or negative is the goal." },
    { id: "m04-c18", type: "term", q: "What is equity?", a: "Value minus debt. In BRRRR the equity you create is ARV minus all-in. Example: $200,000 ARV minus $140,000 all-in is $60,000 created." },
    { id: "m04-c19", type: "term", q: "What is a scope of work?", a: "A written line-item list of every repair with a price, organized as structural, mechanical, cosmetic, and safety. Two contractors bid the same scope so you compare like to like." },
    { id: "m04-c20", type: "term", q: "What is sensitivity testing?", a: "Changing one estimate at a time in the bad direction, such as rent down 10% or rate up one point, and checking whether the deal still works." },
    { id: "m04-c21", type: "formula", q: "What is the ARV formula?", a: "ARV = Average adjusted $/sqft of sold comps × Subject sqft. Comps $142, $148, $151 average $147; × 1,050 sqft = $154,350." },
    { id: "m04-c22", type: "formula", q: "What is the price-per-square-foot formula?", a: "$/sqft = Sold Price ÷ Living Square Feet. $150,000 ÷ 1,250 sqft = $120 per square foot." },
    { id: "m04-c23", type: "formula", q: "What is the MAO formula?", a: "MAO = (ARV × 0.70) − Rehab. ARV $160,000, rehab $35,000: $112,000 − $35,000 = $77,000." },
    { id: "m04-c24", type: "formula", q: "What is the 65% MAO variant and when do you use it?", a: "MAO = (ARV × 0.65) − Rehab, used where buying and refinancing together cost more than about 5% of ARV. ARV $200,000, rehab $40,000: $130,000 − $40,000 = $90,000." },
    { id: "m04-c25", type: "formula", q: "What is the rehab budget formula?", a: "Rehab Budget = Bid + 10–15% contingency. $35,000 bid plus 15% is $40,250." },
    { id: "m04-c26", type: "formula", q: "What is the all-in percentage formula?", a: "All-In % = All-In ÷ ARV, target at or below 75%. $140,000 ÷ $200,000 = 70%." },
    { id: "m04-c27", type: "formula", q: "What is the refinance loan formula?", a: "Refinance Loan = ARV × LTV, commonly 0.75. $200,000 × 0.75 = $150,000." },
    { id: "m04-c28", type: "formula", q: "What is the cash-left-in formula?", a: "Cash Left In = All-In − Refinance Loan + Refi Closing Costs. $160,000 − $150,000 + $5,000 = $15,000 left in." },
    { id: "m04-c29", type: "formula", q: "What is the DSCR formula?", a: "DSCR = Monthly Rent ÷ PITIA. $1,400 ÷ $1,050 = 1.33." },
    { id: "m04-c30", type: "formula", q: "What is the maximum PITIA a lender will allow at a given DSCR?", a: "Max PITIA = Rent ÷ Required DSCR. Rent $1,800 at a 1.25 minimum: $1,800 ÷ 1.25 = $1,440." },
    { id: "m04-c31", type: "formula", q: "What is the interest-only payment formula?", a: "IO Payment = Loan × Annual Rate ÷ 12. $150,000 × 0.075 ÷ 12 = $937.50." },
    { id: "m04-c32", type: "formula", q: "What is the full cash flow formula?", a: "Cash Flow = Rent − Vacancy − Repairs − Capex − Management − Taxes − Insurance − Loan Payment. $1,700 − 119 − 85 − 85 − 170 − 180 − 120 − 798 = $143." },
    { id: "m04-c33", type: "formula", q: "What is the NOI formula?", a: "NOI = Annual Rent − Vacancy − Operating Expenses, excluding debt. $20,400 − $9,108 = $11,292." },
    { id: "m04-c34", type: "formula", q: "What is the cap rate formula?", a: "Cap Rate = NOI ÷ Value. $12,000 ÷ $160,000 = 7.5%." },
    { id: "m04-c35", type: "formula", q: "What is the cash-on-cash formula?", a: "Cash-on-Cash = Annual Cash Flow ÷ Cash Left In. $1,716 ÷ $7,500 = 22.9%. With $0 left in, the return is undefined, which investors call infinite." },
    { id: "m04-c36", type: "formula", q: "What is the GRM formula?", a: "GRM = Price ÷ Annual Gross Rent. $120,000 ÷ $20,400 = 5.9." },
    { id: "m04-c37", type: "formula", q: "What is the 1% rule?", a: "Monthly Rent ≥ 1% × Total Price. A $150,000 property needs about $1,500 rent to pass; $1,350 fails the screen." },
    { id: "m04-c38", type: "formula", q: "What is the 50% rule?", a: "NOI ≈ 50% × Gross Rent, with operating expenses eating the other half. Rent $1,700 implies NOI about $850 a month. A sanity check, not a budget." },
    { id: "m04-c39", type: "formula", q: "What is the listing spread formula?", a: "Spread = (List − MAO) ÷ MAO. List $72,000, MAO $69,000: 4% over, offer at MAO with the math." },
    { id: "m04-c40", type: "number", q: "How many comps, how far, and how recent for ARV?", a: "Three to six sold comps, within half a mile to one mile, sold within six months, similar size, beds, baths, age, and renovated condition." },
    { id: "m04-c41", type: "number", q: "What all-in percentage of ARV returns all your capital at a 75% refinance?", a: "75% or lower. At 70% you get everything back plus a cushion; at 80% you leave 5% of ARV in the deal." },
    { id: "m04-c42", type: "number", q: "What rehab contingency do you add?", a: "10% for a thoroughly inspected house, 15% for one with unknowns such as an old roof or unopened walls." },
    { id: "m04-c43", type: "number", q: "What combined reserve percentage of rent do vacancy, repairs, capex, and management typically total?", a: "Roughly a quarter of rent using common planning assumptions: about 5 to 8% vacancy, 5% repairs, 5% capex, and 8 to 10% management." },
    { id: "m04-c44", type: "number", q: "What DSCR do DSCR lenders commonly want?", a: "Often around 1.20 to 1.25, but every lender sets its own minimum and some calculate on the interest-only payment. Get the number from your lender." },
    { id: "m04-c45", type: "number", q: "What are the four sensitivity shocks?", a: "Appraisal down 10%, rent down 10%, rate up one point, rehab up 20%. Then run two together." },
    { id: "m04-c46", type: "number", q: "Roughly how much does one point of rate add to the payment on a $120,000 30-year loan?", a: "About $80 a month: 7% is about $798 and 8% is about $881." },
    { id: "m04-c47", type: "number", q: "At what listing spread over MAO do you skip a listing?", a: "More than about 15 to 20% over MAO, unless the days on market are extreme. Under 10% over, offer at MAO and show your math." },
    { id: "m04-c48", type: "scenario", q: "Three comps come in at $142, $148, and $151 per square foot, and a fourth at $190. What do you do?", a: "Find out why the $190 sale is different, such as a pool, a garage, or a larger lot, and exclude or adjust it. Average the three similar comps at $147 and round down." },
    { id: "m04-c49", type: "scenario", q: "ARV $150,000, all-in $108,000. Does a 75% refinance return your capital?", a: "Yes. 75% of $150,000 is $112,500, which pays off $108,000 and returns about $4,500 before refinance costs." },
    { id: "m04-c50", type: "scenario", q: "Your DSCR on an amortizing payment is 1.15 and the lender requires 1.25. What are your options?", a: "Ask whether the lender offers interest-only and calculates DSCR on that payment, take a smaller loan so PITIA fits the ratio, or pass. Do not inflate the rent estimate." },
    { id: "m04-c51", type: "scenario", q: "A seller's pro forma shows a 9% cap rate with no vacancy, capex, or management. What do you do?", a: "Rebuild NOI yourself with full reserves and real post-sale taxes and insurance. The honest cap rate will be lower, and that is the number you price on." },
    { id: "m04-c52", type: "scenario", q: "Rent $1,700 passes the 1% rule on a $160,000 house, but taxes are $350 a month and insurance $250. Is it a deal?", a: "Run the full cash flow. With reserves of about $459, taxes and insurance of $600, and a payment of $798, cash flow is about negative $157. The 1% rule passed and the deal fails." },
    { id: "m04-c53", type: "scenario", q: "A listing is at $89,000. Your ARV is $130,000 and rehab is $22,000. What is your move?", a: "MAO is $69,000, so the list is 29% over. Skip it unless it has been sitting for many months, in which case a written offer at $69,000 with the math costs you nothing." },
    { id: "m04-c54", type: "scenario", q: "The max refinance gives you $18,750 back but leaves $23 a month in cash flow. Borrowing only your cost leaves $0 back and $154 a month. Which do you take?", a: "Either is valid; choose based on your goal. If you need capital for the next deal, take the cash. If you want a sturdier rental, borrow at cost. Size the loan to the cash flow you want, not the maximum offered." },
    { id: "m04-c55", type: "scenario", q: "Rent down 10% alone leaves $19 of cash flow and rate up 1 point alone leaves $61, but both together go negative. What does that tell you?", a: "The cushion is too thin. Negotiate the purchase price down until the deal survives two shocks together, or pass." },
    { id: "m04-c56", type: "trap", q: "What is the trap of using active listings as comps?", a: "Asking prices are opinions; appraisers use closed sales. Your ARV comes in high, your MAO is too high, and the refinance falls short. Sold comps only." },
    { id: "m04-c57", type: "trap", q: "What is the trap of rent minus mortgage?", a: "It ignores vacancy, repairs, capex, management, taxes, and insurance. A deal showing $900 a month that way can be $140 or negative with real reserves." },
    { id: "m04-c58", type: "trap", q: "What is the trap of the seller's tax bill?", a: "Taxes are often reassessed after a sale, raising PITIA and lowering DSCR and cash flow. Estimate taxes on your purchase price and get a real insurance quote." },
    { id: "m04-c59", type: "trap", q: "What is the trap of forgetting holding and closing costs in all-in?", a: "Ten thousand dollars of forgotten costs on a $200,000 ARV moves all-in five full points, which can be the difference between passing and failing the 75% test." },
    { id: "m04-c60", type: "trap", q: "What is the trap of the 70% rule in a high-closing-cost state?", a: "Paying transfer taxes and title costs twice, at purchase and refinance, eats the buffer. Tighten MAO to 65% where buy plus refi costs exceed about 5% of ARV." },
    { id: "m04-c61", type: "trap", q: "What is the trap of underwriting on appreciation?", a: "Appreciation is not guaranteed and does not pay the mortgage this month. Underwrite on cash flow and treat appreciation as a bonus." },
    { id: "m04-c62", type: "trap", q: "What is the trap of maxing the refinance loan automatically?", a: "The biggest loan gives the most cash back and the least cash flow, sometimes almost none. Choose the loan size that leaves the cash flow you want." },
    { id: "m04-c63", type: "trap", q: "What is the trap of skipping the sensitivity test?", a: "Every input is an estimate. A deal that only works if everything goes right will not go right. Shock each input before you offer, while price is still a lever." }
  ],
  quiz: [
    { id: "m04-q01", q: "ARV $160,000, rehab $35,000. What is MAO at the 70% rule?", opts: ["$77,000", "$112,000", "$97,000", "$84,000"], correct: 0, explain: "MAO = ($160,000 × 0.70) − $35,000 = $112,000 − $35,000 = $77,000." },
    { id: "m04-q02", q: "ARV $150,000, all-in $108,000. Does a 75% LTV refinance return your capital?", opts: ["No, all-in exceeds 75% of ARV", "Yes, the $112,500 loan repays $108,000 with about $4,500 to spare", "Only if rent is above $1,500", "Only with an interest-only loan"], correct: 1, explain: "75% of $150,000 is $112,500. All-in of $108,000 is 72% of ARV, so the refinance returns everything plus about $4,500 before costs." },
    { id: "m04-q03", q: "Comps sold at $142, $148, and $151 per square foot. Subject is 1,050 square feet. What is ARV?", opts: ["$147,000", "$158,550", "$154,350", "$149,100"], correct: 2, explain: "Average ($142 + $148 + $151) ÷ 3 = $147 per square foot. $147 × 1,050 = $154,350. Round down to underwrite." },
    { id: "m04-q04", q: "Your DSCR is 1.10 and the lender requires 1.25. What does that mean?", opts: ["Rent is 10% above PITIA, so the loan is approved", "The property is unprofitable", "DSCR does not matter if ARV is strong", "Rent is only 10% above PITIA, so the loan as sized will likely be declined or reduced"], correct: 3, explain: "1.10 means rent is 10% above the full payment. Below the lender's 1.25 minimum, the loan is reduced until the ratio fits or it is declined." },
    { id: "m04-q05", q: "Rent $1,400, PITIA $1,050. What is the DSCR?", opts: ["0.75", "1.20", "1.33", "1.10"], correct: 2, explain: "DSCR = $1,400 ÷ $1,050 = 1.33, comfortably above a 1.25 minimum." },
    { id: "m04-q06", q: "Rent $1,400. Mortgage $850, taxes and insurance $200, management 8% ($112), vacancy 6% ($84). Monthly cash flow?", opts: ["$550", "$266", "$154", "$350"], correct: 2, explain: "$1,400 − 850 − 200 − 112 − 84 = $154. Thin but positive, and this still omits repair and capex reserves." },
    { id: "m04-q07", q: "A $150,000 sale on a 1,250 square foot house is what price per square foot?", opts: ["$150", "$120", "$125", "$112"], correct: 1, explain: "$150,000 ÷ 1,250 = $120 per square foot." },
    { id: "m04-q08", q: "You need $5,400 a month and average $300 a door. How many doors?", opts: ["12", "18", "27", "54"], correct: 1, explain: "Doors = $5,400 ÷ $300 = 18. At $150 a door it would be 36, which is why conservative cash flow estimates matter." },
    { id: "m04-q09", q: "A property lists at $89,000. ARV $130,000, rehab $22,000. What is MAO?", opts: ["$91,000", "$108,000", "$78,600", "$69,000"], correct: 3, explain: "MAO = ($130,000 × 0.70) − $22,000 = $91,000 − $22,000 = $69,000. The list price is 29% over MAO." },
    { id: "m04-q10", q: "In a high-closing-cost state you use 65%. ARV $200,000, rehab $40,000. MAO?", opts: ["$90,000", "$100,000", "$130,000", "$96,000"], correct: 0, explain: "MAO = ($200,000 × 0.65) − $40,000 = $130,000 − $40,000 = $90,000." },
    { id: "m04-q11", q: "Purchase $95,000, rehab $35,000, closing and holding $10,000, ARV $200,000. What is the all-in percentage?", opts: ["65%", "72.5%", "70%", "80%"], correct: 2, explain: "All-in $140,000 ÷ $200,000 = 70%, which passes the 75% test with room." },
    { id: "m04-q12", q: "All-in $160,000, ARV $200,000, refinance at 75%, no refi costs. How much cash is left in the deal?", opts: ["$0", "$10,000", "$40,000", "$15,000"], correct: 1, explain: "Refinance = $150,000. Cash left in = $160,000 − $150,000 = $10,000." },
    { id: "m04-q13", q: "Annual rent $20,400, vacancy $1,428, other operating expenses $7,680, annual loan payments $9,576. What is NOI?", opts: ["$1,716", "$18,972", "$12,720", "$11,292"], correct: 3, explain: "NOI = $20,400 − $1,428 − $7,680 = $11,292. Loan payments are never part of NOI." },
    { id: "m04-q14", q: "NOI $12,000 on a $160,000 value. Cap rate?", opts: ["13.3%", "7.5%", "6.0%", "9.4%"], correct: 1, explain: "Cap Rate = $12,000 ÷ $160,000 = 7.5%." },
    { id: "m04-q15", q: "Annual cash flow $2,316 with $7,500 left in the deal. Cash-on-cash return?", opts: ["30.9%", "3.2%", "23.2%", "12.5%"], correct: 0, explain: "Cash-on-Cash = $2,316 ÷ $7,500 = 30.9%. The denominator is cash left in after the refinance, not purchase price." },
    { id: "m04-q16", q: "Price $120,000, monthly rent $1,700. What is the GRM?", opts: ["7.1", "70.6", "5.9", "8.5"], correct: 2, explain: "Annual rent $20,400. GRM = $120,000 ÷ $20,400 = 5.9." },
    { id: "m04-q17", q: "A $150,000 property rents for $1,350. Does it pass the 1% rule?", opts: ["Yes, because rent is positive", "No, it needs about $1,500 to pass", "Yes, 1% of $150,000 is $1,350", "The 1% rule does not apply to rentals"], correct: 1, explain: "1% of $150,000 is $1,500. At $1,350 it fails the screen, which does not prove it fails, but it earns a harder look at the full cash flow." },
    { id: "m04-q18", q: "Using the 50% rule, what is the rough monthly NOI on $1,700 rent?", opts: ["$1,700", "$1,275", "$425", "$850"], correct: 3, explain: "The 50% rule estimates operating expenses at half of rent, leaving NOI of about $850. It is a sanity check, not a budget." },
    { id: "m04-q19", q: "A $150,000 loan at 7.5% interest-only, plus $250 taxes and insurance, against $1,500 rent. DSCR?", opts: ["1.15", "1.60", "1.26", "1.00"], correct: 2, explain: "Interest-only payment = $150,000 × 0.075 ÷ 12 = $937.50. PITIA $1,187.50. DSCR = $1,500 ÷ $1,187.50 = 1.26, versus 1.15 on the amortizing payment." },
    { id: "m04-q20", q: "ARV $200,000, all-in $150,000. The appraisal comes in 10% low. How much stays in the deal at a 75% refinance?", opts: ["$0", "$15,000", "$20,000", "$30,000"], correct: 1, explain: "Appraisal $180,000 × 0.75 = $135,000 loan. $150,000 − $135,000 = $15,000 left in. This is why you underwrite at 90% of your ARV." },
    { id: "m04-q21", q: "Which of these is NOT an operating expense in NOI?", opts: ["Property management", "Capex reserve", "Principal and interest", "Property taxes"], correct: 2, explain: "NOI is before debt service. Principal and interest belong in cash flow and DSCR, never in NOI or cap rate." },
    { id: "m04-q22", q: "Which lender rule most often turns a failing DSCR into a passing one?", opts: ["Calculating DSCR on an interest-only payment", "Using the seller's old tax bill", "Ignoring insurance", "Counting the security deposit as rent"], correct: 0, explain: "An interest-only payment is lower, so the same rent produces a higher ratio. Whether a lender calculates DSCR that way is lender-specific, so ask." }
  ],
  drills: [
    "Analyze three real listings today using the six-line 60-second method and write the decision for each.",
    "Say the MAO, All-In %, DSCR, and Refinance Loan formulas from memory, then write a worked example of each.",
    "Pick one listing and run all four sensitivity shocks, then rent down and rate up together. Does it still pass?",
    "Pull five sold comps for one house, adjust them, and compute a price-per-square-foot ARV rounded down.",
    "Build a full-reserve cash flow for one property with vacancy, repairs, capex, management, taxes, insurance, and payment.",
    "Compute NOI, cap rate on value, and cap rate on cost for the same property.",
    "Call a title company and ask for a closing-cost estimate on a sample purchase and refinance to decide whether you are a 70% or 65% market."
  ]
});
