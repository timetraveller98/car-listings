const FormatNumber = (digit:number) => {
    return new Intl.NumberFormat('en-Us').format(digit)
}
export default FormatNumber;