## Svtracker

**Svtracker** is a modern personal finance management tool designed to help users track their spending habits through an intuitive, data-driven dashboard. It transforms raw financial data into meaningful visual insights using interactive charts and real-time summaries.

🌐 **Live Demo:** [https://svtracker.maddaathia.my.id](https://svtracker.maddaathia.my.id)  
🔗 **API Endpoint:** [https://api.svtracker.maddaathia.my.id](https://api.svtracker.maddaathia.my.id)

---

## Repositories
- **Frontend Repository:** [madpy-og/Svtracker-frontend](https://github.com/madpy-og/Svtracker-frontend)
- **Backend Repository:** [madpy-og/Svtracker-backend](https://github.com/madpy-og/Svtracker-backend)

---

## Tech Stack

### Languages, Frameworks & Tools
<p align="left">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=html,css,js,ts,vite,react,tailwind,nodejs,express,mongodb&theme=dark" />
  </a>
</p>

---

## Getting Started (Frontend)

### Prerequisites
- Node.js (v18+)
- Backend running at `https://api.svtracker.maddaathia.my.id` (or local `http://localhost:3000`)

### Installation & Run
1. Clone the repository:
   ```bash
   git clone https://github.com/madpy-og/Svtracker.git
   cd Svtracker
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Setup environment variables:
   ```bash
   cp .env.example .env
   ```
   Pastikan `VITE_API_URL` mengarah ke backend URL kamu:
   ```env
   VITE_API_URL="http://localhost:3000"
   ```
4. Run development server:
   ```bash
   npm run dev
   ```
