<h1 align="center">🔍 Smart Q&A Assistant</h1>

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

<img width="1897" height="1025" alt="image" src="https://github.com/user-attachments/assets/39827420-e22c-4473-8fb2-673c8d6414c4" />

<img width="1917" height="1028" alt="image" src="https://github.com/user-attachments/assets/fc4e4622-a00a-4145-a67d-34793292eb76" />

<img width="1919" height="1030" alt="image" src="https://github.com/user-attachments/assets/0d94fcd0-cadf-4d78-8f01-9e331636b8c7" />

<img width="1908" height="965" alt="image" src="https://github.com/user-attachments/assets/536288d9-6112-4b9a-b638-21a156e1ceed" />

<img width="1919" height="1033" alt="image" src="https://github.com/user-attachments/assets/83ff8d5d-850b-4fd2-a389-7b8953926b1d" />

<img width="1919" height="1026" alt="image" src="https://github.com/user-attachments/assets/777f270c-54fc-4f7e-8673-116122630b26" />

<img width="1919" height="1031" alt="image" src="https://github.com/user-attachments/assets/b120ab36-8723-4155-8a0b-112f76beab8e" />

<img width="1872" height="1032" alt="image" src="https://github.com/user-attachments/assets/2039b10d-0099-4f38-811c-48798fb7580b" />






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
| **Backend** | Python, FastAPI , PyMuPDF |
| **LLM** | Ollama |
| **Embeddings** | all-MiniLM-L6-v2 |
| **Vector DB** | ChromaDB |

---

## ⚙️ Project Workflow

A clear separation of responsibilities ensures maintainability and scalability. The project is divided into two major flows:

---

### 🛠️ Admin Workflow (Document Management & Embedding)

| Step | Description |
|------|-------------|
| 1️⃣ | **PDF Upload**: Admin uploads PDF files via the dashboard. |
| 2️⃣ | **PDF Parsing**: The system extracts text from each page using `PyMuPDF` . |
| 3️⃣ | **Text Chunking**: Extracted text is split into smaller chunks (with token limits). |
| 4️⃣ | **Metadata Addition**: Each chunk is enriched with metadata: `chunk_index`, `page_number`, `text_start`, `text_end`, `source`, etc. |
| 5️⃣ | **Embedding Generation**: Each chunk is passed through an embedding model (e.g., `all-MiniLM-L6-v2`) and stored in a vector database like `ChromaDB`. |
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
| 7️⃣ | **Answer Display**: Answer is rendered on the UI. Additional metadata like page number and similarity score is also shown. |
| 8️⃣ | **PDF Viewer Sync (Bonus)**: The highlighted chunk is shown in the PDF viewer with `react-pdf`. |

---

✅ **Bonus Features Implemented**
- 🔎 Similarity Score Display  
- 📄 PDF Viewer with Highlighted Chunks  
- 🎙️ Voice Input Support   
- 🔐 Admin-only Access for Upload & Embedding

---


## 📷 Screenshots

> Replace placeholders with your own screenshots

| Chat Interface | PDF Highlight |
|----------------|----------------|
| ![](https://via.placeholder.com/450x300?text=Chat+UI) | <img width="1919" height="1031" alt="image" src="https://github.com/user-attachments/assets/8fb9c149-be35-4421-93a1-2be073d741b2" />
 |

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
&copy; 2025 [Shivam Pandey](https://github.com/shivamworld0608)

> You are free to use, modify, and distribute this project with attribution.

---

## 📬 Contact

Have questions, feedback, or just want to connect? Feel free to reach out!

| Platform     | Link                                                                 |
|--------------|----------------------------------------------------------------------|
| **GitHub**   | [@shivamworld0608](https://github.com/shivamworld0608)                    |
| **Email**    | [shivamp.cs.22@nitj.ac.in](mailto:shivamp.cs.22@nitj.ac.in)             |
| **LinkedIn** | [linkedin.com/in/pandey-shivam-]([https://linkedin.com/in/](https://www.linkedin.com/in/pandey-shivam-/)) |
