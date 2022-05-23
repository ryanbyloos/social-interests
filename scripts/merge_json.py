import json
import glob

data = []

for f in glob.glob("out/books_*.json"):
    with open(f, "r") as json_file:
        data.append(json.load(json_file))
with open("out/books.json", "w") as outfile:
    flat_data = [item for sublist in data for item in sublist]
    outfile.write(json.dumps(flat_data, indent=4))
