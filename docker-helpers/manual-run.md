# Pokretanje kviz aplikacije s Dockerom (korak po korak)

## Stvaranje Docker Network-a

Ovo omogućuje kontejnerima da komuniciraju međusobno.

```shell
docker network create quiz-network-manual
```

## Pokretanje baze podataka

Baza će biti dostupna na `localhost:5432`, podaci su spremljeni u volumenu `quiz-data-manual`.

```shell
docker run --name quiz-db-manual \
  --network quiz-network-manual \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=quiz_db \
  -v quiz-data-manual:/var/lib/postgresql/data \
  -p 5432:5432 \
  postgres:15
```

## Build i pokretanje backend dijela projekta

Ove naredbe moraju se izvršiti u `backend` direktoriju.
Backend će biti dostupan na `localhost:8080` i povezan s bazom.

```shell
docker build -t quiz-backend-manual .

docker run --name quiz-backend-manual \
  --network quiz-network-manual \
  -e SPRING_DATASOURCE_URL=jdbc:postgresql://quiz-db-manual:5432/quiz_db \
  -e SPRING_DATASOURCE_USERNAME=postgres \
  -e SPRING_DATASOURCE_PASSWORD=postgres \
  -p 8080:8080 \
  quiz-backend-manual
```

## Build i pokretanje frontend dijela projekta

Ove naredbe moraju se izvršiti u `frontend` direktoriju.
Backend će biti dostupan na `localhost:5173`.

```shell
docker build -t quiz-frontend-manual .

docker run --name quiz-frontend-manual \
  --network quiz-network-manual \
  -p 5173:5173 \
  quiz-frontend-manual
```
