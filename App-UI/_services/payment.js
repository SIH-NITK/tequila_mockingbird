import apiUrl from '../environment';
class paymentDetails{
        

        setDatePickup(data){
            path = apiUrl+"/payment/";
            data = data;
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
const b = new paymentDetails();
export default b;