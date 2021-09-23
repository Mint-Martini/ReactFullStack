import React from 'react';

class DropdownCall extends React.Component{

    constructor(props){
      super(props)

      //The state will keep track of information that is deemed important
      //Response - Needed to make sure we know once this is recvied , we can rerender
      //SupervisorKey- This Value we will pass to its parent to make idenitfy the proper Selecter Manager 
      this.state = {
          response : [],
          SupervisorKey :-1,
          beingSelected: false
      }
    }

//To mount Response to he Dynamic Selcter in render 
componentDidMount(){
    this.getList()
}

//API Call to AWS for managers, Will update state and re render with dynamic managers 
  getList (){
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch("https://o3m5qixdng.execute-api.us-east-1.amazonaws.com/api/managers", requestOptions)
            .then(response => response.text())
            .then(result => {
                var sortedresult = processResponse(JSON.parse(result))
                this.setState({response: sortedresult })
            }
            ).catch(error => console.log('error', error));
        
      }


  // Renders the Selecter and then maps every object in the Response Sorted Array to an HTML option with an identifing ID

    render() {
      return (
        <div id="Selecter">
             <select id='superNames' onChange={(e) => {this.props.functionCall(e);}}  > <option value="-1">Please Select a Supervisor</option>{
                this.state.response.map((obj) => {
                     return <option value={obj.id} key={obj.identificationNumber} >
                    {obj.jurisdiction+" - "+obj.lastName+", "+ obj.firstName}</option>
            })}</select>
        </div>
      );
    }
  }


//Function to handle the REsponse of Managers,
//Step 1: Sorts array,
//Step 2: finds how many elements to be removed
//Step 3 Shortens array to have a final array 

  function processResponse(jsonBody) {
    var sortedFullArray = jsonBody.sort(compareFinal);
    var indexToDelete = [];

    for (let i = 0; i < sortedFullArray.length; i++) {
        if (sortedFullArray[i].jurisdiction <= '9'){
            indexToDelete.push(i);
        }  
    }

    sortedFullArray.splice(0,indexToDelete.length);
    return sortedFullArray
}

//Custom made compare function to make the alpha sorted list work,
//Builds a Name with Jurisdiction, Last and First 

  function compareFinal( a, b ) {
    var aTempFullName = a.jurisdiction+a.lastName+a.firstName
    var bTempFullName = b.jurisdiction+b.lastName+b.firstName

    aTempFullName = aTempFullName.toLowerCase()
    bTempFullName = bTempFullName.toLowerCase()

    if (aTempFullName < bTempFullName ){
      return -1;
    }
    if ( aTempFullName > bTempFullName ){
      return 1;
    }
    return 0;
  }



   export default DropdownCall