# Content Design, UX Writing, Global Writing, Alt Text & Notifications

Material Design 3 (M3) UX writing standards (AP Style baseline), capitalization, pronoun rules, grammar and punctuation, localization and global writing guidelines, accessible alt text formulas, and notification/SMS character budgets.

Sources: `https://m3.material.io/foundations/content-design/overview`, `https://m3.material.io/foundations/content-design/style-guide`, `https://m3.material.io/foundations/content-design/global-writing`, `https://m3.material.io/foundations/content-design/alt-text`, `https://m3.material.io/foundations/content-design/notifications`, `https://m3.material.io/foundations/writing`

---

## When to Use / Core Principles

- **Write for everyone, everywhere**: UI copy must be scannable, concise, direct, and easy to translate. M3 follows **Associated Press (AP) Style** unless explicitly overridden below.
- **Sentence case everywhere**: Every UI string—titles, headings, app bars, buttons, tabs, menu items, chips, labels—uses **sentence-style capitalization**.
- **Design for `1.5×` localization expansion**: Non-English translations average **50% longer** than English strings. Keep sentences short, avoid idioms, and clarify pronouns.

---

## 1. UX Writing Best Practices & Capitalization

| Rule | ✅ Do | ❌ Don't | Rationale |
|---|---|---|---|
| **Use sentence case for all UI text** | `"Move to trash?"`<br>`"Create new folder"`<br>`"Save changes"` | `"Move To Trash?"` (Title Case)<br>`"SAVE CHANGES"` (ALL CAPS) | Sentence case is faster to scan. Never use `ALL CAPS` / caps blocks—they reduce readability and are inaccessible. Only capitalize the first word and proper nouns / official product names. |
| **Explain consequences neutrally & directly** | **Title**: `"Move to trash?"`<br>**Body**: `"Big birthday bash will be deleted after 30 days"` | **Title**: `"Are you sure you want to move to trash?"`<br>**Body**: `"You'll be able to find 'Big birthday bash' in your trash for 30 days."` | State the exact result of the action and how to undo it without sounding alarming, condescending, or misrepresenting permanent deletion. |
| **Make text scannable** | Clear descriptive headings, subheadings, and front-loaded key terms | Dense paragraphs or vague headers | Users skim UI in an F-shaped pattern looking for keywords relevant to their task. |
| **Spell out words (avoid abbreviations)** | `"January"`, `"Tuesday"`, `"for example"`, `"and more"` | `"Jan"`, `"Tue"` (when space exists), `"e.g."`, `"i.e."`, `"etc."` | Abbreviations confuse screen readers and translators. **Never use Latin abbreviations (`e.g.`, `etc.`)**. Time abbreviations (`AM`, `PM`) are acceptable. |

---

## 2. Word Choice & Pronouns

| Pronoun Rule | Guidance | ✅ Do | ❌ Don't |
|---|---|---|---|
| **Use second person (`"you"`, `"your"`) by default** | Address the user directly from their point of view. | `"Your mail isn't available. Try checking your Wi-Fi connection."` | `"Mail not available."` (robotic/impersonal) |
| **Never mix first (`"my"`) and second (`"your"`) person** | Mixing perspectives on the same screen confuses users. | **Heading**: `"Albums"`<br>**Body**: `"Your photos"` | **Heading**: `"My albums"`<br>**Body**: `"Your photos"` |
| **Avoid `"we"`, `"our"`, `"I"`, `"my"` in product voice** | Speaking as `"we"` on behalf of a company feels disconcerting; `"my"` labels feel artificial. | `"Latest episodes"` or `"Your latest episodes"` | `"We're glad you're our customer"`<br>`"My latest episode"` / `"My best match"` |
| **Exception: Use `"I"` for legal consent & ownership** | First-person singular is reserved for legal agreements or high-impact user acknowledgments. | `"I agree to the terms of service"` | — |

---

## 3. Grammar, Punctuation & Formatting Rules

