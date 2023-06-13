from urllib import parse
from pymongo import MongoClient

# connect to cursor
client = MongoClient("mongodb+srv://{account}:{password}@cluster.68iqcvb.mongodb.net/{authenticationDatabase}".format(
    account=parse.quote_plus("admin"),
    password=parse.quote_plus("CSCE482"),
    authenticationDatabase=parse.quote_plus("?retryWrites=true&w=majority")
))
db = client.test
print("successfully connected to the database")