const csvUtils = require('../../src/utils/csvUtils');

describe('CSV Utils', () => {
  it('Should return a list of company id and sector when csv URL is given', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      status: 200,
      text: () => '123,abc\n213,ncb\n87ad,jjcn'
    });

    const parsedCSVData = await csvUtils.getCSVData('xyz.com/abc.csv');
    expect(parsedCSVData).toEqual([
      ['213','ncb'],
      ['87ad','jjcn']
    ]);
  });

  it('Should throw an error when an response is not OK', async () =>{
    jest.spyOn(global, 'fetch').mockResolvedValue({
      status: 404
    });

    const parsedCSVData = csvUtils.getCSVData('xyz.com/abc.csv');
    expect(parsedCSVData).rejects.toThrow('404');
  });
});