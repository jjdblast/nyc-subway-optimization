from flask import Flask
from flask_restful import Resource, Api
from app.handlers.api import *

class Routes():
    def add_routes(api):
        # Add backend routes here
        api.add_resource(TestPage, '/api/tes')