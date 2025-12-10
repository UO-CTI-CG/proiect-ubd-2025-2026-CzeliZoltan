# Proiect-UBD - Czeli Zoltán-Dragoș
# Cartify (eCommerce)

## 📘 Descriere generală

Acest ghid explică modul de construire, rulare și testare a aplicației Cartify (backend și frontend) folosind Docker, Docker Compose și alte instrumente DevOps.  
Sunt incluse instrucțiuni pentru certificate, securitate și infrastructură.
---

# 🧠 Backend

## Cerințe
- Docker ≥ 28
- Docker Compose ≥ 3.9
- Java 25 LTS
- Maven ≥ 3.10
- MySQL 8.1

---

Pentru a plasa cu succes backend-ul în Docker, este necesar să construiești aplicația backend local folosind:
```
./mvnw clean package -DskipTests
```

Pasul următor, pentru o construcție sigură și corectă, este să testezi aplicația backend local fie utilizând funcția Run din IntelliJ, fie rulând manual prin:
```
./mvnw spring-boot:run
```

Când rularea are succes, folosește:
```
docker-compose up --build
```  
pentru a construi și rula imaginea, apoi accesează:
```
https://localhost:8443
https://localhost:8443/swagger-ui.html
```

### Despre Certificate și Securitate

---

Certificatele vor fi generate când se rulează comanda `./mvnw spring-boot:run` într-un director numit `certs`, în repository-ul backend.

Când build-ul este finalizat cu succes, folosește:
```
docker-compose up
```
pentru a rula imaginea și accesează link-ul oferit în terminal (https://localhost:8443).

Pagina web va afișa că conexiunea nu este securizată; în acest caz, dă click pe `show details`, apoi pe `Proceed to the website`.

Acest lucru se întâmplă deoarece certificatul nu a fost importat pe mașina gazdă, creând un conflict de securitate: certificatul este valid, dar nerecunoscut de alte mașini până la import.

Pe partea stângă a paginii de start, dă click pe butonul cu slider-e și se va deschide un dropdown care conține `Connection is not secure`. Dă click pe el, apoi selectează `Certificates`. Selectează tab-ul `Details` și, la final, ar trebui să vezi `Export`.

Odată accesat butonul `Export`, se va descărca un fișier. Deschide fișierul și dă click pe `Install Certificate`, selectează `Current User` -> `Next` -> `Place all certificates in the following store:` -> `Browse` -> `Trusted Root Certification Authorities` și salvează-l acolo.

Acești pași reflectă importul unui certificat auto-semnat și verificat în Trusted Root Certification Authorities, oferind mașinii abilitatea de a recunoaște și utiliza certificatul pentru acces HTTPS.

---

# 🖥️ Frontend

## Dependențe
- Docker ≥ 28
- Docker Compose ≥ 3.9
- npm ≥ 10.8.2
- node ≥ 18.20.8

---

Pentru a plasa cu succes frontend-ul în Docker, la fel ca backend-ul, este necesar să instalezi componentele și să construiești aplicația frontend folosind:
```
npm install
npm build -- --configuration production
```

Pentru a te asigura că certificatul este disponibil înainte de a accesa localhost, rulează:
```
npm start
```
Acest lucru va genera fișierele necesare pentru HTTPS.

### Despre Certificate și Securitate

---

Aceste comenzi se asigură că toate componentele sunt instalate și build-ul este realizat corect înainte de testare sau rulare.

Fișierele `package.json` și `angular.json` au fost modificate pentru a crea un director care conține certificatul necesar pentru acces HTTPS, un mesaj post-start care indică fișierul pentru instrucțiuni și opțiuni de serve.

Când build-ul este finalizat cu succes, folosește:
```
docker-compose up
```
și accesează link-ul oferit în terminal (https://localhost:443).

Pagina web va afișa că conexiunea nu este securizată; dă click pe `show details`, apoi `Proceed to the website`.

Acest lucru se întâmplă deoarece certificatul nu a fost importat pe mașina gazdă, creând un conflict de securitate: certificatul este valid, dar nerecunoscut de alte mașini până la import.

Pe partea stângă a paginii de start, dă click pe butonul cu slider-e, selectează `Connection is not secure` -> `Certificates` -> `Details` -> `Export`.

Descarcă fișierul, deschide-l și dă click pe `Install Certificate`, selectează `Current User` -> `Next` -> `Place all certificates in the following store:` -> `Browse` -> `Trusted Root Certification Authorities` și salvează-l acolo.

Acești pași reflectă importul unui certificat auto-semnat și verificat în Trusted Root Certification Authorities, oferind mașinii abilitatea de a recunoaște și utiliza certificatul pentru acces HTTPS.
