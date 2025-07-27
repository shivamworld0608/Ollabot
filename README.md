<h1 align="center">🔍 Smart PDF Q&A Assistant</h1>

<p align="center">
  <img src="https://img.shields.io/badge/License-MIT-blue.svg" />
  <img src="https://img.shields.io/badge/Status-In%20Progress-yellow.svg" />
  <img src="https://img.shields.io/badge/Built%20With-React%20%7C%20FastAPI%20%7C%20LangChain-7B68EE" />
</p>

<p align="center">
  AI-powered system to ask <strong>natural language questions</strong> from uploaded PDF documents.
  Combines <strong>semantic search</strong>, <strong>LLM-based re-ranking</strong>, and <strong>context memory</strong> for accurate, explainable answers.
</p>

---

## 📸 Demo

> Replace with your actual demo gif or screenshots

![Demo Screenshot](https://via.placeholder.com/1000x500.png?text=Demo+Placeholder)

---

## 🧠 Features

| Feature | Description |
|--------|-------------|
| 📄 **PDF Upload** | Upload and parse PDF with page-level metadata |
| 🔍 **Semantic Search** | Embed + retrieve most relevant chunks using similarity scoring |
| 🧠 **Re-Ranking** | Use LLM to sort top chunks before answering |
| 💬 **Chat Support** | Ask questions via text or voice |
| 🧭 **Follow-up Memory** | Retain context for follow-up questions |
| 📊 **Similarity Scores** | View how relevant each chunk is to your query |
| 🔦 **PDF Highlighting** | See exactly which paragraph the answer came from |

---

## 🛠️ Tech Stack

| Layer | Tools |
|-------|-------|
| **Frontend** | React.js, TailwindCSS, React-PDF, Web Speech API |
| **Backend** | Python, FastAPI / Flask, LangChain, PyMuPDF |
| **LLM** | OpenAI GPT / local model |
| **Embeddings** | OpenAI / HuggingFace |
| **Vector DB** | ChromaDB |

---

## 📁 Project Structure

smart-pdf-qa/
├── backend/
│ ├── app.py # FastAPI or Flask backend
│ ├── pdf_parser.py # Chunk PDF with page_number & position
│ ├── querier.py # Handles query embedding, search, reranking
│ ├── memory.py # Follow-up memory using LangChain tools
│ └── utils.py # Helper functions
│
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ │ ├── ChatInterface.jsx # Text & voice chat UI
│ │ │ ├── PDFViewer.jsx # Highlights PDF chunks
│ │ │ └── Sidebar.jsx # File upload and document list
│ │ ├── App.jsx
│ │ └── index.css / index.js
│
├── uploads/ # Stores uploaded PDFs
├── README.md
├── package.json
└── requirements.txt



---

## 🧪 How It Works
   ┌────────────┐
   │  Upload PDF│
   └─────┬──────┘
         ↓
┌─────────────────────────┐
│ Chunk with page + text │
└────────┬────────────────┘
↓
┌────────────┐
│User Query │ ←─ Voice/Text Input
└────┬───────┘
↓
┌───────────────────────────┐
│Embed & Similarity Search │
└────────┬──────────────────┘
↓
┌────────────┐
│ Re-rank w/ │
│ GPT │
└────┬───────┘
↓
┌─────────────────────┐
│ Generate Final Answer│
└────┬────────────────┘
↓
Show in UI + Highlight PDF

yaml
Copy
Edit

---

## 📷 Screenshots

> Replace placeholders with your own screenshots

| Chat Interface | PDF Highlight |
|----------------|----------------|
| ![](https://via.placeholder.com/450x300?text=Chat+UI) | ![](https://via.placeholder.com/450x300?text=PDF+Highlight) |

---

## 🚀 Getting Started

### 1. Clone the Repo
git clone https://github.com/shivamworld0608/Ollabot.git
cd smart-pdf-qa

###2. AI-Engine Setup (FastAPI)
cd ai-engine
pip install -r requirements.txt
python app.py

###2. Backend Setup (Nodejs,Express)
cd ai-engine
pip install -r requirements.txt
python app.py

### 3. Frontend Setup (React)
cd frontend
npm install
npm run dev

#Make sure to set the correct backend URL in your frontend env

## 🤝 Contributing

We welcome contributions from the community! Here’s how you can help:

### 📌 Guidelines
- 📝 **Open an Issue**  
  For major features or changes, please open an issue first to discuss your ideas.

- 📂 **Follow Standards**  
  Stick to the existing **project structure** and **naming conventions** for consistency.

- ✅ **Test Before Push**  
  Ensure all features are tested and stable before submitting a pull request.

---

## 🪪 License

This project is licensed under the **MIT License**.  
&copy; 2025 [Shivam Pandey](https://github.com/shivampandey)

> You are free to use, modify, and distribute this project with attribution.

---

## 📬 Contact

Have questions, feedback, or just want to connect? Feel free to reach out!

| Platform     | Link                                                                 |
|--------------|----------------------------------------------------------------------|
| **GitHub**   | [@yourusername](https://github.com/yourusername)                    |
| **Email**    | [your.email@example.com](mailto:your.email@example.com)             |
| **LinkedIn** | [linkedin.com/in/yourusername](https://linkedin.com/in/yourusername) |
