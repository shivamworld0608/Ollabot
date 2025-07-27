from sentence_transformers import SentenceTransformer, util
import chromadb
import requests

client = chromadb.PersistentClient(path="./chromadb")
collection = client.get_or_create_collection("admission_data")
model = SentenceTransformer("all-MiniLM-L6-v2")

def query_answer(q, k=3):
    q_emb = model.encode([q])[0]

    results = collection.query(query_embeddings=[q_emb], n_results=10, include=["metadatas", "documents"])
    docs = results["documents"][0]
    metas = results.get("metadatas", [[]])[0]

    # Re-rank using cosine similarity
    doc_embeddings = model.encode(docs)
    scores = util.cos_sim(q_emb, doc_embeddings)[0]
    ranked = sorted(zip(docs, metas, scores), key=lambda x: x[2], reverse=True)[:k]

    # Build context
    context_parts = []
    for doc, meta, score in ranked:
        source = meta.get("source", "unknown source")
        page = meta.get("page_number", "N/A")  # Updated to use page_number
        chunk_index = meta.get("chunk_index", "N/A")
        context_parts.append(f"[Source: {source} | Page: {page} | Chunk: {chunk_index}]\n{doc}")

    context = "\n\n".join(context_parts)

    prompt = f"""Answer the following question based on the context below:\n\nContext:\n{context}\n\nQuestion:\n{q}\n\nAnswer:"""

    response = requests.post(
        "http://localhost:11434/api/generate",
        json={"model": "mistral", "prompt": prompt, "stream": False}
    )

    print(response.json())
    answer = response.json().get("response", "").strip()
    return {
        "answer": answer,
        "sources": [
            {
                "source": m.get("source", "unknown source"),
                "chunk_index": m.get("chunk_index", "N/A"),
                "total_chunks": m.get("total_chunks", "N/A"),
                "page_number": m.get("page_number", "N/A"),
                "text_start": m.get("text_start", "N/A"),
                "text_end": m.get("text_end", "N/A"),
                "similarity_score": round(float(s), 4)  
            }
            for (_, m, s) in ranked
        ],
        "chunks": [doc for doc, _, _ in ranked],
        "question": q
    }