// d.	To sum of all elements in the array.
function  sumarr(){
    let arr=[1,2,3,4,5];
    let sum=0;
    for(let i=0;i<arr.length;i++){
        sum+=arr[i];
        let avg;
        avg= sum/arr.length;
        
        return avg;
    }
}
console.log(sumarr())
