let buttons=document.querySelectorAll(".btn-danger");
let basketCount=document.querySelector("#basketCount");
buttons.forEach(button => {
button.onclick=function(ev){
    let productArr=[];
    let productId=this.parentElement.getAttribute("data-id");
    if (localStorage.getItem("basket")!=null) {
        productArr=JSON.parse(localStorage.getItem("basket"));
    }
    let exsistProduct=productArr.find(pr=>pr.id==productId);
    if (exsistProduct) {
        exsistProduct.count++;
    }
    else{
        let product={
            id: productId,
            desc:this.previousElementSibling.previousElementSibling.innerText,
            price:this.previousElementSibling.innerText.split(" ")[0],
            count:1,
            image:this.parentElement.previousElementSibling.getAttribute("src")
        }
        productArr.push(product);
    }
    localStorage.setItem("basket",JSON.stringify(productArr));
    caculateCountBasket()
}
});
caculateCountBasket()

 function caculateCountBasket() {
    let basket=localStorage.getItem("basket");
    let length=0;
    if (basket) {
        length=JSON.parse(basket).length;    
        basketCount.innerText=length;
        basketCount.setAttribute("class","d-block")
    }
   
 }