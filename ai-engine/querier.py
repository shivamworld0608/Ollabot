from sentence_transformers import SentenceTransformer
import chromadb
import requests

client = chromadb.PersistentClient(path="./chromadb")
collection = client.get_or_create_collection("admission_data")
model = SentenceTransformer("all-MiniLM-L6-v2")

def query_answer(q, k=3):
    embedding = model.encode([q])[0]
    results = collection.query(query_embeddings=[embedding], n_results=k)
    docs = results["documents"][0]

    # Combine docs with user query
    context = "\n".join(docs)
    prompt = f"""Answer the following question based on the context below:\n\nContext:\n{context}\n\nQuestion:\n{q}\n\nAnswer:"""

    # Call local mistral via Ollama
    response = requests.post(
        "http://localhost:11434/api/generate",
        json={"model": "mistral", "prompt": prompt, "stream": False}
    )
    
    print(response.json())
    answer = response.json().get("response", "").strip()
    return answer
