<<<<<<< HEAD
```mermaid
flowchart TD
    %% Login
    A["Login<br/>frontend: html<br/>backend: server.js / DB"] --> B["Text input: username"]
    B --> C["Text input: password"]
    C --> D["Username and password element"]
    D --> E{"Check if user and password correct"}

    %% Decision
    E -- False --> F["Edit admin true/false"]
    F --> G["Användar DB"]
    G --> E
    G --> H["Add new user to DB"]
    H --> I["New username and password"]
    I --> J["Text input: new username"]
    I --> K["Text input: new password"]
    J --> L["Signup<br/>frontend: html<br/>backend: server.js / DB"]
    K --> L

    %% True path
    E -- True --> M["server.js"]
    M --> N["Lager DB"]
    N --> O["Vara 1"]
    N --> P["Vara 2"]
    N --> Q["empty"]

    M --> R["Lager<br/>frontend: html<br/>backend: server.js / DB"]
    R --> S["Button: Redigera vara"]
    R --> T["Button: Lägg Till ny vara"]
    R --> U["Button: Ta bort vara"]
    R --> V["Button: Visa lager"]

    S --> W["Redigera speciellt element i DB"]
    T --> X["Lägg till element i DB"]
    U --> Y["Ta bort element i DB"]
    V --> Z["Visa alla element i DB"]

    W --> N
    X --> N
    Y --> N
    Z --> N
=======
Backend (Servern)

Tänk på din backend som hjärnan i systemet som hanterar all data.

server.js är Server-starten.

Den startar Express-servern och ansluter till din databas.

routes/ är Menyn med endpoints.

Här definieras vilka adresser (URL:er) din server kan hantera, till exempel /api/products eller /api/auth/login.

middleware/ är Säkerhetsvakten.

Innan en förfrågan når sin destination, kontrollerar middleware om användaren har rätt att göra det. Till exempel: är användaren inloggad?

controllers/ är Logik-motorn.

Detta är stället där den verkliga logiken bor. Den tar emot förfrågan från routes, hanterar den och interagerar med databasen.

models/ är Databasscheman.

Dessa filer definierar hur din data ska se ut i databasen, till exempel vilka fält en produkt måste ha.

package.json är Projektets manifest.

Den listar alla paket (express, mongoose, etc.) som din backend behöver för att fungera.

Frontend (Klienten)

Tänk på din frontend som användarens gränssnitt, som sköter interaktionen med servern.

views/ är Sidorna.

Detta är de övergripande "sidorna" i din applikation, till exempel LoginView.vue eller ProductView.vue.

components/ är Byggstenarna.

Små, återanvändbara delar av din UI som ProductList.vue eller ProductForm.vue. De sätts ihop för att bygga dina sidor.

router/ är Navigationssystemet.

Denna fil sköter all navigering mellan dina sidor. Den bestämmer vilken "vy" som ska visas när en användare går till en viss URL.

stores/ är Applikationens minne.

Här lagrar du data som är tillgänglig för hela applikationen, som användarens inloggningsstatus eller produktlistan.

api/ är Kommunikationskanalen.

En fil som innehåller funktioner för att skicka och ta emot data från din backend-server.

package.json är Projektets manifest.

Denna fil listar alla paket (vue, vue-router, pinia) som din frontend behöver för att fungera.
>>>>>>> dbb3fac (committed: # modified:  README.md # new file:  backend/server.js # new file:  frontend/src/components/App.vue # new file:  frontend/src/components/main.js # new file:  node_modules/.package-lock.json # new file:  node_modules/@mongodb-js/saslprep/LICENSE # new file:)
