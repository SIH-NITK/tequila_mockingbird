import apiUrl from '../environment';
class customerDetails{

        postCustomerDetails(customerDetail) {
            var path = apiUrl+"/customerDetails/";
            customerDetails = JSON.stringify(customerDetail);
            return fetch(path, {
                method: "POST",//Request Type 
                body: customerDetails,//post body 
                headers: {//Header Defination 
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
            })

        }

        getCustomerProfile=(roomno,blockno)=>{
            var path = apiUrl+"/getToken/";
            data={
                roomNo:roomno,
                blockNo:blockno
            }
            data = JSON.stringify(data);
            return fetch(path, {
                method: "POST",//Request Type 
                body: data,//post body 
                headers: {//Header Defination 
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
            })
        }


}
const b = new customerDetails();
export default b;
