# Hopnest Retreats — Website Coding Instructions

## Project overview

A clean, direct booking website for Hopnest Retreats, a family-run organic glamping business near Martley, Worcestershire. Built as self-contained HTML/CSS/JS files, one per page, deployed on Netlify (free tier). No frameworks. No build tools. Inline styles and scripts only.

The goal: simple, trustworthy, easy to read. A guest should be able to understand what they're booking and complete a booking within 60 seconds of landing.

---

## Technical rules (non-negotiable)

- Every page is a **single self-contained HTML file** with all CSS and JS inline — no external stylesheets, no external scripts except Google Fonts and the Bookalet widget embed
- **No `<html>`, `<head>`, `<body>` wrapper tags** — these are pasted into Squarespace code blocks (existing platform)
- Actually, correction: these ARE standalone Netlify files, so full HTML documents are correct — include `<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`
- Header and footer are **copy-pasted into every page file** — no server-side includes, no JS imports. Same markup, same styles, every page
- All CSS namespaced under `.hn` to avoid conflicts
- Open Sans font throughout — import from Google Fonts — matches the brand simplicity
- Mobile first. Every page must be fully usable on a phone
- No infinite scroll bugs — no `min-height: 100vh` on body, no `overflow-x: hidden` on body
- Bookalet widget loaded via their standard `<script>` embed — account ID `9a2748bd-8e0e-4fbd-91bf-d221725d3197`

---

## Design system

### Aesthetic direction
Warm, natural, confident simplicity. Think Walkers Wood (walkerswood.co.uk) — clean white space, one strong accent colour, clear hierarchy, no clutter. Not rustic-cutesy. Not luxury-hotel. Just honest and calm.

Benchmark: tedstonelogcabins.co.uk — premium restraint, confident simplicity.

### Colours (CSS variables)
```css
--bark: #3E3028;        /* primary text, nav, footer */
--sage: #6B7C5C;        /* accent, buttons, links */
--amber: #C4882A;       /* highlight, prices, CTAs */
--river: #4A6B7A;       /* secondary accent */
--parchment: #F7F3EE;   /* page background */
--linen: #EDE8E0;       /* card backgrounds, section breaks */
--mist: #D6CFC4;        /* borders, dividers */
--white: #FFFFFF;
```

### Typography
- Font: `Open Sans`, weights 300 (body), 400 (regular), 600 (headings/labels)
- Import: `https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&display=swap`
- H1: 2.4rem, weight 300, colour `--bark`, line-height 1.2
- H2: 1.8rem, weight 300, colour `--bark`
- H3: 1.1rem, weight 600, colour `--bark`, letter-spacing 0.04em, uppercase
- Body: 1rem, weight 300, colour `--bark`, line-height 1.7
- Small/label: 0.8rem, weight 400, colour `--sage`, letter-spacing 0.08em, uppercase

### Spacing
- Section padding: `5rem 0` desktop, `3rem 0` mobile
- Container max-width: `1100px`, margin auto, padding `0 1.5rem`
- Card padding: `2rem`
- Gap between cards: `1.5rem`

### Buttons
```css
/* Primary button */
.hn-btn {
  display: inline-block;
  background: var(--sage);
  color: white;
  padding: 0.9rem 2rem;
  font-family: Open Sans;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
}
.hn-btn:hover { background: var(--bark); }

/* Secondary/ghost button */
.hn-btn-ghost {
  background: transparent;
  color: var(--sage);
  border: 1.5px solid var(--sage);
}
.hn-btn-ghost:hover { background: var(--sage); color: white; }
```

### Cards
```css
.hn-card {
  background: white;
  border: 1px solid var(--mist);
  padding: 2rem;
}
/* No border-radius — clean edges throughout */
```

---

## Header (copy into every page)

Sticky header, white background, subtle bottom border.

```html
<header class="hn-header">
  <div class="hn-container hn-header-inner">
    <a href="/index.html" class="hn-logo">Hopnest Retreats</a>
    <nav class="hn-nav" id="hn-nav">
      <a href="/index.html">Home</a>
      <a href="/tipis.html">Tipi Retreat</a>
      <a href="/shepherd-huts.html">Shepherd Huts</a>
      <a href="/about.html">About</a>
      <a href="/faq.html">FAQ</a>
      <a href="/tipis.html#book" class="hn-btn hn-nav-btn">Book Now</a>
    </nav>
    <button class="hn-hamburger" id="hn-hamburger" aria-label="Open menu">&#9776;</button>
  </div>
</header>
```

Header CSS:
```css
.hn-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: white;
  border-bottom: 1px solid var(--mist);
}
.hn-header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}
.hn-logo {
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--bark);
  text-decoration: none;
}
.hn-nav {
  display: flex;
  align-items: center;
  gap: 2rem;
}
.hn-nav a {
  font-size: 0.82rem;
  font-weight: 400;
  letter-spacing: 0.04em;
  color: var(--bark);
  text-decoration: none;
  text-transform: uppercase;
}
.hn-nav a:hover { color: var(--sage); }
.hn-nav-btn { padding: 0.6rem 1.2rem; font-size: 0.78rem; }
.hn-hamburger {
  display: none;
  background: none;
  border: none;
  font-size: 1.4rem;
  color: var(--bark);
  cursor: pointer;
}
/* Mobile nav */
@media (max-width: 768px) {
  .hn-hamburger { display: block; }
  .hn-nav {
    display: none;
    position: absolute;
    top: 64px;
    left: 0;
    right: 0;
    background: white;
    flex-direction: column;
    padding: 1.5rem;
    gap: 1rem;
    border-bottom: 1px solid var(--mist);
  }
  .hn-nav.open { display: flex; }
}
```

