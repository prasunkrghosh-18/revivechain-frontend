# ReviveChain AI ♻️📦
### Smart Supply Chain Optimization & Automated Asset Recovery

**Live Prototype:** [PASTE_YOUR_NETLIFY_LINK_HERE]  
**Backend API:** [PASTE_YOUR_RENDER_URL_HERE]  
**Challenge:** [Smart Supply Chains] Resilient Logistics and Dynamic Supply Chain Optimization

---

## 🌟 The Problem
Traditional reverse logistics (the process of product returns) is a massive bottleneck in the circular economy. 
- **Manual Triage:** Humans must manually inspect returns, leading to slow processing.
- **Carbon Waste:** Inefficient routing leads to unnecessary transport emissions.
- **Value Loss:** Products that could be refurbished often end up in landfills due to poor sorting.

## 🚀 Our Solution
**ReviveChain AI** is an intelligent "Pre-Triage" platform that uses **Google Gemini 1.5 Flash** to automate the decision-making process for returned assets. 

By simply uploading an image of a returned item, our system:
1. **Identifies Condition:** Uses Computer Vision to detect if an item is Pristine, Damaged, or Broken.
2. **Dynamic Routing:** An automated algorithm decides the most sustainable next step (Restock, Repair, or Recycle).
3. **Environmental Impact:** Calculates the Scope 3 carbon emissions saved by preventing landfill waste.

## 🛠️ Technical Stack
- **Frontend:** React.js, Tailwind CSS (Hosted on Netlify)
- **Backend:** FastAPI, Python (Hosted on Render)
- **AI Engine:** Google Gemini 1.5 Flash (via Google AI SDK)
- **Deployment:** CI/CD via GitHub integration

## 🧠 Google AI Integration
We utilized **Gemini 1.5 Flash** to power our core logic. Unlike standard image classifiers, Gemini's multi-modal capabilities allow it to understand context—distinguishing between superficial cosmetic damage and functional breakage—ensuring higher accuracy in routing directives.

## 📊 Features
- **Intelligent Triage:** Real-time asset assessment via photo upload.
- **Admin Insights Dashboard:** High-level metrics for supply chain managers to track recovery rates and carbon savings.
- **Automated Routing:** Instant generation of logistics directives to reduce warehouse dwell time.

## 📈 Future Scalability
- **Vertex AI Integration:** Transitioning to Vertex AI for enterprise-grade model monitoring.
- **Fleet Integration:** Connecting directly to delivery APIs (like Google Maps Platform) to automate the pickup of triaged items.
- **Blockchain Tracking:** Implementing a ledger to verify the "Green History" of refurbished assets.

---
Created for the **GDG Solution Challenge 2026**.
