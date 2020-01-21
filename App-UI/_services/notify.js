import apiUrl from '../environment';
class notification{
        

        getLaundryData(date){
            path = apiUrl+"/getProfileForNotification/";
            data = {
                date:date
            };
            data = JSON.stringify(data);
            return fetch(path, {
                method: "POST",//Request Type
                body: data,//post body
                headers: {//Header Definition
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
            })
        }

        notify(key,dateGiven){
            path = apiUrl+"/notify/";
            data = {
                key:key,
                dateGiven:dateGiven
            };
            data = JSON.stringify(data);
            return fetch(path, {
                method: "POST",//Request Type
                body: data,//post body
                headers: {//Header Definition
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
            })
        }


}
const b = new notification();
export default b;