Header JS (inline at bottom of every page):
```js
document.getElementById('hn-hamburger').addEventListener('click', function() {
  document.getElementById('hn-nav').classList.toggle('open');
});
```

---

## Footer (copy into every page)

```html
<footer class="hn-footer">
  <div class="hn-container hn-footer-inner">
    <div class="hn-footer-brand">
      <p class="hn-logo">Hopnest Retreats</p>
      <p>Riverside tipi glamping and shepherd huts on a family-run organic farm near Martley, Worcestershire.</p>
      <p>hello@hopnestretreats.co.uk<br>07583 340173</p>
    </div>
    <div class="hn-footer-links">
      <p class="hn-label">Stay</p>
      <a href="/tipis.html">Tipi Retreat</a>
      <a href="/shepherd-huts.html">Shepherd Huts</a>
    </div>
    <div class="hn-footer-links">
      <p class="hn-label">Info</p>
      <a href="/about.html">About the Farm</a>
      <a href="/faq.html">FAQ</a>
    </div>
    <div class="hn-footer-links">
      <p class="hn-label">Legal</p>
      <a href="/privacy.html">Privacy Policy</a>
      <a href="/cookies.html">Cookie Policy</a>
      <a href="/terms.html">Terms and Conditions</a>
    </div>
  </div>
  <div class="hn-footer-base">
    <div class="hn-container">
      <p>© 2026 Hopnest Retreats · Martley, Worcestershire, WR6</p>
    </div>
  </div>
</footer>
```

Footer CSS:
```css
.hn-footer {
  background: var(--bark);
  color: var(--mist);
  margin-top: 5rem;
}
.hn-footer-inner {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 3rem;
  padding: 4rem 1.5rem;
}
.hn-footer-brand p { font-size: 0.9rem; line-height: 1.7; margin-bottom: 0.75rem; }
.hn-footer-brand .hn-logo { color: white; margin-bottom: 1rem; }
.hn-footer-links { display: flex; flex-direction: column; gap: 0.5rem; }
.hn-footer-links .hn-label { color: white; margin-bottom: 0.5rem; }
.hn-footer-links a { color: var(--mist); text-decoration: none; font-size: 0.85rem; }
.hn-footer-links a:hover { color: white; }
.hn-footer-base {
  border-top: 1px solid rgba(255,255,255,0.1);
  padding: 1.25rem 1.5rem;
}
.hn-footer-base p { font-size: 0.8rem; color: var(--mist); }
@media (max-width: 768px) {
  .hn-footer-inner { grid-template-columns: 1fr 1fr; gap: 2rem; }
  .hn-footer-brand { grid-column: 1 / -1; }
}
@media (max-width: 480px) {
  .hn-footer-inner { grid-template-columns: 1fr; }
}
```

---

## Page 1: index.html (Homepage)

### Sections in order:
1. Hero
2. Three-line trust bar
3. The two offerings (Tipi Retreat card + Shepherd Huts card)
4. Guest reviews (3 reviews from Airbnb)
5. About the farm (short — 3 sentences max)
6. Getting here (distance table + embedded Google Map)
7. Contact strip

### Section 1: Hero
- Full-width, background: first uploaded photo as `background-image` on a `<div>` — use a dark overlay (`rgba(0,0,0,0.35)`)
- Photo path: `/images/hero.jpg` — **leave a clear comment `<!-- REPLACE: hero image path -->`**
- White text over image
- H1: `Exclusive riverside tipi glamping · Worcestershire`
- Subtext (one line, weight 300): `Five furnished tipis on the River Teme. Your group, no one else. 25 minutes from Worcester.`
- Two buttons side by side: `Book the Tipis` (primary, links to `/tipis.html#book`) and `Find out more` (ghost, links to `#offerings`)
- Min-height: `85vh` on desktop, `60vh` on mobile
- No `min-height: 100vh`

### Section 2: Trust bar
- Background `--linen`, padding `1.25rem 0`
- Three short statements in a row, centred, separated by `·`
- Text: `Organic farm since 1998` · `Exclusive site hire — no other guests` · `5.0 ★ on Airbnb`
- Font: label style (0.8rem, uppercase, letter-spacing)

### Section 3: Offerings
- Section id: `offerings`
- H2: `Two ways to stay`
- Two cards side by side (CSS grid, 2 columns, gap 1.5rem)
- On mobile: stack to 1 column

**Card 1 — Tipi Retreat**
- Small label above: `GROUP GLAMPING`
- H3: `The Tipi Retreat`
- Description (2–3 sentences): Five furnished bell tipis on the banks of the River Teme. King beds, covered communal area, fire pit, hot shower and two loos. The whole site is exclusively yours — no other guests.
- Pricing block:
  ```
  2026
  £500/night weekends · £450/night weekdays
  Up to 20 guests · No booking fees
  
  From 2027
  Weekends: £600/night for up to 10 guests + £30 per additional person per night
  Weekdays: £520/night for up to 10 guests + £30 per additional person per night
  Minimum 2 nights · Maximum 20 guests
  ```
