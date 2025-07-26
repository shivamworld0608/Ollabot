from sentence_transformers import SentenceTransformer
import chromadb
from utils.pdf_parser import extract_text_from_pdf
from utils.chunking import chunk_text
import uuid

# Updated ChromaDB client initialization
client = chromadb.PersistentClient(path="./chromadb")
collection = client.get_or_create_collection("admission_data")
model = SentenceTransformer("all-MiniLM-L6-v2")

def embed_pdf(file_bytes):
    text = extract_text_from_pdf(file_bytes)
    chunks = chunk_text(text)
    for chunk in chunks:
        embedding = model.encode([chunk])[0]
        doc_id = str(uuid.uuid4())
        collection.add(documents=[chunk], embeddings=[embedding], ids=[doc_id])