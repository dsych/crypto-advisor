export default class TextService {
  _data = {
    montly_deposit_help:
      'This is the amount you are ready to invest monthly. A consistent monthly contribution is the most profitable and safest way to invest in the crypto market',
    risklevel_help:
      "The Risk Level is simply volatility you are ready to have for your portfolio. The more your portfolio volatile, the higher gains you're likely to have. But keep in mind, if the market falls, you're likely to experience larger losses.",
    contibutions_help:
      'Based on your risk level, these are contributions you should make monthly',
    expectation_help:
      "This expectation chart is based on your monthly contribution and your portfolio's risk level. It assumes that you will be investing monthly for the next 5 years",
  };

  get(textId) {
    return this._data[textId] || '';
  }
}
