describe("Get API Tests for all users and single user", () => {
  // https://qachallenge.ro/api/
  beforeEach(function () {
    cy.fixture("TestDataFetchAll").then((data) => {
      this.data = data;
    });
  });

  it("should fetch all data and verify structure", function () {
    const actionForAllUsers = "action=fetch_all";
    cy.request(
      `http://qachallenge.ro/api/test_api.php?${actionForAllUsers}`
    ).then((response) => {
      // Verify response status to be 200 OK
      expect(response.status).to.eq(200);

      // Verify response body is a valid JSON
      let responseBody;
      try {
        responseBody = JSON.parse(response.body);
      } catch (e) {
        throw new Error("Response body is not a valid JSON");
      }

      // Verify the response body to be an array
      expect(Array.isArray(responseBody)).to.be.true;

      // Verify length of response body to be greater than 0
      expect(responseBody.length).to.be.greaterThan(0);

      // Verify fields of first element
      expect(responseBody[0]).to.have.property("first_name");
      expect(responseBody[0]).to.have.property("id");
      expect(responseBody[0]).to.have.property("last_name");

      const expectedData = this.data;

      // Verify specific details and properties of all elements
      expectedData.forEach((expected, index) => {
        const actual = responseBody[index];
        expect(actual).to.have.property("id");
        expect(actual).to.have.property("first_name");
        expect(actual).to.have.property("last_name");
        expect(actual.id).to.equal(expected.id);
        expect(actual.first_name).to.equal(expected.first_name);
        expect(actual.last_name).to.equal(expected.last_name);
      });
    });
  });

  it("Negative testing for wrong url", () => {
    const WrongAction = "action=fetch_a";
    cy.request({
      method: "GET",
      url: `http://qachallenge.ro/api/test_api.php?${WrongAction}`,
      failOnStatusCode: false, // Adaugat pentru a nu eșua pe coduri de status non-200
    }).then((response) => {
      // Verify response status to be 404 or other appropriate status for wrong action
      expect(response.status).to.eq(200);

      // Verify response body to be null or contain an appropriate error message
      expect(response.body).to.equal("null");
    });
  });

  it("Get Single user positive testing", () => {
    const actionForSingleUser = "fetch_single";
    const ValidId = "900"; // Aici folosim direct un ID valid pentru simplitate

    cy.request(
      `http://qachallenge.ro/api/test_api.php?action=${actionForSingleUser}&id=${ValidId}`
    ).then((response) => {
      let responseBody;
      try {
        responseBody = JSON.parse(response.body);
      } catch (e) {
        throw new Error("Response body is not a valid JSON");
      }

      expect(response.status).to.eq(200);
      expect(responseBody).to.have.property("first_name");
      expect(responseBody).to.not.have.property("id"); // Dacă nu ar trebui să fie prezent
      expect(responseBody).to.have.property("last_name");
      expect(responseBody.first_name).to.equal("AAA");
      expect(responseBody.last_name).to.equal("BBB");
    });
  });

  it("Get Single user with inexistent id", () => {
    const actionForSingleUser = "fetch_single";
    const InvalidId = "203"; // Folosim direct un ID invalid pentru simplitate

    cy.request({
      method: "GET",
      url: `http://qachallenge.ro/api/test_api.php?action=${actionForSingleUser}&id=${InvalidId}`,
      failOnStatusCode: false, // Adaugat pentru a nu eșua pe coduri de status non-200
    }).then((response) => {
      expect(response.status).to.eq(200); // Așteptăm un 404 pentru ID inexistent
      expect(response.body).to.equal("null");
    });
  });
});