| Punctuation / Element | M3 Rule | Examples & Exceptions |
|---|---|---|
| **Periods (`.`)** | **Omit periods** at the end of single sentences or phrases in **labels, buttons, tooltips, snackbars, bulleted lists, dialog body text, and hyperlinks**. | • **✅ Do (1 sentence)**: `"Photo moved to trash"` (no period)<br>• **✅ Do (2+ sentences)**: `"Your mail isn't available. Try checking your Wi-Fi connection."` (use periods on multi-sentence or complex copy) |
| **Contractions** | **Use contractions** (`can't`, `isn't`, `don't`, `you'll`, `it's`) for natural, scannable tone. | • **✅ Do**: `"You can't edit"`<br>• **❌ Don't**: `"You cannot edit"`<br>• *Exception*: Spell out `"do not"` only when strong caution/emphasis is required. |
| **Serial (Oxford) comma** | **Always use the serial comma** before `"and"` / `"or"` in lists of 3+ items. Always place commas **inside** quotation marks. | • **✅ Do**: `"Save photos, videos, and files"`<br>• **❌ Don't**: `"Save photos, videos and files"`<br>• *Exception*: Omit the serial comma before an ampersand (`&`). |
| **Numbers & Commas** | • **`1,000` to `999,999`**: Use commas (`1,185 reviews`).<br>• **`1,000,000+`**: Abbreviate `"million"` as **`M`** without commas (`23M views`) when showing approximate volume.<br>• **Identifiers**: Never use commas in **street addresses, radio frequencies, or years**. | • **✅ Do**: `"1,185 reviews"`, `"23M views"`, `"1600 Amphitheatre Pkwy"`, `"2026"` |
| **Colons (`:`)** | **Skip colons in headings** above lists. Use a colon **only** when introducing a list inside body text. | • **Heading**: `"Included in your plan"` (no colon)<br>• **Body**: `"Your plan includes:"` (colon allowed) |
| **Exclamation points (`!`)** | **Use sparingly.** Reserve strictly for greetings or major celebratory milestones. Never use in empty states, errors, or routine tasks. | • **✅ Do**: `"Congratulations!"`<br>• **❌ Don't**: `"No messages yet!"` |
| **Ellipses (`…`)** | Use **only** for actions in progress (`"Loading…"`) or text truncation. **No space before `…`**. **Never use ellipses on buttons or menu items.** | • **✅ Do**: Progress indicator `"Uploading…"`<br>• **❌ Don't**: Button labeled `"Saving..."` or menu item `"Print..."` |
| **Parentheses `()`** | Use **only** to define acronyms/jargon or cite sources. Never use for side notes or afterthoughts—integrate needed info into the sentence. | • **✅ Do**: `"Two-factor authentication (2FA)"`<br>• **❌ Don't**: `"Update your profile (you can change this later)."` |
| **Ampersands (`&`)** | **Spell out `"and"`** in body text, 3+ item lists, and **email subject lines**. Use `&` only in space-constrained headlines, table headers, nav labels, or buttons. | • **⚠️ Caution**: `"Terms & conditions"` (only when tight)<br>• **❌ Don't**: Email subject `"Updates & news"` |
| **Em dash (`—`) & En dash (`–`)** | • **Em dash (`—`)**: **Avoid in UX writing**; split into two sentences or use a comma.<br>• **En dash (`–`)**: Use **with no surrounding spaces** for numeric or time ranges. | • **✅ Do**: `"9 AM–Noon"`, `"Pages 4–8"`<br>• **❌ Don't**: `"9 AM - Noon"` or `"Settings — update your info"` |
| **Hyphens (`-`)** | Never put spaces around hyphens. Use for negative numbers (`-100`) and compound modifiers/nouns:<br>1. **Hyphenate compound adjectives**: `case-by-case basis`, `best-in-class` (except common open compounds: `cell phone number`, `chocolate chip cookie`).<br>2. **Hyphenate noun phrases** (verb+adverb or adj+noun): `sign-off`, `drive-through`, `go-ahead`, `higher-up`, `most-read`.<br>3. **Never hyphenate verb phrases**: `check in to the room`, `drop off your car`, `look out`. | • **✅ Do (Noun)**: `"Complete your check-in"`<br>• **✅ Do (Verb)**: `"Check in to your flight"` (Note: never merge `"in to"` into `"into"` when `"in"` belongs to the phrasal verb) |
| **Italics vs. Bold** | **Avoid italics for sentences** (hard to read). Use **bold** for emphasis. Reserve italics strictly for a single word/phrase like a custom device name or work title. | • **✅ Do**: `"Remove access for "` *`Home Laptop`*`"?"`<br>• **❌ Don't**: *`"This action will remove access for all devices."`* |

---

## 4. Global Writing & Localization

Write source American English so it can be understood globally and translated accurately into 80+ languages:

