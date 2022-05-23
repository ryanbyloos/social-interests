import csv
import json

movies = {}

with open('data/title-movie.tsv', 'r') as f:
    reader = csv.reader(f, delimiter='\t')
    for row in reader:
        # print(row)
        try:
            int(row[5])
            if(row[4] == '0' and row[0] != 'tconst' and int(row[5]) >= 1900):
                    movies[row[0]]= {"title": row[3], "year": row[5]}
        except:
            continue

crew_mapping = {}
with open('data/crew.tsv', 'r') as f:
    reader = csv.reader(f, delimiter='\t')
    for row in reader:
        try:
            if(row[0] != 'tconst' and row[0] in movies):
                if(row[0] in crew_mapping):
                    crew_mapping[row[0]].append(row[1])
                else:
                    crew_mapping[row[0]] = [row[1]]
        except:
            continue

id_to_name = {}
with open('data/data.tsv', 'r') as f:
    reader = csv.reader(f, delimiter='\t')
    for row in reader:
        try:
            if(row[0] != 'nconst'):
                id_to_name[row[0]] = row[1]
        except:
            continue

for key in crew_mapping: # pour chaque film
    movies[key]['directors'] = [] # on crée une liste de réalisateurs
    for director in crew_mapping[key]: # pour chaque réalisateur
        if(director in id_to_name): # si le réalisateur est dans la liste des réalisateurs
            movies[key]['directors'].append(id_to_name[director]) # on ajoute le réalisateur à la liste des réalisateurs

res = []
for key, value in movies.items():
    res.append(value)
with open('out/movies.json', 'w') as f:
    f.write(json.dumps(res, indent=4))
