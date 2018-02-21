const coindeskApi = axios.create({
    baseURL: 'http://api.coindesk.com/v1/bpi/historical/close.json'
})


function getDateInfo(startDate, endDate, currency) {
    let string = "http://api.coindesk.com/v1/bpi/historical/close.json?start="+startDate + "&end="+endDate+"&currency="+currency;


    axios.get(string)
    .then(response => {
      console.log(response.data)
        //canvas chart stuff
  var ctx = document.getElementById("myChart").getContext('2d');
  var myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: Object.keys(response.data.bpi),
          datasets: [{
              label: 'bitcoin price',
              data: Object.values(response.data.bpi),
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      }
  });

  document.getElementsByClassName('js-max-value')[0].innerHTML = Math.max.apply(null, (Object.values(response.data.bpi)))
  document.getElementsByClassName('js-min-value')[0].innerHTML = Math.min.apply(null, (Object.values(response.data.bpi)))
    })
    .catch(err => {
      console.error(err)
    })
  }

  //Select Date Inputs
var all = document.getElementById("filtersID")

//Add Listener to Make Chart When Date Inputs Change
all.addEventListener("input", function(){
  var startDate2 = document.getElementById("dateFrom").value
  var endDate2 = document.getElementById("dateTo").value
  var currency = document.getElementById("currency").value
  getDateInfo(startDate2, endDate2, currency);
});





