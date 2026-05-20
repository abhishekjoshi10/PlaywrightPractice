class APIutils
{
    constructor(ApiContext,LoginPayLoad)
    {
        this.ApiContext=ApiContext;
        this.LoginPayLoad=LoginPayLoad;
    }
    async getToken()
    {
         const LoginResponse = await this.ApiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", 
                {
                    data:this.LoginPayLoad
                })
        
               
                const LoginResponseJson = await LoginResponse.json();
                const Token = LoginResponseJson.token;
                return Token;
    }

    async createOrder(OrderPayLoad)
    {
          const response={};
          response.Token= await this.getToken();
          const OrderResponse=await this.ApiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
                 {
                     data:OrderPayLoad,
                     headers:{
                       'authorization': response.Token,
                       'content-type':'application/json'
                     }
                 })
                 const OrderResponseJson= await OrderResponse.json();
                 console.log("OrderResponseJson : ",OrderResponseJson);
                 const OrderId=OrderResponseJson.orders[0];
                 response.OrderId=OrderId;

                 return response;
    }

}

module.exports={APIutils}