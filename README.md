# DnD Catalog

DnD handbook with helpfull information, like spells catalog, items, weapons info and something more. Including inventory calculating page, and frontend make with PWA standarts.
> Note that all data comes in **russian** !

**DEMO**
[render page](https://dnd-catalog.onrender.com/)


## Frontend
Made with PWA standarts, using Vue js framework, build with webpack, data store is IndexedDb.
#### Structure
```
build                   //- webpack config files directory
dist                    //- webpack output and a web index directory
src                     //- main source files directory
    classes/            //- js classes directory, including Db class and Helper
    components/         //- Vue components directory
    scss/               //- scss style files directory
    store/              //- vuex object file(s) directory
```

#### Production
Run in console:
``` bash
$ npm run prod
$ npm run serve
```
With ```prod``` command webpack will build production files and put them into ```dist``` directory, and after it run ```serve``` command to start local static server using ```dist``` directory files

## Db Structure

Backend Sqlite Db has the following structure:

``` sql
CREATE TABLE `class` (
    id integer PRIMARY KEY,
    name varchar NOT NULL,
    spellsInfo TEXT
);

CREATE TABLE `spell` (
    id integer PRIMARY KEY,
    name varchar NOT NULL,
    level integer NOT NULL,
    castTime varchar,
    distance varchar,
    isRitual integer NOT NULL DEFAULT 0,
    isVerbal integer NOT NULL DEFAULT 0,
    isSomatic integer NOT NULL DEFAULT 0,
    isMaterial integer NOT NULL DEFAULT 0,
    materials varchar,
    duration varchar,
    hasConcentration integer NOT NULL DEFAULT 0,
    description TEXT,
    school varchar
);

CREATE TABLE `armor` (
    id integer PRIMARY KEY,
    group varchar,
    name varchar NOT NULL,
    price integer NOT NULL,
    ac varchar,
    weight FLOAT,
    strengh varchar,
    stealth varchar
);

CREATE TABLE `weapon` (
    id integer PRIMARY KEY,
    group varchar,
    name varchar NOT NULL,
    price integer NOT NULL,
    damage varchar,
    weight FLOAT,
    properties varchar
);

CREATE TABLE `item` (
    id integer PRIMARY KEY,
    group varchar,
    name varchar NOT NULL,
    price integer NOT NULL,
    weight FLOAT
);
```
