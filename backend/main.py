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
    user_id: int
    is_available: bool


items = [
    {"id": 1, "name": "Router", "price": 15000.50, "user_id": 1, "is_available": True},
    {"id": 2, "name": "Switch", "price": 8000, "user_id": 2, "is_available": False},
    {"id": 3, "name": "Hub", "price": 1000, "user_id": 3, "is_available": True},
    {"id": 4, "name": "Cable", "price": 1060, "user_id": 3, "is_available": False},
    {"id": 5, "name": "Power Supply", "price": 1000, "user_id": 3, "is_available": True},
    {"id": 6, "name": "Server", "price": 1800, "user_id": 2, "is_available": True},
    {"id": 7, "name": "Frame", "price": 1000, "user_id": 3, "is_available": False},
    {"id": 8, "name": "Hub", "price": 1440, "user_id": 3, "is_available": True},
    {"id": 9, "name": "Switch", "price": 100, "user_id": 2, "is_available": False},
    {"id": 10, "name": "Wireless Adapter", "price": 1900, "user_id": 3, "is_available": True},
    {"id": 11, "name": "Repeater", "price": 4000, "user_id": 1, "is_available": True},
    {"id": 12, "name": "Repeater", "price": 20000, "user_id": 4, "is_available": False},
    {"id": 13, "name": "Computer", "price": 280000, "user_id": 5, "is_available": True}
]

users = [
    {"id": 1, "username": "admin", "type": "admin", "password": "admin123"},
    {"id": 2, "username": "user1", "type": "user", "password": "user123"},
    {"id": 3, "username": "user2", "type": "user", "password": "user123"},
    {"id": 4, "username": "user3", "type": "user", "password": "user123"},
    {"id": 5, "username": "user4", "type": "user", "password": "user123"}
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

@app.get("/items/{user_id}")
async def get_item_by_user_id(user_id: int):
    user_items = [item for item in items if item["user_id"] == user_id]
    if user_items:
        return user_items
    return {"details": "Item Not Found!"}

@app.post("/login")
async def login(username: str, password: str):
    for user in users:
        if user["username"] == username and user["password"] == password:
            return {"user_id": user["id"], "details": "Login Successful!"}
    
    return {"details": "Invalid Credentials!"}

@app.post("/register")
async def register(username: str, password: str):
    for user in users:
        if user["username"] == username:
            return {"details": "Username already exists!"}
    
    new_user = {"id": len(users) + 1, "username": username, "password": password}
    users.append(new_user)
    return {"details": "Registration Successful!"}

@app.get("/users")
async def get_users():
    return users

@app.get("/users/{id}")
async def get_user_by_id(id: int):
    for user in users:
        if user["id"] == id:
            return user
    
    return {"details": "User Not Found!"}

@app.put("/users/{id}")
async def update_user(id: int, username: str, password: str):
    for user in users:
        if user["id"] == id:
            user["username"] = username
            user["password"] = password
            return {"details": "User Updated!"}
    
    return {"details": "User Not Found!"}

@app.patch("/users/{id}")
async def partial_update_user(id: int, username: str = None, password: str = None):
    for user in users:
        if user["id"] == id:
            if username:
                user["username"] = username
            if password:
                user["password"] = password
            return {"details": "User Partially Updated!"}
    return {"details": "User Not Found!"}

@app.delete("/users/{id}")
async def delete_user(id: int):
    for user in users:
        if user["id"] == id:
            users.remove(user)
            return {"details": "User Deleted!"}
    
    return {"details": "User Not Found!"}
