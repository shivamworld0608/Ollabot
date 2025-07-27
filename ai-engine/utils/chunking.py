def chunk_text(text, max_length=512, overlap=50):
    """
    Splits text into overlapping chunks for better context retention.
    """
    chunks = []
    start = 0
    while start < len(text):
        end = min(start + max_length, len(text))
        chunks.append({
            "text": text[start:end],
            "start": start,
            "end": end
        })
        start += max_length - overlap
    return chunks