1. **Plan for `1.5×` text expansion**: Translated strings average **1.5 times longer** than English. Write short, simple sentences and break dense copy into bulleted lists or titled sections.
2. **Use global examples & annotate local placeholders**:
   - **✅ Do**: Reference universal concepts like `"the holidays"` instead of culture-specific holidays like `"Christmas"`.
   - **⚠️ Caution**: When local examples are unavoidable (**locations/cities, personal names, currencies, temperatures, date formats, internet/cable providers**), add a **translator message description** instructing localizers to substitute a culturally relevant equivalent (e.g., replacing `"New York"` with a major local city).
3. **Eliminate ambiguous pronouns (`"it"`, `"this"`, `"that"`)**:
   - Translators often see isolated strings without visual context, and many languages assign grammatical gender to nouns.
   - **Repeat the noun instead of `"it"`**: Write `"Couldn't move photo"` (`✅ Do`), **never** `"Couldn't move it to 'Travel' folder because it's unavailable"` (`❌ Don't`).
   - **Never use standalone `"this"` or `"that"`**: Always follow `"this"`/`"that"` immediately with a noun, or rewrite (`❌ Don't`: `"This can be seen by your IT administrator"` → `✅ Do`: `"Your IT administrator can see your profile photo"`).
4. **Cut idioms, slang, and polite filler (`"Please"`, `"Sorry"`, `"Thank you"`)**:
   - Write `"Let's go"` (`✅ Do`), **never** `"Let's get this party started"` (`❌ Don't`).
   - **Omit `"Please"`, `"Sorry"`, and `"Thank you"`**, especially in error states. *Exception*: `"Please"` is acceptable only when asking the user to perform a genuinely inconvenient action.
5. **Avoid homograph ambiguity & technical jargon**:
   - Words like `"filter"`, `"change"`, `"traffic"`, and `"home"` can be nouns, verbs, or have multiple meanings (app homepage vs. physical home). Never use both meanings in the same passage, and document the intended part of speech in translator notes.

---

## 5. Accessible Alt Text (`alt`) Guidelines

### Core Alt Text Rules
- **Length budget**: Keep alt text concise—**`≤ 125–140 characters`** (`writing-and-text.md` specifies `≤125` chars; `alt-text.md` specifies `≤140` chars; targeting **`≤ 125 characters`** prevents cutoff across all screen readers).
- **Decorative vs. Informative test**: If removing the image loses **zero** information, mark it decorative (`alt=""` on web, `contentDescription = null` on Android) so screen readers skip it.
- **Never start with `"Image of"` or `"Picture of"` (`❌ Don't`)**: Screen readers automatically announce the `"image"` role; writing `"Image of..."` results in `"Image, image of..."`.
  - *Exception (`⚠️ Caution`)*: Naming specific information formats—**`Chart`**, **`Infographic`**, **`Map`**, **`Graph`**, **`Screenshot`**, **`Headshot`**, **`Diagram`**—can help orient users when relevant (e.g., `"Map of Denver Rd. Park and surrounding area"`).
- **Never leave raw filenames (`❌ Don't`)**: Never allow auto-generated strings like `"jpg - 0223939-330"`.
- **Include embedded text**: Screen readers cannot read text rasterized inside an image; include any essential embedded text in the alt text.

### Context, Captions & Adjacent Text
- **Adapt to context**: The exact same photo requires different alt text depending on its page context:
  - In a furniture store app: `"Brown oak dining chair."`
  - In a home-decor blog post about reading nooks: `"Books on a wooden chair next to a vintage bathtub."`
