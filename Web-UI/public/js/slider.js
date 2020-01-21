const { fromEvent } = rxjs;
const { map, startWith } = rxjs.operators;

const range = document.querySelector('#range');
const label = document.querySelector('#label');
const img = document.querySelector('#locationImg');
const rangeVal = document.querySelector('.range-slider__value');

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