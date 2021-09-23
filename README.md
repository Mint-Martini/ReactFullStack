# ReactFullStack

First of all Thanks for Looking at my code!
I actally had alot of fun doing this, Please feel free to message me any quetions!

## Prerequisites/General Info  ##

This Project really has 2 Parts that you need to run both ***React.JS*** and a NPM Package called ***JSON-Server*** ( A mock API Rest server that runs on your local Machine) :)

You could in theory just need React.js but the POST request wouldnt return.


### Setting Up My (Or Any) React.JS Project ###
- - - -

You’ll need to have Node >= 14.0.0 and npm >= 5.6 on your machine. 

1. Download My main Branch 
2. Unzip to a location
3. Open a CMD windown inside ReactFullStack-main (should have 7 entities inside that folder)  
4. Run Command ```NPM install```
    1. This will download all of the packages that React Application requires. These are located in the package.Json This might take a couple minutes. 
5.  Run Command ```NPM start```
    1. This should launch my application in your browser, BUT you arent done yet!

### Setting Up JSON sever ###
- - - -
Luckily you already installed the package we need, We just need to turn it on!

1. Open another CMD window in the same place as we did before !
2. Take Note of the 2 files in the Folder
    1. ***db.json*** and ***routes.json***
3. In that Command window, 
    1. Type this command ```json-server --watch "PATH TO db.json FILE" --routes "PATH TO routes.json FILE" --port 8000```
4. In the end you shoould have two CMDs open,
    1. One with React Server Running
    2. With the JSON server running
5. At this point you are ready to run the application! Please let me know if you have any feed back 
