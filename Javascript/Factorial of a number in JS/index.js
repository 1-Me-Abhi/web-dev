function fact(n){
if (n==0)
    return 1;  
return n*fact(n-1);
}
let n=20;
console.log(fact(n))