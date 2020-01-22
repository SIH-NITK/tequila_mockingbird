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
let timestamps_display = [];
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

        let date_label;
        switch (i) {
            case 1: date_label = '1st January, 2017';
                timestamps_display.push(date_label);
                break;
            case 2: date_label = '1st February, 2017';
                timestamps_display.push(date_label);
                break;
            case 3: date_label = '1st March, 2017';
                timestamps_display.push(date_label);
                break;
            case 4: date_label = '1st April, 2017';
                timestamps_display.push(date_label);
                break;
            case 5: date_label = '1st May, 2017';
                timestamps_display.push(date_label);
                break;
            case 6: date_label = '1st June, 2017';
                timestamps_display.push(date_label);
                break;
            case 7: date_label = '1st July, 2017';
                timestamps_display.push(date_label);
                break;
            case 8: date_label = '1st August, 2017';
                timestamps_display.push(date_label);
                break;
            case 9: date_label = '1st September, 2017';
                timestamps_display.push(date_label);
                break;
            case 10: date_label = '1st October, 2017';
                timestamps_display.push(date_label);
                break;
            case 11: date_label = '1st November, 2017';
                timestamps_display.push(date_label);
                break;
            case 12: date_label = '1st December, 2017';
                timestamps_display.push(date_label);
                break;
        }
    }
    else
    {
        let month;
        let year = '2018';
        if(i%12==0)
        {
            year = year+'12';
            month = 12;
        }
        else if(i%12<10)
        {
            year = year+'0'+(i%12);
            month = i%12;
        }
        else{
            year = year+(i%12);
            month = i%12;
        }
        let date_label;
        switch (month) {
            case 1: date_label = '1st January, 2018';
                timestamps_display.push(date_label);
                break;
            case 2: date_label = '1st February, 2018';
                timestamps_display.push(date_label);
                break;
            case 3: date_label = '1st March, 2018';
                timestamps_display.push(date_label);
                break;
            case 4: date_label = '1st April, 2018';
                timestamps_display.push(date_label);
                break;
            case 5: date_label = '1st May, 2018';
                timestamps_display.push(date_label);
                break;
            case 6: date_label = '1st June, 2018';
                timestamps_display.push(date_label);
                break;
            case 7: date_label = '1st July, 2018';
                timestamps_display.push(date_label);
                break;
            case 8: date_label = '1st August, 2018';
                timestamps_display.push(date_label);
                break;
            case 9: date_label = '1st September, 2018';
                timestamps_display.push(date_label);
                break;
            case 10: date_label = '1st October, 2018';
                timestamps_display.push(date_label);
                break;
            case 11: date_label = '1st November, 2018';
                timestamps_display.push(date_label);
                break;
            case 12: date_label = '1st December, 2018';
                timestamps_display.push(date_label);
                break;
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
            let crop_health_dt_h = document.querySelector('#crop_health_dt_h');

            if(res.crop_interval.length === 0){

                date_of_sowing_h.innerHTML = "---";
                date_of_harvest_h.innerHTML = "---";
                harvest_freq_h.innerHTML = "---";
                crop_type_h.innerHTML = "No Vegetation";
                duration_harvest.innerHTML = "---";
                crop_health_dt_h.innerHTML = "---";
            }
            else{
                if(res.crop_interval.length === 1)
                {
                    harvest_freq_h.innerHTML = "Single Crop";
                }
                if(res.crop_interval.length === 2)
                {
                    harvest_freq_h.innerHTML = "Single Crop";
                }
                let healthiest_idx = 0;
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

                let healthiest_month;
                let healthiest_year;
                healthiest_idx = parseInt((res.crop_interval[largest_interval_idx].img_idx[0] + res.crop_interval[largest_interval_idx].img_idx[1])/2);
                healthiest_month = parseInt(timestamps[healthiest_idx].slice(4,6));
                healthiest_year = parseInt(timestamps[healthiest_idx].slice(0,4));

                crop_health_dt_h.innerHTML = healthiest_month + '/' + healthiest_year;

                if(healthiest_month >= 4 && healthiest_month <= 10)
                    crop_type_h.innerHTML = "Kharif";
                else
                    crop_type_h.innerHTML = "Rabi";

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
    img.setAttribute('src','../images/overlayed_new/awifs_ndvi_'+ timestamps[index] + '_clipped.jpg');
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
        let crop_health_dt_h = document.querySelector('#crop_health_dt_h');


        if(res.crop_interval.length === 0){

            harvest_freq_h.innerHTML = "---";
            crop_type_h.innerHTML = "No Vegetation";
            duration_harvest.innerHTML = "---";
            date_of_sowing_h.innerHTML = "---";
            date_of_harvest_h.innerHTML = "---";
            crop_health_dt_h.innerHTML = "---";
        }

        else{
            crop_type_h.innerHTML = "Rabi";
            if(res.crop_interval.length === 1)
            {
                harvest_freq_h.innerHTML = "Single Crop";
            }
            if(res.crop_interval.length === 2)
            {
                harvest_freq_h.innerHTML = "Single Crop";
            }

            let largest_interval_idx = 0;
            let healthiest_idx;
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

            let healthiest_month;
            let healthiest_year;
            healthiest_idx = parseInt((res.crop_interval[largest_interval_idx].img_idx[0] + res.crop_interval[largest_interval_idx].img_idx[1])/2);
            healthiest_month = parseInt(timestamps[healthiest_idx].slice(4,6));
            healthiest_year = parseInt(timestamps[healthiest_idx].slice(0,4));

            crop_health_dt_h.innerHTML = healthiest_month + '/' + healthiest_year;

            if(healthiest_month >= 4 && healthiest_month <= 10)
                crop_type_h.innerHTML = "Kharif";
            else
                crop_type_h.innerHTML = "Rabi";

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