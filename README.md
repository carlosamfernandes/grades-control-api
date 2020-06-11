# grades-control-api
Manipulating JSON files with Node.js

This is an exercise made as the final exam of the 2nd module of Fullstack Developers from IGTI which is about creating an API using Node.js. 
Here we manipulate a JSON file containing grades of random people. 
That's what the API can do: 
- get a full list of the grades, 
- get an especific grade by it's ID, 
- insert a new grade (informing student, subject, type and value), 
- update an existing grade (informing id, student, subject, type and value), 
- delete a grade by it's ID, 
- consult the sum of grades from a student in a subject (informing student and subject), 
- consult the average grade given a subject of a type (informing subject and type) and
- consult the top 3 grades given a subject of a type (informing subject and type).
Last but not least, this API can register logs using Winston to keep tracks of all the things that are going when it's running (includind the successful transactions).

You can consult the documentation on this link http://localhost:3000/doc/

(in order to run this application you must create a folder called 'logs' in the root and run 'npm install' to download all modules)
