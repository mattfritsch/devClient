export function getSum41(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum;
}

export function getNumberOfEven42(arr) {
    let number = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] % 2 === 0) {
            number++;
        }
    }
    return number;
}

export function getMaxEven45(arr) {
    let maxEven = Number.MIN_SAFE_INTEGER;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] % 2 === 0 && arr[i] > maxEven) {
            maxEven = arr[i];
        }
    }
    return maxEven;
}

export function dichotomie(tab, f){
    let m
    let a = 0;
    let b = tab.length - 1;

    while(a <= b){
        m = Math.floor((a+b) / 2);
        if(tab[m] === f){
            return m
        }
        else if(tab[m] < f){
            a = m + 1
        }
        else{
            b = m - 1;
        }
    }
    return m = -1;
}