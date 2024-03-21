function GetBasket() {
    let basket=localStorage.getItem("basket");
    let products=[];
    if (basket) {
        products=JSON.parse(basket)
        return products
    }
}
let productArray=GetBasket();
let basketpr=document.getElementById("basketpr");
let countpr=0;
let totalPriceNum=0;
productArray.forEach(product => {
    
    let basketArea=document.createElement("div");
    basketArea.classList.add("basket-area");
    basketArea.classList.add("col-8");
    let img=document.createElement("div");
    img.classList.add("img");
    let imgProduct=document.createElement("img");
    imgProduct.setAttribute("src",product.image);
    let description=document.createElement("div");
    description.classList.add("description");
    let desc=document.createElement("span");
    desc.innerText=product.desc;
    let countPrice=document.createElement("div");
    countPrice.classList.add("count-price");
    let minus=document.createElement("i");
    minus.classList.add("fa-solid", "fa-circle-minus");


    let count=document.createElement("span");
    count.innerText=product.count;
    let plus=document.createElement("i");
    plus.classList.add("fa-solid", "fa-circle-plus");
    let price=document.createElement("span");
    price.innerText=product.price + " "+ "₼ ";
    let remove=document.createElement("i");
    remove.classList.add("fa-solid", "fa-xmark", "removei");
    countpr+=product.count;
    totalPriceNum+=(product.count*parseFloat(product.price));
     basketpr.append(basketArea);
    basketArea.append(img,description,countPrice);
     img.append(imgProduct);
     description.append(desc);
     countPrice.append(minus,count,plus,price,remove)

     minus.onclick=function(){
        product.count--;
        countpr--;
        count.innerText=product.count;
        totalPriceNum=totalPriceNum-parseFloat(product.price);
        if (product.count==0) {
         productArray=productArray.filter(pr=>pr.id!=product.id)
         basketArea.remove();
        }
        if (countpr==0) {
            totalPrice.remove();
            basketText.classList.add("d-block");
        }
        updateData();
      }

      plus.onclick=function(){
        product.count++;
        count.innerText=product.count;
        countpr++;
        totalPriceNum=totalPriceNum+parseFloat(product.price);

        updateData();
      }

      remove.onclick=function(){
        productArray=productArray.filter(pr=>pr.id!=product.id)
        basketArea.remove();
        countpr= countpr-product.count;
        totalPriceNum=totalPriceNum-(parseFloat(product.price)*product.count);
        if (countpr==0) {
            totalPrice.remove();
            basketText.classList.add("d-block");
        }
        updateData();
       
        
      }

})

function updateData(){
    localStorage.setItem("basket",JSON.stringify(productArray));
    textCount.innerText="Məhsul sayı:"+countpr+" ədəd";
    totalPricePr.innerText="Ümumi məbləğ:"+" "+totalPriceNum+" ₼";
    caculateCountBasket()
}

let totalPrice=document.createElement("div");
totalPrice.classList.add("col-3", "total-price");
let textCount=document.createElement("p");
textCount.innerText="Məhsul sayı:"+countpr+" ədəd";
let totalPricePr=document.createElement("p");
totalPricePr.innerText="Ümumi məbləğ:"+" "+totalPriceNum+" ₼";
let order=document.createElement("button");
order.setAttribute("type","button");
order.classList.add("btn","btn-danger","w-75");
order.innerText="Sifarişi tamamla";
let basketText=document.querySelector(".basket-dtext");
if (countpr) {
    basketpr.append(totalPrice);
totalPrice.append(textCount,totalPricePr,order);
}
else{
    basketText.classList.add("d-block");
}






