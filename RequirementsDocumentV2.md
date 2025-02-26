# Requirements Document - future EZElectronics

Date:

Version: V1 - description of EZElectronics in FUTURE form (as proposed by the team)

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
    - [Use case 4, UC4 Possibilità recupero password](#use-case-4-uc4-possibilità-recupero-password)
      - [Scenario 4.1](#scenario-41)
      - [Scenario 4.2](#scenario-42)
    - [Use case 5, UC5 Possibilità cambio password](#use-case-5-uc5-possibilità-cambio-password)
      - [Scenario 5.1](#scenario-51)
      - [Scenario 5.2](#scenario-52)
    - [Use case 6, UC6 Cancellazione utente](#use-case-6-uc6-cancellazione-utente)
      - [Scenario 6.1](#scenario-61)
      - [Scenario 6.2](#scenario-62)
    - [Use case 7, UC5 Routes per visualizzare utenti](#use-case-7-uc77-routes-per-visualizzare-utenti)
      - [Scenario 7.1](#scenario-71)
      - [Scenario 7.2](#scenario-72)
      - [Scenario 7.3](#scenario-73)
      - [Scenario 7.4](#scenario-74)
      - [Scenario 7.5](#scenario-75)
    - [Use case 8, UC8 Visualizzazione informazioni utente loggato](#use-case-8-uc8-visualizzazione-informazioni-utente-loggato)
      - [Scenario 8.1](#scenario-81)
      - [Scenario 8.2](#scenario-82)
    - [Use case 9, UC9 Registrazione nuovo prodotto](#use-case-9-uc9-registrazione-nuovo-prodotto)
      - [Scenario 9.1](#scenario-91)
      - [Scenario 9.2](#scenario-92)
      - [Scenario 9.3](#scenario-93)
      - [Scenario 9.4](#scenario-94)
    - [Use case 10, UC10 Aumento disponibilità di un prodotto](use-case-10-uc10-aumento-disponibilità-di-un-prodotto)
      - [Scenario 10.1](#scenario-101)
      - [Scenario 10.2](#scenario-102)
      - [Scenario 10.3](#scenario-103)
    - [Use case 11, UC11 Vendita di un prodotto](#use-case-11-uc11-vendita-di-un-prodotto)
      - [Scenario 11.1](#scenario-111)
      - [Scenario 11.2](#scenario-112)
      - [Scenario 11.3](#scenario-113)
      - [Scenario 11.4](#scenario-114)
      - [Scenario 11.5](#scenario-115)
    - [Use case 12, UC12 Cancellazione di un prodotto](#use-case-12-uc12-cancellazione-di-un-prodotto)
      - [Scenario 12.1](#scenario-121)
      - [Scenario 12.2](#scenario-122)
    - [Use case 13, UC13 Aggiunta di una recensione di un prodotto](#use-case-13-uc13-aggiunta-di-una-recensione-di-un-prodotto)
      - [Scenario 13.1](#scenario-131)
      - [Scenario 13.2](#scenario-132)
    - [Use case 14, UC14 Possibilità di aggiornare prezzo di un prodotto](#use-case-14-uc14-possibilità-di-aggiornare-prezzo-di-un-prodotto)
      - [Scenario 14.1](#scenario-141)
      - [Scenario 14.2](#scenario-142)
    - [Use case 15, UC15 Eliminazione di una recensione di un prodotto](#use-case-15-uc15-eliminazione-di-una-recensione-di-un-prodotto)
      - [Scenario 15.1](#scenario-151)
      - [Scenario 15.2](#scenario-152)
    - [Use case 16, UC16 Visualizzazione tutti i prodotti](#use-case-16-uc16-visualizzazione-tutti-i-prodotti)
      - [Scenario 16.1](#scenario-161)
      - [Scenario 16.2](#scenario-162)
      - [Scenario 16.3](#scenario-163)
    - [Use case 17, UC17 Visualizzazione informazioni prodotto](#use-case-17-uc17-visualizzazione-informazioni-prodotto)
      - [Scenario 17.1](#scenario-171)
      - [Scenario 17.2](#scenario-172)
      - [Scenario 17.3](#scenario-173)
    - [Use case 18, UC18 Routes per visualizzare prodotti specifici (per categoria, per modello)](#use-case-18-uc18-routes-per-visualizzare-prodotti-specifici-per-categoria-per-modello)
      - [Scenario 18.1](#scenario-181)
      - [Scenario 18.2](#scenario-182)
      - [Scenario 18.3](#scenario-183)
      - [Scenario 18.4](#scenario-184)
      - [Scenario 18.5](#scenario-185)
      - [Scenario 18.6](#scenario-186)
    - [Use case 19, UC19 Visualizzazione prodotti tramite filtri applicati all’elenco lato customer](#use-case-19-uc19-visualizzazione-prodotti-tramite-filtri-applicati-allelenco-lato-customer)
      - [Scenario 19.1](#scenario-191)
      - [Scenario 19.2](#scenario-192)
      - [Scenario 19.3](#scenario-193)
      - [Scenario 19.4](#scenario-194)
    - [Use case 20, UC20 Visualizzazione carrello](#use-case-20-uc20-visualizzazione-carrello)
      - [Scenario 20.1](#scenario-201)
      - [Scenario 20.2](#scenario-202)
    - [Use case 21, UC21 Aggiunta di un prodotto](#use-case-21-uc21-aggiunta-di-un-prodotto)
      - [Scenario 21.1](#scenario-211)
      - [Scenario 21.2](#scenario-212)
      - [Scenario 21.3](#scenario-213)
      - [Scenario 21.4](#scenario-214)
      - [Scenario 21.5](#scenario-215)
    - [Use case 22, UC22 Rimozione di un prodotto](#use-case-22-uc22-rimozione-di-un-prodotto)
      - [Scenario 22.1](#scenario-221)
      - [Scenario 22.2](#scenario-222)
      - [Scenario 22.3](#scenario-223)
      - [Scenario 22.4](#scenario-224)
      - [Scenario 22.5](#scenario-225)
      - [Scenario 22.6](#scenario-226)
    - [Use case 23, UC23 Rimozione di tutti gli oggetti di un carrello](#use-case-23-uc23-rimozione-di-tutti-gli-oggetti-di-un-carrello)
      - [Scenario 23.1](#scenario-231)
      - [Scenario 23.2](#scenario-232)
      - [Scenario 23.3](#scenario-233)
    - [Use case 24, UC24 Addizione eventuale sconto](#use-case-24-uc24-addizione-eventuale-sconto)
      - [Scenario 24.1](#scenario-241)
      - [Scenario 24.2](#scenario-242)
      - [Scenario 24.3](#scenario-243)
    - [Use case 25, UC25 Possibilità di ordinare nuovamente lo stesso carrello](#use-case-25-uc25-possibilità-di-ordinare-nuovamente-lo-stesso-carrello)
      - [Scenario 25.1](#scenario-251)
      - [Scenario 25.2](#scenario-252)
      - [Scenario 25.3](#scenario-253)
    - [Use case 26, UC26 Checkout ordine corrente](#use-case-26-uc26-checkout-ordine-corrente)
      - [Scenario 26.1](#scenario-261)
      - [Scenario 26.2](#scenario-262)
      - [Scenario 26.3](#scenario-263)
    - [Use case 27, UC27 Visualizzazione storico ordini](#use-case-27-uc27-visualizzazione-storico-ordini)
      - [Scenario 27.1](#scenario-271)
    - [Use case 28, UC28 Accettazione ordine da parte del manager](#use-case-28-uc28-accettazione-ordine-da-parte-del-manager)
      - [Scenario 28.1](#scenario-281)
      - [Scenario 28.2](#scenario-282)
      - [Scenario 28.3](#scenario-283)
    - [Use case 29, UC29 Richiesta di pagamento](#use-case-29-uc29-richiesta-di-pagamento)
      - [Scenario 29.1](#scenario-291)
      - [Scenario 29.2](#scenario-292)
      - [Scenario 29.3](#scenario-293)
    - [Use case 30, UC30 Scelta indirizzo di spedizione](#use-case-30-uc30-scelta-indirizzo-di-spedizione)
      - [Scenario 30.1](#scenario-301)
      - [Scenario 30.2](#scenario-302)
      - [Scenario 30.3](#scenario-303)
    - [Use case 31, UC31 Scelta modalità di spedizione](#use-case-31-uc31-scelta-modalità-di-spedizione)
      - [Scenario 31.1](#scenario-311)
      - [Scenario 31.2](#scenario-312)
      - [Scenario 31.3](#scenario-313)
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
|Payment Services| I vari metodi di pagamento all'interno dello store|
|Shipping Services|Chi si occuperà di spedire i prodotti acquistati sul sito|
|Admin|Il gestore del sistema|

# Context Diagram and interfaces

## Context Diagram

![Context Diagram](/images/Diagram/V2_context.jpg)

## Interfaces


|   Actor   | Logical Interface | Physical Interface |
| :-------: | :---------------: | :----------------: |
| Customer |GUI                    |PC               |
|Manager    |GUI                |PC                   |
|Payment Services|APIs|Internet|
|Shipping Services|APIs|Internet|
|Admin|GUI|PC|

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
  - Necessita di un sito molto semplice o comunque “standard” rispetto agli altri e gradirebbe un programma fedeltà vista la necessità regolare di prodotti.

- **KATE, 35, LAVORATRICE-GAMER**
  - Ragazza con la passione per la tecnologia ed il gaming, ha uno stipendio stabile e non bada a spese quando si tratta della sua passione.
  - Il suo store ideale le permette di rimanere al passo con le nuove uscite in campo tecnologico.
  - Gradirebbe la possibilità di essere avvisata quando un prodotto che ha cercato e non è disponibile nello store in quel momento tornasse in stock, oltre a una spedizione rapida.

- **CLAUDIO, 29, FREELANCER**
  - Claudio è un freelancer nel campo del design.
  - Apprezzerebbe un'ampia gamma di prodotti tecnologici disponibili sul sito, insieme a recensioni dettagliate e specifiche tecniche per fare la scelta migliore.
  - Sarebbe utile per lui avere la possibilità di effettuare rapidamente l'acquisto dei prodotti e riceverli comodamente a casa sua, dato che il suo tempo è prezioso e preferisce evitare lunghe code nei negozi fisici.


# Functional and non functional requirements

## Functional Requirements

| ID                                 | Description                                                                                       |
|----------------------------------------------|------------------------------------------------------------------------------------------------------|
| **FR1 Autenticazione e autorizzazione**      |                                                                                                      |
| FR1.1 Login                                  | Effettua l'accesso al sistema                                                                       |
| FR1.2 Logout                                 | Esegue il logout dall'applicazione                                                                   |
| FR1.3 Registrazione nuovo utente             | Permette la registrazione di un nuovo utente                                                         |
| FR1.4 Possibilità recupero password          | Consente il recupero della password in caso di smarrimento                                            |
| FR1.5 Possibilità cambio password            | Permette all' utente di cambiare la password                                                           |
| FR1.6 Creazione manager                      | Permette all'admin di creare un utente manager |
| **FR2 Gestione utenti**                      |                                                                                                      |
| FR2.1 Cancellazione utente  | Permette la cancellazione di un utente dal sistema (sia da parte dell'utente stesso che del Manager) |
| FR2.2 Visualizzazione utenti (per ruolo, per username) | Visualizza gli utenti presenti nel sistema in base al ruolo o all'username |
| FR2.3 Visualizzazione informazioni utente loggato | Mostra le informazioni relative all'utente attualmente loggato |
| **FR3 Gestione prodotti**                   |                                                                                                      |
| FR3.1 Registrazione nuovo prodotto          | Consente l'inserimento di un nuovo prodotto nel sistema                                              |
| FR3.2 Aumento disponibilità di un prodotto  | Incrementa la disponibilità di un prodotto nel sistema                                                |
| FR3.3 Diminuire disponibilità di un prodotto| Riduce la disponibilità di un prodotto nel sistema                                                    |
| FR3.4 Cancellazione di un prodotto          | Rimuove un prodotto dal sistema                                                                      |
| FR3.5 Aggiunta di una recensione di un prodotto | Permette agli utenti di aggiungere una recensione a un prodotto                                   |
| FR3.6 Possibilità di aggiornare prezzo di un prodotto | Consente di aggiornare il prezzo di un prodotto nel sistema                                   |
| FR3.7 Eliminazione recensione di un prodotto | Consente di eliminare una recensione di un prodotto                                                |
| **FR4 Ricerca e filtraggio prodotto**        |                                                                                                      |
| FR4.1 Visualizzazione tutti i prodotti      | Mostra tutti i prodotti disponibili sul sistema                                                      |
| FR4.2 Visualizzazione informazioni prodotto | Visualizza le informazioni dettagliate di un prodotto                                                 |
| FR4.3 Visualizzazione prodotti specifici    | Visualizza prodotti specifici in base a criteri definiti                                              |
| FR4.4 Visualizzazione prodotti specifici tramite filtri applicati all’elenco lato customer | Visualizza prodotti specifici applicando filtri lato cliente                                       |
| **FR5 Gestione carrello**                    |                                                                                                      |
| FR5.1 Visualizzazione carrello               | Mostra i prodotti presenti nel carrello dell'utente                                                  |
| FR5.2 Aggiunta di un prodotto               | Aggiunge un prodotto al carrello dell'utente                                                         |
| FR5.3 Rimozione di un prodotto              | Rimuove un prodotto dal carrello dell'utente                                                         |
| FR5.4 Rimozione di tutti gli oggetti di un carrello | Svuota completamente il carrello dell'utente                                                     |
| FR5.5 Addizione eventuale sconto             | Applica uno sconto al totale del carrello (se disponibile)                                           |
| FR5.6 Possibilità di ordinare nuovamente lo stesso carrello | Consente di effettuare nuovamente un ordine utilizzando lo stesso carrello                      |
| **FR6 Gestione ordini**                      |                                                                                                      |
| FR6.1 Checkout ordine corrente               | Conferma e finalizza l'ordine attuale dell'utente                                                    |
| FR6.2 Visualizzazione storico ordini         | Visualizza lo storico degli ordini effettuati dall'utente                                            |
| FR6.3 Accettazione ordine da parte del manager | Accetta un ordine effettuato da un cliente                                                          |
| **FR7 Gestione pagamenti**                   |                                                                                                      |
| FR7.1 Richiesta di pagamento                 | Avvia la procedura di pagamento per un ordine                                                         |
| FR7.2 Gestione dei dati di pagamento         | Consente la gestione e l'inserimento dei dati di pagamento                                           |
| **FR8 Gestione spedizioni**                  |                                                                                                      |
| FR8.1 Scelta indirizzo di spedizione        | Permette all'utente di selezionare un indirizzo di spedizione                                        |
| FR8.2 Scelta modalità di spedizione          | Consente all'utente di scegliere la modalità di spedizione per l'ordine                              |


## Non Functional Requirements

|   ID    | Type (efficiency, reliability, ..) | Description | Refers to |
| :-----: | :--------------------------------: | :---------: | :-------: |
| NFR1    |             Efficienza             |    Tutte le funzionalità della app devono completarsi in un tempo < 0.1 sec (escludendo la rete). | FR2-FR7 |
| NFR2    |             Affidabilità           |    Ogni utente non deve verificare più di un bug all’anno. Il sito deve essere in grado di supportare almeno 500 utenti contemporaneamente. | FR1-FR8 |
| NFR3    |             Sicurezza              |    Tutti i dati sensibili devono essere tenuti nel database non in chiaro. Sulla rete, pubblica o privata, non devono circolare dati non criptati.         | FR1, FR7 |
| NFR4    |             Usabilità              |    La sessione dell’utente, una volta effettuato il login, rimane attiva fino all’effettuazione del logout. | FR1-FR8 |
| NFR5    |             Usabilità              | L’utente non deve aver bisogno di un training per l’utilizzo dell’applicazione.  | FR1-FR8 |
| NFR6    |             Portabilità            |    Il sito web deve essere disponibile per i seguenti browser: Chrome, Firefox, Safari, Opera  | FR1-FR8 |

## Use case diagram

![Use Case Diagram](/images/Diagram/V2_UC.png)
### Use case 1, UC1 Login

| Actors Involved  |  Customer, Manager, Admin                                                                    |
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

| Actors Involved  |      Customer, Manager, Admin                                                                |
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
|  Scenario 2.2  |                 Utente non loggato  |
| :------------: | :------------------------------------------------------------------------: |
|  Precondition  | Utente non loggato                                                         |
| Post condition |  Utente non loggato                                                        |
|     Step#      |                                Description                                 |
|       1        | Utente chiede di effettuare il logout                                      |
|       2        | Sistema cerca l'utente e verifica che è già non loggato                    |
|       3        | Sistema ritorna status code "401" e messaggio "utente già non loggato"     |



### Use case 3, UC3 Registrazione nuovo utente

| Actors Involved        | Customer, Admin                    |
| ---------------------- |:-----------------------:| 
|  Precondition          | Utente senza un account |
|  Post condition        | Utente registrato       |
|  Nominal Scenario      | Scenario 3.1            |
|  Variants              | Scenario 3.2                   |
|  Exceptions            | Scenario 3.3, Scenario 3.4     |

##### Scenario 3.1 

| Scenario 3.1 | Registrazione nuovo utente |
| ------------- |:-------------:| 
|  Precondition     | Utente senza un account |
|  Post condition     | Utente registrato |
| Step#        | Description  |  
|  1     | Utente chiede di essere registrato  |
|  2     | Sistema chiede username, nome, cognome, password e email |
|  3     | Utente fornisce i dati |
|  4     | Sistema verifica che i dati non siano già presenti nel database: dati univoci |
|  5     | Sistema ritorna status code "200", crea il nuovo utente e deposita informazioni nel database |

##### Scenario 3.2 

| Scenario 3.2 | Registrazione nuovo utente da parte dell'admin |
| ------------- |:-------------:| 
|  Precondition     | Utente senza un account |
|  Post condition     | Utente registrato da parte dell'admin |
| Step#        | Description  |  
|  1     | Admin chiede di registrare un utente   |
|  2     | Sistema chiede nome, email, ruolo e password |
|  3     | Utente fornisce i dati |
|  4     | Sistema verifica che i dati non siano già presenti nel database: dati univoci |
|  5     | Sistema ritorna status code "200", crea il nuovo utente e deposita informazioni nel database |

##### Scenario 3.3 

| Scenario 3.3 | Username non presente |
| ------------- |:-------------:| 
|  Precondition     | Utente non inserisce lo username |
|  Post condition     | Registrazione fallita |
| Step#        | Description  |
|  1     | Utente chiede di essere registrato  |
|  2     | Sistema chiede username, nome, cognome, password e ruolo |
|  3     | Utente fornisce tutti i dati, tranne lo username |
|  4     | Sistema verifica che i dati siano stati inseriti: username non inserito |
|  5     | Sistema ritorna status code "422" e messaggio "inserire lo username" |

##### Scenario 3.4 

| Scenario 3.4 | Utente già registrato |
| ------------- |:-------------:| 
|  Precondition     | Utente ha l'account|
|  Post condition     | Registrazione fallita |
| Step#        | Description  |
|  1     | Utente chiede di essere registrato  |
|  2     | Sistema chiede username, nome, cognome, password e ruolo |
|  3     | Utente fornisce i dati |
|  4     | Sistema verifica che i dati siano univoci: dati già presenti nel database |
|  5     | Sistema ritorna status code "409" e messaggio "utente già registrato" |



### Use case 4, UC4 Possibilità recupero password

| Actors Involved  |       Customer, Manager                                                               |
| :--------------: | :------------------------------------------------------------------: |
|   Precondition   | Password dimenticata                            |
|  Post condition  | Invio mail per recuperare password                                  |
| Nominal Scenario | Scenario 4.1                                                         |
|   Variants       |                                                                      |
|    Exceptions    | Scenario 4.2        |

##### Scenario 4.1
|  Scenario 4.1  |                  Tutto corretto                                            |
| :------------: | :------------------------------------------------------------------------: |
|   Precondition   | Password dimenticata                            |
|  Post condition  | Invio mail per recuperare password                                  |
|     Step#      |                                Description                                 |
|       1        | Viene richiesto il recupero password                                       |
|       2        | La richiesta viene inviata tramite lo username univoco dell'utente                                        |
|       3        | Sistema verifica la presenza dello username nel db e fa mandare una mail all'indirizzo collegato all'utente |
|       4        | Sistema ritorna status code "200"                    |

##### Scenario 4.2
|  Scenario 4.2  |                 Username non esistente                                      |
| :------------: | :------------------------------------------------------------------------: |
|  Precondition  | Username non esistente                                                      |
| Post condition |  Recupero password fallito                                                        |
|     Step#      |                                Description                                 |
|       1        | Viene richiesto il recupero password                                       |
|       2        | La richiesta viene inviata tramite lo username univoco dell'utente                                        |
|       3        | Sistema verifica la presenza dello username nel db: username non esistente |
|       4        | Sistema ritorna status code "404" e un messaggio con scritto "Utente non esistente nel database"                    |



### Use case 5, UC5 Possibilità cambio password

| Actors Involved  |      Customer, Manager                                                                |
| :--------------: | :------------------------------------------------------------------: |
|   Precondition   | Password vecchia                            |
|  Post condition  | Password nuova cambiata                                 |
| Nominal Scenario | Scenario 5.1                                                         |
|   Variants       |                                                                     |
|    Exceptions    | Scenario 5.2        |

##### Scenario 5.1
|  Scenario 5.1  |                  Tutto corretto                                            |
| :------------: | :------------------------------------------------------------------------: |
|   Precondition   | Password vecchia                            |
|  Post condition  | Password nuova cambiata                                 |
|     Step#      |                                Description                                 |
|       1        | Viene richiesto il cambio password                                      |
|       2        | Utente inserisce username e vecchia password, poi la nuova                                        |
|       3        | Sistema verifica correttezza dei dati |
|       4        | Sistema ritorna status code "200" e un messaggio con scritto "Password cambiata"                    |

##### Scenario 5.2
|  Scenario 5.2  |                 Username non esistente o password vecchia errata                                      |
| :------------: | :------------------------------------------------------------------------: |
|  Precondition  | Username non esistente o password vecchia errata                                                      |
| Post condition |  Cancellazione utente fallita                                                        |
|     Step#      |                                Description                                 |
|       1        | Viene richiesto il cambio password                                      |
|       2        | Utente inserisce username e vecchia password, poi la nuova                                        |
|       3        | Sistema verifica correttezza dei dati: dati incorretti |
|       4        | Sistema ritorna status code "404" e un messaggio con scritto "Utente non esistente nel database"o "Password vecchia errata"                    |



### Use case 6, UC6 Cancellazione utente

| Actors Involved  |    Customer, Admin                                                           |
| :--------------: | :------------------------------------------------------------------: |
|   Precondition   | Utente presente nel database                            |
|  Post condition  | Utente rimosso dal database                                  |
| Nominal Scenario | Scenario 6.1                                                         |
|   Variants       |                                                                      |
|    Exceptions    | Scenario 6.2        |

##### Scenario 6.1
|  Scenario 6.1  |                  Tutto corretto                                            |
| :------------: | :------------------------------------------------------------------------: |
|  Precondition  | Utente presente nel database                        |
| Post condition |  Utente rimosso dal database                                                           |
|     Step#      |                                Description                                 |
|       1        | Viene chiesta l'eliminazione di un utente                                       |
|       2        | La richiesta viene inviata tramite lo username univoco dell'utente                                        |
|       3        | Sistema verifica la presenza dello username nel db e elimina l'utente |
|       4        | Sistema ritorna status code "200" e un messaggio con scritto "Utente con username eliminato"                    |

##### Scenario 6.2
|  Scenario 6.2  |                 Username non esistente                                      |
| :------------: | :------------------------------------------------------------------------: |
|  Precondition  | Username non esistente                                                      |
| Post condition |  Cancellazione utente fallita                                                        |
|     Step#      |                                Description                                 |
|       1        | Viene chiesta l'eliminazione di un utente                                       |
|       2        | La richiesta viene inviata tramite lo username univoco dell'utente                                        |
|       3        | Sistema verifica la presenza dello username nel db: username non presente |
|       4        | Sistema ritorna status code "404" e un messaggio con scritto "Utente non esistente nel database"                    |



### Use case 7, UC7 Routes per visualizzare utenti

| Actors Involved        | Manager                    |
| ---------------------- |:-----------------------:| 
|  Precondition          | Manager loggato nella sezione visualizzazione |
|  Post condition        | Lista degli utenti restituita       |
|  Nominal Scenario      | Scenario 7.1            |
|  Variants              | Scenario 7.2, Scenario 7.3                    |
|  Exceptions            | Scenario 7.4, Scenario 7.5     |

##### Scenario 7.1 

| Scenario 7.1 | Visualizzazione lista tutti gli utenti |
| ------------- |:-------------:| 
|  Precondition     | Manager loggato nella sezione visualizzazione |
|  Post condition     | Lista di tutti gli utenti |
| Step#        | Description  |  
|  1     | Manager chiede di visualizzare la lista di tutti gli utenti  |
|  2     | Sistema chiede la lista al backend |
|  3     | Sistema ritorna status code "200" e viene mostrata la lista |

##### Scenario 7.2 

| Scenario 7.2 | Visualizzazione lista degli utenti con uno specifico ruolo |
| ------------- |:-------------:| 
|  Precondition     | Manager loggato nella sezione visualizzazione |
|  Post condition     | Lista degli utenti con uno specifico ruolo |
| Step#        | Description  |
|  1     | Manager chiede di visualizzare la lista di tutti gli utenti con uno specifico ruolo|
|  2     | Sistema chiede la lista filtrata al backend |
|  3     | Vengono effettuate le aggregazioni e raggruppati gli utenti con lo stesso ruolo |
|  4     | Sistema ritorna status code "200" e viene mostrata la lista |

##### Scenario 7.3 

| Scenario 7.3 | Visualizzazione utente con uno specifico username |
| ------------- |:-------------:| 
|  Precondition     | Manager loggato nella sezione visualizzazione |
|  Post condition     | Dati dell'utente con uno specifico username |
| Step#        | Description  |
|  1     | Manager chiede di visualizzare un utente con uno specifico username |
|  2     | Sistema chiede lo username |
|  3     | Utente inserisce lo username |
|  4     | Sistema verifica se lo username è presente nel db |
|  5     | Sistema ritorna status code "200" e viene mostrato l'utente richiesto |

##### Scenario 7.4 

| Scenario 7.4 | Ruolo non esistente |
| ------------- |:-------------:| 
|  Precondition     | Ruolo non esistente |
|  Post condition     | Visualizzazione fallita |
| Step#        | Description  |
|  1     | Manager chiede di visualizzare la lista di tutti gli utenti con uno specifico ruolo|
|  2     | Sistema verifica che non esiste il ruolo richiesto | 
|  3     | Sistema ritorna status code "422" e mostra messaggio errore |

##### Scenario 7.5 

| Scenario 7.5 | Username non esistente |
| ------------- |:-------------:| 
|  Precondition     | Username non esistente |
|  Post condition     | Visualizzazione fallita |
| Step#        | Description  |
|  1     | Manager chiede di visualizzare un utente con uno specifico username |
|  2     | Sistema chiede lo username |
|  3     | Utente inserisce lo username |
|  4     | Sistema verifica se lo username è presente nel db: username non esistente |
|  5     | Sistema ritorna status code "404" e mostra messaggio errore |



### Use case 8, UC8 Visualizzazione informazioni utente loggato

| Actors Involved        | Customer                    |
| ---------------------- |:-----------------------:| 
|  Precondition          | Utente loggato |
|  Post condition        | Informazioni riguardo l'utente loggato       |
|  Nominal Scenario      | Scenario 8.1            |
|  Variants              |                     |
|  Exceptions            | Scenario 8.2     |

##### Scenario 8.1 

| Scenario 8.1 | Informazioni riguardo l'utente loggato |
| ------------- |:-------------:| 
|  Precondition          | Utente loggato |
|  Post condition        | Informazioni riguardo l'utente loggato       |
| Step#        | Description  |  
|  1     | Richiesta di visualizzare le informazioni riguardo l'utente loggato |
|  2     | Sistema verifica che l'utente sia loggato |
|  3     | Sistema chiede le informazioni al backend |
|  4     | Sistema ritorna status code "200" e vengono mostrati i dati dell'utente |

##### Scenario 8.2 
_
| Scenario 8.2 | Utente non loggato |
| ------------- |:-------------:| 
|  Precondition     | Utente non loggato |
|  Post condition     | Visualizzazione fallita |
| Step#        | Description  |
|  1     | Richiesta di visualizzare le informazioni riguardo l'utente loggato |
|  2     | Sistema verifica che l'utente sia loggato: utente non loggato |
|  3     | Sistema ritorna status code "401" e viene mostrato messaggio errore "utente non loggato" |



### Use case 9, UC9 Registrazione nuovo prodotto

| Actors Involved        | Manager                    |
| ---------------------- |:-----------------------:| 
|  Precondition          | Utente manager loggato |
|  Post condition        | Prodotto creato       |
|  Nominal Scenario      | Scenario 9.1            |
|  Variants              |                     |
|  Exceptions            | Scenario 9.2, Scenario 9.3, Scenario 9.4     |

##### Scenario 9.1 

| Scenario 9.1 | Registrazione nuovo prodotto |
| ------------- |:-------------:| 
|  Precondition          | Utente manager loggato |
|  Post condition        | Prodotto creato       |
| Step#        | Description  |  
|  1     | Utente chiede di aggiungere un prodotto  |
|  2     | Sistema verifica che sia un manager |
|  3     | Utente fornisce i dati (codice, prezzo di vendita, modello, categoria, dettagli, data di arrivo) del prodotto |
|  4     | Sistema verifica che i dati siano corretti e non già presenti nel database: dati corretti e univoci |
|  5     | Sistema ritorna status code "200", crea il nuovo prodotto e deposita informazioni nel database |

##### Scenario 9.2 

| Scenario 9.2 | Utente non manager |
| ------------- |:-------------:| 
|  Precondition     | Utente non manager |
|  Post condition     | Registrazione fallita |
| Step#        | Description  |
|  1     | Utente chiede di aggiungere un prodotto  |
|  2     | Sistema verifica che sia un manager: utente non manager |
|  3     | Sistema ritorna status code "401" e messaggio "utente non manager" |

##### Scenario 9.3 

| Scenario 9.3 | Prodotto già esistente |
| ------------- |:-------------:| 
|  Precondition     | Prodotto già esistente|
|  Post condition     | Registrazione fallita |
| Step#        | Description  |
|  1     | Utente chiede di aggiungere un prodotto  |
|  2     | Sistema verifica che sia un manager |
|  3     | Utente fornisce i dati (codice, prezzo di vendita, modello, categoria, dettagli, data di arrivo) del prodotto |
|  4     | Sistema verifica che i dati siano corretti e non già presenti nel database: dati corretti ma non univoci |
|  5     | Sistema ritorna status code "409" e messaggio "prodotto già esistente" |

##### Scenario 9.4 

| Scenario 9.4 | Data di arrivo posteriore a quella corrente |
| ------------- |:-------------:| 
|  Precondition     | Data di arrivo posteriore a quella corrente |
|  Post condition     | Registrazione fallita |
| Step#        | Description  |
|  1     | Utente chiede di aggiungere un prodotto  |
|  2     | Sistema verifica che sia un manager |
|  3     | Utente fornisce i dati (codice, prezzo di vendita, modello, categoria, dettagli, data di arrivo) del prodotto |
|  4     | Sistema verifica che i dati siano corretti e non già presenti nel database: dati incorretti perchè data di arrivo posteriore a quella corrente |
|  5     | Sistema ritorna status code "422" e messaggio "data di arrivo errata" |



### Use case 10, UC10 Aumento disponibilità di un prodotto

| Actors Involved        | Manager                    |
| ---------------------- |:-----------------------:| 
|  Precondition          | Utente manager loggato |
|  Post condition        | Registrazione arrivo di un set di prodotti dello stesso modello registrato      |
|  Nominal Scenario      | Scenario 10.1            |
|  Variants              |                     |
|  Exceptions            | Scenario 10.2, Scenario 10.3     |

##### Scenario 10.1 

| Scenario 10.1 | Aumento disponibilità di un prodotto |
| ------------- |:-------------:| 
|  Precondition          | Utente manager loggato |
|  Post condition        | Arrivo di un set di prodotti dello stesso modello registrato      |
| Step#        | Description  |  
|  1     | Utente chiede di aumentare la disponibilità di un prodotto di uno specifico modello  |
|  2     | Sistema verifica che sia un manager |
|  3     | Utente fornisce i dati (modello, categoria, dettagli, quantità, data di arrivo, prezzo di vendita) del prodotto |
|  4     | Sistema verifica che i dati siano corretti: dati corretti |
|  5     | Sistema ritorna status code "200" e aggiorna i dati presenti nel database |

##### Scenario 10.2 

| Scenario 10.2 | Utente non manager |
| ------------- |:-------------:| 
|  Precondition     | Utente non manager |
|  Post condition     | Registrazione fallita |
| Step#        | Description  |
|  1     | Utente chiede di aumentare la disponibilità di un prodotto di uno specifico modello  |
|  2     | Sistema verifica che sia un manager: utente non manager |
|  3     | Sistema ritorna status code "401" e messaggio "utente non manager" |

##### Scenario 10.3 

| Scenario 10.3 | Data di arrivo posteriore a quella corrente |
| ------------- |:-------------:| 
|  Precondition     | Data di arrivo posteriore a quella corrente |
|  Post condition     | Registrazione fallita |
| Step#        | Description  |
|  1     | Utente chiede di aumentare la disponibilità di un prodotto di uno specifico modello  |
|  2     | Sistema verifica che sia un manager |
|  3     | Utente fornisce i dati (modello, categoria, dettagli, quantità, data di arrivo, prezzo di vendita) del prodotto |
|  4     | Sistema verifica che i dati siano corretti: dati incorretti perchè data di arrivo posteriore a quella corrente |
|  5     | Sistema ritorna status code "422" e messaggio "data di arrivo errata" |



### Use case 11, UC11 Vendita di un prodotto

| Actors Involved        | Manager                    |
| ---------------------- |:-----------------------:| 
|  Precondition          | Utente manager loggato |
|  Post condition        | Prodotto segnato come venduto      |
|  Nominal Scenario      | Scenario 11.1            |
|  Variants              |                     |
|  Exceptions            | Scenario 11.2, Scenario 11.3, Scenario 11.4, Scenario 11.5     |

##### Scenario 11.1 

| Scenario 11.1 | Prodotto segnato come venduto |
| ------------- |:-------------:| 
|  Precondition          | Utente manager loggato |
|  Post condition        | Prodotto segnato come venduto      |
| Step#        | Description  |  
|  1     | Utente chiede di segnare un prodotto come venduto  |
|  2     | Sistema verifica che sia un manager |
|  3     | Utente fornisce i dati (codice univoco e data di vendita) del prodotto |
|  4     | Sistema verifica che i dati siano corretti: dati corretti |
|  5     | Sistema ritorna status code "200" e aggiorna i dati presenti nel database |

##### Scenario 11.2 

| Scenario 11.2 | Utente non manager |
| ------------- |:-------------:| 
|  Precondition     | Utente non manager |
|  Post condition     | Vendita fallita |
| Step#        | Description  |
|  1     | Utente chiede di segnare un prodotto come venduto  |
|  2     | Sistema verifica che sia un manager: utente non manager |
|  3     | Sistema ritorna status code "401" e messaggio "utente non manager" |

##### Scenario 11.3 

| Scenario 11.3 | Data di vendita errata |
| ------------- |:-------------:| 
|  Precondition     | Data di vendita errata |
|  Post condition     | Vendita fallita |
| Step#        | Description  |
|  1     | Utente chiede di segnare un prodotto come venduto  |
|  2     | Sistema verifica che sia un manager |
|  3     | Utente fornisce i dati (codice univoco e data di vendita) del prodotto |
|  4     | Sistema verifica che i dati siano corretti: dati incorretti perchè data di vendita posteriore a quella corrente o precedente alla data di arrivo del prodotto |
|  5     | Sistema ritorna status code "422" e messaggio "data di vendita errata" |

##### Scenario 11.4 

| Scenario 11.4 | Prodotto non esistente |
| ------------- |:-------------:| 
|  Precondition     | Codice prodotto non esistente nel database |
|  Post condition     | Vendita fallita |
| Step#        | Description  |
|  1     | Utente chiede di segnare un prodotto come venduto  |
|  2     | Sistema verifica che sia un manager |
|  3     | Utente fornisce i dati (codice univoco e data di vendita) del prodotto |
|  4     | Sistema verifica che i dati siano corretti: dati incorretti perchè codice prodotto non esistente nel database |
|  5     | Sistema ritorna status code "404" e messaggio "prodotto non presente nel database" |

##### Scenario 11.5 

| Scenario 11.5 | Prodotto già venduto |
| ------------- |:-------------:| 
|  Precondition     | Prodotto già venduto |
|  Post condition     | Vendita fallita |
| Step#        | Description  |
|  1     | Utente chiede di segnare un prodotto come venduto  |
|  2     | Sistema verifica che sia un manager |
|  3     | Utente fornisce i dati (codice univoco e data di vendita) del prodotto |
|  4     | Sistema verifica che i dati siano corretti: prodotto risulta già venduto nel database |
|  5     | Sistema ritorna status code "422" e messaggio "prodotto già venduto" |



### Use case 12, UC12 Cancellazione di un prodotto

| Actors Involved  |         Manager                                                             |
| :--------------: | :------------------------------------------------------------------: |
|   Precondition   | Utente presente nel database                            |
|  Post condition  | Prodotto rimosso dal database                                  |
| Nominal Scenario | Scenario 12.1                                                         |
|   Variants       |                                                                      |
|    Exceptions    | Scenario 12.2        |

##### Scenario 12.1
|  Scenario 12.1  |                  Tutto corretto                                            |
| :------------: | :------------------------------------------------------------------------: |
|  Precondition  | Utente manager loggato                        |
| Post condition |  Prodotto rimosso dal database                                                           |
|     Step#      |                                Description                                 |
|       1        | Viene chiesta l'eliminazione di un prodotto                                       |
|       2        | La richiesta viene inviata tramite il codice univoco del prodotto                                        |
|       3        | Sistema verifica la presenza del codice nel db e elimina il prodotto |
|       4        | Sistema ritorna status code "200" e un messaggio con scritto "Prodotto con codice eliminato"                    |

##### Scenario 12.2
|  Scenario 12.2  |                 Prodotto non esistente                                      |
| :------------: | :------------------------------------------------------------------------: |
|  Precondition  | Prodotto non esistente                                                      |
| Post condition |  Cancellazione prodotto fallita                                                        |
|     Step#      |                                Description                                 |
|       1        | Viene chiesta l'eliminazione di un prodotto                                       |
|       2        | La richiesta viene inviata tramite il codice univoco del prodotto                                        |
|       3        | Sistema verifica la presenza del codice nel db: codice non presente |
|       4        | Sistema ritorna status code "404" e un messaggio con scritto "Prodotto non esistente nel database"                    |



### Use case 13, UC13 Aggiunta di una recensione di un prodotto

| Actors Involved  |  Customer                                                             |
| :--------------: | :------------------------------------------------------------------: |
|   Precondition   | Utente loggato nella pagina di un prodotto                           |
|  Post condition  | Recensione aggiunta                                  |
| Nominal Scenario | Scenario 13.1                                                         |
|   Variants       |                                                                      |
|    Exceptions    |   Scenario 13.2      |

##### Scenario 13.1
|  Scenario 13.1  |                  Tutto corretto                                            |
| :------------: | :------------------------------------------------------------------------: |
|  Precondition  | Utente loggato nella pagina di un prodotto                       |
| Post condition |  Recensione aggiunta                                                            |
|     Step#      |                                Description                                 |
|       1        | L'utente chiede di aggiungere una recensione al prodotto                                       |
|       2        | La richiesta viene inviata tramite il codice univoco del prodotto e lo username dell'utente                                       |
|       3        | Sistema verifica la presenza dei codici nel db |
|       4        | Sistema ritorna status code "200" e un messaggio con scritto "Recensione aggiunta"                    |

##### Scenario 13.2
|  Scenario 13.2  |                 Prodotto/username non esistente                                      |
| :------------: | :------------------------------------------------------------------------: |
|  Precondition  | Prodotto/username non esistente                                                      |
| Post condition |  Aggiunta recensione fallita                                                        |
|     Step#      |                                Description                                 |
|       1        | L'utente chiede di aggiungere una recensione al prodotto                                       |
|       2        | La richiesta viene inviata tramite il codice univoco del prodotto e lo username dell'utente                                       |
|       3        | Sistema verifica la presenza dei codici nel db: dati incorretti |
|       4        | Sistema ritorna status code "404" e un messaggio con scritto "Prodotto non esistente nel database" o "Utente non esistente"                  |



### Use case 14, UC14 Possibilità di aggiornare prezzo di un prodotto

| Actors Involved  |  Manager                                                             |
| :--------------: | :------------------------------------------------------------------: |
|   Precondition   | Utente manager loggato nella pagina di un prodotto                           |
|  Post condition  | Prezzo modificato                                  |
| Nominal Scenario | Scenario 14.1                                                         |
|   Variants       |                                                                      |
|    Exceptions    |    Scenario 14.2     |

##### Scenario 14.1
|  Scenario 14.1  |                  Tutto corretto                                            |
| :------------: | :------------------------------------------------------------------------: |
|   Precondition   | Utente manager loggato nella pagina di un prodotto                           |
|  Post condition  | Prezzo modificato                                  |
|     Step#      |                                Description                                 |
|       1        | L'utente chiede di modificare prezzo di vendita al prodotto                                       |
|       2        | La richiesta viene inviata tramite il codice univoco del prodotto                                     |
|       3        | Sistema verifica la presenza dei codici nel db |
|       4        | Sistema ritorna status code "200" e un messaggio con scritto "Prezzo aggiornato"                    |

##### Scenario 14.2
|  Scenario 14.2  |                 Prodotto non esistente                                      |
| :------------: | :------------------------------------------------------------------------: |
|  Precondition  | Prodotto non esistente                                                      |
| Post condition | Aggiornamento prezzo fallito                                                        |
|     Step#      |                                Description                                 |
|       1        | L'utente chiede di modificare prezzo di vendita al prodotto                                       |
|       2        | La richiesta viene inviata tramite il codice univoco del prodotto                                     |
|       3        | Sistema verifica la presenza dei codici nel db: codice non esistente |
|       4        | Sistema ritorna status code "404" e un messaggio con scritto "Prodotto non esistente nel database" |



### Use case 15, UC15 Eliminazione di una recensione di un prodotto

| Actors Involved  |  Admin                                                             |
| :--------------: | :------------------------------------------------------------------: |
|   Precondition   | Admin loggato nella pagina di un prodotto                           |
|  Post condition  | Recensione eliminata                                 |
| Nominal Scenario | Scenario 15.1                                                         |
|   Variants       |                                                                      |
|    Exceptions    |   Scenario 15.2      |

##### Scenario 15.1
|  Scenario 15.1  |                  Tutto corretto                                            |
| :------------: | :------------------------------------------------------------------------: |
|   Precondition   | Admin loggato nella pagina di un prodotto                           |
|  Post condition  | Recensione eliminata                                 |
|     Step#      |                                Description                                 |
|       1        | L'admin chiede di eliminare una recensione al prodotto                                       |
|       2        | La richiesta viene inviata tramite il codice univoco del prodotto e lo username dell'utente che ha effettuato la recensione                                     |
|       3        | Sistema verifica la presenza dei codici nel db |
|       4        | Sistema ritorna status code "200" e un messaggio con scritto "Recensione eliminata"                    |

##### Scenario 15.2
|  Scenario 15.2  |                 Recensione non esistente                                      |
| :------------: | :------------------------------------------------------------------------: |
|  Precondition  |  Recensione non esistente                                                      |
| Post condition |  Eliminazione recensione fallita                                                        |
|     Step#      |                                Description                                 |
|       1        | L'admin chiede di eliminare una recensione al prodotto                                       |
|       2        | La richiesta viene inviata tramite il codice univoco del prodotto e lo username dell'utente                                       |
|       3        | Sistema verifica la presenza dei codici nel db: dati incorretti, non esiste una recensione collegata a questi dati |
|       4        | Sistema ritorna status code "404" e un messaggio con scritto "Recensione non esistente"                 |



### Use case 16, UC16 Visualizzazione tutti i prodotti

| Actors Involved        | Customer, Manager                   |
| ---------------------- |:-----------------------:| 
|  Precondition          | Utente loggato nella sezione visualizzazione |
|  Post condition        | Lista di tutti i prodotti restituita       |
|  Nominal Scenario      | Scenario 16.1            |
|  Variants              | Scenario 16.2          |
|  Exceptions            | Scenario 16.3    |

##### Scenario 16.1 

| Scenario 16.1 | Visualizzazione lista tutti gli utenti |
| ------------- |:-------------:| 
|  Precondition     | Utente loggato nella sezione visualizzazione |
|  Post condition     | Lista di tutti i prodotti |
| Step#        | Description  |  
|  1     | Utente chiede di visualizzare la lista di tutti i prodotti  |
|  2     | Sistema verifica che l'utente sia loggato e chiede la lista al backend |
|  3     | Sistema ritorna status code "200" e viene mostrata la lista |

##### Scenario 16.2 

| Scenario 16.2 | Visualizzazione lista dei soli prodotti venduti/non ancora venduti |
| ------------- |:-------------:| 
|  Precondition     | Utente loggato nella sezione visualizzazione |
|  Post condition     | Lista dei soli prodotti venduti/non ancora venduti |
| Step#        | Description  |
|  1     | Utente chiede di visualizzare la lista di tutti i prodotti venduti/non ancora venduti (attributo sold: yes o no) |
|  2     | Sistema verifica che l'utente sia loggato e chiede la lista filtrata al backend |
|  3     | Vengono effettuate le aggregazioni e raggruppati all'interno della lista |
|  4     | Sistema ritorna status code "200" e viene mostrata la lista |

##### Scenario 16.3 

| Scenario 16.3 | Utente non loggato |
| ------------- |:-------------:| 
|  Precondition     | Utente non loggato |
|  Post condition     | Visualizzazione fallita |
| Step#        | Description  |
|  1     | Utente chiede di visualizzare la lista dei prodotti |
|  2     | Sistema verifica che l'utente sia loggato: utente non loggato |
|  3     | Sistema ritorna status code "401" e messaggio "utente non loggato" |



### Use case 17, UC17 Visualizzazione informazioni prodotto

| Actors Involved        | Customer, Manager                    |
| ---------------------- |:-----------------------:| 
|  Precondition          | Utente loggato nella sezione visualizzazione |
|  Post condition        | Informazioni riguardo il prodotto      |
|  Nominal Scenario      | Scenario 17.1            |
|  Variants              |           |
|  Exceptions            | Scenario 17.2, Scenario 17.3    |

##### Scenario 17.1 

| Scenario 17.1 | Visualizzazione informazioni prodotto |
| ------------- |:-------------:| 
|  Precondition          | Utente loggato nella sezione visualizzazione |
|  Post condition        | Informazioni riguardo il prodotto      |
| Step#        | Description  |  
|  1     | Utente chiede di visualizzare le informazioni riguardo il prodotto  |
|  2     | La richiesta viene inviata tramite il codice univoco del prodotto      |
|  3     | Sistema verifica la presenza del codice nel db |
|  4     | Sistema ritorna status code "200" e informazioni riguardo il prodotto |

##### Scenario 17.2 

| Scenario 17.2 | Prodotto non presente nel database |
| ------------- |:-------------:| 
|  Precondition     | Prodotto non presente nel database |
|  Post condition     | Visualizzazione fallita |
| Step#        | Description  |
|  1     | Utente chiede di visualizzare le informazioni riguardo il prodotto  |
|       2        | La richiesta viene inviata tramite il codice univoco del prodotto                                        |
|       3        | Sistema verifica la presenza del codice nel db: codice non presente |
|       4        | Sistema ritorna status code "404" e un messaggio con scritto "Prodotto non esistente nel database"                    |

##### Scenario 17.3 

| Scenario 17.3 | Utente non loggato |
| ------------- |:-------------:| 
|  Precondition     | Utente non loggato |
|  Post condition     | Visualizzazione fallita |
| Step#        | Description  |
|  1     | Utente chiede di visualizzare le informazioni riguardo il prodotto  |
|  2     | Sistema verifica che l'utente sia loggato: utente non loggato |
|  3     | Sistema ritorna status code "401" e messaggio "utente non loggato" |


### Use case 18, UC18 Routes per visualizzare prodotti specifici (per categoria, per modello)

| Actors Involved        | Customer, Manager                    |
| ---------------------- |:-----------------------:| 
|  Precondition          | Utente loggato nella sezione visualizzazione |
|  Post condition        | Lista dei prodotti restituita       |
|  Nominal Scenario      | Scenario 18.1            |
|  Variants              | Scenario 18.2, Scenario 18.3                    |
|  Exceptions            | Scenario 18.4, Scenario 18.5, Scenario 18.6     |

##### Scenario 18.1 

| Scenario 18.1 | Visualizzazione lista prodotti per categoria |
| ------------- |:-------------:| 
|  Precondition     | Utente loggato nella sezione visualizzazione |
|  Post condition     | Lista dei prodotti di una specifica categoria |
| Step#        | Description  |  
|  1     | Utente chiede di visualizzare la lista di tutti i prodotti di una specifica categoria |
|  2     | Sistema chiede la lista filtrata al backend |
|  3     | Vengono effettuate le aggregazioni e raggruppati i prodotti con la stessa categoria |
|  4     | Sistema ritorna status code "200" e viene mostrata la lista |

##### Scenario 18.2 

| Scenario 18.2 | Visualizzazione lista prodotti per modello |
| ------------- |:-------------:| 
|  Precondition     | Utente loggato nella sezione visualizzazione |
|  Post condition     | Lista di tutti i prodotti di uno specifico modello |
| Step#        | Description  |  
|  1     | Utente chiede di visualizzare la lista di tutti i prodotti aventi lo stesso modello |
|  2     | Sistema chiede la lista filtrata al backend |
|  3     | Vengono effettuate le aggregazioni e raggruppati i prodotti dello stesso modello |
|  4     | Sistema ritorna status code "200" e viene mostrata la lista |

##### Scenario 18.3

| Scenario 18.3 | Visualizzazione lista dei soli prodotti venduti/non ancora venduti per categoria/modello |
| ------------- |:-------------:| 
|  Precondition     | Utente loggato nella sezione visualizzazione |
|  Post condition     | Lista dei soli prodotti venduti/non ancora venduti per categoria/modello |
| Step#        | Description  |
|  1     | Utente chiede di visualizzare la lista di tutti i prodotti venduti/non ancora venduti (attributo sold: yes o no) per cateogoria/modello |
|  2     | Sistema verifica che l'utente sia loggato e chiede la lista filtrata al backend |
|  3     | Vengono effettuate le aggregazioni e raggruppati nella lista |
|  4     | Sistema ritorna status code "200" e viene mostrata la lista |

##### Scenario 18.4 

| Scenario 18.4 | Utente non loggato |
| ------------- |:-------------:| 
|  Precondition     | Utente non loggato |
|  Post condition     | Visualizzazione fallita |
| Step#        | Description  |
|  1     | Utente chiede di visualizzare la lista dei prodotti  |
|  2     | Sistema verifica che l'utente sia loggato: utente non loggato |
|  3     | Sistema ritorna status code "401" e messaggio "utente non loggato" |

##### Scenario 18.5 

| Scenario 18.5 | Categoria non esistente |
| ------------- |:-------------:| 
|  Precondition     | Categoria non esistente |
|  Post condition     | Visualizzazione fallita |
| Step#        | Description  |
|  1     | Utente chiede di visualizzare la lista di tutti i prodotti di una specifica categoria |
|  2     | Sistema verifica che non esiste la categoria richiesta | 
|  3     | Sistema ritorna status code "422" e mostra messaggio errore |

##### Scenario 18.6 

| Scenario 18.6 | Modello non esistente |
| ------------- |:-------------:| 
|  Precondition     | Modello non esistente |
|  Post condition     | Visualizzazione fallita |
| Step#        | Description  |
|  1     | Utente chiede di visualizzare la lista di prodotti dello stesso modello |
|  2     | Sistema chiede il modello |
|  3     | Utente inserisce il modello |
|  4     | Sistema verifica se il modello è presente nel db: modello non esistente |
|  5     | Sistema ritorna status code "422" e mostra messaggio errore |



### Use case 19, UC19 Visualizzazione prodotti tramite filtri applicati all’elenco lato customer

| Actors Involved        | Customer                 |
| ---------------------- |:-----------------------:| 
|  Precondition          | Utente loggato nella sezione visualizzazione |
|  Post condition        | Lista dei prodotti restituita       |
|  Nominal Scenario      | Scenario 19.1            |
|  Variants              | Scenario 19.2, Scenario 19.3                    |
|  Exceptions            | Scenario 19.4     |

##### Scenario 19.1 

| Scenario 19.1 | Visualizzazione lista prodotti filtrati |
| ------------- |:-------------:| 
|  Precondition     | Utente loggato nella sezione visualizzazione |
|  Post condition     | Lista dei prodotti di una specifica categoria |
| Step#        | Description  |  
|  1     | Utente chiede di visualizzare la lista di tutti i prodotti filtrando prezzo massimo/minimo |
|  2     | Sistema chiede la lista filtrata al backend |
|  3     | Vengono effettuate le aggregazioni e raggruppati i prodotti |
|  4     | Sistema ritorna status code "200" e viene mostrata la lista |

##### Scenario 19.2 

| Scenario 19.2 | Visualizzazione lista prodotti per modello/categoria |
| ------------- |:-------------:| 
|  Precondition     | Utente loggato nella sezione visualizzazione |
|  Post condition     | Lista di tutti i prodotti di uno specifico modello/categoria con range di prezzo|
| Step#        | Description  |  
|  1     | Utente chiede di visualizzare la lista di tutti i prodotti aventi lo stesso modello/categoria con range di prezzo |
|  2     | Sistema chiede la lista filtrata al backend |
|  3     | Vengono effettuate le aggregazioni e raggruppati i prodotti dello stesso modello |
|  4     | Sistema ritorna status code "200" e viene mostrata la lista |

##### Scenario 19.3

| Scenario 19.3 | Visualizzazione lista dei soli prodotti venduti/non ancora venduti |
| ------------- |:-------------:| 
|  Precondition     | Utente loggato nella sezione visualizzazione |
|  Post condition     | Lista dei soli prodotti venduti/non ancora venduti con range di prezzo |
| Step#        | Description  |
|  1     | Utente chiede di visualizzare la lista di tutti i prodotti venduti/non ancora venduti (attributo sold: yes o no) con range di prezzo |
|  2     | Sistema verifica che l'utente sia loggato e chiede la lista filtrata al backend |
|  3     | Vengono effettuate le aggregazioni e raggruppati nella lista |
|  4     | Sistema ritorna status code "200" e viene mostrata la lista |

##### Scenario 19.4 

| Scenario 19.4 | Utente non loggato |
| ------------- |:-------------:| 
|  Precondition     | Utente non loggato |
|  Post condition     | Visualizzazione fallita |
| Step#        | Description  |
|  1     | Utente chiede di visualizzare la lista dei prodotti  |
|  2     | Sistema verifica che l'utente sia loggato: utente non loggato |
|  3     | Sistema ritorna status code "401" e messaggio "utente non loggato" |



### Use case 20, UC20 Visualizzazione carrello

| Actors Involved        | Customer, Manager                    |
| ---------------------- |:-----------------------:| 
|  Precondition          | Utente customer loggato |
|  Post condition        | Visualizzazione carrello corrente     |
|  Nominal Scenario      | Scenario 20.1            |
|  Variants              |                     |
|  Exceptions            | Scenario 20.2     |

##### Scenario 20.1 

| Scenario 20.1 | Visualizazzione carrello corrente |
| ------------- |:-------------:| 
|  Precondition          | Utente customer loggato |
|  Post condition        | Visualizazzione carrello corrente       |
| Step#        | Description  |  
|  1     | Utente chiede di visualizzare il proprio carrello corrente  |
|  2     | Sistema verifica che sia un customer |
|  3     | Sistema ritorna status code "200" e mostra informazionin sul carrello corrente (customer, pagamento, data di pagamento, prodotti) |

##### Scenario 20.2 

| Scenario 20.2 | Utente non customer |
| ------------- |:-------------:| 
|  Precondition     | Utente non customer |
|  Post condition     | Visualizzazione fallita |
| Step#        | Description  |
|  1     | Utente chiede di visualizzare il proprio carrello corrente  |
|  2     | Sistema verifica che sia un customer: utente non customer |
|  3     | Sistema ritorna status code "401" e messaggio "utente non customer" |



### Use case 21, UC21 Aggiunta di un prodotto

| Actors Involved        | Customer                    |
| ---------------------- |:-----------------------:| 
|  Precondition          | Utente customer loggato |
|  Post condition        | Prodotto aggiunto al carrello       |
|  Nominal Scenario      | Scenario 21.1            |
|  Variants              |                     |
|  Exceptions            | Scenario 21.2, Scenario 21.3, Scenario 21.4, Scenario 21.5     |

##### Scenario 21.1 

| Scenario 21.1 | Aggiunta di un prodotto |
| ------------- |:-------------:| 
|  Precondition          | Utente customer loggato |
|  Post condition        | Prodotto aggiunto al carrello       |
| Step#        | Description  |  
|  1     | Utente chiede di aggiungere un prodotto al proprio carrello |
|  2     | Sistema verifica che sia un customer |
|  3     | Utente fornisce i dati (codice del prodotto) del prodotto |
|  4     | Sistema verifica che i dati siano corretti |
|  5     | Sistema ritorna status code "200" e aggiunge il prodotto al carrello |

##### Scenario 21.2 

| Scenario 21.2 | Utente non customer |
| ------------- |:-------------:| 
|  Precondition     | Utente non customer |
|  Post condition     | Aggiunta fallita |
| Step#        | Description  |
|  1     | Utente chiede di aggiungere un prodotto al proprio carrello |
|  2     | Sistema verifica che sia un customer: utente non customer |
|  3     | Sistema ritorna status code "401" e messaggio "utente non customer" |

##### Scenario 21.3 

| Scenario 21.3 | Prodotto non esistente |
| ------------- |:-------------:| 
|  Precondition     | Prodotto non esistente|
|  Post condition     | Aggiunta fallita |
| Step#        | Description  |
|  1     | Utente chiede di aggiungere un prodotto al proprio carrello |
|  2     | Sistema verifica che sia un customer |
|  3     | Utente fornisce i dati (codice del prodotto) del prodotto |
|  4     | Sistema verifica che i dati siano corretti e presenti nel database: dati incorretti perchè codice non presente nel database |
|  5     | Sistema ritorna status code "404" e messaggio "Prodotto non esistente" |

##### Scenario 21.4 

| Scenario 21.4 | Prodotto già in un altro carrello |
| ------------- |:-------------:| 
|  Precondition     | Prodotto già in un altro carrello |
|  Post condition     | Aggiunta fallita |
| Step#        | Description  |
|  1     | Utente chiede di aggiungere un prodotto al proprio carrello |
|  2     | Sistema verifica che sia un customer |
|  3     | Utente fornisce i dati (codice del prodotto) del prodotto |
|  4     | Sistema verifica che i dati siano corretti e presenti nel database: dati incorretti perchè codice rappresenta un prodotto già in un altro carrello |
|  5     | Sistema ritorna status code "409" e messaggio "Prodotto già in un altro carrello" |

##### Scenario 21.5 

| Scenario 21.5 | Prodotto già venduto |
| ------------- |:-------------:| 
|  Precondition     | Prodotto già venduto |
|  Post condition     | Aggiunta fallita |
| Step#        | Description  |
|  1     | Utente chiede di aggiungere un prodotto al proprio carrello |
|  2     | Sistema verifica che sia un customer |
|  3     | Utente fornisce i dati (codice del prodotto) del prodotto |
|  4     | Sistema verifica che i dati siano corretti e presenti nel database: dati incorretti perchè nel db il prodotto risulta già venduto |
|  5     | Sistema ritorna status code "409" e messaggio "Prodotto già venduto" |



### Use case 22, UC22 Rimozione di un prodotto

| Actors Involved        | Customer                    |
| ---------------------- |:-----------------------:| 
|  Precondition          | Utente customer loggato |
|  Post condition        | Prodotto rimosso dal carrello       |
|  Nominal Scenario      | Scenario 22.1            |
|  Variants              |                    |
|  Exceptions            | Scenario 22.2, Scenario 22.3, Scenario 22.4, Scenario 22.5, Scenario 22.6     |

##### Scenario 22.1 

| Scenario 22.1 | Prodotto rimosso dal carrello |
| ------------- |:-------------:| 
|  Precondition          | Utente customer loggato |
|  Post condition        | Prodotto rimosso dal carrello       |
| Step#        | Description  |  
|  1     | Utente chiede di rimuovere un prodotto dal proprio carrello |
|  2     | Sistema verifica che sia un customer |
|  3     | Utente fornisce i dati (codice del prodotto) del prodotto |
|  4     | Sistema verifica che i dati siano corretti epresenti nel database: dati corretti |
|  5     | Sistema ritorna status code "200" e toglie il prodotto dal carrello |

##### Scenario 22.2 

| Scenario 22.2 | Utente non customer |
| ------------- |:-------------:| 
|  Precondition     | Utente non customer |
|  Post condition     | Rimozione fallita |
| Step#        | Description  |
|  1     | Utente chiede di rimuovere un prodotto dal proprio carrello |
|  2     | Sistema verifica che sia un customer: utente non customer |
|  3     | Sistema ritorna status code "401" e messaggio "utente non customer" |

##### Scenario 22.3 

| Scenario 22.3 | Prodotto non esistente |
| ------------- |:-------------:| 
|  Precondition     | Prodotto non esistente|
|  Post condition     | Rimozione fallita |
| Step#        | Description  |
|  1     | Utente chiede di rimuovere un prodotto dal proprio carrello |
|  2     | Sistema verifica che sia un customer |
|  3     | Utente fornisce i dati (codice del prodotto) del prodotto |
|  4     | Sistema verifica che i dati siano corretti e presenti nel database: dati incorretti perchè codice non presente nel database |
|  5     | Sistema ritorna status code "404" e messaggio "Prodotto non esistente" |

##### Scenario 22.4 

| Scenario 22.4 | Prodotto non nel carrello |
| ------------- |:-------------:| 
|  Precondition     | Prodotto non nel carrello |
|  Post condition     | Rimozione fallita |
| Step#        | Description  |
|  1     | Utente chiede di rimuovere un prodotto dal proprio carrello |
|  2     | Sistema verifica che sia un customer |
|  3     | Utente fornisce i dati (codice del prodotto) del prodotto |
|  4     | Sistema verifica che i dati siano corretti e presenti nel database: dati incorretti perchè codice rappresenta un prodotto non nel carrello |
|  5     | Sistema ritorna status code "409" e messaggio "Prodotto non nel carrello" |

##### Scenario 22.5 

| Scenario 22.5 | Prodotto già venduto |
| ------------- |:-------------:| 
|  Precondition     | Prodotto già venduto |
|  Post condition     | Rimozione fallita |
| Step#        | Description  |
|  1     | Utente chiede di rimuovere un prodotto dal proprio carrello |
|  2     | Sistema verifica che sia un customer |
|  3     | Utente fornisce i dati (codice del prodotto) del prodotto |
|  4     | Sistema verifica che i dati siano corretti e presenti nel database: dati incorretti perchè nel db il prodotto risulta già venduto |
|  5     | Sistema ritorna status code "409" e messaggio "Prodotto già venduto" |

##### Scenario 22.6 

| Scenario 22.6 | Carrello vuoto |
| ------------- |:-------------:| 
|  Precondition     | Carrello vuoto |
|  Post condition     | Rimozione fallita |
| Step#        | Description  |
|  1     | Utente chiede di rimuovere un prodotto dal proprio carrello |
|  2     | Sistema verifica che sia un customer, ma ha il carrello vuoto|
|  3     | Sistema ritorna status code "404" e messaggio "Nessun prodotto nel carrello" |



### Use case 23, UC23 Rimozione di tutti gli oggetti di un carrello

| Actors Involved        | Customer                    |
| ---------------------- |:-----------------------:| 
|  Precondition          | Utente customer loggato |
|  Post condition        | Tutti i prodotti di un carrello rimossi       |
|  Nominal Scenario      | Scenario 23.1            |
|  Variants              |                     |
|  Exceptions            | Scenario 23.2, Scenario 23.3     |

##### Scenario 23.1 

| Scenario 23.1 | Tutti i prodotti di un carrello rimossi |
| ------------- |:-------------:| 
|  Precondition          | Utente customer loggato |
|  Post condition        | Tutti i prodotti di un carrello rimossi       |
| Step#        | Description  |  
|  1     | Utente chiede di rimuovere tutti i prodotti dal proprio carrello |
|  2     | Sistema verifica che sia un customer e che ci siano prodotti nel carrello |
|  3     | Sistema ritorna status code "200" e toglie i prodotti dal carrello, carrello vuoto |

##### Scenario 23.2 

| Scenario 23.2 | Utente non customer |
| ------------- |:-------------:| 
|  Precondition     | Utente non customer |
|  Post condition     | Rimozione fallita |
| Step#        | Description  |
|  1     | Utente chiede di rimuovere tutti i prodotti dal proprio carrello |
|  2     | Sistema verifica che sia un customer: utente non customer |
|  3     | Sistema ritorna status code "401" e messaggio "utente non customer" |

##### Scenario 23.3 

| Scenario 23.3 | Carrello vuoto |
| ------------- |:-------------:| 
|  Precondition     | Carrello vuoto |
|  Post condition     | Rimozione fallita |
| Step#        | Description  |
|  1     | Utente chiede di rimuovere tutti i prodotti dal proprio carrello |
|  2     | Sistema verifica che sia un customer, ma ha il carrello vuoto |
|  3     | Sistema ritorna status code "404" e messaggio "Nessun prodotto nel carrello" |



### Use case 24, UC24 Addizione eventuale sconto

| Actors Involved        | Customer                    |
| ---------------------- |:-----------------------:| 
|  Precondition          | Utente con possibilità di sconto |
|  Post condition        | Totale del carrello scontato       |
|  Nominal Scenario      | Scenario 24.1            |
|  Variants              |                     |
|  Exceptions            | Scenario 24.2, Scenario 24.3     |

##### Scenario 24.1 

| Scenario 24.1 | Totale del carrello scontato |
| ------------- |:-------------:| 
|  Precondition          | Utente con possibilità di sconto |
|  Post condition        | Totale del carrello scontato       |
| Step#        | Description  |  
|  1     | Utente chiede di applicare uno sconto al proprio carrello |
|  2     | Sistema verifica che il customer abbia accesso allo sconto |
|  3     | Sistema ritorna status code "200" e applica sconto al carrello, ricalcolando il totale |

##### Scenario 24.2 

| Scenario 24.2 | Sconto non valido per l'utente |
| ------------- |:-------------:| 
|  Precondition     | Sconto non valido per l'utente |
|  Post condition     | Applicazione sconto fallita |
| Step#        | Description  |
|  1     | Utente chiede di applicare uno sconto al proprio carrello |
|  2     | Sistema verifica che il customer abbia accesso allo sconto: codice sconto non valido per quel customer |
|  3     | Sistema ritorna status code "401" e messaggio "Sconto non valido" |

##### Scenario 24.3 

| Scenario 24.3 | Carrello vuoto |
| ------------- |:-------------:| 
|  Precondition     | Carrello vuoto |
|  Post condition     | Applicazione sconto fallita |
| Step#        | Description  |
|  1     | Utente chiede di applicare uno sconto al proprio carrello |
|  2     | Sistema verifica che il customer abbia accesso allo sconto, ma ha il carrello vuoto |
|  3     | Sistema ritorna status code "404" e messaggio "Nessun prodotto nel carrello" |



### Use case 25, UC25 Possibilità di ordinare nuovamente lo stesso carrello

| Actors Involved        | Customer                    |
| ---------------------- |:-----------------------:| 
|  Precondition          | Utente customer loggato |
|  Post condition        | Carrello ordinato nuovamente       |
|  Nominal Scenario      | Scenario 25.1            |
|  Variants              |                     |
|  Exceptions            | Scenario 25.2, Scenario 25.3     |

##### Scenario 25.1 

| Scenario 25.1 | Carrello ordinato nuovamente |
| ------------- |:-------------:| 
|  Precondition          | Utente customer loggato |
|  Post condition        | Carrello ordinato nuovamente       |
| Step#        | Description  |  
|  1     | Utente chiede di riordinare un carrello dallo storico |
|  2     | Sistema verifica che sia un customer e che quel carrello sia stato già accettato |
|  3     | Sistema ritorna status code "200", e ordina nuovamente il carrello scelto |

##### Scenario 25.2 

| Scenario 25.2 | Utente non customer |
| ------------- |:-------------:| 
|  Precondition     | Utente non customer |
|  Post condition     | Ordine fallito |
| Step#        | Description  |
|  1     | Utente chiede di riordinare un carrello dallo storico |
|  2     | Sistema verifica che sia un customer: utente non customer |
|  3     | Sistema ritorna status code "401" e messaggio "Utente non customer" |

##### Scenario 25.3 

| Scenario 25.2 | Carrello non ancora accettato |
| ------------- |:-------------:| 
|  Precondition     | Carrello non ancora accettato |
|  Post condition     | Ordine fallito |
| Step#        | Description  |
|  1     | Utente chiede di riordinare un carrello dallo storico |
|  2     | Sistema verifica che sia un customer e che quel carrello sia stato già accettato: carrello non ancora accettato o pagato |
|  3     | Sistema ritorna status code "404" e messaggio "Carrello non ancora accettato o pagato" |



### Use case 26, UC26 Checkout ordine corrente

| Actors Involved        | Customer                    |
| ---------------------- |:-----------------------:| 
|  Precondition          | Utente customer loggato |
|  Post condition        | Carrello corrente pagato       |
|  Nominal Scenario      | Scenario 26.1            |
|  Variants              |                     |
|  Exceptions            | Scenario 26.2, Scenario 26.3     |

##### Scenario 26.1 

| Scenario 26.1 | Checkout ordine corrente |
| ------------- |:-------------:| 
|  Precondition          | Utente customer loggato |
|  Post condition        | Cartello corrente pagato       |
| Step#        | Description  |  
|  1     | Utente chiede di pagare il carrello corrente |
|  2     | Sistema verifica che sia un customer e che ci siano prodotti nel carrello |
|  3     | Sistema ritorna status code "200", imposta il totale del carrello e la data di pagamento |

##### Scenario 26.2 

| Scenario 26.2 | Utente non customer |
| ------------- |:-------------:| 
|  Precondition     | Utente non customer |
|  Post condition     | Pagamento fallito |
| Step#        | Description  |
|  1     | Utente chiede di pagare il carrello corrente |
|  2     | Sistema verifica che sia un customer: utente non customer |
|  3     | Sistema ritorna status code "401" e messaggio "Utente non customer" |

##### Scenario 26.3 

| Scenario 26.3 | Carrello vuoto |
| ------------- |:-------------:| 
|  Precondition     | Carrello vuoto |
|  Post condition     | Pagamento fallito |
| Step#        | Description  |
|  1     | Utente chiede di pagare il carrello corrente |
|  2     | Sistema verifica che sia un customer, ma ha il carrello vuoto |
|  3     | Sistema ritorna status code "404" e messaggio "Nessun prodotto nel carrello" |



### Use case 27, UC27 Visualizzazione storico ordini

| Actors Involved        | Customer, Manager                    |
| ---------------------- |:-----------------------:| 
|  Precondition          | Utente loggato |
|  Post condition        | Storico dei carrelli pagati      |
|  Nominal Scenario      | Scenario 27.1            |
|  Variants              | None                    |
|  Exceptions            |     |

##### Scenario 27.1 

| Scenario 27.1 | Visualizzazione storico ordini |
| ------------- |:-------------:| 
|  Precondition          | Utente loggato |
|  Post condition        | Storico dei carrelli pagati       |
| Step#        | Description  |  
|  1     | Utente chiede di visualizzare lo storico di tutti i suoi carrelli precedentemente pagati |
|  2     | Sistema verifica che sia un customer |
|  3     | Sistema ritorna status code "200" e mostra la lista |



### Use case 28, UC28 Accettazione ordine da parte del manager

| Actors Involved        | Manager                    |
| ---------------------- |:-----------------------:| 
|  Precondition          | Utente manager loggato |
|  Post condition        | Ordine accettato      |
|  Nominal Scenario      | Scenario 28.1            |
|  Variants              |                     |
|  Exceptions            | Scenario 28.2, Scenario 28.3    |

##### Scenario 28.1 

| Scenario 28.1 | Accettazione ordine da parte del manager |
| ------------- |:-------------:| 
|  Precondition          | Utente manager loggato |
|  Post condition        | Ordine accettato      |
| Step#        | Description  |  
|  1     | Manager chiede di accettare un ordine |
|  2     | Sistema verifica che sia un manager e codice ordine nel db |
|  3     | Sistema ritorna status code "200" e mostra ordine come accettato |

##### Scenario 28.2 

| Scenario 28.2 | Utente non manager |
| ------------- |:-------------:| 
|  Precondition          | Utente non manager |
|  Post condition        | Accettazione ordine fallita      |
| Step#        | Description  |  
|  1     | Utente chiede di accettare un ordine |
|  2     | Sistema verifica che sia un manager e codice ordine nel db: utente non manager |
|  3     | Sistema ritorna status code "401" e mostra errore "utente non manager" |

##### Scenario 28.3 

| Scenario 28.3 | Ordine non esistente |
| ------------- |:-------------:| 
|  Precondition          | Utente manager loggato |
|  Post condition        | Accettazione ordine fallita       |
| Step#        | Description  |  
|  1     | Manager chiede di accettare un ordine |
|  2     | Sistema verifica che sia un manager e codice ordine nel db: codice non esistente |
|  3     | Sistema ritorna status code "401" e mostra errore "Ordine non esistente" |




### Use case 29, UC29 Richiesta di pagamento

| Actors Involved        | Customer                    |
| ---------------------- |:-----------------------:| 
|  Precondition          | Utente customer loggato |
|  Post condition        | Ordine pagato      |
|  Nominal Scenario      | Scenario 29.1            |
|  Variants              |                     |
|  Exceptions            | Scenario 29.2, Scenario 29.3    |

##### Scenario 29.1 

| Scenario 29.1 | Ordine pagato |
| ------------- |:-------------:| 
|  Precondition          | Utente customer loggato |
|  Post condition        | Ordine pagato      |
| Step#        | Description  |  
|  1     | Utente chiede di pagare un ordine |
|  2     | Sistema verifica esistenza ordine con codice e chiede metodo di pagamento |
|  3     | Utente inserisce metodo di pagamento |
|  4     | Sistema verifica il metodo di pagamento |
|  5     | Sistema ritorna status code "200" e mostra ordine come pagato |

##### Scenario 29.2 

| Scenario 29.2 | Ordine non esistente |
| ------------- |:-------------:| 
|  Precondition          | Ordine non esistente |
|  Post condition        | Richiesta fallita      |
| Step#        | Description  |  
|  1     | Utente chiede di pagare un ordine |
|  2     | Sistema verifica esistenza ordine con codice: codice non esistente nel db |
|  3     | Sistema ritorna status code "401" e mostra errore "ordine non esistente" |

##### Scenario 29.3 

| Scenario 29.3 | Metodo di pagamento non esistente |
| ------------- |:-------------:| 
|  Precondition          | Metodo di pagamento non esistente |
|  Post condition        | Richiesta fallita      |
| Step#        | Description  |  
|  1     | Utente chiede di pagare un ordine |
|  2     | Sistema verifica esistenza ordine con codice e chiede metodo di pagamento |
|  3     | Utente inserisce metodo di pagamento |
|  4     | Sistema verifica il metodo di pagamento: metodo non esistente |
|  5     | Sistema ritorna status code "401" e mostra errore "metodo di pagamento non esistente" |



### Use case 30, UC30 Scelta indirizzo di spedizione

| Actors Involved        | Customer                    |
| ---------------------- |:-----------------------:| 
|  Precondition          | Utente customer loggato |
|  Post condition        | Indirizzo di spedizione aggiunto      |
|  Nominal Scenario      | Scenario 30.1            |
|  Variants              |                     |
|  Exceptions            | Scenario 30.2, Scenario 30.3    |

##### Scenario 30.1 

| Scenario 30.1 | Indirizzo di spedizione aggiunto |
| ------------- |:-------------:| 
|  Precondition          | Utente customer loggato |
|  Post condition        | Indirizzo di spedizione aggiunto      |
| Step#        | Description  |  
|  1     | Utente chiede di inserire indirizzo di spedizione |
|  2     | Sistema verifica esistenza ordine con codice e chiede indirizzo |
|  3     | Utente inserisce indirizzo |
|  4     | Sistema verifica l'esistenza dell'indirizzo |
|  5     | Sistema ritorna status code "200" |

##### Scenario 30.2 

| Scenario 30.2 | Ordine non esistente |
| ------------- |:-------------:| 
|  Precondition          | Ordine non esistente |
|  Post condition        | Aggiunta fallita      |
| Step#        | Description  |  
|  1     | Utente chiede di inserire indirizzo di spedizione |
|  2     | Sistema verifica esistenza ordine con codice: codice non esistente nel db |
|  3     | Sistema ritorna status code "401" e mostra errore "ordine non esistente" |

##### Scenario 30.3 

| Scenario 30.3 | Indirizzo di spedizione non esistente |
| ------------- |:-------------:| 
|  Precondition          | Indirizzo di spedizione non esistente |
|  Post condition        | Aggiunta fallita      |
| Step#        | Description  |  
|  1     | Utente chiede di inserire indirizzo di spedizione |
|  2     | Sistema verifica esistenza ordine con codice e chiede indirizzo |
|  3     | Utente inserisce indirizzo |
|  4     | Sistema verifica l'esistenza dell'indirizzo: indirizzo non esistente |
|  5     | Sistema ritorna status code "401" e mostra errore "Indirizzo di spedizione non esistente" |



### Use case 31, UC31 Scelta modalità di spedizione

| Actors Involved        | Customer                    |
| ---------------------- |:-----------------------:| 
|  Precondition          | Utente customer loggato |
|  Post condition        | Modalità di spedizione aggiunta      |
|  Nominal Scenario      | Scenario 31.1            |
|  Variants              |                     |
|  Exceptions            | Scenario 31.2, Scenario 31.3    |

##### Scenario 31.1 

| Scenario 31.1 | Modalità di spedizione aggiunto |
| ------------- |:-------------:| 
|  Precondition          | Utente customer loggato |
|  Post condition        | Modalità di spedizione aggiunta      |
| Step#        | Description  |  
|  1     | Utente chiede di inserire modalità di spedizione |
|  2     | Sistema verifica esistenza ordine con codice e chiede modalità |
|  3     | Utente inserisce modalità |
|  4     | Sistema verifica l'esistenza della modalità |
|  5     | Sistema ritorna status code "200" |

##### Scenario 31.2 

| Scenario 31.2 | Ordine non esistente |
| ------------- |:-------------:| 
|  Precondition          | Ordine non esistente |
|  Post condition        | Aggiunta fallita      |
| Step#        | Description  |  
|  1     | Utente chiede di inserire modalità di spedizione |
|  2     | Sistema verifica esistenza ordine con codice: codice non esistente nel db |
|  3     | Sistema ritorna status code "401" e mostra errore "ordine non esistente" |

##### Scenario 31.3 

| Scenario 31.3 | Modalità di spedizione non esistente |
| ------------- |:-------------:| 
|  Precondition          | Modalità di spedizione non esistente |
|  Post condition        | Aggiunta fallita      |
| Step#        | Description  |  
|  1     | Utente chiede di inserire modalità di spedizione |
|  2     | Sistema verifica esistenza ordine con codice e chiede indirizzo |
|  3     | Utente inserisce indirizzo |
|  4     | Sistema verifica l'esistenza della modalità: modalità non esistente |
|  5     | Sistema ritorna status code "401" e mostra errore "Modalità di spedizione non esistente" |

### Use case 32, UC32 Creazione sconto

| Actors Involved        | Manager                    |
| ---------------------- |:-----------------------:| 
|  Precondition          | Manager autenticato |
|  Post condition        | Sconto creato       |
|  Nominal Scenario      | Scenario 32.1            |
|  Variants              |                     |
|  Exceptions            | Scenario 32.2     |
##### Scenario 32.1 

| Scenario 32.1 | Sconto creato |
| ------------- |:-------------:| 
|  Precondition          | Manager autenticato |
|  Post condition        | Sconto creato       |
| Step#        | Description  |  
|  1     | Manager inserisce dati sconto|
|  2     | Manager seleziona utenti a cui mandare lo sconto e conferma|
|  3     | Sistema ritorna status code "200" e invia lo sconto per mail|

##### Scenario 32.2 

| Scenario 32.2 | Dati errati |
| ------------- |:-------------:| 
|  Precondition          | Manager autenticato |
|  Post condition        | Sconto non creato       |
| Step#        | Description  |
|  1     | Manager inserisce dati sconto|
|  2     | Manager seleziona utenti a cui mandare lo sconto e conferma|
|  3     | Sistema ritorna status code "401" e messaggio "Sconto non creato" |
# Glossary

![Class Diagram](/images/Diagram/V2_CD.png)
- **Customer:**
  - Persona interessata ad effettuare un acquisto dal sistema
  - Deve essere registrata sul sistema

- **Manager:**
  - Responsabile del punto vendita
  - Si occupa di aggiornare la disponibilità dei prodotti sul sistema
  - Ha il compito di accettare l’ordine effettuato da un customer

- **Admin:**
  - Persona che si occupa di gestire il sistema informativo
  - Ha la possibilità di gestire gli utenti registrati sul sistema

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

- **Spedizione:**
  - Metodo di ricezione dell’ordine da parte del customer
  - Scelto dal customer stesso

- **Recensione:**
  - Valutazione fatta da un cliente su un prodotto
  - Può essere fatta solo se il prodotto è stato effettivamente acquistato

- **Carta**
  - Metodo di pagamento utilizzato dal customer per pagare il suo ordine
  - E' composta dal suo numero univoco e dalla possibilità di spesa

# System Design

![System Design](/images/Diagram/V2_SD.png)

# Deployment Diagram

![Deployment Diagram](/images/Diagram/v2_deployment.jpg)

# Table of Rights

|            | FR 1.1 | FR 1.2 | FR 1.3 | FR 1.4 | FR 1.5 | FR 1.6 | FR 2.1 | FR 2.2 | FR 2.3 | FR 3.1-6 | FR 3.7 | FR 4.1 | FR 4.2 | FR 4.3 | FR 4.4 | FR 5.1 | FR 5.2 | FR 5.3 | FR 5.4 | FR 5.5 | FR 5.6 | FR 6.1 | FR 6.2 | FR 6.3 | FR 7.1 | FR 7.2 | FR 8 |
|------------|--------|--------|--------|--------|--------|--------|--------|--------|--------|----------|--------|--------|--------|--------|--------|--------|--------|--------|--------|--------|--------|--------|--------|--------|--------|--------|--------|
| User       | X      | X      | X      | X      | X      |        | X      |        | X      |          |        | X      | X      | X      | X      | X      | X      | X      | X      | X      | X      |        | X      |        | X      |        | X      |
| Manager    | X      | X      |        | X      | X      |        |        | X      |        | X        |        | X      | X      | X      |        | X      |        |        |        |        |        | X      | X      |        |        |        |        |
| Admin      |        |        | X      | X      |        | X      | X      | X      |        |          | X      |        |        |        |        |        |        |        |        |        |        |        |        |        |        |        |        |
| Payment Method |        |        |        |        |        |        |        |        |        |          |        |        |        |        |        |        |        |        |        |        |        |        |        | X      |        |        |        |
