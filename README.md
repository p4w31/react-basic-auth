## Description

* React/Redux + Firebase with Authentication and Authorization basics implemented

* Full CRUD App ready for implementing some quick Proof Of Concept Apps

## Current Firebase DB format

* collection name: todos
* DB structure uses user id for authorization in following manner:

- user1 id
    - hash
        - title: 'title1'
    - hash
        - title: 'title2'

- user2 id
    - hash
        - title: 'title1'
    - hash
        - title: 'title2'

## Usage
- project is forked from https://github.com/facebook/create-react-app, so to install follow create-react-app repo instructions
- remember to change API keys in /config directory to your own ones