- Button: `View and Book` → `/tipis.html`
- Second photo: `/images/tipis.jpg` — shown above or within card — **comment `<!-- REPLACE: tipi image path -->`**

**Card 2 — Shepherd Huts**
- Small label above: `COMING SOON · SUMMER 2026`
- H3: `Skylark & Nuthatch`
- Description (2–3 sentences): Two shepherd huts on a small hill above the Teme Valley, with far-reaching views and proper dark skies. King beds, en suite shower and toilet, full kitchen, electric heating, outdoor firepit and a stargazing net bed. Opening summer 2026.
- Pricing block:
  ```
  From summer 2026
  £150/night · Minimum 2 nights
  Launch offer: 20% off first 10 bookings
  ```
- Button: `Find out more` → `/shepherd-huts.html`
- Background colour `--linen` on this card (not white) to visually distinguish coming soon

### Section 4: Reviews
- Background: `--parchment`
- H2: `What guests say`
- Subtext: `5.0 on Airbnb · 28 reviews`
- Three review cards in a row (grid, 3 columns; stack to 1 on mobile)
- Each card: star rating (★★★★★), quote text, name and date

**Review 1:**
> "We absolutely loved our stay here. Particular highlights were the access to the river for swimming and the short walk to the local pub. Elizabeth was responsive to any questions. If you are after a private, peaceful camping spot this is ideal."
> — Lewis, May 2026

**Review 2:**
> "Highly recommend camping here. An absolutely stunning area in the Malvern Hills. Amenities are great, hot shower and clean toilets, lovely fire pit. Elizabeth was very responsive and helpful. The Talbot pub is a five minute walk with a lovely beer garden. 100% would come back."
> — Nicholas, August 2025

**Review 3:**
> "We all complimented on what a great location this was for camping. The toilets were clean and the shower was surprisingly nice and given a thumbs up from the other campers. The instructions to find the campsite were spot on and the pub had a great beer garden."
> — Garath, June 2025

### Section 5: About the farm (short)
- Background white
- H2: `Our farm`
- Two columns on desktop: left = text, right = stat block
- Text (max 4 sentences): We have been farming organically since 1998. One of only three certified organic hop growers in the UK, we also farm regeneratively with pedigree Hereford cattle, EasyCare sheep, cider orchards, damsons and wildflower meadow corridors. This land has been in our family for generations and we share it with guests who love and respect the countryside.
- Stat block (3 stats, stacked): `Organic since 1998` / `1 of 3 organic hop growers in the UK` / `5.0 ★ Airbnb Guest Favourite`
- Link: `Read more about the farm →` → `/about.html`

### Section 6: Getting here
- Background `--linen`
- H2: `Getting here`
- Two columns: left = distance table, right = embedded Google Map
- Map embed: `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2444.5!2d-2.3936257!3d52.2019499!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487082a0b1234567%3A0x0!2zNTLCsDEyJzA3LjAiTiAywrAyMycyOS4yIlc!5e0!3m2!1sen!2suk!4v1685000000000!5m2!1sen!2suk`
- Map as `<iframe>` width 100%, height 300px, border none
- Distance table:

| From | Approx. drive |
|---|---|
| Worcester city centre | 25 min |
| Birmingham | 50 min |
| Hereford | 40 min |
| Cheltenham | 45 min |
| The Malvern Hills | 30 min |

- Note below: `Exact address sent on booking. Very low cars not advised on the farm track.`

### Section 7: Contact strip
- Background `--sage`
- White text
- Centred
- H2: `Any questions?`
- One line: `Elizabeth is on hand and always responds quickly.`
- Two links side by side: `WhatsApp: 07583 340173` (links to `https://wa.me/447583340173`) and `Email: hello@hopnestretreats.co.uk` (links to `mailto:hello@hopnestretreats.co.uk`)
- Both as ghost buttons in white

---

## Page 2: tipis.html (Tipi Retreat)

