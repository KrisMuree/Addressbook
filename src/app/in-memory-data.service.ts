
export class InMemoryDataService implements InMemoryDataService {

  createDb() {
    const employees = [
      {id: 1, firstName: 'Kishore', lastName: 'Krishnamurthy', department: 'IT', contactNumber: '1234567890'}
    ];
    return {employees};
  }
}
