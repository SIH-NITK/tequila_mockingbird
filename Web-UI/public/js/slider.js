const { fromEvent } = rxjs;
const { map, startWith } = rxjs.operators;

const range = document.querySelector('#range');
const label = document.querySelector('#label');
const img = document.querySelector('#locationImg');
const rangeVal = document.querySelector('.range-slider__value');
let chart = document.querySelector('#myChart');
let myChart = null;

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
    fetch('http://0.0.0.0:5000?r='+r+'&c='+c)
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
            myChart.data.datasets[1].data = res.graph_data;
            myChart.data.datasets[0].data = duration_arr;
            myChart.update();
        })
        .catch(err => {
            console.log(err);
        })
};

const getPixel = (event) => {
    let y = parseInt(2118*parseInt(event.offsetY)/300);
    let x = parseInt(2135*parseInt(event.offsetX)/500);
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
fetch('http://0.0.0.0:5000?r='+0+'&c='+0)
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