const { fromEvent } = rxjs;
const { map, startWith } = rxjs.operators;

const range = document.querySelector('#range');
const label = document.querySelector('#label');
const img = document.querySelector('#locationImg');
const rangeVal = document.querySelector('.range-slider__value');
let chart = document.querySelector('#myChart');
let myChart = null;
const baseUrl = 'http://0.0.0.0:5000/';

let timestamps = [];
for(let i=1;i<=24;i++)
{

    if(i<=12)
    {
        let year = '2017';
        if(i%13<10)
        {
            year = year+'0'+(i%13);
        }
        else{
            year = year+(i%13);
        }
        let year1 = year + '_15_' + '1';
        let year2 = year + '_15_' + '2';
        timestamps.push(year1);
        timestamps.push(year2);
    }
    else
    {
        let year = '2018';
        if(i%12==0)
        {
            year = year+'12';
        }
        else if(i%12<10)
        {
            year = year+'0'+(i%12);
        }
        else{
            year = year+(i%12);
        }
        let year1 = year + '_15_' + '1';
        let year2 = year + '_15_' + '2';
        timestamps.push(year1);
        timestamps.push(year2);
    }
    timestamps.push()
}

const renderGraph = (r,c) => {
    fetch(baseUrl + '?r='+r+'&c='+c)
        .then(async response => {
            let res = await response.json();
            console.log(res);

            let harvest_freq_h = document.querySelector('#harvest_freq_h');
            let date_of_sowing_h = document.querySelector('#date_of_sowing_h');
            let date_of_harvest_h = document.querySelector('#date_of_harvest_h');
            let duration_harvest = document.querySelector('#harvest_duration_h');
            let crop_type_h = document.querySelector('#crop_type_h');
            if(res.crop_interval.length === 0){

                date_of_sowing_h.innerHTML = "---";
                date_of_harvest_h.innerHTML = "---";
                harvest_freq_h.innerHTML = "---";
                crop_type_h.innerHTML = "No Vegetation";
                duration_harvest.innerHTML = "---";
            }
            else{
                crop_type_h.innerHTML = "No Vegetation";
                if(res.crop_interval.length === 1)
                {
                    harvest_freq_h.innerHTML = "Single Crop";
                }
                if(res.crop_interval.length === 2)
                {
                    harvest_freq_h.innerHTML = "Single Crop";
                }
                let avg_duration = 0;
                let largest_interval_idx = 0;
                let diff = -1;
                res.crop_interval.map((interval, idx) => {
                   avg_duration += interval.interval_in_months;

                   if(diff < (interval.img_idx[1] - interval.img_idx[0]))
                   {
                       diff = (interval.img_idx[1] - interval.img_idx[0]);
                       largest_interval_idx = idx;
                   }

                });
                avg_duration /= parseInt(res.crop_interval.length);
                duration_harvest.innerHTML = (res.crop_interval[largest_interval_idx].interval_in_months) + " months";

                let yr = timestamps[parseInt(res.crop_interval[largest_interval_idx].img_idx[0])].slice(0,4);
                let month = timestamps[parseInt(res.crop_interval[largest_interval_idx].img_idx[0])].slice(4,6);
                date_of_sowing_h.innerHTML = month + '/' + yr;

                yr = timestamps[parseInt(res.crop_interval[largest_interval_idx].img_idx[1])].slice(0,4);
                month = timestamps[parseInt(res.crop_interval[largest_interval_idx].img_idx[1])].slice(4,6);
                date_of_harvest_h.innerHTML = month + '/' + yr;
            }

            let duration_arr = [];
            for(let i=0;i<48;i++)
                duration_arr.push(0);
            res.crop_interval.forEach(interval => {
                let left = interval.img_idx[0];
                let right = interval.img_idx[1];
                for(let j=left;j<=right;j++)
                {
                    duration_arr[j] = res.graph_data[j];
                }
            });
            myChart.data.datasets[1].data = res.graph_data;
            myChart.data.datasets[0].data = duration_arr;
            myChart.update();
        })
        .catch(err => {
            console.log(err);
        })
};

