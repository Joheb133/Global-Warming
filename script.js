// loader
$(window).on("load",function(){
    $(".loader-wrapper").fadeOut("slow");
});

//---------------------Methane Graph---------------------//
var methaneConfig = { //variable

    type: 'line', //line, bar chart etc.
  
    plugins: [ChartDataSource], //plugin called chartdatasource, this is used to read the csv data stored locally
    data: {
        datasets:[{
            fill: false, //do not fill the area below the graph
            borderColor: '#16C4CF',
            pointRadius: 4,
            pointHitRadius: 8,
            

        }]
    },
    options: { //settings 
        legend: {
            display: false, //do not display button at top that makes graph data display turn on and off
            labels: {
                fontColor: "white",
            }
          },
        scales: {
          xAxes: [{
              scaleLabel: {
                  display: true, //display whats below
                  labelString: 'Year',//what goes on side of graph(x-axis)
                  fontColor:'white',
                  fontSize:16
              },
              gridLines:{
                  color: 'rgba(255, 255, 255 )'
              },
              ticks:{
                  fontColor:'white'
              }
          }],
          yAxes: [{
              id: 'methane',
              gridLines: {
                  drawOnChartArea: false, //false makes only verticle gride lines to be enable
              },
              scaleLabel: {
                  display: true, //display whats below
                  labelString: 'Methane mole fraction (ppb)', //what goes on side of graph(y-axis)
                  fontColor:'white',
                  fontSize:16
              },
              ticks:{
                  fontColor:'white'
              }
          }],
  
      },

      title:{
        display: true, //display below
        text: 'Methane Global Yearly Mean', //title is this
        fontColor:'white',
        fontSize:14
      },
      
      plugins: {
      datasource: { //plugin datasource
  
          type: 'csv', //type of file format
          url: 'data/methane.csv', //local link to data file
          delimiter: ',', //what separates each value
          rowMapping: 'dataset', //dataset is used when each row contains values for one data point this is often called Tidy Data
          datasetLabels: true, //first row or column will be treated as dataset labels
          indexLabels: true //first column or row will be treated as index labels
  
      }
  }
    }
  
  };

//---------------------CO2 Graph---------------------//

var co2Config = {

    type: 'line',
  
    plugins: [ChartDataSource],
    data:{
        datasets:[{
            fill: false,
            borderColor: 'black',
            pointRadius: 4,
            pointHitRadius: 8,
        }]
    },
    options: {
    legend: {
            display: false,
            labels:{
                fontColor:'black',
            }
          },
      scales: {
          xAxes: [{
              scaleLabel: {
                  display: true,
                  labelString: 'Year',
                  fontColor:'black',
                  fontSize:16
              },
              gridLines:{
                color: 'rgba(0,0,0, 0.2)'
              },
              ticks:{
                  fontColor:'black'
              }
              
          }],
          yAxes: [{
              id: 'carbon-dioxide',
              gridLines: {
                  drawOnChartArea: false
              },
              scaleLabel: {
                  display: true,
                  labelString: 'CO2 (parts per million)',
                  fontColor:'black',
                  fontSize:16
              },
              ticks:{
                  fontColor:'black'
              }
          }],
  
      },
      title:{
        display: true,
        text: 'CO2 Global Yearly Mean',
        fontColor:'black'
      },
      
      plugins: {
      datasource: {
  
          type: 'csv',
          url: 'data/CO2.csv',
          delimiter: ',',
          rowMapping: 'dataset',
          datasetLabels: true,
          indexLabels: true
  
      }
  }
    }
  
  };

//---------------------nitrousOxide Graph---------------------//

