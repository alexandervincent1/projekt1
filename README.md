```mermaid
flowchart TD
    A["login<br>frontend : VUE<br>backend : server.js / DB"] --> B["text input: username"] & AA["signup<br>frontend : VUE<br>backend : server.js / DB"]
    B --> C["text input: password"]
    C --> D["username and password element"]
    D --> E["check if user and password correct"]
    E -- If False --> A
    E -- If True --> F["Check admin true / false"]
    F -- If True --> G["GET DB"]
    F -- If False --> A
    G --> H["server.js"]
    H --> I["lager<br>frontend : VUE<br>backend : server.js / DB"]
    AA --> AB["text input: new username"]
    AB --> AC["text input: new password"]
    AC --> AD["new username and password"]
    AD --> AE["Check if username taken"]
    AE --> AF["användar DB"]
    AF --> AG{"if not taken"}
    AG -- Yes --> AH["add new user to DB"]
    AH --> G
    I --> J["Button PATCH product"] & K["Button POST product"] & L["Button DEL product"] & M["Button GET DB"]
    J --> N["PATCH specific element in DB"]
    K --> O["POST element in DB"]
    L --> P["DEL element in DB"]
    M --> Q["GET elements in DB"]
    N --> R["lager DB"]
    O --> R
    P --> R
    Q --> R
    R --> S["vara 1"] & T["vara 2"] & U["empty"]
    n2["PATCH admin BOOL"] --> H

    H@{ shape: rect}