### Sections in order:
1. Page hero (smaller than homepage — `50vh`)
2. The experience (what's included)
3. Pricing (clear, complete, no ambiguity)
4. Booking widget
5. Getting here (short version — link to homepage for full)
6. House rules

### Section 1: Hero
- Background image: `/images/tipis.jpg` with dark overlay
- H1: `The Tipi Retreat`
- Subtext: `Five furnished riverside tipis, exclusively yours. No other guests on site.`

### Section 2: The experience
- H2: `What's included`
- Two columns: Inside + Outside

**Inside each tipi:**
- King size bed
- Bedding provided
- Bedside tables
- Under bed storage
- Clothes rail
- Solar lighting

**Outside (shared communal area):**
- Covered stretch tent
- Fire pit (firewood available to buy on site)
- Gas hob and equipped kitchen
- Two loos
- Hot shower
- Free parking — drive straight onto the site

**Important to note:**
- Towels not provided — bring your own
- Solar electric only — capacity for phone charging and lighting, no mains power
- Children's blow up beds welcome inside tipis — not provided
- Dogs very welcome — keep on leads around livestock
- Up to 20 guests total with additional tents and bedding (not provided)

Display these as two clean lists with a section heading each. Use a simple icon or bullet. No excessive decoration.

### Section 3: Pricing
- Section id: `pricing`
- H2: `Pricing`
- Background `--linen`
- Two pricing cards side by side

**Card 1 — 2026 (current)**
- Label: `2026`
- Weekend nights (Fri/Sat): £500 per night
- Weekday nights (Sun–Thu): £450 per night
- Entire site exclusively yours
- Up to 20 guests total
- No booking fees when booking direct

**Card 2 — From 2027**
- Label: `FROM 2027`
- Weekend nights: £600 per night for up to 10 guests + £30 per additional person per night
- Weekday nights: £520 per night for up to 10 guests + £30 per additional person per night
- Minimum 2 night booking
- Maximum 20 guests total
- Note: `No booking fees when booking direct`

Below both cards, a single line: `Cancellation: 75% refund if cancelled more than 3 weeks prior. 50% refund 2–3 weeks prior. No refund within 2 weeks. No date transfers.`

### Section 4: Booking widget
- Section id: `book`
- H2: `Check availability and book`
- Subtext: `Book direct — no booking fees.`
- Bookalet embed for tipi property:

```html
<div id="bookalet-widget"></div>
<script>
  var bookaletAccountId = '9a2748bd-8e0e-4fbd-91bf-d221725d3197';
  var bookaletPropertyId = '58084';
</script>
<script src="https://www.bookalet.co.uk/js/widget.js"></script>
```

- If the widget needs a wrapper for width control, wrap in a `<div style="max-width:900px; margin:0 auto;">`

### Section 5: Getting here (short)
- One paragraph, link to full details on homepage
- Text: `Near Martley, Worcestershire — 25 minutes from Worcester, 50 minutes from Birmingham. Exact address and arrival instructions sent on booking. Very low cars not advised on the farm track.`

### Section 6: House rules
- Background `--parchment`
- H2: `Good to know`
- Short bullet list:
  - Check in from 4pm. Check out by 10am
  - Dogs welcome — keep on leads around livestock
  - Please keep to footpaths on the farm
  - No mains electricity — solar power only
  - Bring your own towels
  - Firewood available to buy on site
  - Any questions — message Elizabeth on 07583 340173

---

## Page 3: shepherd-huts.html (Shepherd Huts — Coming Soon)

**This page is coming soon. Do NOT include a live booking widget. Do NOT link this page from the Book Now button in the header.**

The header Book Now button links only to `/tipis.html#book`.

### Sections in order:
1. Hero with coming soon banner
2. About the huts
3. What's included
4. Pricing
5. Waitlist (simple email capture — just a mailto link or a simple HTML form that submits to `hello@hopnestretreats.co.uk`)

### Section 1: Hero
- Background `--linen` (no photo yet)
- Small label: `COMING SUMMER 2026`
- H1: `Skylark & Nuthatch`
- Subtext: `Two shepherd huts above the Teme Valley. Opening summer 2026.`

### Section 2: About the huts
- H2: `Private huts above the valley`
- Text (3–4 sentences): Skylark and Nuthatch sit on a small hill above the River Teme, with wide open views across the valley, beautiful sunsets and proper dark skies. Both huts face the same view. Neither gets morning sun — perfect for sleeping in. They sit within sight of each other but feel completely private. Below is the organic farm, the hop fields, the river.
- The huts are NOT in the hop fields — do not state or imply this
- Both huts are visible to each other — this is fine to mention

### Section 3: What's included
- Two columns: Skylark / Nuthatch
- Both huts have identical facilities:
  - King size bed
  - Bedding and towels provided
  - Full kitchen
  - Fridge
  - Mains electric
  - Electric heater
  - En suite shower and toilet
  - Outdoor fire pit and chairs
  - Stargazing net bed

- Note: Skylark has a sage green kitchen. Nuthatch has a light cream kitchen. Mention this as the only difference.

### Section 4: Pricing
- Label: `FROM SUMMER 2026`
- Weekend nights: £120 per night
- Weekday nights: £100 per night
- Minimum 2 night booking
- Note: `Prices are per hut per night. Both huts can be booked together for groups.`

### Section 5: Waitlist
- H2: `Be first to know`
- Text: `We'll be in touch as soon as bookings open. Drop us a message to join the waitlist.`
- Simple button: `Message Elizabeth` → `mailto:hello@hopnestretreats.co.uk?subject=Shepherd%20Hut%20Waitlist`
- Or WhatsApp button: `WhatsApp` → `https://wa.me/447583340173`

---

## Page 4: about.html (About the Farm)

### Sections in order:
1. Page header (no image — text only, background `--parchment`)
2. The farm story
3. The farming approach
4. Elizabeth (personal host section)
5. CTA to book

### Section 1: Page header
- H1: `About the farm`
- Subtext: `A working organic farm near Martley, Worcestershire. In our family for generations.`

### Section 2: The farm story
- H2: `This land has been our home for generations`
- 3–4 paragraphs drawing from the existing site copy:
  - Organic since 1998
  - One of only three certified organic hop growers in the UK
  - Pedigree Hereford cattle (family lineage since the 1800s)
  - EasyCare sheep, cider orchards, damsons, wildflower meadow corridors
  - Regenerative farming — building soil organic carbon
  - 34% more biodiversity than conventional farms

### Section 3: Why exclusive hire
- H2: `Why no other guests`
- Short paragraph: We only ever take one booking at a time. No strangers sharing the fire pit, no awkward hellos in the morning. When you're here, it's yours.

### Section 4: Elizabeth
- H2: `Your host, Elizabeth`
- Short paragraph in first person (Elizabeth's voice): I've lived on this farm my whole life. I want guests who love the countryside and want to be part of it, even just for a few days. I'm always nearby if you need anything, and always happy to leave you alone if you don't.
- Stats: 5.0 Airbnb rating · 28 reviews · 5 years hosting

### Section 5: CTA
- Background `--sage`
- White text, centred
- `Ready to visit?`
- Button: `Book the Tipi Retreat` → `/tipis.html#book`

---

## Page 5: faq.html (FAQ)

### Structure
- Page header: H1 `Frequently asked questions`, background `--parchment`
- Accordion style Q&A — each question is a `<button>` that toggles the answer open/closed
- Simple JS toggle: click question → answer div gets `display:block`, chevron rotates
- No frameworks — pure vanilla JS

### Questions and answers

**Booking and pricing**

Q: How do I book?
A: Check availability and book direct through the booking calendar on the Tipi Retreat page. No booking fees when you book direct. You can also WhatsApp or email Elizabeth if you have any questions before booking.

Q: What are the prices?
A: For 2026, the tipi retreat is £500 per night at weekends and £450 per night on weekdays. The whole site is exclusively yours — no per person charge, up to 20 guests total. From 2027, weekend nights are £600 for up to 10 guests plus £30 per additional person per night, and weekday nights are £520 for up to 10 guests plus £30 per additional person per night, minimum 2 nights. The shepherd huts (opening summer 2026) are £120 per night at weekends and £100 per night on weekdays, minimum 2 nights.

Q: What is the cancellation policy?
A: We offer a 75% refund if you cancel more than 3 weeks before arrival, a 50% refund if you cancel 2–3 weeks before arrival, and no refund within 2 weeks of arrival. Date transfers are not available.

Q: Is there a minimum stay?
A: For 2026 tipi bookings, check the calendar for minimum stays. From 2027, all bookings require a minimum of 2 nights. Shepherd hut bookings are a minimum of 2 nights.

Q: Are there booking fees?
A: No booking fees when you book direct through this website.

**The site**

Q: Will there be other guests on site?
A: No. When you book, you have exclusive use of the entire site. No other guests, no strangers — just your group and the farm.

Q: How many people can stay?
A: The five tipis sleep 10 people (one king bed each). You are welcome to bring additional tents and bedding to accommodate up to 20 guests in total. Additional sleeping equipment is not provided.

Q: Are dogs welcome?
A: Yes, dogs are very welcome. We ask that they are kept on leads when around livestock on the farm.

Q: Is there electricity?
A: Solar electric only — enough for phone charging and lighting. No mains power on the tipi site.

Q: Are towels provided?
A: Towels are not provided for the tipis. Please bring your own. Bedding is provided. The shepherd huts (opening 2026) will include towels.

Q: Can I have a fire?
A: Yes. There is a fire pit in the communal area. Firewood is available to buy on site, or you can bring your own.

Q: What are the check-in and check-out times?
A: Check in from 4pm. Check out by 10am.

**Getting here**

Q: Where is Hopnest Retreats?
A: Near Martley, Worcestershire. 25 minutes from Worcester, 50 minutes from Birmingham, 40 minutes from Hereford. Exact address and arrival instructions are sent on booking.

Q: Can I drive onto the site?
A: Yes, you can drive straight onto the site. Very low cars are not advised on the farm track.

Q: Is there parking?
A: Yes, free parking on site.

**The farm**

Q: Is this a working farm?
A: Yes. The farm is actively farmed — organic since 1998 with pedigree Hereford cattle, EasyCare sheep, hop fields, cider orchards and wildflower meadows. Guests are welcome to explore, but please keep to footpaths and keep dogs on leads around livestock.

Q: When are the shepherd huts opening?
A: Skylark and Nuthatch are opening summer 2026. You can join the waitlist on the shepherd huts page.

---

## Pricing consistency checklist

Before the site goes live, confirm these prices are identical on every page and across the booking widget:

**Tipi Retreat — 2026 (current):**
- Weekend (Fri/Sat nights): £500 per night
- Weekday (Sun–Thu nights): £450 per night
- Capacity: up to 20 guests total
- No per person charge

**Tipi Retreat — From 2027:**
- Weekend: £600 per night for up to 10 guests + £30 per additional person per night
- Weekday: £520 per night for up to 10 guests + £30 per additional person per night
- Minimum 2 nights
- Maximum 20 guests total

**Shepherd Huts — From summer 2026:**
- Flat rate: £150 per night per hut
- Minimum 2 nights
- Launch offer: 20% off first 10 bookings

---

## Bookalet widget reference

Account ID: `9a2748bd-8e0e-4fbd-91bf-d221725d3197`
Tipi property ID: `58084`
Campsite property ID: `58079` (not used on this site)
Shepherd hut property ID: `YOUR_SHEPHERD_HUT_PROPERTY_ID` — replace when available

The widget is embedded on tipis.html only. The homepage does not include a widget — it links through to tipis.html#book.

---

## Image placeholders

The site launches with 2 photos only:

- `/images/hero.jpg` — homepage hero background (landscape, wide crop, river/tipis/farm — whichever is strongest)
- `/images/tipis.jpg` — used on tipis page hero and homepage offering card

Both paths are marked with HTML comments `<!-- REPLACE: image path -->` in every file they appear. All other sections use background colours from the design system — no placeholder/stock images.

---

## File list

```
index.html
tipis.html
shepherd-huts.html
about.html
faq.html
/images/hero.jpg         ← add before launch
/images/tipis.jpg        ← add before launch
```

Legal pages (privacy.html, cookies.html, terms.html) — link from footer but build separately. Leave as placeholder pages with "Coming soon" content if not ready.

---

## Contact details (use consistently across all pages)

- Email: hello@hopnestretreats.co.uk
- Phone/WhatsApp: 07583 340173
- WhatsApp link: https://wa.me/447583340173
- Location: Near Martley, Worcestershire, WR6
- Google Maps coordinates: 52.201950, -2.391437

---

## SEO and AI SEO — primary objective

Search engine optimisation and AI search visibility are the primary marketing goal of this website. Every page must be built with this in mind from the ground up. This section is not optional — it is as important as the design and the booking widget.

### Why AI SEO matters for Hopnest

AI search tools (ChatGPT, Perplexity, Google AI Overviews, Claude) increasingly answer travel and accommodation queries directly, citing specific websites. When someone asks "where can I find exclusive glamping in Worcestershire" or "private wild swimming retreat near Worcester", the AI either recommends Hopnest or it does not. The difference is whether the site contains clear, specific, authoritative, well-structured answers to exactly those questions.

AI tools favour:
- Specific factual claims (dates, distances, capacities, certifications)
- Natural question-and-answer structure (the FAQ page is gold)
- Consistent terminology repeated across multiple pages
- Schema markup (JSON-LD) that explicitly describes the business
- Pages that directly answer the query without fluff

---

### Primary keyword targets

These are the phrases guests actually search for. Every page must contain the relevant ones naturally in headings, body copy, meta tags and schema. Do not stuff them — write naturally but make sure they appear.

**Highest priority (build every page around these):**
- exclusive glamping Worcestershire
- private glamping Worcestershire
- exclusive tipi glamping
- private site glamping near Worcester
- exclusive group glamping Worcestershire
- glamping River Teme
- glamping near Martley
- organic farm glamping Worcestershire

**High priority (use across multiple pages):**
- wild swimming glamping Worcestershire
- wild swimming River Teme
- private glamping for groups UK
- exclusive hire glamping UK
- tipi glamping Worcestershire
- riverside glamping Worcestershire
- glamping near Worcester
- group glamping Worcestershire

**Supporting terms (use where naturally relevant):**
- shepherd huts Worcestershire
- shepherd huts River Teme
- dark sky glamping Worcestershire
- stargazing glamping Worcestershire
- organic farm stay Worcestershire
- glamping near Birmingham
- glamping near Hereford
- glamping Teme Valley
- exclusive campsite hire Worcestershire
- private campsite hire Worcestershire
- dog friendly glamping Worcestershire
- glamping for large groups Worcestershire

**AI search phrases (write content that answers these as direct questions):**
- "where can I find exclusive glamping in Worcestershire"
- "private glamping site near Worcester where no other guests"
- "glamping on a farm in Worcestershire"
- "tipi glamping near Birmingham"
- "exclusive group glamping UK"
- "glamping with wild swimming near Worcester"
- "private riverside glamping UK"
- "organic farm glamping UK"
- "best glamping in Worcestershire"
- "shepherd huts with views Worcestershire"

---

### Page-by-page meta tags

Implement these exactly. Page title format: `Primary keyword | Hopnest Retreats`

**index.html**
```html
<title>Exclusive Glamping Worcestershire | Private Tipi Retreat | Hopnest Retreats</title>
<meta name="description" content="Exclusive tipi glamping on the River Teme near Martley, Worcestershire. Five furnished tipis, privately yours — no other guests on site. Organic farm, wild swimming, dog friendly. 25 minutes from Worcester.">
<link rel="canonical" href="https://www.hopnestretreats.co.uk/">
```

**tipis.html**
```html
<title>Tipi Glamping Worcestershire | Exclusive Riverside Retreat | Hopnest Retreats</title>
<meta name="description" content="Five furnished bell tipis on the River Teme, exclusively yours. Private glamping near Martley, Worcestershire — no other guests, ever. King beds, fire pit, hot shower. From £450/night.">
<link rel="canonical" href="https://www.hopnestretreats.co.uk/tipis">
```

**shepherd-huts.html**
```html
<title>Shepherd Huts Worcestershire | Skylark and Nuthatch | Hopnest Retreats</title>
<meta name="description" content="Two shepherd huts above the Teme Valley, Worcestershire. King beds, en suite, full kitchen, stargazing net bed and far-reaching views. Opening summer 2026. Join the waitlist.">
<link rel="canonical" href="https://www.hopnestretreats.co.uk/shepherd-huts">
```

**about.html**
```html
<title>About the Farm | Organic Glamping Worcestershire | Hopnest Retreats</title>
<meta name="description" content="Hopnest Retreats sits on a family-run organic farm near Martley, Worcestershire. Farming organically since 1998. One of only three certified organic hop growers in the UK. Meet your host, Elizabeth.">
<link rel="canonical" href="https://www.hopnestretreats.co.uk/about">
```

**faq.html**
```html
<title>FAQs | Exclusive Glamping near Worcester | Hopnest Retreats</title>
<meta name="description" content="Answers to common questions about glamping at Hopnest Retreats near Martley, Worcestershire. Pricing, booking, what's included, getting here and more.">
<link rel="canonical" href="https://www.hopnestretreats.co.uk/faq">
```

---

### JSON-LD schema markup

Add the following JSON-LD to the `<head>` of every page. This is what Google and AI tools read to understand the business. Each page gets the base organisation schema plus a page-specific schema.

**Base schema — add to every page:**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  "name": "Hopnest Retreats",
  "url": "https://www.hopnestretreats.co.uk",
  "description": "Exclusive tipi glamping and shepherd huts on a family-run organic farm near Martley, Worcestershire. No other guests on site — the whole site is yours when you book.",
  "telephone": "+447583340173",
  "email": "hello@hopnestretreats.co.uk",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Martley",
    "addressRegion": "Worcestershire",
    "postalCode": "WR6",
    "addressCountry": "GB"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 52.201950,
    "longitude": -2.391437
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "28",
    "bestRating": "5"
  },
  "amenityFeature": [
    { "@type": "LocationFeatureSpecification", "name": "Exclusive site hire", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "No other guests on site", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "River Teme access", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Wild swimming", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Fire pit", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Hot shower", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Dogs allowed", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Free parking", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Organic farm", "value": true }
  ],
  "priceRange": "££",
  "checkinTime": "16:00",
  "checkoutTime": "10:00",
  "petsAllowed": true
}
</script>
```

**tipis.html — additional schema:**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Accommodation",
  "name": "Hopnest Tipi Retreat",
  "description": "Five furnished bell tipis on the banks of the River Teme, exclusively yours. No other guests on site. King beds, covered communal area, fire pit, hot shower and two loos. Near Martley, Worcestershire.",
  "url": "https://www.hopnestretreats.co.uk/tipis",
  "numberOfRooms": 5,
  "occupancy": {
    "@type": "QuantitativeValue",
    "maxValue": 20
  },
  "amenityFeature": [
    { "@type": "LocationFeatureSpecification", "name": "King size bed", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Bedding provided", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Fire pit", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Hot shower", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Equipped kitchen", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "River access", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Dogs allowed", "value": true }
  ],
  "offers": [
    {
      "@type": "Offer",
      "name": "Weekend rate 2026",
      "price": "500",
      "priceCurrency": "GBP",
      "description": "Per night, Friday and Saturday. Entire site exclusively yours, up to 20 guests."
    },
    {
      "@type": "Offer",
      "name": "Weekday rate 2026",
      "price": "450",
      "priceCurrency": "GBP",
      "description": "Per night, Sunday to Thursday. Entire site exclusively yours, up to 20 guests."
    }
  ]
}
</script>
```

