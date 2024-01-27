// Necessary imports
import { useState } from 'react';
import Papa from 'papaparse'
import '../App.css'

export default function ShowCSV() {
    
    // state and global variables
    let [csvData, setCSVData ]= useState([]);
    let [filterData, setFilterData ]= useState([]);
    let [query,setQuery ]= useState();
    const temp=[];
    
    // function to load the csv file from remote location
    async function loadCSV(){

        // get the file from the link(remote location)
        Papa.parse(process.env.REACT_APP_CSV_LINK,{download:true,complete: function(results,file){
            // Papa.parse(link,{download:true,complete: function(results,file){
            // send it to parse csv function to 
            // remove spaces and trim the values
            // making it better for searching
            parsecsv(results.data);
        }});

    }

    // function for the search query
    function handleSubmit(){

        csvData.filter((data)=>{
            const obj = data;
            headers.map(item=>{
                if(query!==''&& obj[item].match(query)){
                    temp.push(obj)
                }
            })
            return temp;
        })
        setFilterData(temp);
    }

    // function to parse the csv data
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
        // setting it to the variable
        setCSVData(parsedData);        
    }

    // to get the headers from the csv file
    const headers = csvData.length > 0 ? Object.keys(csvData[0]) : [];

  return (
    <div>
      <h1>Read CSV Poc</h1>
      <div>
        <input className='button' type="button" value="Click to display the csv" onClick={loadCSV} />
        <br />
        <br />
        <div>
            <input id="search" type="search" placeholder='Search here..' onChange={(event)=>{
                setQuery(event.target.value)
            }}/>
            <input className='button' type="button" value='Search' onClick={handleSubmit}/>  
        </div>
      </div>
      <br />
      <div>
      <>
      {filterData.lenghth===0 && csvData.length === 0 ? (
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
            {filterData.length>0? 
            filterData.map((row, index) => (
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
    </div>
  );

}

