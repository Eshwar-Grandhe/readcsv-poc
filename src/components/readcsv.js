import { useState } from 'react';
import Papa from 'papaparse'
import '../App.css'

export default function ShowCSV() {
      
    let [csvData, setCSVData ]= useState([]);
    let [query,setQuery ]= useState();
    const temp=[]

    // link for the raw data
    const link = 'https://media.githubusercontent.com/media/datablist/sample-csv-files/main/files/customers/customers-100.csv'
    
    // function to load the csv file from remote location
    async function loadCSV(){

        // get the file from the link
        // (remote location), first try with mock data

        Papa.parse(link,{download:true,complete: function(results,file){
            // send it to parse csv function to 
            // remove spaces and trim the values
            // making it better for searching
            parsecsv(results.data);
        }});

    }

    function handleSubmit(){
        csvData.filter((data)=>{
            const obj = data
            if(obj['Email'].match(query)){
                temp.push(obj)
            }
            return temp
        })
        console.log(temp)
    }

    function parsecsv(csvText){

        // get all the headers
        const headers = csvText[0];
        // console.log(headers)

        // variable to store the parsed csv file 
        const parsedData = [];

        // code to trim each line
        for (let i = 1; i < csvText.length; i++) {

            const rowitems = csvText[i];

            if (rowitems.length === headers.length) {

                const rowitem = {};

                for (let j = 0; j < headers.length; j++) {
                    rowitem[headers[j].trim()] = rowitems[j].trim();
                }

                parsedData.push(rowitem);
            }
        }
        setCSVData(parsedData);        
    }

    const headers = csvData.length > 0 ? Object.keys(csvData[0]) : [];

  return (
    <div>
      <h1>Read CSV Poc</h1>
      <div>
        <input type="search" placeholder='Search here..' onChange={(event)=>setQuery(event.target.value)}/>
        <input type="button" value='search' onClick={handleSubmit}/>  
      </div>
      <input type="button" value="Click to display the csv" onClick={loadCSV} />
      <br />
      <>
      {temp.lenghth===0 && csvData.length === 0 ? (
        <p>No data available.</p>
      ) : 
        <table id='customers'>
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index} >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {temp.length>0? 
            temp.map((row, index) => (
                <tr key={index}>
                  {headers.map((header, columnIndex) => (
                    <td key={columnIndex} >
                      {row[header]}
                    </td>
                  ))}
                </tr>
              ))
            :csvData.map((row, index) => (
              <tr key={index}>
                {headers.map((header, columnIndex) => (
                  <td key={columnIndex} >
                    {row[header]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      }
    </>
    </div>
  );

}