**shepherd-huts.html — additional schema:**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Accommodation",
  "name": "Skylark and Nuthatch Shepherd Huts",
  "description": "Two shepherd huts above the Teme Valley near Martley, Worcestershire. King beds, en suite shower and toilet, full kitchen, mains electric, outdoor fire pit and stargazing net bed. Wide views, dark skies, opening summer 2026.",
  "url": "https://www.hopnestretreats.co.uk/shepherd-huts",
  "numberOfRooms": 2,
  "occupancy": {
    "@type": "QuantitativeValue",
    "maxValue": 2
  },
  "amenityFeature": [
    { "@type": "LocationFeatureSpecification", "name": "King size bed", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Bedding and towels provided", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "En suite shower and toilet", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Full kitchen", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Mains electric", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Electric heater", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Outdoor fire pit", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Stargazing net bed", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Teme Valley views", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Dark skies", "value": true }
  ],
  "offers": [
    {
      "@type": "Offer",
      "name": "Weekend rate from 2026",
      "price": "120",
      "priceCurrency": "GBP",
      "description": "Per hut per night, Friday and Saturday. Minimum 2 nights."
    },
    {
      "@type": "Offer",
      "name": "Weekday rate from 2026",
      "price": "100",
      "priceCurrency": "GBP",
      "description": "Per hut per night, Sunday to Thursday. Minimum 2 nights."
    }
  ]
}
</script>
```

**faq.html — additional schema:**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is Hopnest Retreats exclusive — will there be other guests on site?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. When you book Hopnest Retreats, you have exclusive use of the entire site. No other guests, no strangers — just your group and the farm."
      }
    },
    {
      "@type": "Question",
      "name": "Can you wild swim at Hopnest Retreats?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. The tipi retreat sits on the banks of the River Teme, which is accessible for wild swimming. Guests have direct access to the river during their stay."
      }
    },
    {
      "@type": "Question",
      "name": "How much does it cost to stay at Hopnest Retreats?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In 2026, the tipi retreat is £500 per night at weekends and £450 per night on weekdays. The entire site is exclusively yours for up to 20 guests. From 2027, weekend nights are £600 for up to 10 guests plus £30 per additional person, and weekday nights are £520 plus £30 per additional person, minimum 2 nights. Shepherd huts (opening summer 2026) are £120 per night at weekends and £100 per night on weekdays."
      }
    },
    {
      "@type": "Question",
      "name": "Where is Hopnest Retreats?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Hopnest Retreats is near Martley, Worcestershire. It is 25 minutes from Worcester, 50 minutes from Birmingham, 40 minutes from Hereford and 45 minutes from Cheltenham."
      }
    },
    {
      "@type": "Question",
      "name": "Is Hopnest Retreats on an organic farm?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. The farm has been certified organic since 1998 and is one of only three certified organic hop growers in the UK. It is also farmed regeneratively."
      }
    },
    {
      "@type": "Question",
      "name": "Are dogs welcome at Hopnest Retreats?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, dogs are very welcome. We ask that they are kept on leads when around livestock on the farm."
      }
    }
  ]
}
</script>
```