var n2oConfig = {

    type: 'line',
  
    plugins: [ChartDataSource],
    data:{
        datasets:[{
            fill: false,
            borderColor:'#16C4CF',
            pointRadius: 4,
            pointHitRadius: 8,
        }]
    },
    options: {
    legend: {
            display: false,
            labels: {
                fontColor: "white",
            }
          },  
      scales: {
          xAxes: [{
              scaleLabel: {
                  display: true,
                  labelString: 'Year',
                  fontColor:'white',
                  fontSize:16
              },
              gridLines:{
                color: 'rgba(255, 255, 255 )'
            },
            
            ticks:{
                fontColor:'white'
            }
          
        }],
          yAxes: [{
              id: 'nitrous-oxide',
              gridLines: {
                  drawOnChartArea: false
              },
              scaleLabel: {
                  display: true,
                  labelString: 'N₂O mole fraction (ppb)',
                  fontColor:'white',
                  fontSize:16
              },
              ticks:{
                  fontColor:'white'
              }
          }],
  
      },
      title:{
        display: true,
        text: 'Nitrous Oxide Global Yearly Mean',
        fontColor:'white'
      },
      plugins: {
      datasource: {
  
          type: 'csv',
          url: 'data/n2o.csv',
          delimiter: ',',
          rowMapping: 'dataset',
          datasetLabels: true,
          indexLabels: true
  
      }
  }
    }
  
};

//---------------------global temp data---------------------//
getTempData(); //execute function

async function getTempData(){ //Asynchronous functions operate in a separate order than the rest of the code
    const GCAGxs = []; //create empty list
    const GCAGys = [];

    const GISTEMPxs = [];
    const GISTEMPys = [];
    
    const response = await fetch('https://pkgstore.datahub.io/core/global-temp/annual_csv/data/a26b154688b061cdd04f1df36e4408be/annual_csv.csv') //The await operator is used to wait for a Promise.
    .then(response => response.text()); //goes to url and takes the text on page

    const table = response.split('\n').slice(1); //splits each line into an array and removes first line(source, year and mean)
    function sourceGCAG(table){ //create table as a function called sourcegcag
        return (table.includes('GCAG')) //return all elements that contain the string gcag
    }
    function sourceGISTEMP(table){
        return (table.includes('GISTEMP')) //return all elements that contain the string gistemp
    }
    tableGCAG = table.filter(sourceGCAG); //create new array with all elements that include the string gcag
    tableGISTEMP = table.filter(sourceGISTEMP); //create new array with all elements that include the string gistemp

    tableGCAG = tableGCAG.reverse() //reverse order
    tableGISTEMP = tableGISTEMP.reverse()

    tableGCAG.forEach(row => {
        const columns = row.split(','); //each column is split by comma
        const year = columns[1]; //year = all values in 2nd column
        GCAGxs.push(year); //all values in variable year are stored in GCAGxs
        const temp = columns[2]; //temp = all values in 3rd column
        GCAGys.push(parseFloat(temp) +14); //all values in variable temp are converted to floats and 14 is added then theyre stored in GCAGys
    });
    
    tableGISTEMP.forEach(row => {
        const columns = row.split(',');
        const year = columns[1];
        GISTEMPxs.push(year)
        const temp = columns[2];
        GISTEMPys.push(parseFloat(temp) +14)
    });
    return {GCAGxs, GCAGys, GISTEMPxs, GISTEMPys}; //return all the values back into the empty list

}

//---------------------global temp graph---------------------//
graphTemp(); //execute function

