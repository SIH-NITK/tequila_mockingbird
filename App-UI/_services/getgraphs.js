import apiUrl from '../environment';
class getGraphs{

        getgraphs(x,y) {
            console.log("graphs")
            var path = apiUrl+`?r=${y}&c=${x}`;
            console.log(path)
            return fetch(path, {
                method: "GET",
            })

        }



}
const b = new getGraphs();
export default b;
