# Requirements Document - current EZElectronics

Date:

Version: V1 - description of EZElectronics in CURRENT form (as received by teachers)

| Version number | Change |
| :------------: | :----: |
|                |        |

# Contents

- [Requirements Document - current EZElectronics](#requirements-document---current-ezelectronics)
- [Contents](#contents)
- [Informal description](#informal-description)
- [Stakeholders](#stakeholders)
- [Context Diagram and interfaces](#context-diagram-and-interfaces)
  - [Context Diagram](#context-diagram)
  - [Interfaces](#interfaces)
- [Stories and personas](#stories-and-personas)
- [Functional and non functional requirements](#functional-and-non-functional-requirements)
  - [Functional Requirements](#functional-requirements)
  - [Non Functional Requirements](#non-functional-requirements)
- [Use case diagram and use cases](#use-case-diagram-and-use-cases)
  - [Use case diagram](#use-case-diagram)
    - [Use case 1, UC1 Login](#use-case-1-uc1-login)
      - [Scenario 1.1](#scenario-11)
      - [Scenario 1.2](#scenario-12)
      - [Scenario 1.3](#Scenario-13)
    - [Use case 2, UC2 Logout](#use-case-2-uc2-logout)
      - [Scenario 2.1](#scenario-21)
      - [Scenario 2.2](#scenario-22)
    - [Use case 3, UC3 Registrazione nuovo utente](#use-case-3-uc3-registrazione-nuovo-utente)
      - [Scenario 3.1](#scenario-31)
      - [Scenario 3.2](#scenario-32)
      - [Scenario 3.3](#Scenario-33)
    - [Use case 4, UC4 Cancellazione utente](#use-case-4-uc4-cancellazione-utente)
      - [Scenario 4.1](#scenario-41)
      - [Scenario 4.2](#scenario-42)
    - [Use case 5, UC5 Routes per visualizzare utenti](#use-case-5-uc5-routes-per-visualizzare-utenti)
      - [Scenario 5.1](#scenario-51)
      - [Scenario 5.2](#scenario-52)
      - [Scenario 5.3](#scenario-53)
      - [Scenario 5.4](#scenario-54)
      - [Scenario 5.5](#scenario-55)
    - [Use case 6, UC6 Visualizzazione informazioni utente loggato](#use-case-6-uc6-visualizzazione-informazioni-utente-loggato)
      - [Scenario 6.1](#scenario-61)
      - [Scenario 6.2](#scenario-62)
    - [Use case 7, UC7 Registrazione nuovo prodotto](#use-case-7-uc7-registrazione-nuovo-prodotto)
      - [Scenario 7.1](#scenario-71)
      - [Scenario 7.2](#scenario-72)
      - [Scenario 7.3](#scenario-73)
      - [Scenario 7.4](#scenario-74)
    - [Use case 8, UC8 Aumento disponibilità di un prodotto](use-case-8-uc8-aumento-disponibilità-di-un-prodotto)
      - [Scenario 8.1](#scenario-81)
      - [Scenario 8.2](#scenario-82)
      - [Scenario 8.3](#scenario-83)
    - [Use case 9, UC9 Vendita di un prodotto](#use-case-9-uc9-vendita-di-un-prodotto)
      - [Scenario 9.1](#scenario-91)
      - [Scenario 9.2](#scenario-92)
      - [Scenario 9.3](#scenario-93)
      - [Scenario 9.4](#scenario-94)
      - [Scenario 9.5](#scenario-95)
    - [Use case 10, UC10 Cancellazione di un prodotto](#use-case-10-uc10-cancellazione-di-un-prodotto)
      - [Scenario 10.1](#scenario-101)
      - [Scenario 10.2](#scenario-102)
    - [Use case 11, UC11 Visualizzazione tutti i prodotti](#use-case-11-uc11-visualizzazione-tutti-i-prodotti)
      - [Scenario 11.1](#scenario-111)
      - [Scenario 11.2](#scenario-112)
      - [Scenario 11.3](#scenario-113)
    - [Use case 12, UC12 Visualizzazione informazioni prodotto](#use-case-12-uc12-visualizzazione-informazioni-prodotto)
      - [Scenario 12.1](#scenario-121)
      - [Scenario 12.2](#scenario-122)
      - [Scenario 12.3](#scenario-123)
    - [Use case 13, UC13 Routes per visualizzare prodotti specifici (per categoria, per modello)](#use-case-13-uc13-routes-per-visualizzare-prodotti-specifici-per-categoria-per-modello)
      - [Scenario 13.1](#scenario-131)
      - [Scenario 13.2](#scenario-132)
      - [Scenario 13.3](#scenario-133)
      - [Scenario 13.4](#scenario-134)
      - [Scenario 13.5](#scenario-135)
      - [Scenario 13.6](#scenario-136)
    - [Use case 14, UC14 Visualizzazione carrello](#use-case-14-uc14-visualizzazione-carrello)
      - [Scenario 14.1](#scenario-141)
      - [Scenario 14.2](#scenario-142)
    - [Use case 15, UC15 Aggiunta di un prodotto](#use-case-15-uc15-aggiunta-di-un-prodotto)
      - [Scenario 15.1](#scenario-151)
      - [Scenario 15.2](#scenario-152)
      - [Scenario 15.3](#scenario-153)
      - [Scenario 15.4](#scenario-154)
      - [Scenario 15.5](#scenario-155)
    - [Use case 16, UC16 Rimozione di un prodotto](#use-case-16-uc16-rimozione-di-un-prodotto)
      - [Scenario 16.1](#scenario-161)
      - [Scenario 16.2](#scenario-162)
      - [Scenario 16.3](#scenario-163)
      - [Scenario 16.4](#scenario-164)
      - [Scenario 16.5](#scenario-165)
      - [Scenario 16.6](#scenario-166)
    - [Use case 17, UC17 Rimozione di tutti gli oggetti di un carrello](#use-case-17-uc17-rimozione-di-tutti-gli-oggetti-di-un-carrello)
      - [Scenario 17.1](#scenario-171)
      - [Scenario 17.2](#scenario-172)
      - [Scenario 17.3](#scenario-173)
    - [Use case 18, UC18 Checkout ordine corrente](#use-case-18-uc18-checkout-ordine-corrente)
      - [Scenario 18.1](#scenario-181)
      - [Scenario 18.2](#scenario-182)
      - [Scenario 18.3](#scenario-183)
    - [Use case 19, UC19 Visualizzazione storico ordini](#use-case-19-uc19-visualizzazione-storico-ordini)
      - [Scenario 19.1](#scenario-191)
      - [Scenario 19.2](#scenario-192)
    - [Use case 20, UC20 Accettazione ordine da parte del manager](#use-case-20-uc20-accettazione-ordine-da-parte-del-manager)
      - [Scenario 20.1](#scenario-201)
      - [Scenario 20.2](#scenario-202)
      - [Scenario 20.3](#scenario-203)
- [Glossary](#glossary)
- [System Design](#system-design)
- [Deployment Diagram](#deployment-diagram)
- [Table of Rights](#table-of-rights)

# Informal description

EZElectronics (read EaSy Electronics) is a software application designed to help managers of electronics stores to manage their products and offer them to customers through a dedicated website. Managers can assess the available products, record new ones, and confirm purchases. Customers can see available products, add them to a cart and see the history of their past purchases.

# Stakeholders

| Stakeholder name | Description |
| :--------------: | :---------: |
| Customer   |Il cliente del sito|
|Manager|Si occupa di gestire lo store|
|Competitors|La concorrenza dello store|
|Developers|Chi scrive il codice dello store|

# Context Diagram and interfaces

## Context Diagram

![Context Diagram](/images/Diagram/V1_context.jpg)

## Interfaces



|   Actor   | Logical Interface | Physical Interface |
| :-------: | :---------------: | :----------------: |
| Customer |GUI                    |PC               |
|Manager    |GUI                |PC                   |
# Stories and personas

- **JAMES, 23, STUDENTE**
  - Studente appassionato di elettronica che frequenta l’università e ama applicare nella realtà quello che impara sui libri. 
  - Necessita di uno store molto ben fornito a prezzi convenienti e con molte informazioni tecniche per scegliere al meglio.

- **GIOVANNA, 47, LAVORATRICE**
  - Lavoratrice che necessita occasionalmente di un nuovo apparecchio.
  - Ha una certa disponibilità economica ma necessita di un sito altamente leggibile e facile da usare, essendo spesso impegnata.

- **PIER, 55, PADRE-LAVORATORE**
  - Lavoratore e padre con bambini in età pre-adolescenziale.
  - Non è molto bravo nell’utilizzo di sistemi informatici, ma ha necessità di acquistare nuove tecnologie con una certa regolarità per sé o per i propri figli.




# Functional and non functional requirements

## Functional Requirements


|  ID   | Description |
| :---: | :---------: |
| **FR1  Autenticazione e autorizzazione**    |
| FR1.1 |   Login          |
| FR1.2 |   Logout          |
| FR1.3 |   Registrazione nuovo utente |
| FR2 |   Gestione utenti |
| FR2.1 | Cancellazione utente  |
| FR2.2	| Visualizzare utenti (per ruolo, per username)  |
| FR2.3|  Visualizzazione informazioni utente loggato | 
| **FR3 Gestione prodotti**   |
| FR3.1 | Registrazione nuovo prodotto  |
| FR3.2 | Aumento disponibilità di un prodotto  |
| FR3.3 | Vendita di un prodotto  |
| FR3.4 | Cancellazione di un prodotto  |
| **FR4  Ricerca prodotti** |
| FR4.1 | Visualizzazione tutti i prodotti  |
| FR4.2 | Visualizzazione informazioni prodotto |
| FR4.3 | Visualizzare prodotti specifici (per categoria, per modello) |
| **FR5   Gestione carrello** |
| FR5.1 | Visualizzazione carrello  |
| FR5.2 |  Aggiunta di un prodotto  |
| FR5.3 | Rimozione di un prodotto  |
| FR5.4 |  Rimozione di tutti gli oggetti di un carrello  |
| **FR6   Gestione ordini** |
| FR6.1 |  Checkout ordine corrente |
| FR6.2 | Visualizzazione storico ordini  |
| FR6.3 | Accettazione ordine da parte del manager  |


## Non Functional Requirements


|   ID    | Type (efficiency, reliability, ..) | Description | Refers to |
| :-----: | :--------------------------------: | :---------: | :-------: |
| NFR1    |             Efficienza             |    Tutte le funzionalità del sito devono completarsi in un tempo < 0.1 sec (escludendo la rete). | FR2-FR6 |
| NFR2    |             Affidabilità           |    Ogni utente non deve verificare più di un bug all’anno. Il sito deve essere in grado di supportare almeno 500 utenti contemporaneamente. | FR1-FR5 |
| NFR3    |             Sicurezza              |    Tutti i dati sensibili devono essere tenuti nel database non in chiaro. Sulla rete, pubblica o privata, non devono circolare dati non criptati.         | FR1 |
| NFR4    |             Usabilità              |    La sessione dell’utente, una volta effettuato il login, rimane attiva fino all’effettuazione del logout.  | FR1-FR6 |
| NFR5    |             Usabilità              |    L’utente non deve aver bisogno di un training per l’utilizzo dell’applicazione.  | FR1-FR6 |
| NFR6    |             Portabilità            |    Il sito web deve essere disponibile per i seguenti browser: Chrome, Firefox, Safari, Opera  | FR1-FR6 |

# Use case diagram and use cases

## Use case diagram

![Use Case Diagram](/images/Diagram/V1_UC.png)
### Use case 1, UC1 Login

| Actors Involved  | Customer, Manager |
| :--------------: | :------------------------------------------------------------------: |
|   Precondition   | Utente con account (username e password)                             |
|  Post condition  | Utente loggato                                                       |
| Nominal Scenario | Scenario 1.1                                                         |
|   Variants       |                                                                      |
|    Exceptions    | Scenario 1.2, Scenario 1.3                                           |

##### Scenario 1.1
|  Scenario 1.1  |                  Tutto corretto                                            |
| :------------: | :------------------------------------------------------------------------: |
|  Precondition  | Utente con account (username e password)                                   |
| Post condition |  Utente loggato                                                            |
|     Step#      |                                Description                                 |
|       1        | Utente chiede di effettuare il login                                       |
|       2        | Sistema chiede username e password                                         |
|       3        | Utente inserisce username e password                                       |
|       4        | Sistema verifica le credenziali                                            |
|       5        | Sistema autorizza l'utente e serializza la sessione                        |
|       6        | Sistema ritorna status code "200"                                          |

##### Scenario 1.2
|  Scenario 1.2  |                 Account non esistente                                      |
| :------------: | :------------------------------------------------------------------------: |
|  Precondition  | Account non esistente                                                      |
| Post condition |  Utente non loggato                                                        |
|     Step#      |                                Description                                 |
|       1        | Utente chiede di effettuare il login                                       |
|       2        | Sistema chiede username e password                                         |
|       3        | Utente inserisce username e password                                       |
|       4        | Sistema verifica le credenziali ma non trova account con quello username nel db  |
|       5        | Sistema ritorna status code "422" e messaggio "crea account"               |

##### Scenario 1.3
|  Scenario 1.3  |                   Password sbagliata                                       |
| :------------: | :------------------------------------------------------------------------: |
|  Precondition  | Password sbagliata                                                         |
| Post condition |  Utente non loggato                                                        |
|     Step#      |                                Description                                 |
|       1        | Utente chiede di effettuare il login                                       |
|       2        | Sistema chiede username e password                                         |
|       3        | Utente inserisce username e password                                       |
|       4        | Sistema verifica le credenziali ma non sono corrette                       |
|       5        | Sistema ritorna status code "422" e messaggio "credenziali errate"         |



### Use case 2, UC2 Logout

| Actors Involved  |Customer, Manager |
| :--------------: | :------------------------------------------------------------------: |
|   Precondition   | Utente loggato                                                       |
|  Post condition  | Utente non loggato                                                   |
| Nominal Scenario | Scenario 2.1                                                         |
|   Variants       |                                                                      |
|    Exceptions    | Scenario 2.2                                                         |

##### Scenario 2.1
|  Scenario 2.1  |                  Logout effettuato correttamente                           |
| :------------: | :------------------------------------------------------------------------: |
|  Precondition  | Utente loggato                                                             |
| Post condition |  Utente  non loggato                                                       |
|     Step#      |                                Description                                 |
|       1        | Utente chiede di effettuare il logout                                      |
|       2        | Sistema cerca l'utente e verifica se è loggato                             |
|       3        | Sistema rimuove l'autorizzazione della sessione all'utente                 |
|       4        | Sistema ritorna status code "200"                                          |

##### Scenario 2.2
|  Scenario 2.2  |                 Utente non loggato       |
| :------------: | :------------------------------------------------------------------------: |
|  Precondition  | Utente non loggato                                                         |
| Post condition |  Utente non loggato                                                        |
|     Step#      |                                Description                                 |
|       1        | Utente chiede di effettuare il logout                                      |
|       2        | Sistema cerca l'utente e verifica che è già non loggato                    |
|       3        | Sistema ritorna status code "401" e messaggio "utente già non loggato"     |



### Use case 3, UC3 Registrazione nuovo utente

| Actors Involved        | Customer, Manager                    |
| ---------------------- |:-----------------------:| 
|  Precondition          | Utente senza un account |
|  Post condition        | Utente registrato       |
|  Nominal Scenario      | Scenario 3.1            |
|  Variants              | None                    |
|  Exceptions            | Scenario 3.2, Scenario 3.3     |

##### Scenario 3.1 

| Scenario 3.1 | Registrazione nuovo utente |
| ------------- |:-------------:| 
|  Precondition     | Utente senza un account |
|  Post condition     | Utente registrato |
| Step#        | Description  |  
|  1     | Utente chiede di essere registrato  |
|  2     | Sistema chiede username, nome, cognome, password e ruolo |
|  3     | Utente fornisce i dati |
|  4     | Sistema verifica che i dati non siano già presenti nel database: dati univoci |
|  5     | Sistema ritorna status code "200", crea il nuovo utente e deposita informazioni nel database |

##### Scenario 3.2 

| Scenario 3.2 | Username non presente |
| ------------- |:-------------:| 
|  Precondition     | Utente non inserisce lo username |
|  Post condition     | Registrazione fallita |
| Step#        | Description  |
|  1     | Utente chiede di essere registrato  |
|  2     | Sistema chiede username, nome, cognome, password e ruolo |
|  3     | Utente fornisce tutti i dati, tranne lo username |
|  4     | Sistema verifica che i dati siano stati inseriti: username non inserito |
|  5     | Sistema ritorna status code "422" e messaggio "inserire lo username" |

##### Scenario 3.3 

| Scenario 3.3 | Utente già registrato |
| ------------- |:-------------:| 
|  Precondition     | Utente ha l'account|
|  Post condition     | Registrazione fallita |
| Step#        | Description  |
|  1     | Utente chiede di essere registrato  |
|  2     | Sistema chiede username, nome, cognome, password e ruolo |
|  3     | Utente fornisce i dati |
|  4     | Sistema verifica che i dati siano univoci: dati già presenti nel database |
|  5     | Sistema ritorna status code "409" e messaggio "utente già registrato" |



### Use case 4, UC4 Cancellazione utente

| Actors Involved  | Customer, Manager                                                              |
| :--------------: | :------------------------------------------------------------------: |
|   Precondition   | Utente presente nel database                            |
|  Post condition  | Utente rimosso dal database                                  |
| Nominal Scenario | Scenario 4.1                                                         |
|   Variants       |                                                                      |
|    Exceptions    | Scenario 4.2        |

##### Scenario 4.1
|  Scenario 4.1  |                  Tutto corretto                                            |
| :------------: | :------------------------------------------------------------------------: |
|  Precondition  | Utente presente nel database                        |
| Post condition |  Utente rimosso dal database                                                           |
|     Step#      |                                Description                                 |
|       1        | Viene chiesta l'eliminazione di un utente                                       |
|       2        | La richiesta viene inviata tramite lo username univoco dell'utente                                        |
|       3        | Sistema verifica la presenza dello username nel db e elimina l'utente |
|       4        | Sistema ritorna status code "200" e un messaggio con scritto "Utente con username eliminato"                    |

##### Scenario 4.2
|  Scenario 4.2  |                 Username non esistente                                      |
| :------------: | :------------------------------------------------------------------------: |
|  Precondition  | Username non esistente                                                      |
| Post condition |  Cancellazione utente fallita                                                        |
|     Step#      |                                Description                                 |
|       1        | Viene chiesta l'eliminazione di un utente                                       |
|       2        | La richiesta viene inviata tramite lo username univoco dell'utente                                        |
|       3        | Sistema verifica la presenza dello username nel db: username non presente |
|       4        | Sistema ritorna status code "404" e un messaggio con scritto "Utente non esistente nel database"                    |



### Use case 5, UC5 Routes per visualizzare utenti

| Actors Involved        | Customer, Manager                    |
| ---------------------- |:-----------------------:| 
|  Precondition          | Utente loggato nella sezione visualizzazione |
|  Post condition        | Lista degli utenti restituita       |
|  Nominal Scenario      | Scenario 5.1            |
|  Variants              | Scenario 5.2, Scenario 5.3                    |
|  Exceptions            | Scenario 5.4, Scenario 5.5     |

##### Scenario 5.1 

| Scenario 5.1 | Visualizzazione lista tutti gli utenti |
| ------------- |:-------------:| 
|  Precondition     | Utente loggato nella sezione visualizzazione |
|  Post condition     | Lista di tutti gli utenti |
| Step#        | Description  |  
|  1     | Utente chiede di visualizzare la lista di tutti gli utenti  |
|  2     | Sistema chiede la lista al backend |
|  3     | Sistema ritorna status code "200" e viene mostrata la lista |

##### Scenario 5.2 

| Scenario 5.2 | Visualizzazione lista degli utenti con uno specifico ruolo |
| ------------- |:-------------:| 
|  Precondition     | Utente loggato nella sezione visualizzazione |
|  Post condition     | Lista degli utenti con uno specifico ruolo |
| Step#        | Description  |
|  1     | Utente chiede di visualizzare la lista di tutti gli utenti con uno specifico ruolo|
|  2     | Sistema chiede la lista filtrata al backend |
|  3     | Vengono effettuate le aggregazioni e raggruppati gli utenti con lo stesso ruolo |
|  4     | Sistema ritorna status code "200" e viene mostrata la lista |

##### Scenario 5.3 

| Scenario 5.3 | Visualizzazione utente con uno specifico username |
| ------------- |:-------------:| 
|  Precondition     | Utente loggato nella sezione visualizzazione |
|  Post condition     | Dati dell'utente con uno specifico username |
| Step#        | Description  |
|  1     | Utente chiede di visualizzare un utente con uno specifico username |
|  2     | Sistema chiede lo username |
|  3     | Utente inserisce lo username |
|  4     | Sistema verifica se lo username è presente nel db |
|  5     | Sistema ritorna status code "200" e viene mostrato l'utente richiesto |

##### Scenario 5.4 

| Scenario 5.4 | Ruolo non esistente |
| ------------- |:-------------:| 
|  Precondition     | Ruolo non esistente |
|  Post condition     | Visualizzazione fallita |
| Step#        | Description  |
|  1     | Utente chiede di visualizzare la lista di tutti gli utenti con uno specifico ruolo|
|  2     | Sistema verifica che non esiste il ruolo richiesto | 
|  3     | Sistema ritorna status code "422" e mostra messaggio errore |

##### Scenario 5.5 

| Scenario 5.5 | Username non esistente |
| ------------- |:-------------:| 
|  Precondition     | Username non esistente |
|  Post condition     | Visualizzazione fallita |
| Step#        | Description  |
|  1     | Utente chiede di visualizzare un utente con uno specifico username |
|  2     | Sistema chiede lo username |
|  3     | Utente inserisce lo username |
|  4     | Sistema verifica se lo username è presente nel db: username non esistente |
|  5     | Sistema ritorna status code "404" e mostra messaggio errore |



### Use case 6, UC6 Visualizzazione informazioni utente loggato

| Actors Involved        | Customer, Manager                    |
| ---------------------- |:-----------------------:| 
|  Precondition          | Utente loggato |
|  Post condition        | Informazioni riguardo l'utente loggato       |
|  Nominal Scenario      | Scenario 6.1            |
|  Variants              |                     |
|  Exceptions            | Scenario 6.2     |

##### Scenario 6.1 

| Scenario 6.1 | Informazioni riguardo l'utente loggato |
| ------------- |:-------------:| 
|  Precondition          | Utente loggato |
|  Post condition        | Informazioni riguardo l'utente loggato       |
| Step#        | Description  |  
|  1     | Richiesta di visualizzare le informazioni riguardo l'utente loggato |
|  2     | Sistema verifica che l'utente sia loggato |
|  3     | Sistema chiede le informazioni al backend |
|  4     | Sistema ritorna status code "200" e vengono mostrati i dati dell'utente |

##### Scenario 6.2 
_
| Scenario 6.2 | Utente non loggato |
| ------------- |:-------------:| 
|  Precondition     | Utente non loggato |
|  Post condition     | Visualizzazione fallita |
| Step#        | Description  |
|  1     | Richiesta di visualizzare le informazioni riguardo l'utente loggato |
|  2     | Sistema verifica che l'utente sia loggato: utente non loggato |
|  3     | Sistema ritorna status code "401" e viene mostrato messaggio errore "utente non loggato" |



### Use case 7, UC7 Registrazione nuovo prodotto

| Actors Involved        | Manager                    |
| ---------------------- |:-----------------------:| 
|  Precondition          | Utente manager loggato |
|  Post condition        | Prodotto creato       |
|  Nominal Scenario      | Scenario 7.1            |
|  Variants              | None                    |
|  Exceptions            | Scenario 7.2, Scenario 7.3, Scenario 7.4     |

##### Scenario 7.1 

| Scenario 7.1 | Registrazione nuovo prodotto |
| ------------- |:-------------:| 
|  Precondition          | Utente manager loggato |
|  Post condition        | Prodotto creato       |
| Step#        | Description  |  
|  1     | Utente chiede di aggiungere un prodotto  |
|  2     | Sistema verifica che sia un manager |
|  3     | Utente fornisce i dati (codice, prezzo di vendita, modello, categoria, dettagli, data di arrivo) del prodotto |
|  4     | Sistema verifica che i dati siano corretti e non già presenti nel database: dati corretti e univoci |
|  5     | Sistema ritorna status code "200", crea il nuovo prodotto e deposita informazioni nel database |

##### Scenario 7.2 

| Scenario 7.2 | Utente non manager |
| ------------- |:-------------:| 
|  Precondition     | Utente non manager |
|  Post condition     | Registrazione fallita |
| Step#        | Description  |
|  1     | Utente chiede di aggiungere un prodotto  |
|  2     | Sistema verifica che sia un manager: utente non manager |
|  3     | Sistema ritorna status code "401" e messaggio "utente non manager" |

##### Scenario 7.3 

| Scenario 7.3 | Prodotto già esistente |
| ------------- |:-------------:| 
|  Precondition     | Prodotto già esistente|
|  Post condition     | Registrazione fallita |
| Step#        | Description  |
|  1     | Utente chiede di aggiungere un prodotto  |
|  2     | Sistema verifica che sia un manager |
|  3     | Utente fornisce i dati (codice, prezzo di vendita, modello, categoria, dettagli, data di arrivo) del prodotto |
|  4     | Sistema verifica che i dati siano corretti e non già presenti nel database: dati corretti ma non univoci |
|  5     | Sistema ritorna status code "409" e messaggio "prodotto già esistente" |

##### Scenario 7.4 

| Scenario 7.4 | Data di arrivo posteriore a quella corrente |
| ------------- |:-------------:| 
|  Precondition     | Data di arrivo posteriore a quella corrente |
|  Post condition     | Registrazione fallita |
| Step#        | Description  |
|  1     | Utente chiede di aggiungere un prodotto  |
|  2     | Sistema verifica che sia un manager |
|  3     | Utente fornisce i dati (codice, prezzo di vendita, modello, categoria, dettagli, data di arrivo) del prodotto |
|  4     | Sistema verifica che i dati siano corretti e non già presenti nel database: dati incorretti perchè data di arrivo posteriore a quella corrente |
|  5     | Sistema ritorna status code "422" e messaggio "data di arrivo errata" |



### Use case 8, UC8 Aumento disponibilità di un prodotto

| Actors Involved        | Manager                    |
| ---------------------- |:-----------------------:| 
|  Precondition          | Utente manager loggato |
|  Post condition        | Registrazione arrivo di un set di prodotti dello stesso modello registrato      |
|  Nominal Scenario      | Scenario 8.1            |
|  Variants              | None                    |
|  Exceptions            | Scenario 8.2, Scenario 8.3     |

##### Scenario 8.1 

| Scenario 8.1 | Aumento disponibilità di un prodotto |
| ------------- |:-------------:| 
|  Precondition          | Utente manager loggato |
|  Post condition        | Arrivo di un set di prodotti dello stesso modello registrato      |
| Step#        | Description  |  
|  1     | Utente chiede di aumentare la disponibilità di un prodotto di uno specifico modello  |
|  2     | Sistema verifica che sia un manager |
|  3     | Utente fornisce i dati (modello, categoria, dettagli, quantità, data di arrivo, prezzo di vendita) del prodotto |
|  4     | Sistema verifica che i dati siano corretti: dati corretti |
|  5     | Sistema ritorna status code "200" e aggiorna i dati presenti nel database |

##### Scenario 8.2 

| Scenario 8.2 | Utente non manager |
| ------------- |:-------------:| 
|  Precondition     | Utente non manager |
|  Post condition     | Registrazione fallita |
| Step#        | Description  |
|  1     | Utente chiede di aumentare la disponibilità di un prodotto di uno specifico modello  |
|  2     | Sistema verifica che sia un manager: utente non manager |
|  3     | Sistema ritorna status code "401" e messaggio "utente non manager" |

##### Scenario 8.3 

| Scenario 8.3 | Data di arrivo posteriore a quella corrente |
| ------------- |:-------------:| 
|  Precondition     | Data di arrivo posteriore a quella corrente |
|  Post condition     | Registrazione fallita |
| Step#        | Description  |
|  1     | Utente chiede di aumentare la disponibilità di un prodotto di uno specifico modello  |
|  2     | Sistema verifica che sia un manager |
|  3     | Utente fornisce i dati (modello, categoria, dettagli, quantità, data di arrivo, prezzo di vendita) del prodotto |
|  4     | Sistema verifica che i dati siano corretti: dati incorretti perchè data di arrivo posteriore a quella corrente |
|  5     | Sistema ritorna status code "422" e messaggio "data di arrivo errata" |



### Use case 9, UC9 Vendita di un prodotto

| Actors Involved        | Manager                    |
| ---------------------- |:-----------------------:| 
|  Precondition          | Utente manager loggato |
|  Post condition        | Prodotto segnato come venduto      |
|  Nominal Scenario      | Scenario 9.1            |
|  Variants              | None                    |
|  Exceptions            | Scenario 9.2, Scenario 9.3, Scenario 9.4, Scenario 9.5     |

##### Scenario 9.1 

| Scenario 9.1 | Prodotto segnato come venduto |
| ------------- |:-------------:| 
|  Precondition          | Utente manager loggato |
|  Post condition        | Prodotto segnato come venduto      |
| Step#        | Description  |  
|  1     | Utente chiede di segnare un prodotto come venduto  |
|  2     | Sistema verifica che sia un manager |
|  3     | Utente fornisce i dati (codice univoco e data di vendita) del prodotto |
|  4     | Sistema verifica che i dati siano corretti: dati corretti |
|  5     | Sistema ritorna status code "200" e aggiorna i dati presenti nel database |

##### Scenario 9.2 

| Scenario 9.2 | Utente non manager |
| ------------- |:-------------:| 
|  Precondition     | Utente non manager |
|  Post condition     | Vendita fallita |
| Step#        | Description  |
|  1     | Utente chiede di segnare un prodotto come venduto  |
|  2     | Sistema verifica che sia un manager: utente non manager |
|  3     | Sistema ritorna status code "401" e messaggio "utente non manager" |

##### Scenario 9.3 

| Scenario 9.3 | Data di vendita errata |
| ------------- |:-------------:| 
|  Precondition     | Data di vendita errata |
|  Post condition     | Vendita fallita |
| Step#        | Description  |
|  1     | Utente chiede di segnare un prodotto come venduto  |
|  2     | Sistema verifica che sia un manager |
|  3     | Utente fornisce i dati (codice univoco e data di vendita) del prodotto |
|  4     | Sistema verifica che i dati siano corretti: dati incorretti perchè data di vendita posteriore a quella corrente o precedente alla data di arrivo del prodotto |
|  5     | Sistema ritorna status code "422" e messaggio "data di vendita errata" |

##### Scenario 9.4 

| Scenario 9.4 | Prodotto non esistente |
| ------------- |:-------------:| 
|  Precondition     | Codice prodotto non esistente nel database |
|  Post condition     | Vendita fallita |
| Step#        | Description  |
|  1     | Utente chiede di segnare un prodotto come venduto  |
|  2     | Sistema verifica che sia un manager |
|  3     | Utente fornisce i dati (codice univoco e data di vendita) del prodotto |
|  4     | Sistema verifica che i dati siano corretti: dati incorretti perchè codice prodotto non esistente nel database |
|  5     | Sistema ritorna status code "404" e messaggio "prodotto non presente nel database" |

##### Scenario 9.5 

| Scenario 9.5 | Prodotto già venduto |
| ------------- |:-------------:| 
|  Precondition     | Prodotto già venduto |
|  Post condition     | Vendita fallita |
| Step#        | Description  |
|  1     | Utente chiede di segnare un prodotto come venduto  |
|  2     | Sistema verifica che sia un manager |
|  3     | Utente fornisce i dati (codice univoco e data di vendita) del prodotto |
|  4     | Sistema verifica che i dati siano corretti: prodotto risulta già venduto nel database |
|  5     | Sistema ritorna status code "422" e messaggio "prodotto già venduto" |



### Use case 10, UC10 Cancellazione di un prodotto

| Actors Involved  |  Manager                                                              |
| :--------------: | :------------------------------------------------------------------: |
|   Precondition   | Utente manager presente nel database                            |
|  Post condition  | Prodotto rimosso dal database                                  |
| Nominal Scenario | Scenario 10.1                                                         |
|   Variants       |                                                                      |
|    Exceptions    | Scenario 10.2        |

##### Scenario 10.1
|  Scenario 10.1  |                  Tutto corretto                                            |
| :------------: | :------------------------------------------------------------------------: |
|  Precondition  | Utente manager loggato                        |
| Post condition |  Prodotto rimosso dal database                                                           |
|     Step#      |                                Description                                 |
|       1        | Viene chiesta l'eliminazione di un prodotto                                       |
|       2        | La richiesta viene inviata tramite il codice univoco del prodotto                                        |
|       3        | Sistema verifica la presenza del codice nel db e elimina il prodotto |
|       4        | Sistema ritorna status code "200" e un messaggio con scritto "Prodotto con codice eliminato"                    |

##### Scenario 10.2
|  Scenario 10.2  |                 Prodotto non esistente                                      |
| :------------: | :------------------------------------------------------------------------: |
|  Precondition  | Prodotto non esistente                                                      |
| Post condition |  Cancellazione prodotto fallita                                                        |
|     Step#      |                                Description                                 |
|       1        | Viene chiesta l'eliminazione di un prodotto                                       |
|       2        | La richiesta viene inviata tramite il codice univoco del prodotto                                        |
|       3        | Sistema verifica la presenza del codice nel db: codice non presente |
|       4        | Sistema ritorna status code "404" e un messaggio con scritto "Prodotto non esistente nel database"                    |



### Use case 11, UC11 Visualizzazione tutti i prodotti

| Actors Involved        | Customer, Manager                    |
| ---------------------- |:-----------------------:| 
|  Precondition          | Utente loggato nella sezione visualizzazione |
|  Post condition        | Lista di tutti i prodotti restituita       |
|  Nominal Scenario      | Scenario 11.1            |
|  Variants              | Scenario 11.2          |
|  Exceptions            | Scenario 11.3    |

##### Scenario 11.1 

| Scenario 11.1 | Visualizzazione lista tutti gli utenti |
| ------------- |:-------------:| 
|  Precondition     | Utente loggato nella sezione visualizzazione |
|  Post condition     | Lista di tutti i prodotti |
| Step#        | Description  |  
|  1     | Utente chiede di visualizzare la lista di tutti i prodotti  |
|  2     | Sistema verifica che l'utente sia loggato e chiede la lista al backend |
|  3     | Sistema ritorna status code "200" e viene mostrata la lista |

##### Scenario 11.2 

| Scenario 11.2 | Visualizzazione lista dei soli prodotti venduti/non ancora venduti |
| ------------- |:-------------:| 
|  Precondition     | Utente loggato nella sezione visualizzazione |
|  Post condition     | Lista dei soli prodotti venduti/non ancora venduti |
| Step#        | Description  |
|  1     | Utente chiede di visualizzare la lista di tutti i prodotti venduti/non ancora venduti (attributo sold: yes o no) |
|  2     | Sistema verifica che l'utente sia loggato e chiede la lista filtrata al backend |
|  3     | Vengono effettuate le aggregazioni e raggruppati all'interno della lista |
|  4     | Sistema ritorna status code "200" e viene mostrata la lista |

##### Scenario 11.3 

| Scenario 11.3 | Utente non loggato |
| ------------- |:-------------:| 
|  Precondition     | Utente non loggato |
|  Post condition     | Visualizzazione fallita |
| Step#        | Description  |
|  1     | Utente chiede di visualizzare la lista dei prodotti |
|  2     | Sistema verifica che l'utente sia loggato: utente non loggato |
|  3     | Sistema ritorna status code "401" e messaggio "utente non loggato" |



### Use case 12, UC12 Visualizzazione informazioni prodotto

| Actors Involved        | Customer, Manager                    |
| ---------------------- |:-----------------------:| 
|  Precondition          | Utente loggato nella sezione visualizzazione |
|  Post condition        | Informazioni riguardo il prodotto      |
|  Nominal Scenario      | Scenario 12.1            |
|  Variants              |           |
|  Exceptions            | Scenario 12.2, Scenario 12.3    |

##### Scenario 12.1 

| Scenario 12.1 | Visualizzazione informazioni prodotto |
| ------------- |:-------------:| 
|  Precondition          | Utente loggato nella sezione visualizzazione |
|  Post condition        | Informazioni riguardo il prodotto      |
| Step#        | Description  |  
|  1     | Utente chiede di visualizzare le informazioni riguardo il prodotto  |
|  2     | La richiesta viene inviata tramite il codice univoco del prodotto      |
|  3     | Sistema verifica la presenza del codice nel db |
|  4     | Sistema ritorna status code "200" e informazioni riguardo il prodotto |

##### Scenario 12.2 

| Scenario 12.2 | Prodotto non presente nel database |
| ------------- |:-------------:| 
|  Precondition     | Prodotto non presente nel database |
|  Post condition     | Visualizzazione fallita |
| Step#        | Description  |
|  1     | Utente chiede di visualizzare le informazioni riguardo il prodotto  |
|       2        | La richiesta viene inviata tramite il codice univoco del prodotto                                        |
|       3        | Sistema verifica la presenza del codice nel db: codice non presente |
|       4        | Sistema ritorna status code "404" e un messaggio con scritto "Prodotto non esistente nel database"                    |

##### Scenario 12.3 

| Scenario 12.3 | Utente non loggato |
| ------------- |:-------------:| 
|  Precondition     | Utente non loggato |
|  Post condition     | Visualizzazione fallita |
| Step#        | Description  |
|  1     | Utente chiede di visualizzare le informazioni riguardo il prodotto  |
|  2     | Sistema verifica che l'utente sia loggato: utente non loggato |
|  3     | Sistema ritorna status code "401" e messaggio "utente non loggato" |


### Use case 13, UC13 Routes per visualizzare prodotti specifici (per categoria, per modello)

| Actors Involved        | Customer, Manager                    |
| ---------------------- |:-----------------------:| 
|  Precondition          | Utente loggato nella sezione visualizzazione |
|  Post condition        | Lista dei prodotti restituita       |
|  Nominal Scenario      | Scenario 13.1            |
|  Variants              | Scenario 13.2, Scenario 13.3                    |
|  Exceptions            | Scenario 13.4, Scenario 13.5, Scenario 13.6     |

##### Scenario 13.1 

| Scenario 13.1 | Visualizzazione lista prodotti per categoria |
| ------------- |:-------------:| 
|  Precondition     | Utente loggato nella sezione visualizzazione |
|  Post condition     | Lista dei prodotti di una specifica categoria |
| Step#        | Description  |  
|  1     | Utente chiede di visualizzare la lista di tutti i prodotti di una specifica categoria |
|  2     | Sistema chiede la lista filtrata al backend |
|  3     | Vengono effettuate le aggregazioni e raggruppati i prodotti con la stessa categoria |
|  4     | Sistema ritorna status code "200" e viene mostrata la lista |

##### Scenario 13.2 

| Scenario 13.2 | Visualizzazione lista prodotti per modello |
| ------------- |:-------------:| 
|  Precondition     | Utente loggato nella sezione visualizzazione |
|  Post condition     | Lista di tutti i prodotti di uno specifico modello |
| Step#        | Description  |  
|  1     | Utente chiede di visualizzare la lista di tutti i prodotti aventi lo stesso modello |
|  2     | Sistema chiede la lista filtrata al backend |
|  3     | Vengono effettuate le aggregazioni e raggruppati i prodotti dello stesso modello |
|  4     | Sistema ritorna status code "200" e viene mostrata la lista |

##### Scenario 13.3

| Scenario 13.3 | Visualizzazione lista dei soli prodotti venduti/non ancora venduti per categoria/modello |
| ------------- |:-------------:| 
|  Precondition     | Utente loggato nella sezione visualizzazione |
|  Post condition     | Lista dei soli prodotti venduti/non ancora venduti per categoria/modello |
| Step#        | Description  |
|  1     | Utente chiede di visualizzare la lista di tutti i prodotti venduti/non ancora venduti (attributo sold: yes o no) per cateogoria/modello |
|  2     | Sistema verifica che l'utente sia loggato e chiede la lista filtrata al backend |
|  3     | Vengono effettuate le aggregazioni e raggruppati nella lista |
|  4     | Sistema ritorna status code "200" e viene mostrata la lista |

##### Scenario 13.4 

| Scenario 13.4 | Utente non loggato |
| ------------- |:-------------:| 
|  Precondition     | Utente non loggato |
|  Post condition     | Visualizzazione fallita |
| Step#        | Description  |
|  1     | Utente chiede di visualizzare la lista dei prodotti  |
|  2     | Sistema verifica che l'utente sia loggato: utente non loggato |
|  3     | Sistema ritorna status code "401" e messaggio "utente non loggato" |

##### Scenario 13.5 

| Scenario 13.5 | Categoria non esistente |
| ------------- |:-------------:| 
|  Precondition     | Categoria non esistente |
|  Post condition     | Visualizzazione fallita |
| Step#        | Description  |
|  1     | Utente chiede di visualizzare la lista di tutti i prodotti di una specifica categoria |
|  2     | Sistema verifica che non esiste la categoria richiesta | 
|  3     | Sistema ritorna status code "422" e mostra messaggio errore |

##### Scenario 13.6 

| Scenario 13.6 | Modello non esistente |
| ------------- |:-------------:| 
|  Precondition     | Modello non esistente |
|  Post condition     | Visualizzazione fallita |
| Step#        | Description  |
|  1     | Utente chiede di visualizzare la lista di prodotti dello stesso modello |
|  2     | Sistema chiede il modello |
|  3     | Utente inserisce il modello |
|  4     | Sistema verifica se il modello è presente nel db: modello non esistente |
|  5     | Sistema ritorna status code "422" e mostra messaggio errore |



### Use case 14, UC14 Visualizzazione carrello

| Actors Involved        | Customer                    |
| ---------------------- |:-----------------------:| 
|  Precondition          | Utente customer loggato |
|  Post condition        | Visualizzazione carrello corrente     |
|  Nominal Scenario      | Scenario 14.1            |
|  Variants              | None                    |
|  Exceptions            | Scenario 14.2     |

##### Scenario 14.1 

| Scenario 14.1 | Visualizazzione carrello corrente |
| ------------- |:-------------:| 
|  Precondition          | Utente customer loggato |
|  Post condition        | Visualizazzione carrello corrente       |
| Step#        | Description  |  
|  1     | Utente chiede di visualizzare il proprio carrello corrente  |
|  2     | Sistema verifica che sia un customer |
|  3     | Sistema ritorna status code "200" e mostra informazionin sul carrello corrente (customer, pagamento, data di pagamento, prodotti) |

##### Scenario 14.2 

| Scenario 14.2 | Utente non customer |
| ------------- |:-------------:| 
|  Precondition     | Utente non customer |
|  Post condition     | Visualizzazione fallita |
| Step#        | Description  |
|  1     | Utente chiede di visualizzare il proprio carrello corrente  |
|  2     | Sistema verifica che sia un customer: utente non customer |
|  3     | Sistema ritorna status code "401" e messaggio "utente non customer" |



### Use case 15, UC15 Aggiunta di un prodotto

| Actors Involved        | Customer                    |
| ---------------------- |:-----------------------:| 
|  Precondition          | Utente customer loggato |
|  Post condition        | Prodotto aggiunto al carrello       |
|  Nominal Scenario      | Scenario 15.1            |
|  Variants              | None                    |
|  Exceptions            | Scenario 15.2, Scenario 15.3, Scenario 15.4, Scenario 15.5     |

##### Scenario 15.1 

| Scenario 15.1 | Aggiunta di un prodotto |
| ------------- |:-------------:| 
|  Precondition          | Utente customer loggato |
|  Post condition        | Prodotto aggiunto al carrello       |
| Step#        | Description  |  
|  1     | Utente chiede di aggiungere un prodotto al proprio carrello |
|  2     | Sistema verifica che sia un customer |
|  3     | Utente fornisce i dati (codice del prodotto) del prodotto |
|  4     | Sistema verifica che i dati siano corretti |
|  5     | Sistema ritorna status code "200" e aggiunge il prodotto al carrello |

##### Scenario 15.2 

| Scenario 15.2 | Utente non customer |
| ------------- |:-------------:| 
|  Precondition     | Utente non customer |
|  Post condition     | Aggiunta fallita |
| Step#        | Description  |
|  1     | Utente chiede di aggiungere un prodotto al proprio carrello |
|  2     | Sistema verifica che sia un customer: utente non customer |
|  3     | Sistema ritorna status code "401" e messaggio "utente non customer" |

##### Scenario 15.3 

| Scenario 15.3 | Prodotto non esistente |
| ------------- |:-------------:| 
|  Precondition     | Prodotto non esistente|
|  Post condition     | Aggiunta fallita |
| Step#        | Description  |
|  1     | Utente chiede di aggiungere un prodotto al proprio carrello |
|  2     | Sistema verifica che sia un customer |
|  3     | Utente fornisce i dati (codice del prodotto) del prodotto |
|  4     | Sistema verifica che i dati siano corretti e presenti nel database: dati incorretti perchè codice non presente nel database |
|  5     | Sistema ritorna status code "404" e messaggio "Prodotto non esistente" |

##### Scenario 15.4 

| Scenario 15.4 | Prodotto già in un altro carrello |
| ------------- |:-------------:| 
|  Precondition     | Prodotto già in un altro carrello |
|  Post condition     | Aggiunta fallita |
| Step#        | Description  |
|  1     | Utente chiede di aggiungere un prodotto al proprio carrello |
|  2     | Sistema verifica che sia un customer |
|  3     | Utente fornisce i dati (codice del prodotto) del prodotto |
|  4     | Sistema verifica che i dati siano corretti e presenti nel database: dati incorretti perchè codice rappresenta un prodotto già in un altro carrello |
|  5     | Sistema ritorna status code "409" e messaggio "Prodotto già in un altro carrello" |

##### Scenario 15.5 

| Scenario 15.5 | Prodotto già venduto |
| ------------- |:-------------:| 
|  Precondition     | Prodotto già venduto |
|  Post condition     | Aggiunta fallita |
| Step#        | Description  |
|  1     | Utente chiede di aggiungere un prodotto al proprio carrello |
|  2     | Sistema verifica che sia un customer |
|  3     | Utente fornisce i dati (codice del prodotto) del prodotto |
|  4     | Sistema verifica che i dati siano corretti e presenti nel database: dati incorretti perchè nel db il prodotto risulta già venduto |
|  5     | Sistema ritorna status code "409" e messaggio "Prodotto già venduto" |



### Use case 16, UC16 Rimozione di un prodotto

| Actors Involved        | Customer                    |
| ---------------------- |:-----------------------:| 
|  Precondition          | Utente customer loggato |
|  Post condition        | Prodotto rimosso dal carrello       |
|  Nominal Scenario      | Scenario 16.1            |
|  Variants              | None                    |
|  Exceptions            | Scenario 16.2, Scenario 16.3, Scenario 16.4, Scenario 16.5, Scenario 16.6     |

##### Scenario 16.1 

| Scenario 16.1 | Prodotto rimosso dal carrello |
| ------------- |:-------------:| 
|  Precondition          | Utente customer loggato |
|  Post condition        | Prodotto rimosso dal carrello       |
| Step#        | Description  |  
|  1     | Utente chiede di rimuovere un prodotto dal proprio carrello |
|  2     | Sistema verifica che sia un customer |
|  3     | Utente fornisce i dati (codice del prodotto) del prodotto |
|  4     | Sistema verifica che i dati siano corretti epresenti nel database: dati corretti |
|  5     | Sistema ritorna status code "200" e toglie il prodotto dal carrello |

##### Scenario 16.2 

| Scenario 16.2 | Utente non customer |
| ------------- |:-------------:| 
|  Precondition     | Utente non customer |
|  Post condition     | Rimozione fallita |
| Step#        | Description  |
|  1     | Utente chiede di rimuovere un prodotto dal proprio carrello |
|  2     | Sistema verifica che sia un customer: utente non customer |
|  3     | Sistema ritorna status code "401" e messaggio "utente non customer" |

##### Scenario 16.3 

| Scenario 16.3 | Prodotto non esistente |
| ------------- |:-------------:| 
|  Precondition     | Prodotto non esistente|
|  Post condition     | Rimozione fallita |
| Step#        | Description  |
|  1     | Utente chiede di rimuovere un prodotto dal proprio carrello |
|  2     | Sistema verifica che sia un customer |
|  3     | Utente fornisce i dati (codice del prodotto) del prodotto |
|  4     | Sistema verifica che i dati siano corretti e presenti nel database: dati incorretti perchè codice non presente nel database |
|  5     | Sistema ritorna status code "404" e messaggio "Prodotto non esistente" |

##### Scenario 16.4 

| Scenario 16.4 | Prodotto non nel carrello |
| ------------- |:-------------:| 
|  Precondition     | Prodotto non nel carrello |
|  Post condition     | Rimozione fallita |
| Step#        | Description  |
|  1     | Utente chiede di rimuovere un prodotto dal proprio carrello |
|  2     | Sistema verifica che sia un customer |
|  3     | Utente fornisce i dati (codice del prodotto) del prodotto |
|  4     | Sistema verifica che i dati siano corretti e presenti nel database: dati incorretti perchè codice rappresenta un prodotto non nel carrello |
|  5     | Sistema ritorna status code "409" e messaggio "Prodotto non nel carrello" |

##### Scenario 16.5 

| Scenario 16.5 | Prodotto già venduto |
| ------------- |:-------------:| 
|  Precondition     | Prodotto già venduto |
|  Post condition     | Rimozione fallita |
| Step#        | Description  |
|  1     | Utente chiede di rimuovere un prodotto dal proprio carrello |
|  2     | Sistema verifica che sia un customer |
|  3     | Utente fornisce i dati (codice del prodotto) del prodotto |
|  4     | Sistema verifica che i dati siano corretti e presenti nel database: dati incorretti perchè nel db il prodotto risulta già venduto |
|  5     | Sistema ritorna status code "409" e messaggio "Prodotto già venduto" |

##### Scenario 16.6 

| Scenario 16.6 | Carrello vuoto |
| ------------- |:-------------:| 
|  Precondition     | Carrello vuoto |
|  Post condition     | Rimozione fallita |
| Step#        | Description  |
|  1     | Utente chiede di rimuovere un prodotto dal proprio carrello |
|  2     | Sistema verifica che sia un customer, ma ha il carrello vuoto|
|  3     | Sistema ritorna status code "404" e messaggio "Nessun prodotto nel carrello" |



### Use case 17, UC17 Rimozione di tutti gli oggetti di un carrello

| Actors Involved        | Customer                    |
| ---------------------- |:-----------------------:| 
|  Precondition          | Utente customer loggato |
|  Post condition        | Tutti i prodotti di un carrello rimossi       |
|  Nominal Scenario      | Scenario 17.1            |
|  Variants              | None                    |
|  Exceptions            | Scenario 17.2, Scenario 17.3     |

##### Scenario 17.1 

| Scenario 17.1 | Tutti i prodotti di un carrello rimossi |
| ------------- |:-------------:| 
|  Precondition          | Utente customer loggato |
|  Post condition        | Tutti i prodotti di un carrello rimossi       |
| Step#        | Description  |  
|  1     | Utente chiede di rimuovere tutti i prodotti dal proprio carrello |
|  2     | Sistema verifica che sia un customer e che ci siano prodotti nel carrello |
|  3     | Sistema ritorna status code "200" e toglie i prodotti dal carrello, carrello vuoto |

##### Scenario 17.2 

| Scenario 17.2 | Utente non customer |
| ------------- |:-------------:| 
|  Precondition     | Utente non customer |
|  Post condition     | Rimozione fallita |
| Step#        | Description  |
|  1     | Utente chiede di rimuovere tutti i prodotti dal proprio carrello |
|  2     | Sistema verifica che sia un customer: utente non customer |
|  3     | Sistema ritorna status code "401" e messaggio "utente non customer" |

##### Scenario 17.3 

| Scenario 17.3 | Carrello vuoto |
| ------------- |:-------------:| 
|  Precondition     | Carrello vuoto |
|  Post condition     | Rimozione fallita |
| Step#        | Description  |
|  1     | Utente chiede di rimuovere tutti i prodotti dal proprio carrello |
|  2     | Sistema verifica che sia un customer, ma ha il carrello vuoto |
|  3     | Sistema ritorna status code "404" e messaggio "Nessun prodotto nel carrello" |



### Use case 18, UC18 Checkout ordine corrente

| Actors Involved        | Customer                    |
| ---------------------- |:-----------------------:| 
|  Precondition          | Utente customer loggato |
|  Post condition        | Carrello corrente pagato       |
|  Nominal Scenario      | Scenario 18.1            |
|  Variants              | None                    |
|  Exceptions            | Scenario 18.2, Scenario 18.3     |

##### Scenario 18.1 

| Scenario 18.1 | Checkout ordine corrente |
| ------------- |:-------------:| 
|  Precondition          | Utente customer loggato |
|  Post condition        | Cartello corrente pagato       |
| Step#        | Description  |  
|  1     | Utente chiede di pagare il carrello corrente |
|  2     | Sistema verifica che sia un customer e che ci siano prodotti nel carrello |
|  3     | Sistema ritorna status code "200", imposta il totale del carrello e la data di pagamento |

##### Scenario 18.2 

| Scenario 18.2 | Utente non customer |
| ------------- |:-------------:| 
|  Precondition     | Utente non customer |
|  Post condition     | Pagamento fallito |
| Step#        | Description  |
|  1     | Utente chiede di pagare il carrello corrente |
|  2     | Sistema verifica che sia un customer: utente non customer |
|  3     | Sistema ritorna status code "401" e messaggio "Utente non customer" |

##### Scenario 18.3 

| Scenario 18.3 | Carrello vuoto |
| ------------- |:-------------:| 
|  Precondition     | Carrello vuoto |
|  Post condition     | Pagamento fallito |
| Step#        | Description  |
|  1     | Utente chiede di pagare il carrello corrente |
|  2     | Sistema verifica che sia un customer, ma ha il carrello vuoto |
|  3     | Sistema ritorna status code "404" e messaggio "Nessun prodotto nel carrello" |



### Use case 19, UC19 Visualizzazione storico ordini

| Actors Involved        | Customer                    |
| ---------------------- |:-----------------------:| 
|  Precondition          | Utente customer loggato |
|  Post condition        | Storico dei carrelli pagati      |
|  Nominal Scenario      | Scenario 19.1            |
|  Variants              | None                    |
|  Exceptions            | Scenario 19.2    |

##### Scenario 19.1 

| Scenario 19.1 | Visualizzazione storico ordini |
| ------------- |:-------------:| 
|  Precondition          | Utente customer loggato |
|  Post condition        | Storico dei carrelli pagati       |
| Step#        | Description  |  
|  1     | Utente chiede di visualizzare lo storico di tutti i suoi carrelli precedentemente pagati |
|  2     | Sistema verifica che sia un customer |
|  3     | Sistema ritorna status code "200" e mostra la lista |

##### Scenario 19.2 

| Scenario 19.2 | Utente non customer |
| ------------- |:-------------:| 
|  Precondition     | Utente non customer |
|  Post condition     | Visualizzazione fallita |
| Step#        | Description  |
|  1     | Utente chiede di visualizzare lo storico di tutti i suoi carrelli precedentemente pagati |
|  2     | Sistema verifica che sia un customer: utente non customer |
|  3     | Sistema ritorna status code "401" e messaggio "Utente non customer" |



### Use case 20, UC20 Accettazione ordine da parte del manager

| Actors Involved        | Manager                    |
| ---------------------- |:-----------------------:| 
|  Precondition          | Utente manager loggato |
|  Post condition        | Ordine accettato      |
|  Nominal Scenario      | Scenario 20.1            |
|  Variants              |                     |
|  Exceptions            | Scenario 20.2, Scenario 20.3    |

##### Scenario 20.1 

| Scenario 20.1 | Accettazione ordine da parte del manager |
| ------------- |:-------------:| 
|  Precondition          | Utente manager loggato |
|  Post condition        | Ordine accettato      |
| Step#        | Description  |  
|  1     | Manager chiede di accettare un ordine |
|  2     | Sistema verifica che sia un manager e codice ordine nel db |
|  3     | Sistema ritorna status code "200" e mostra ordine come accettato |

##### Scenario 20.2 

| Scenario 20.2 | Utente non manager |
| ------------- |:-------------:| 
|  Precondition          | Utente non manager |
|  Post condition        | Accettazione ordine fallita      |
| Step#        | Description  |  
|  1     | Utente chiede di accettare un ordine |
|  2     | Sistema verifica che sia un manager e codice ordine nel db: utente non manager |
|  3     | Sistema ritorna status code "401" e mostra errore "utente non manager" |

##### Scenario 20.3 

| Scenario 20.3 | Ordine non esistente |
| ------------- |:-------------:| 
|  Precondition          | Utente manager loggato |
|  Post condition        | Accettazione ordine fallita       |
| Step#        | Description  |  
|  1     | Manager chiede di accettare un ordine |
|  2     | Sistema verifica che sia un manager e codice ordine nel db: codice non esistente |
|  3     | Sistema ritorna status code "401" e mostra errore "Ordine non esistente" |



# Glossary

![Class Diagram](/images/Diagram/V1_CD.png)
![alt text](image.png)
- **Customer:**
  - Persona interessata ad effettuare un acquisto dal sistema
  - Deve essere registrata sul sistema

- **Manager:**
  - Responsabile del punto vendita
  - Si occupa di aggiornare la disponibilità dei prodotti sul sistema
  - Ha il compito di accettare l’ordine effettuato da un customer

- **Prodotto:**
  - Un qualsiasi oggetto in vendita sul sistema
  - E’ acquistabile dai customer
  - Ha una disponibilità limitata, gestita dal manager
  - Può appartenere a tre differenti categorie: Smartphone, Laptop o Appliance

- **Carrello:**
  - Contenitore per tutti i prodotti che un customer è interessato ad acquistare
  - Può essere gestito dal customer
  - Può essere visualizzato nel futuro dopo essere passato per la fase di checkout
  - Fase precedente all’acquisto definitivo del customer

- **Ordine:**
  - Concretizzazione dell’acquisto da parte del customer
  - Deve essere accettato dal manager



# System Design

![System Design](/images/Diagram/V1_SD.png)

# Deployment Diagram

![Deployment Diagram](/images/Diagram/v1_deployment.jpg)




# Table of Rights


|   | FR 1 | FR 2.1 | FR 2.2 | FR 2.3 | FR 3 | FR 4| FR 5.1 | FR 5.2 | FR 5.3| FR 5.4 | FR 6.1 | FR 6.2 | FR 6.3|
| ---- |:-----:| -------- |-------- |-------- |-------- |-------- |-------- |-------- |-------- |-------- |-------- |-------- |-------- |
| User  | X | X |   | X |  | X | X | X | X | X | X | X |  |
|  Manager | X |  | X | | X | X | X | | |  |  | X | X |



















