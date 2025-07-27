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

## ⚙️ Project Workflow

A clear separation of responsibilities ensures maintainability and scalability. The project is divided into two major flows:

---

### 🛠️ Admin Workflow (Document Management & Embedding)

| Step | Description |
|------|-------------|
| 1️⃣ | **PDF Upload**: Admin uploads PDF files via the dashboard. |
| 2️⃣ | **PDF Parsing**: The system extracts text from each page using `PyMuPDF` or similar libraries. |
| 3️⃣ | **Text Chunking**: Extracted text is split into smaller chunks (with token limits). |
| 4️⃣ | **Metadata Addition**: Each chunk is enriched with metadata: `chunk_index`, `page_number`, `text_start`, `text_end`, `source`, etc. |
| 5️⃣ | **Embedding Generation**: Each chunk is passed through an embedding model (e.g., `OpenAI`, `HuggingFace`) and stored in a vector database like `FAISS`. |
| ✅ | **Ready for Querying**: Admin-processed files are now available for user interaction. |

---

### 🙋 User Workflow (Querying via Text or Voice)

| Step | Description |
|------|-------------|
| 1️⃣ | **File Selection**: User selects a specific PDF file to query from the list of uploaded documents. |
| 2️⃣ | **Input Method**: User types a question or uses voice input (handled via `react-speech-recognition`). |
| 3️⃣ | **Embedding Query**: User query is converted into an embedding and searched in the vector database (FAISS). |
| 4️⃣ | **Top-k Retrieval**: Most similar chunks are retrieved based on cosine similarity. |
| 5️⃣ | **Contextual Prompt Construction**: Retrieved chunks and metadata are appended to the query for contextual understanding. |
| 6️⃣ | **Answer Generation**: Query is sent to a language model (e.g., GPT-4) along with relevant context for accurate response generation. |
| 7️⃣ | **Answer Display**: Answer is rendered on the UI. Additional metadata like page number and similarity score may be shown. |
| 8️⃣ | **PDF Viewer Sync (Bonus)**: The highlighted chunk is shown in the PDF viewer with `react-pdf`. |
| 🔁 | **Follow-up Questions Supported**: Prior Q&A context is stored and used for multi-turn conversation. |

---

✅ **Bonus Features Implemented**
- 🔎 Similarity Score Display  
- 📄 PDF Viewer with Highlighted Chunks  
- 🎙️ Voice Input Support  
- 🧠 Follow-up Question Context Handling  
- 🔐 Admin-only Access for Upload & Embedding

---

Let me know if you'd like this workflow visualized in a diagram as well!


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