async function graphTemp(){
const data = await getTempData(); //wait for data
const ctx = document.getElementById('GlobalTempGraph').getContext('2d') //where graph will be drawn
var GlobalTempConfig = new Chart (ctx, { //create new chart at that location
    type: 'line', //type of graph
    data: {
        labels: data.GCAGxs, //use data in this list as labels(x-axis data)
        datasets: [{
            label: 'GCAG',
            data: data.GCAGys, //use data in this list as data(y-axis data)
            fill: false, //dont colour area below the graph
            backgroundColor: 'rgba(255, 0, 0, 0.5)', //colour of point on line
            borderColor:'rgba(255, 99, 132, 1)', //colour of of line
            borderWidth: 1.5, //line width
            pointRadius: 2,
            pointHitRadius: 8,
        }, {
            label: 'GISTEMP',
            data: data.GISTEMPys,
            fill: false,
            backgroundColor:'rgba(4, 0, 255, 0.3)',
            borderColor: 'rgba(4, 0, 255, 0.7)',
            borderWidth: 1.5,
            pointRadius: 2,
            pointHitRadius: 8,

            type: 'line' //create another line on graph


        }]
    },
    options: { //options
        legend: {
                display: true //display legend, click to stop displaying line
              },  
          scales: {
              xAxes: [{
                  scaleLabel: {
                      display: true, //display below
                      labelString: 'Year' //display on x-axis
                  }
              }],
              yAxes: [{
                  scaleLabel: {
                      display: true, //display below
                      labelString: 'Temperature (C° )' //display on y-axis
                  },
                  ticks: {
                    callback: function(value, index, values) {
                        return value + '°'; //add ° to all values on y-axis
                    }
                }
              }],
      
          },
          title:{
            display: true,
            text: 'Global Temperature Mean' //title of graph
          }
        }
});
}

//---------------------sealevelrise data---------------------//
getSeaLevelRiseData();

async function getSeaLevelRiseData(){
    const CSIROxs = [];
    const CSIROys = [];

    const NOAAys = [];
    
    const response = await fetch('https://pkgstore.datahub.io/90998f7f90e086bd5fc7c9075dfda43b/sea-level-rise/1/epa-sea-level_csv/data/5411d470d626db6f0828d9b4dffe2f34/epa-sea-level_csv.csv')
    .then(response => response.text()); //goes to url and takes the text on page

    const responseClean = response.replace(/-11-08/g, '');//replace all parts of string containing -11-08 with nothing
    const tableCSIRO = responseClean.split('\n').slice(1, 134); //remove first line and splits each line into array from 1 to 133 
    const tableNOAA = responseClean.split('\n').slice(1); //remove first line and splits each line into array from 1 

    tableCSIRO.forEach(row => {
        const columns = row.split(',');
        const time = columns[0];
        CSIROxs.push(time);
        var GMSL = columns[1];
        GMSL = parseFloat(GMSL)*25.4; //convert string to float and multiply by 25.4(convert from inches to milimetre)
        GMSL = GMSL.toFixed(2); //round to two decimal places
        CSIROys.push(GMSL);

    });
    tableNOAA.forEach(row => {
        const columns = row.split(',');
        var GMSL = columns[4];
        GMSL = parseFloat(GMSL)*25.4;
        GMSL = GMSL.toFixed(2);
        NOAAys.push(GMSL);
    });
    return {CSIROxs, CSIROys, NOAAys};

}

//---------------------graph sealevelrise---------------------//
graphSea();

async function graphSea(){
const data = await getSeaLevelRiseData();
const ctx = document.getElementById('SeaLevelGraph').getContext('2d')
var GlobalTempConfig = new Chart (ctx, {
    type: 'line',
    data: {
        labels: data.CSIROxs,
        datasets: [{
            label: 'CSIRO',
            data: data.CSIROys,
            fill: false,
            backgroundColor: 'rgba(255, 0, 0, 0.5)', //colour of point on line
            borderColor:'rgba(255, 99, 132, 1)', //colour of of line
            borderWidth: 1.5, //line width
            pointRadius: 2,
            pointHitRadius: 8,
        }, {
            label: 'NOAA',
            data: data.NOAAys,
            spanGaps: true,
            fill: false,
            backgroundColor:'rgba(4, 0, 255, 0.3)',
            borderColor: 'rgba(4, 0, 255, 0.7)',
            borderWidth: 1.5,
            pointRadius: 2,
            pointHitRadius: 8,

            type: 'line',
        }]
    },
            options: {
                legend: {
                        display: true
                      },  
                  scales: {
                      xAxes: [{
                          scaleLabel: {
                              display: true,
                              labelString: 'Year'
                          }
                      }],
                      yAxes: [{
                          scaleLabel: {
                              display: true,
                              labelString: 'Sea Level Change (mm)'
                          }
                      }],
              
                  },
                  title:{
                    display: true,
                    text: 'Global Average Sea Level Change'
                  }
                }


        
        
    }
)}
//---------------------Arctic Sea Ice min data---------------------//
async function getArcticSeaIceData(){
    const Arcticxs = [];
    const Arcticys = [];
    
    const response = await fetch('https://climate.nasa.gov/system/internal_resources/details/original/1929_Arctic_data_1979-2019.txt')
    .then(response => response.text()); //goes to url and takes the text on page

    const table = response.split('\n').slice(1); //remove first line and splits raw text into array

    table.forEach(row => {
        const columns = row.split('\t'); //each column is split by a tab
        const time = columns[0];
        Arcticxs.push(time);
        const GMSL = columns[4];
        Arcticys.push(GMSL);
    });
    return {Arcticxs, Arcticys};

}

