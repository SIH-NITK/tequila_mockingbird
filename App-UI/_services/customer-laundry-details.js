import apiUrl from '../environment';
class customerLaundryDetails{
        result=[];
        postCustomerLaundry(customerLaundry) {
            var path = apiUrl+"/enterCustomerLaundry/";
            customerLaundry = JSON.stringify(customerLaundry);
            return fetch(path, {
                method: "POST",//Request Type
                body: customerLaundry,//post body
                headers: {//Header Defination
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
            })

        }



        getCustomerLaundry(key) {
     
            var path = apiUrl+"/retreiveCustomerLaundry/";
            data ={
                key:key
            }
            data = JSON.stringify(data);
            return fetch(path, {
                method: "POST",//Request Type
                body: data,//post body
                headers: {//Header Definition
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
            })
        }

        getCustomerLaundryCurrent(){
            return this.result.current;
        }
        getCustomerLaundryHistory(){
            return this.result.history;
        }

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
const b = new customerLaundryDetails();
export default b;