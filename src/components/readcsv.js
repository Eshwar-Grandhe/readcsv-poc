import { useState } from 'react';
import Papa from 'papaparse'
import '../App.css'

export default function ShowCSV() {
      
    let [csvData, setCSVData ]= useState([]);

    // link for the raw data
    const link = 'https://media.githubusercontent.com/media/datablist/sample-csv-files/main/files/customers/customers-100.csv'
    
    // function to load the csv file from remote location
    async function loadCSV(){
        console.log("Hi from loadCSV function");

        // get the file from the link
        // (remote location), first try with mock data

        Papa.parse(link,{download:true,complete: function(results,file){
            // console.log(results.data)
            // console.log(file)
            // send it to parse csv function to 
            // remove spaces and trim the values
            // making it better for searching
            parsecsv(results.data);
        }});

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
      <input type="button" value="Click to display the csv" onClick={loadCSV} />
      <br />
      <>
      {csvData.length === 0 ? (
        <p>No data available.</p>
      ) : (
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
            {csvData.map((row, index) => (
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
      )}
    </>
    </div>
  );

}