const getPixel = (event) => {
    let y = parseInt(2118*parseInt(event.offsetY)/400);
    let x = parseInt(2135*parseInt(event.offsetX)/550);
    renderGraph(y,x);
};

const f = new Flipping();
const update = f.wrap(index => {

    rangeVal.innerHTML = timestamps[index];
    img.setAttribute('src','../images/overlayed/awifs_ndvi_'+ timestamps[index] + '_clipped.jpg');
});

const range$ = fromEvent(range, 'input').
    pipe(
    map(e => e.target.value),
    startWith(1));

range$.subscribe(update);

let ctx = chart.getContext('2d');
fetch(baseUrl + '?r='+0+'&c='+0)
    .then(async response => {
        let res = await response.json();
        console.log(res);

        let duration_arr = [];
        for(let i=0;i<48;i++)
            duration_arr.push(0);
        res.crop_interval.forEach(interval => {
           let left = interval.img_idx[0];
           let right = interval.img_idx[1];
           for(let j=left;j<=right;j++)
           {
               duration_arr[j] = res.graph_data[j];
           }
        });
        let harvest_freq_h = document.querySelector('#harvest_freq_h');
        let date_of_sowing_h = document.querySelector('#date_of_sowing_h');
        let date_of_harvest_h = document.querySelector('#date_of_harvest_h');
        let duration_harvest = document.querySelector('#harvest_duration_h');
        let crop_type_h = document.querySelector('#crop_type_h');

        if(res.crop_interval.length === 0){

            harvest_freq_h.innerHTML = "---";
            crop_type_h.innerHTML = "No Vegetation";
            duration_harvest.innerHTML = "---";
            date_of_sowing_h.innerHTML = "---";
            date_of_harvest_h.innerHTML = "---";
        }

        else{
            crop_type_h.innerHTML = "No Vegetation";
            if(res.crop_interval.length === 1)
            {
                harvest_freq_h.innerHTML = "Single Crop";
            }
            if(res.crop_interval.length === 2)
            {
                harvest_freq_h.innerHTML = "Single Crop";
            }

            let largest_interval_idx = 0;
            let diff = -1;
            let avg_duration = 0;
            res.crop_interval.map((interval,idx) => {
                avg_duration += interval.interval_in_months;

                if(diff < (interval.img_idx[1] - interval.img_idx[0]))
                {
                    diff = (interval.img_idx[1] - interval.img_idx[0]);
                    largest_interval_idx = idx;
                }
            });
            avg_duration /= parseInt(res.crop_interval.length);
            duration_harvest.innerHTML = res.crop_interval[largest_interval_idx].interval_in_months + " months";

            let yr = timestamps[parseInt(res.crop_interval[largest_interval_idx].img_idx[0])].slice(0,4);
            let month = timestamps[parseInt(res.crop_interval[largest_interval_idx].img_idx[0])].slice(4,6);
            date_of_sowing_h.innerHTML = month + '/' + yr;

            yr = timestamps[parseInt(res.crop_interval[largest_interval_idx].img_idx[1])].slice(0,4);
            month = timestamps[parseInt(res.crop_interval[largest_interval_idx].img_idx[1])].slice(4,6);
            date_of_harvest_h.innerHTML = month + '/' + yr;
        }

        myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: timestamps,
                datasets: [{
                    label: 'Harvest duration',
                    data: duration_arr,
                    backgroundColor: "rgba(200,0,0,0.6)"
                },{
                    label: 'NDVI data',
                    data: res.graph_data,
                    backgroundColor: "rgba(0,200,0,0.6)"
                }]
            },
            options:{
                scales:{
                    yAxes:[{
                        ticks: {
                            min:0,
                            max:255
                        }
                    }]
                }
            }
        });
    })
    .catch(err => {
        console.log(err);

    });