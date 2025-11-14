from fastapi import FastAPI

app = FastAPI()

@app.get("/prisma")
def read_root():
    return {"meatball-price": 2.5}

@app.get("/kmarket")
def read_root():
    return {"meatball-price": 1.5}

@app.get("/lidl")
def read_root():
    return {"meatball-price": 1.75}