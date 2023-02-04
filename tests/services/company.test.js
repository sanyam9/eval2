const db = require('../../db/models');
const companyServices = require('../../src/services/companyServices');
const csvUtils = require('../../src/utils/csvUtils');

describe('Company Services', () => {
  it('Should return an object with company id and sector when URL is given', async () => {
    const mockedFn = jest.spyOn(csvUtils, 'getCSVData').mockResolvedValue(
      [
        ['123', 'ABC'],
        ['987', 'XYZ']
      ]);
    
    const parsedCSVData = await companyServices.getIdSector('xyz.com');
    expect(parsedCSVData).toEqual([
      {id: '123', sector: 'ABC'},
      {id: '987', sector: 'XYZ'}
    ]);
    expect(mockedFn).toBeCalled();
  });

  it('Should populate the database when a list with company details is given', async () => {
    const mockedFn = jest.spyOn(db.CompanyInfo,'bulkCreate').mockResolvedValue({
      id: '', name: '', ceo: '', sector: ''
    });
    
    const companies = await companyServices.createCompanies([{
      id: '', name: '', ceo: '', sector: ''
    }]);

    expect(companies).toEqual({
      id: '', name: '', ceo: '', sector: ''
    });

    expect(mockedFn).toBeCalled();
  });

  it('Should insert score in the database when the score with the company id is given', async () => {
    const mockedFn = jest.spyOn(db.CompanyInfo, 'update').mockResolvedValue([1]);

    const updateResponse = await companyServices.insertScore('123a', 56.5);

    expect(updateResponse).toEqual([1]);

    expect(mockedFn).toBeCalled();
  });

  it('Should return id, name and score of all the companies', async () => {
    const mockedFn = jest.spyOn(db.CompanyInfo,'findAll').mockResolvedValue([
      {
        id: '123a',
        name: 'abc',
        score: 67.88
      },
      {
        id: '123abc',
        name: 'abc',
        score: 758.3
      }
    ]);

    const companies = await companyServices.getOutput();

    expect(companies).toEqual([
      {
        id: '123a',
        name: 'abc',
        score: 67.88
      },
      {
        id: '123abc',
        name: 'abc',
        score: 758.3
      }
    ]);

    expect(mockedFn).toBeCalled();
  });
});
