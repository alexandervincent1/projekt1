```mermaid
flowchart TD
    %% Login
    A[Login<br/>frontend: html<br/>backend: server.js / DB] --> B[Text input: username]
    B --> C[Text input: password]
    C --> D[Username and password element]
    D --> E{Check if user and password correct}

    %% Decision
    E -- False --> F[Edit admin true/false]
    F --> G[Användar DB]
    G --> E
    G --> H[Add new user to DB]
    H --> I[New username and password]
    I --> J[Text input: new username]
    I --> K[Text input: new password]
    J --> L[Signup<br/>frontend: html<br/>backend: server.js / DB]
    K --> L

    %% True path
    E -- True --> M[server.js]
    M --> N[Lager DB]
    N --> O[Vara 1]
    N --> P[Vara 2]
    N --> Q[empty]

    M --> R[Lager<br/>frontend: html<br/>backend: server.js / DB]
    R --> S[Button: Redigera vara]
    R --> T[Button: Lägg Till ny vara]
    R --> U[Button: Ta bort vara]()
