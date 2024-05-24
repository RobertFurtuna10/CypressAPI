describe('Post API Tests', () => {
    // https://qachallenge.ro/api/
    beforeEach(function() {
      cy.fixture('TestDataFetchAll').then((data) => {
        this.data = data;
      });
    });

    it('Test insert a user', () => {
        const ValidAction = 'action=insert';
        cy.request({
          method: 'POST',
          url: 'http://qachallenge.ro/api/test_api.php?action=insert',
          form: true,
           body: {
            first_name: 'Ionut',
            last_name: 'Bobita'
            }
        })
        .then((response) => {
         

          expect(response.status).to.eq(200);
          cy.log(response.body)
          expect(response.body).to.deep.equal( [ { success: '1' } ] );
    

          
        });
      });
  });
  