import uvicorn
from starlette.applications import Starlette
from starlette.responses import JSONResponse
from starlette.routing import Route
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware
from database import database
from models import documents

async def startup():
    try: 
        await database.connect()
        print("Database connection established successfully.")
    except Exception as e:
        print(f"Failed to connect to the database: {e}")


async def shutdown():
    await database.disconnect()

async def fetch_documents(request):
    try:
        results = await database.fetch_all("SELECT * FROM documents")
        results_dict = [dict(result) for result in results]
        return JSONResponse(results_dict)
    except Exception as e:
        return JSONResponse({"error": "Failed to fetch documents"}, status_code=500)

middleware = [
    Middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])
]

routes = [
    Route("/meow-meow", fetch_documents, methods=["GET"])
]

app = Starlette(debug=True, routes=routes, middleware=middleware, on_startup=[startup], on_shutdown=[shutdown])

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8080)
