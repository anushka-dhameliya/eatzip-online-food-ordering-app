import Swal from 'sweetalert2'

export function successAlert(message) {
    Swal.fire({
        icon: "success",
        title: "Success",
        text: message
      });
}

export function errorAlert(message) {
    Swal.fire({
        icon : "error",
        title: "Oops..",
        text: `Something went wrong. ${message}`,
      });
}

export function saveAlert(message){
    Swal.fire({
        icon: "success",
        title: message,
        showConfirmButton: false,
        timer: 1500
      });
}

export function orderCreatedSuccess(){
    Swal.fire({
        title: "Enjoy!",
        text: "Order Placed Successfully.",
        imageUrl: "https://img.freepik.com/free-vector/food-delivery-abstract-concept-vector-illustration-products-shipping-coronavirus-safe-shopping-self-isolation-services-online-order-stay-home-social-distancing-abstract-metaphor_335657-2931.jpg?ga=GA1.1.619943547.1729055353&semt=ais_hybrid",
        imageWidth: 300,
        imageHeight: 300,
        imageAlt: "Order Placed"
      });
}

export function orderCanceledSuccess(){
    Swal.fire({
        title: "Sorry!",
        text: "Order Canceled.",
        imageUrl: "https://static.vecteezy.com/system/resources/previews/020/534/511/non_2x/cancel-order-illustration-concept-on-white-background-vector.jpg",
        imageWidth: 300,
        imageHeight: 200,
        imageAlt: "Order Cancel"
      });
}

