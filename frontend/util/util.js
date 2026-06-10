export const addThousandSeparator = (num) => {
    if(num == null || isNaN(num)) return "";

    // consver number to strong to handel decimals
    const numStr = num.toString();
    const parts = numStr.split("."); // split into integer and fractional parts

    let integerPart = parts[0];
    let fractionalPart = parts[1];

    // regex for indian numbering system
    // it handles the first three digits, then every two digits
    const lastThree = integerPart.substring(integerPart.length - 3);
    const otherNumbers = integerPart.substring(0, integerPart.length - 3);

    if(otherNumbers !== "") {
        // apply comma after every two digits for the 'otherNumbers' part
        const formattedOtherNumbers = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
        integerPart = formattedOtherNumbers + "," + lastThree;
    } else {
        integerPart = lastThree;
    }

    // combine integer and fractional parts
    return fractionalPart ? `${integerPart}.${fractionalPart}` : integerPart;
}