---

### Wild swimming — dedicated content block

Wild swimming is a high-value, high-intent search term and Hopnest has a genuine, rare asset: direct River Teme access. This must be explicitly named on the homepage and tipis page — not buried, not implied. Include a short content block on both pages:

**Homepage — add as a short section or callout between offerings and reviews:**

Heading: `Wild swimming on your doorstep`

Copy: The River Teme runs along the edge of the site. It is one of the cleanest rivers in England and a short walk from the tipis. Your group has private access during your stay. There are no crowds, no entry fees and no other guests. Just the river.

**Tipis page — add as a bullet point in the "outside" list:**
- River Teme access — wild swimming on your doorstep

**This single phrase — "wild swimming Worcestershire" or "wild swimming River Teme" — should appear on at least two pages with natural surrounding context.**

---

### Open Graph tags (social sharing and AI citation)

Add to every page `<head>`:
```html
<meta property="og:type" content="website">
<meta property="og:site_name" content="Hopnest Retreats">
<meta property="og:title" content="[page title here]">
<meta property="og:description" content="[page meta description here]">
<meta property="og:url" content="[page canonical URL here]">
<meta property="og:image" content="https://www.hopnestretreats.co.uk/images/hero.jpg">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="[page title here]">
<meta name="twitter:description" content="[page meta description here]">
<meta name="twitter:image" content="https://www.hopnestretreats.co.uk/images/hero.jpg">
```

