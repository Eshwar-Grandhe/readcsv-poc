import { useState, useEffect } from 'react';
import Papa from 'papaparse'
import csvfile from './data/data.csv'

export default function ShowCSV() {
    // const csvData = useState();
    function loadCSV(){
        console.log("Hi from loadCSV function");
        
        // let csv = Papa.parse(csvfile, {Headers:true});

    }
  return (
    <div>
      <h1>Read CSV Poc</h1>
      <input type="button" value="Click to display the csv" onClick={loadCSV} />

    </div>
  );

}

