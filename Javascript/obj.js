let date =new Date();
console.log(date);
let Abhi={
    name:"Abhishek",
    age:25,
    city:"Delhi"
}
console.log(Abhi);
// let Abhi2={
//     ...Abhi
// }
// Abhi2.age=23;
// console.log(Abhi2);
let Abhi2=Object.assign({},Abhi);
Abhi2.age=23;
console.log(Abhi2);
try{
    console.log(Abhi2.city);
    console.log(Abhi2.country);
}catch(error){
    console.log(error);
}
finally{
    console.log("Finally block executed");
}