---

### Sitemap

Create a `sitemap.xml` file at the root of the Netlify deployment:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.hopnestretreats.co.uk/</loc>
    <priority>1.0</priority>
    <changefreq>weekly</changefreq>
  </url>
  <url>
    <loc>https://www.hopnestretreats.co.uk/tipis</loc>
    <priority>0.9</priority>
    <changefreq>weekly</changefreq>
  </url>
  <url>
    <loc>https://www.hopnestretreats.co.uk/shepherd-huts</loc>
    <priority>0.8</priority>
    <changefreq>monthly</changefreq>
  </url>
  <url>
    <loc>https://www.hopnestretreats.co.uk/about</loc>
    <priority>0.7</priority>
    <changefreq>monthly</changefreq>
  </url>
  <url>
    <loc>https://www.hopnestretreats.co.uk/faq</loc>
    <priority>0.8</priority>
    <changefreq>monthly</changefreq>
  </url>
</urlset>
```

Also create a `robots.txt`:
```
User-agent: *
Allow: /
Sitemap: https://www.hopnestretreats.co.uk/sitemap.xml
```

---

### On-page SEO rules for the developer

- Every page must have exactly one `<h1>` — never more
- H1 must contain the primary keyword for that page
- Every image must have a descriptive `alt` attribute — no blank alts, no "image1.jpg"
  - hero.jpg alt: `Exclusive tipi glamping on the River Teme near Martley, Worcestershire`
  - tipis.jpg alt: `Five furnished bell tipis at Hopnest Retreats, Worcestershire`
- Internal links: every page must link to tipis.html (the booking page) at least once in body copy
- Page load speed: inline CSS only, no render-blocking external stylesheets, Google Fonts loaded with `display=swap`
- Mobile: fully responsive, passes Google mobile usability check

---

### AI SEO — content principles

AI tools read the page and summarise it. To rank well in AI answers, the content must:

1. **State facts clearly and early** — do not bury key information. "No other guests on site" and "River Teme" and "organic farm since 1998" must appear in the first two paragraphs of the homepage
2. **Use the exact phrases people search** — "exclusive glamping", "private glamping", "wild swimming", "no other guests" — not paraphrases
3. **Be specific** — "25 minutes from Worcester" beats "easily accessible". "One of only three certified organic hop growers in the UK" beats "organic farm"
4. **Answer questions directly** — the FAQ page is the single most valuable AI SEO asset on the site. Every answer must be a direct, complete, factual response. No waffle
5. **Be consistent** — the same facts (prices, distances, capacity) stated identically across every page. AI tools weight consistency as a trust signal
6. **Name the location repeatedly** — Martley, Worcestershire, River Teme, Teme Valley must appear multiple times on every page. Location specificity is how AI tools match queries to results

---

## Copy rules (non-negotiable)

- No hyphens used as dashes anywhere
- No em dashes anywhere
- No hyphenated compound adjectives: king size (not king-sized), wood fired (not wood-fired), en suite (not en-suite)
- No AI sounding phrases or performative marketing language
- Always "we" in general copy — "I" only in Elizabeth's direct quotes
- Shepherd huts: both sit on a small hill above the Teme Valley, same view, same sunset, same dark skies, visible to each other, neither gets morning sun, not in the hop fields
- No live booking link anywhere for shepherd huts until launch
- The word "exclusive" or "exclusively yours" must appear on every page — it is the primary differentiator
