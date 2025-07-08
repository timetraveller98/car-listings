const FormatPrice = (amount : number) => {
    return ( new Intl.NumberFormat(
        'en-US',{
            style:'currency',
            currency:'INR'
        }
    ) ).format(amount)
}
 
export default FormatPrice;