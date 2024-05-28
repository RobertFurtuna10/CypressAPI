describe('Update API Tests', () => {
    // https://qachallenge.ro/api/
    beforeEach(function() {
      cy.fixture('TestDataFetchAll').then((data) => {
        this.data = data;
      });
    });

    it('Verifiy updating an existent user with valid data', () => {
        const ValidAction = 'update';
        cy.request({
          method: 'POST',
          url: `http://qachallenge.ro/api/test_api.php?action=${ValidAction}`,
          form: true,
           body: {
            id:'980',
            first_name: 'Test23',
            last_name: 'Bobita'
            }
        })
        .then((response) => {
          
          let responseBody;
        try {
          responseBody = JSON.parse(response.body);
        } catch (e) {
          throw new Error('Response body is not a valid JSON');
        }

          expect(response.status).to.eq(200);
          expect(responseBody).to.deep.equal( [ { success: '1' } ] );
          
        });
      });

})