//---------------------graph Arctic Sea Ice min---------------------//
graphArctic();

async function graphArctic(){
const data = await getArcticSeaIceData();
const ctx = document.getElementById('ArcticSeaIceGraph').getContext('2d')
var GlobalTempConfig = new Chart (ctx, {
    type: 'line',
    data: {
        labels: data.Arcticxs,
        datasets: [{
            data: data.Arcticys,
            fill: false,
            backgroundColor: 'rgba(255, 0, 0, 0.5)', //colour of point on line
            borderColor:'rgba(255, 99, 132, 1)', //colour of of line
            borderWidth: 1.5, //line width
            pointRadius: 2,
            pointHitRadius: 8,
        }]
        
    },
    options: {
        legend: {
                display: false
              },  
          scales: {
              xAxes: [{
                  scaleLabel: {
                      display: true,
                      labelString: 'Year'
                  }
              }],
              yAxes: [{
                  scaleLabel: {
                      display: true,
                      labelString: 'million square km'
                  }
              }],
      
          },
          title:{
            display: true,
            text: 'Arctic Sea Ice Minimum'
          }
        }
});
}

//---------------------when page selected graph is loaded---------------------//
function causesGraph() { //creates function
    var ctx = document.getElementById('methaneGraph').getContext('2d'); //graph display location
    window.myChart = new Chart(ctx, methaneConfig); //creates a chart when the page loads

    var ctx = document.getElementById('co2Graph').getContext('2d');
    window.myChart = new Chart(ctx, co2Config);

    var ctx = document.getElementById('n2oGraph').getContext('2d');
    window.myChart = new Chart(ctx, n2oConfig);
};

window.addEventListener("load", causesGraph, false); //function is called when user is on the page with the pgraphs that will be on that page


//---------------------global co2 model---------------------//
var imgCo2 = new Array(); //create new array containing all elements below
var co2Count;
for (co2Count= 0; co2Count!=172; co2Count++){ //start i at zero increase i by one until its equal to 172
    imgCo2[co2Count]= 'co2_model/'+co2Count+'.jpg' //add i value to the string at i position
};

$(document).on('input change', '#slider', function() {//listen to slider changes
    var v=$(this).val();//getting slider val
   $('#sliderStatus').html( $(this).val() );
  $("#img").prop("src", imgCo2[v]); //display img at slider value i.e. slider = 25, display img 25
});

//---------------------global temp model---------------------//
var imgTemp = new Array();
var tempCount;
for (tempCount= 0; tempCount!=134; tempCount++){ //start i at zero increase i by one until its equal to 172
    imgTemp[tempCount]= 'temp_model/'+tempCount+'.jpg' //add i value to the string at i position
};

$(document).on('input change', '#slider', function() {//listen to slider changes
    var v=$(this).val();//getting slider val
   $('#sliderStatus').html( parseInt(v)+1884 );
  $("#imgTemp").prop("src", imgTemp[v]);
});

