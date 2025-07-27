import fitz  # PyMuPDF

def extract_text_from_pdf(file_bytes):
    doc = fitz.open(stream=file_bytes, filetype="pdf")
    text = ""
    page_mapping = []
    current_pos = 0

    for page_num, page in enumerate(doc):
        page_text = page.get_text()
        page_length = len(page_text)
        page_mapping.append({
            "page": page_num + 1,  # 1-based page numbering
            "start": current_pos,
            "end": current_pos + page_length
        })
        text += page_text
        current_pos += page_length

    doc.close()
    return text, page_mapping