# 📌: Projektmål och beskrivning the-warehouse-manager-app

En app för att hantera lager för admin och en webbshop för users.

# 🥅 Projektmål

Syftet med projektet är att skapa en digital lager app där admin kan lägga till saker i lager och user kan "handla" varorna från lagret.

# 📁 Projektbeskrivning

appen ska ha 4 delar
- Signup funktion
- Login funktion
- Warehouse sida
- Admin sida
  
# 👥 Målgrupp

"Företag som letar efter ett bra sätt att hålla koll på deras lager samt uppvisa det för användare"

# 🏆 Framgångskritier
- Användare ska kunna skapa konton och logga in och utvalda användare ska ha tillgång till admin sidan
- Admin ska kunna lägga in 10 produkter med stock quantity över 10
- Användare ska kunna lägga in de 10 produkter i shopping carten och den ska visa upp rätt pris för dem 10 då






```mermaid
flowchart TD
    A["login<br>frontend : VUE<br>backend : server.js / DB"] --> B["text input: username"] & AA["signup<br>frontend : VUE<br>backend : server.js / DB"]
    B --> C["text input: password"]
    C --> D["username and password element"]
    D --> E["check if user and password correct (bcrypt)"]
    E -- If False --> A
    E -- If True --> F["Create JWT & Check admin true / false"]
    F -- If True (Admin) --> G["Redirect to /warehouseadmin (GET Products)"]
    F -- If False (User) --> I["Redirect to /warehouse (GET Products)"]
    G --> H["server.js (JWT Auth)"]
    H --> J["lagerhantering (Admin)"]
    AA --> AB["text input: new username"]
    AB --> AC["text input: new password"]
    AC --> AD["new username and password"]
    AD --> AE["Check if username taken"]
    AE --> AF["användar DB"]
    AF --> AG{"if not taken"}
    AG -- Yes --> AH["add new user to DB (password hashed)"]
    AH --> I
    I --> K["lager (User)"]
    J --> L["Button POST product"] & M["Button DEL product"] & N["Button PUT product (Update)"]
    K --> O["Button PUT product (Decrease Stock)"]
    L --> P["POST element in DB"]
    M --> Q["DEL element in DB"]
    N --> R["PATCH specific element in DB"]
    O --> T["PUT Decrease Stock in DB"]
    P --> S["lager DB"]
    Q --> S
    R --> S
    T --> S