- **Never repeat the visible caption (`❌ Don't`)**: If the caption reads `"Pigeons have a distinct silhouette"`, setting the same string as `alt` causes screen readers to read it twice back-to-back. Set `alt="Flying pigeons."` (`✅ Do`) and keep terminology consistent between caption and alt text (don't write `"antique"` in the caption and `"vintage"` in the alt text).

### Alt Text for Charts, Graphs & Motion
| Media Type | Formula & Strategy | ✅ Do Example | ❌ Don't Example |
|---|---|---|---|
| **Editorial Chart** (supports a specific takeaway) | `Summary of [data type] + [reason/key takeaway & top metrics]` | `"Summary of interest in Manchester City, which is almost double that of Liverpool. Manchester interest peaks at 100 at 6pm."` or `"Your step count was 55% higher this week vs last week with 4,106 additional steps on average."` | `"Interest in Manchester City: 12am=40, 12pm=56, 6pm=100, 9pm=45..."` (Never dump raw data points) |
| **Analytical Chart** (open-ended exploration) | Describe chart structure + point to accessible data source (avoid biased summaries; prefer interactive charts with tooltips). | `"Comparison of annual high, avg, and low temperatures. Visit the link provided to explore the data in detail."` | `"High, average, and low temperatures varied widely over the course of the year."` (Overgeneralized summary) |
| **Short Motion / GIF** | Summarize the functional action/outcome (like a title). Long-form video uses audio description tracks instead. | `"A tooltip labeled 'star' appears when a cursor hovers over a star icon."` | `"A hand-shaped cursor lands on a star-shaped icon and then a tooltip..."` (Overly literal) |

---

## 6. Notifications & SMS Writing

### Character Limits & Structural Anatomy

| Channel / Element | Maximum Length | Structural & Content Rules |
|---|---|---|
| **Notification Title** | **`< 29 characters`** | Front-load the most important point or action. **Never repeat the app name** (already shown in OS notification header). Avoid dynamic text variables. |
| **Notification Collapsed Body** | **`< 40 characters`** | Concise, high-priority context that fits on a single collapsed line without truncation. |
| **Notification Expanded Body** | **`< 80 characters`** | Start with the exact collapsed body text and append supporting detail. |
| **Notification Action Buttons** | **`1–2 buttons`**, **`1–2 words each`** | Specific, actionable verb phrases telling the user what they can do next. |
| **SMS (Latin scripts)** | **`< 160 characters`** | Reserve strictly for urgent/account-critical alerts when offline. Truncate sensitive info; **avoid full email addresses or long URLs**. |
| **SMS (Non-Latin scripts)** | **`< 134 characters`** | Document the `134`-character ceiling in translator message descriptions to prevent multi-SMS splitting costs. |

### Critical Notification Do's and Don'ts
1. **Be day-specific (`✅ Do` / `❌ Don't`)**: Always use the **explicit day of the week** (`"Your package arrives Tuesday"`), **never** relative words like `"today"`, `"tomorrow"`, or `"tonight"`. Roughly **20% of users read notifications on a different day** than they were sent. *(Exception: notifications that auto-dismiss at a strict timestamp).*
2. **Keep dynamic text out of titles**: Dynamic strings (user campaign names, localized greetings) frequently overflow the `29`-character title limit and **cannot expand even when the notification is expanded**. Place dynamic variables in the notification body; if a title must include dynamic text, pair it with **at most 1 static word** and provide a static fallback notification when length overflows.
3. **Use emoji with extreme caution**:
   - Emoji must **enhance** a message, **never replace words** (`❌ Don't`: `"Time for ☕"`).
   - **Never pair negative/upset face emoji** (`😟`, `😩`, `😫`) with bad news (e.g., heavy traffic or errors)—user research shows strong negative reactions. Face/hand emoji perform better than generic objects only in positive contexts.
4. **Prioritize utility over humor**: Never write jokes or call the user `"human"` (`❌ Don't`).
5. **Respect user flow & consent**: Never trigger onboarding emails/notifications while the user is actively in the onboarding flow (`❌ Don't`). Always provide in-context opt-out controls that clearly state what the user gains or loses.

---

## 7. Implementation Notes

### Jetpack Compose / Android
- Store all strings in `res/values/strings.xml` with `description` attributes on `<string name="..." description="Translator note: ...">` to pass context, homograph disambiguation, and character limits (`CHAR LIMIT=29`) to localizers.
- Use `<xliff:g id="..." example="...">` tags to protect non-translatable tokens and give translators concrete placeholder examples.

### Web / HTML Sketch
```html
<!-- Informative image with concise (<125 char) context-specific alt text and non-duplicative caption -->
<figure>
  <img src="pigeons.jpg" alt="Flying pigeons." />
  <figcaption>Pigeons have a distinct silhouette</figcaption>
</figure>

<!-- Decorative image hidden from screen readers -->
<img src="decorative-divider.svg" alt="" />
```

---

Further reading: `docs/pages/content-overview.md`, `docs/pages/style-guide.md`, `docs/pages/global-writing.md`, `docs/pages/alt-text.md`, `docs/pages/notifications.md`, `docs/pages/writing-and-text.md`.
