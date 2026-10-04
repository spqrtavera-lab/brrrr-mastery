# BRRRR Bible — Content Module Format

Each module is ONE JavaScript file at `/home/claude/brrrr-mastery/content/<id>.js`.
It is loaded in a browser with a plain `<script>` tag. No imports, no exports, no Node APIs, no fetch.
The file must contain exactly one call:

```js
BIBLE.register({
  id: "m07",                 // fixed id given to you
  part: 3,                   // part number given to you
  title: "Other People's Money",
  icon: "🏦",                // one emoji
  summary: "One sentence: what this module teaches and why it matters.",
  minutes: 90,               // rough total reading time
  lessons: [ /* 6–10 lesson objects */ ],
  cards:   [ /* 45–70 card objects */ ],
  quiz:    [ /* 15–25 quiz objects */ ],
  drills:  [ /* 5–8 short strings: things to DO today */ ]
});
```

## Lesson object
```js
{
  id: "m07-01",              // module id + "-" + two digits
  title: "Hard Money: Speed You Pay For",
  minutes: 6,
  blocks: [
    { h: "Short heading", p: "One to three plain paragraphs. Written to a beginner. Spoken-friendly (this is read aloud by text-to-speech): no tables, no bullet characters, spell out numbers like 'seventy percent' is NOT required but avoid symbols-only lines." },
    { formula: "MAO = (ARV × 0.70) − Rehab" },           // optional, monospace box
    { example: "ARV $200,000, rehab $40,000 → MAO = $100,000." }, // optional, worked numbers
    { carry: "Hard money: 10–13% interest, 1–3 points, 6–12 month term, 85–90% of cost." }, // "the number to carry" — one line, memorize this
    { trap: "The thing that costs people money here, and how to avoid it." }, // optional
    { state: { fl: "Florida-specific rule in one or two sentences.", oh: "Ohio-specific rule." } }, // optional, only where the states actually differ
    { sources: [ { t: "IRS Publication 527", u: "https://www.irs.gov/publications/p527" } ] } // REQUIRED for any legal, tax, or statistic claim
  ]
}
```
Use 3–7 blocks per lesson. Every lesson needs at least one `carry` block.

## Card object
```js
{ id: "m07-c01", type: "term", q: "What is DSCR?", a: "Debt Service Coverage Ratio = monthly rent ÷ monthly PITIA. Lenders want 1.20–1.25. A 1.00 means rent exactly covers the payment." }
```
`type` is one of: `term`, `formula`, `scenario`, `number`, `trap`, `state`.
- `term`: definition + one-line example.
- `formula`: the formula plus a tiny worked example.
- `scenario`: "Seller says X / the deal shows Y. What do you do?" → the right move.
- `number`: a price, ratio, or deadline to know cold.
- `trap`: a mistake that costs money → how to avoid it.
- `state`: the question, with answer formatted exactly: "FL: ... | OH: ..."
Answers: 1–3 sentences. Questions: one sentence. Mix types; at least 5 `scenario` and 5 `trap` per module.

## Quiz object
```js
{ id: "m07-q01", q: "A DSCR lender requires 1.25. Rent is $1,800. What is the maximum PITIA?", opts: ["$1,440","$2,250","$1,800","$1,350"], correct: 0, explain: "PITIA max = rent ÷ 1.25 = $1,440." }
```
Exactly 4 options. Vary which index is correct. Explanations teach, one or two sentences.

## Hard rules
1. **Public and generic.** No real person's name except public figures in a historical/educational sense. No company names of the app's owner. Never mention police, a specific family, a specific city as "your" market. Scripts use `[Your Name]` and `[Your Company]`.
2. **No invented quotes.** Paraphrase ideas and attribute as ideas ("Kiyosaki's core idea is..."). Do not put quotation marks around words you cannot verify.
3. **No invented statistics.** If you cite a number (a rate, a percentage, a deadline, a statute), it must come from a source you actually found with web search, and the lesson must include a `sources` block with the URL. If you can't verify, say "typical range" and mark it approximate, or leave it out.
4. **Tax and law:** cite the statute section or IRS publication. End tax lessons with a line telling the reader to confirm with a CPA, and legal lessons with "confirm with a local real estate attorney." Note any changes in 2025–2026 explicitly with the date.
5. **Market numbers** (rents, rates, prices) carry a date: "as of late 2026, typical...".
6. **Florida and Ohio** callouts only where the rule actually differs. Never say "most states."
7. **Plain language**, second person ("you"), confident, direct, no hype, no "guru" tone. A beginner starting from zero with no money should be able to follow it. Define every term the first time it appears.
8. **Valid JavaScript.** Use double quotes for strings; escape inner double quotes as \" or use single quotes inside. No trailing commas problems, no comments with `*/` inside strings. Before finishing, run: `node --check /home/claude/brrrr-mastery/content/<id>.js` and fix any error. Also run `node -e "global.BIBLE={register:m=>{console.log(m.id,m.lessons.length,'lessons',m.cards.length,'cards',m.quiz.length,'quiz')}};require('/home/claude/brrrr-mastery/content/<id>.js')"` and confirm the counts print.
9. Ids must be unique and follow the pattern. Do not reuse ids across modules.
10. Target size per module: 6–10 lessons, 45–70 cards, 15–25 quiz, 5–8 drills. Depth over filler: every card should be worth memorizing.
