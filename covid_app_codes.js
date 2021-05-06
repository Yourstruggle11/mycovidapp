//Hello there i m souvik,
 //Welcome to my world of coding this is my pleasure that you are watching and observing my code
 //But remember don't try to do anything wrong with the code it took my sweat and one more thing feel free to suggest any improvements



const url = "https://api.covid19india.org/data.json";

fetch(url)
    .then(function(response){
        return response.json();
    })
        .then(function(data){
            console.log(data);
            console.log(data.statewise[0].deaths);

            let Confirmed = data.statewise[0].confirmed;
            let Confirmed_Daily_Update = data.statewise[0].deltaconfirmed;
            let Death = data.statewise[0].deaths;
            let Death_Daily_Update = data.statewise[0].deltadeaths;
            let Recover = data.statewise[0].recovered;
            let Recover_Daily_Update = data.statewise[0].deltarecovered;
            let Active = data.statewise[0].active;

            document.getElementById("total_confirm_cases").innerHTML = Confirmed;
            document.getElementById("confirm_within_24hr").innerHTML = `${Confirmed_Daily_Update} <i class="fa fa-arrow-up"></i>`;
            document.getElementById("total_death_cases").innerHTML = Death;
            document.getElementById("death_within_24hr").innerHTML = `${Death_Daily_Update} <i class="fa fa-arrow-up"></i>`;
            document.getElementById("total_recover_cases").innerHTML = Recover;
            document.getElementById("recover_within_24hr").innerHTML = `${Recover_Daily_Update} <i class="fa fa-arrow-up"></i>`;
            document.getElementById("Active").innerHTML = Active;
            document.getElementById("Active").style.color = "red";

            //start of graph chart

            //creating arrays for line chart
            var change_in_json = [];
            var change_to_be_print = [];
            var date = [];
            var date_to_be_print = [];

            //make changes in json
            $.each(data.cases_time_series, function(id, obj){
                change_in_json.push(obj.dailyconfirmed);
                change_to_be_print = change_in_json.slice(90);
                date.push(obj.date);
                date_to_be_print = date.slice(90);
              
            })
            //  console.log(date_to_be_print);

            var myChart = document.getElementById("chart1").getContext('2d');

            var chart = new Chart(myChart, {
                type: "line",
                data: {
                    labels: date_to_be_print,

                    datasets : [
                        {
                            label: "Daily Confirmed",
                            data:  change_to_be_print,
                            backgroundColor: "#caf7e3",
                            borderColor: "#f05945",
                            minBarLength: 100
                        }
                    ]
                },
                options:{
                        legend: {
                            labels: {
                                fontColor: "cyan",
                                fontSize: 18
                            }
                        }
                }
            })

            //creating arrays for bar chart

            var states = [];
            var confirmed = [];
            var recovered = [];
            var deaths = [];

            //make changes in json
            $.each(data.statewise, function(id, obj){
                states.push(obj.state);
                confirmed.push(obj.confirmed);
                recovered.push(obj.recovered);
                deaths.push(obj.deaths);
               // console.log(deaths);
            })
            //shift the first index
            states.shift();
            confirmed.shift();
            recovered.shift();
            deaths.shift();
            console.log(states);

            var myChart = document.getElementById("chart2").getContext('2d');
            var chart = new Chart(myChart, {
                type: "bar",

                data:{
                    labels: states,
                    fontcolor: "red",

                    datasets:[
                        {
                            label: "Confirmed Cases",
                            data: confirmed,
                            backgroundColor:"#ff7a00" ,
                            minBarLength:5 ,
                        },

                        {
                            label: "Recovered Cases",
                            data:recovered ,
                            backgroundColor:"#ccffbd" ,
                            minBarLength:5 ,
                        },

                        {
                            label:" Death Cases",
                            data:deaths ,
                            backgroundColor:"#f6dfeb" ,
                            minBarLength:5 ,
                        },
                    ]
                },
                options:{
                    legend: {
                        labels: {
                            fontColor: "#f5c0c0",
                            fontSize: 18
                        }
                    }
                }
            })
        })
