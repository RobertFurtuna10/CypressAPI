describe("Delete API Tests", () => {
  // https://qachallenge.ro/api/
  beforeEach(function () {
    cy.fixture("TestDataFetchAll").then((data) => {
      this.data = data;
    });
  });

  it("Verify I can delete an existent account with valid id", () => {
    const ValidAction = "delete";
    cy.request({
      method: "Delete",
      url: `http://qachallenge.ro/api/test_api.php?action=${ValidAction}`,
      form: true,
      body: {
        id: "975",
      },
    }).then((response) => {
      let responseBody;
      try {
        responseBody = JSON.parse(response.body);
      } catch (e) {
        throw new Error("Response body is not a valid JSON");
      }

      expect(response.status).to.eq(200);
      expect(responseBody).to.deep.equal([{ success: "1" }]);
    });
  });

  it("Verify if we can delete an existing user with wrong key for id", () => {
    const ValidAction = "delete";
    cy.request({
      method: "Delete",
      url: `http://qachallenge.ro/api/test_api.php?action=${ValidAction}`,
      form: true,
      body: {
        id_: "975",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.equal("null");
    });
  });
});
