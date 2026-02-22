from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


app = FastAPI(
    title="Dummy Backend API",
    description="This is the backend API for react frontend integration.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


class Item(BaseModel):
    id: int
    name: str
    price: float
    is_available: bool


items = [
    {"id": 1, "name": "Router", "price": 15000.50, "is_available": True},
    {"id": 2, "name": "Switch", "price": 8000, "is_available": False},
    {"id": 3, "name": "Hub", "price": 1000, "is_available": True},
    {"id": 4, "name": "Repeater", "price": 20000, "is_available": False}
]


@app.get("/items")
async def get_items():
    return items

@app.post("/items", status_code=status.HTTP_201_CREATED)
async def create_item(item: Item):
    if item in items:
        return {"details": "Already exists!"}
    items.append(item)
    return item

@app.get("/items/{id}")
async def get_item_by_id(id: int):
    for item in items:
        if item["id"] == id:
            return item
    
    return {"details": "Item Not Found!"}
