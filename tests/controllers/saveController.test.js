const { default: axios } = require('axios');
const saveController = require('../../src/controllers/saveController');
const companyServices = require('../../src/services/companyServices');

describe('Post Controller', () => {
  it('should return a list of company names', async () => {
    jest.spyOn(companyServices, 'getIdSector').mockResolvedValue(
      [
        {id: '12ab' , sector:'ABC'},
        {id: 'zy98' , sector:'XYZ'}
      ]
    );

    jest.spyOn(axios, 'get').mockResolvedValueOnce({
      data: {
        id: '12ab',
        name: 'abc',
        description: '',
        ceo: '',
        tags: []
      }
    }).mockResolvedValue({
      data:[{
        companyId: '12ab',
        performanceIndex: [
          {key: 'cpi', value: 0.46},
          {key: 'cf', value: 523763},
          {key: 'mau', value: 0.05},
          {key: 'roic', value: 5.66}
        ]
      }]
    });

    jest.spyOn(companyServices, 'createCompanies').mockResolvedValue({

    });

    jest.spyOn(companyServices, 'insertScore').mockResolvedValue({

    });

    jest.spyOn(companyServices, 'getOutput').mockResolvedValue({
      id: '12a',
      name: 'ABC',
      score : 26.26
    });

    const mockReq = {
      body: {
        urlLink : 'xyz'
      }
    };
    
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await saveController.postSaveController(mockReq,mockRes);
    expect(mockRes.status).toBeCalledWith(200);
    expect(mockRes.json).toBeCalledWith({
      id: '12a',
      name: 'ABC',
      score : 26.26
    });
  });
});