# ai-engine/main.py
from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from embedder import embed_pdf
from querier import query_answer
import uvicorn

app = FastAPI()

@app.post("/upload")
async def upload(file: UploadFile = File(...)):
    contents = await file.read()
    embed_pdf(contents)
    return {"status": "PDF embedded successfully"}

@app.get("/query")
def ask(q: str):
    answer = query_answer(q)
    return JSONResponse(content={"question": q, "answer": answer})

if __name__ == "__main__":
    print("Starting server at http://127.0.0.1:8000")
    uvicorn.run(app, host="127.0.0.1", port=8000)