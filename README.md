# 🀄 Hand Betting Game (Mahjong Tiles)

A web-based **Hand Betting Game** built with **React + TypeScript**, focused on **state management, UI polish, and scalability**.

This project was developed as part of a technical assessment and is designed to be **feature-ready and easily extensible**.

---

# 🚀 Features

## 🎮 Core Gameplay

* Draw Mahjong tile hands (Number, Wind, Dragon)
* Bet on whether the next hand will be **Higher** or **Lower**
* Dynamic scoring system
* Game-over conditions:

  * Any tile value reaches **0 or 10**
  * Draw pile exhausted for the **3rd time**

---

## 🧠 Advanced Game Logic

* Dynamic scaling for **Dragon/Wind tiles**
* Deck reshuffling with discard pile merging
* Event-driven state updates
* Deterministic hand calculation

---

## ✨ UI & UX Highlights

* Premium dark theme with animated background
* Smooth transitions using **Framer Motion**
* Sound effects:

  * Tile click
  * Win chime
  * Lose feedback
* Particle effects on win
* Score count-up animation
* Active hand glow
* Skeleton placeholders for empty states

---

## 📊 Game Interface

* Current Hand (highlighted)
* Previous Hand
* Game Stats (score, reshuffles, deck state)
* Scrollable History (left → right timeline)
* Leaderboard (top scores)

---

# 🏗️ Tech Stack

### Frontend

* React (Functional Components)
* TypeScript (strict mode)
* Zustand (state management)
* Framer Motion (animations)

### Styling

* Custom CSS (Design system + tokens)
* No external UI library (fully handcrafted UI)

### Architecture

* Feature-based structure
* Component-driven design
* Event-driven state updates

---

# 🧩 Key Concepts Demonstrated

## React & State

* Advanced hooks usage (`useState`, `useEffect`, `useRef`)
* Event-based state handling (avoiding stale updates)
* Conditional rendering patterns

## Architecture

* Feature-based folder structure
* Separation of UI and logic
* Reusable components

## Performance & UX

* Controlled re-renders (Zustand)
* Animation-driven feedback
* Skeleton loading patterns

---

# ⚙️ Setup Instructions

## 1. Clone the repository

```bash
git clone https://github.com/Muhammad-Suleman-Hamza/hand-betting-game
cd hand-betting-game
```

---

## 2. Install dependencies

```bash
npm install
```

---

## 3. Run development server

```bash
npm run dev
```

---

## 4. Open in browser

```text
http://localhost:5173
```

---

# 📁 Project Structure (Simplified)

```text
src/
 ├── features/
 │   └── game/
 │       ├── gameStore.ts
 │       ├── utils/
 │       └── types/
 ├── components/
 │   ├── GameBoard.tsx
 │   ├── Tile.tsx
 │   └── UI components
 ├── pages/
 │   ├── LandingPage.tsx
 │   ├── GamePage.tsx
 │   └── SummaryPage.tsx
 ├── App.tsx
 └── index.css
```

---

# 🧪 Game Rules Summary

* Each hand consists of **2 tiles**
* Player bets on next hand:

  * Higher
  * Lower
* Tile values:

  * Number tiles → face value
  * Dragon/Wind → dynamic values (start at 5)

---

# 🏁 Game Over Conditions

* Any tile reaches value **0 or 10**
* Draw pile runs out **3 times**

---

# 🤖 AI Usage Disclosure

AI was used as a **development assistant** for:

* refining architecture decisions
* improving UI/UX ideas
* generating boilerplate and patterns

All core logic, structure, and decisions were **reviewed, customized, and implemented manually**.

---

# 🚀 Future Improvements

* Backend integration (Node.js + Express)
* Persistent leaderboard (API)
* Authentication system
* SSR / Server Components (via Next.js)
* Multiplayer mode
* Analytics dashboard

---

# 🎯 Notes

This project prioritizes:

* **Scalability**
* **Code quality**
* **User experience**

The architecture is intentionally designed to allow **easy feature extensions**, as required by the assessment.

---

# 👨‍💻 Author

Muhammad Suleman Hamza
Senior Full Stack Developer
