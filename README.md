# React Masterclass Progetto Finale
# GameCorp



- [Descrizione](#descrizione)
- [API](#api)
- [Styling Solution o Component Library](#styling-solution-o-component-library)
- [Pages](#pages)
- [API + User Interaction](#api--user-interaction)
- [Deployment](#deployment)


## Descrizione

Piattaforma che mostra videogiochi, e da la possibilitá ai suoi utenti autenticati di comunicare tra di loro, scegliere i giochi migliori/preferiti e lasciare reviews su quelli più usati.

## API

* [API Rawg.io](https://rawg.io/apidocs)
  * [x] Supports CORS
  * [x] Requires an API Key
* [Service-BaaS-supabase](https://supabase.com/)

## Styling Solution o Component Library

* Tailwind

## Pages

* Home Page - Lista dei giochi disponibili e ricerca tra i giochi
* Filter Page - Lista dei giochi secondo un filtro specifico
* Single Game Page - Mostra dettagli sullo specifico gioco, se autenticato utente puó selezionarlo tra i preferiti e puo lasciare un commento sul gioco.
* Login Page - Possibilitá di autenticazione
* Register Page - Possibilitá di registrare Utente con Email
* Account Page - Dettaglio profilo Utente, Mostra dati utente autenticato
* Settings Page - Aggiornamento profilo Utente

## API + User Interaction

* [x] Utenti possono cercare un gioco con una query
* [x] Utenti possono cliccare su un gioco per vederne il dettaglio e eventuali reviews
* [x] Utenti possono filtrare su un gioco basandosi su un parametro
* [x] Utenti loggati possono caricare informazioni profilo ( nome, cognome, avatar, username, ecc... )
* [x] Utenti loggati possono lasciare una review su un gioco specifico
* [x] Utenti loggati creare una lista di giochi preferiti
* [x] Utenti loggati possono rimuovere un gioco dai preferiti
* [x] Uteni loggati possono chattare live su un gioco specifico
* Context API / Global state management library
  * Utenti loggati possono condividere dati all'interno dell'applicazione

## Deployment
 https://game-corp-b1yyle4k9-giuseppes-projects-4c950381.vercel.app/

