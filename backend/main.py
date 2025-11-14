from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://team09.hackplay.eu",
    "http://193.178.119.213",
    "http://localhost:8080",
    "http://127.0.0.1:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/prisma")
def prisma():
    return {"meatball-price": 2.5}

@app.get("/kmarket")
def kmarket():
    return {"meatball-price": 1.5}

@app.get("/lidl")
def lidl():
    return {"meatball-price": 1.75}