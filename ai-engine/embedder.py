from sentence_transformers import SentenceTransformer
import chromadb
from utils.pdf_parser import extract_text_from_pdf
from utils.chunking import chunk_text
import uuid

client = chromadb.PersistentClient(path="./chromadb")
collection = client.get_or_create_collection("admission_data")
model = SentenceTransformer("all-MiniLM-L6-v2")

def embed_pdf(file_bytes, filename="uploaded_pdf.pdf"):
    text, page_mapping = extract_text_from_pdf(file_bytes)
    chunks = chunk_text(text)
    
    for i, chunk in enumerate(chunks):
        embedding = model.encode([chunk["text"]])[0]
        doc_id = str(uuid.uuid4())
        
        page_num = next(
            (page["page"] for page in page_mapping if page["start"] <= chunk["start"] < page["end"]),
            "N/A"
        )
        
        metadata = {
            "chunk_index": i,
            "source": filename,
            "total_chunks": len(chunks),
            "page_number": page_num,
            "text_start": chunk["start"],
            "text_end": chunk["end"]
        }
        
        collection.add(
            documents=[chunk["text"]],
            embeddings=[embedding],
            ids=[doc_id],
            metadatas=[metadata]
        )