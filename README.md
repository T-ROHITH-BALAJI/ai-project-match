# AI Project Match

Mobile-first growth prototype for the NxtWave workshop **Build Your First AI Project in 60 Minutes**.

**Plan-first design:** `src/data/campaignPlan.ts` defines student insight, channels, ₹2,000 / 7-day / 500-reg goals, and A/B/C landing copy. The site reads that file—landing hero, UTMs, dashboard, and `/plan` page stay aligned with your slide deck.

## Run locally

```bash
cd ai-project-match
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Demo path

1. **Landing** → Find My AI Project  
2. **5-question diagnostic** → personalized result  
3. **Register** → immediate confirmation (date, time, join link, calendar)  
4. **Reminders** (simulated) → **Attendance** → **AI Builder Starter Kit**  
5. **Growth dashboard** (header link) — funnel + sample A/B copy  

Session data and live funnel increments persist in `localStorage`. The dashboard blends demo seed numbers with your session by default.

## Build

```bash
npm run build
npm run preview
```
