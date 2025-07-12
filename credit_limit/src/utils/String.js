const string = {
  formatMoney: (number, currency = true) => {
    return (
      `${currency ? 'Rp ' : ''}` +
      parseInt(number || 0, 10)
        .toFixed(0) // always two decimal digits
        .replace('.', ',') // replace decimal point character with ,
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    ); // use . as a separator
  },
  moneyFormatToNumber: (curr) => {
    return Number(curr.replace(/[Rp.,]+/g, ''));
  },
  decimalToPercent: (number = 0) => {
    return `${parseFloat(number) * 100} %`;
  },
  replaceSpace: (text, string = '') => {
    return text?.replace(/\s/g, string);
  },
  stringOnlyContainsNumber: (string) => {
    return /^\d+$/.test(string);
  },
  stringSeparator: (props) => {
    const str = props?.string;
    const num = props?.num ? props.num : 4;
    const separator = props?.separator ? props?.separator : ' ';
    const re = new RegExp('.{' + num + '}', 'g');

    return str.match(re).join(separator);
  },
  getLastItem: (thePath) => thePath.substring(thePath.lastIndexOf('/') + 1),
  blurPhoneNumber: (phone) => {
    const firstSection = phone.substring(0, 4);
    const lastSection = phone.substring(phone.length - 2);
    const starTotal = phone.length - firstSection.length - lastSection.length;
    let star = '';
    new Array(starTotal).fill(0).forEach(function () {
      star += '*';
    });

    return `${firstSection}${star}${lastSection}`;
  },
  convertPhoneNumber: (phone) => {
    const firstSection = phone.substring(0, 1);
    const lastSection = phone.substring(2, phone.length);
    let results = phone;
    if (firstSection !== '0') {
      results = `0${lastSection}`;
    }

    return results;
  },
};

export default string;
