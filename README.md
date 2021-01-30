# CodersCamp 2020 - Node.js
## Zadanie praktyczne - Camp Projects REST API 

#### ⏰ Czas na wykonanie: 40 minut

Jako członek ekipy CodersCamp 2021 przygotowujesz backend aplikacji webowej, która będzie gromadzić
projekty wykonane przez uczestników w trakcie trwania kursu.

Dołączyłeś już w trakcie trwania tego projektu, dlatego otrzymujesz zalążek aplikacji.
Zastany kod wykorzystuje framework Express.js i jest napisany z użyciem TypeScript.

W pliku `camp-project.router.ts` znajduje się implementacja dwóch endpointów REST API:
- `GET /api/camp-projects` - zwraca wszystkie projekty
- `POST /api/camp-projects` - tworzy nowy projekt

Wszystkie zapisane projekty jak na razie są przetrzymywane w pamięci (nie stosujemy bazy danych)
i nie będziemy tego aktualnie zmieniać.

### 🚀 Wyzwania stojące przed Tobą

W ramach tego projektu zostało Ci przypisane zadanie, 
którego kryteria akceptacji zostały spisane poniżej.

Wzorując się na już wykonanych endpointach, dodaj kod, który obsłuży poniższe requesty.
Wykonując implementację przestrzegaj zasad narzucanych przez konfigurację tsconfig i tslint.


##### Endpoint GET /api/camp-projects/:id **(20 punktów = 2 x 10 punktów za każdą możliwą odpowiedź)**
Metoda HTTP: GET

Parametr: id — identyfikator projektu

Możliwe odpowiedzi **(10 pkt za każdą)**:
- W przypadku podania identyfikatora dla istniejącego projektu
    - Status Http: 200
    - Response body: Odszukany obiekt CampProject.
        Na przykład:
        ```json
        {
          "id": "ProjectId1",
          "mentor": "Jan Kowalski",
          "gitRepositoryUrl": "https://github.com/CodersCamp2020/CodersCamp2020.Projekt.JavaScript.StarWarsQuiz.git"
        }
        ```
    
- W przypadku podania identyfikatora dla nieistniejącego projektu
    - Status Http: 404
    - Response body: `{"error" : "Cannot find project with id: ${id}"}` za `${id}` należy podstawić przekazany w parametrze identyfikator
 

##### Endpoint DELETE /api/camp-projects/:id **(15 punktów = 3 x 5 punktów za każdą możliwą odpowiedź)**
Wykonanie zapytania powinno powodować usunięcie istniejącego wcześniej projektu poprzez
wykonanie odpowiedniej metody na `CampProjectsRepository`.
**To zadanie należy wykonać dopiero po zaimplementowaniu endpointu GET /api/camp-projects/:id.**

Metoda HTTP: DELETE

Parametr: id — identyfikator projektu

Możliwe odpowiedzi **(5 pkt za każdą)**:
- W przypadku podania identyfikatora dla istniejącego projektu
    - Status Http: 204
    - Response body: Brak.
    
- W przypadku podania identyfikatora dla nieistniejącego projektu
    - Status Http: 404
    - Response body: `{"error" : "Cannot find project with id: ${id}"}` za `${id}` należy podstawić przekazany w parametrze identyfikator

- W przypadku niepodania identyfikatora (parametru id)
    - Status Http: 400
    - Response body: `{"error" : "Requested endpoint is not supported!"}`
 

**Punktów do zdobycia: 35**

Powodzenia, twój zespół liczy na Ciebie! 
