function sortObj(obj) {
    keys = Object.keys(obj)
    res = []
    for (key of keys) {
        res.push([key, obj[key]])
    }
    quicksort(res, 0, res.length -1)
    return res
}

function quicksort(a, low, high) {
    if (low >= 0 && high >= 0 && low < high){
        let p = partition(a, low, high)
        quicksort(a, low, p)
        quicksort(a, p+1, high)
    }
}

function partition(a, low, high) {
    let pivot = a[low][1]
    let i = low - 1;
    let i_test = low;
    let j = high + 1;
    let j_test = high;

    while(true) {
        do {
            i++
        }while(a[i][1] > pivot);
        do {
            j--;
        }while(a[j][1] < pivot);

        if (i >= j) {
            return j
        }
        let temp = a[i]
        a[i] = a[j]
        a[j] = temp
    }
}

function printReport(pages) {
    console.log('starting the report')
    const sorted = sortObj(pages)
    for (item of sorted) {
        console.log(`Found ${item[1]} internal links to ${item[0]}`)
    }
}

module.exports = {
    sortObj,
    printReport
}