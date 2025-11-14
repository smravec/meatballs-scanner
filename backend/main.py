from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080", "http://127.0.0.1:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/prisma")
def read_root():
    return {"meatball-price": 2.5}

@app.get("/kmarket")
def read_root():
    return {"meatball-price": 1.5}

@app.get("/lidl")
def read_root():
    return {"meatball-price": 1.75}