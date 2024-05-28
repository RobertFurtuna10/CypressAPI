describe("Post API Tests", () => {
  // https://qachallenge.ro/api/
  const ValidAction = 'insert'
  beforeEach(function () {
    cy.fixture("TestDataFetchAll").then((data) => {
      this.data = data;
    });
  });

  it("Test insert a user", () => {
    cy.request({
      method: "POST",
      url: `http://qachallenge.ro/api/test_api.php?action=${ValidAction}`,
      form: true,
      body: {
        first_name: "Ionut",
        last_name: "Bobita",
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
  it("Validate inserting a user with empty firstname and lastname", () => {

    cy.request({
      method: "POST",
      url: `http://qachallenge.ro/api/test_api.php?action=${ValidAction}`,
      form: true,
      body: {
        first_name: "",
        last_name: "",
      },
    }).then((response) => {
      let responseBody;
      try {
        responseBody = JSON.parse(response.body);
      } catch (e) {
        throw new Error("Response body is not a valid JSON");
      }

      expect(response.status).to.eq(200);
      expect(responseBody).to.deep.equal([{ success: "0" }]);
    });
  });

  it("Validate inserting a user with incorrect key for firstname", () => {
    cy.request({
      method: "POST",
      url: `http://qachallenge.ro/api/test_api.php?action=${ValidAction}`,
      form: true,
      body: {
        name: "Aaa",
        last_name: "BBB",
      },
    }).then((response) => {
      let responseBody;
      try {
        responseBody = JSON.parse(response.body);
      } catch (e) {
        throw new Error("Response body is not a valid JSON");
      }

      expect(response.status).to.eq(200);
      expect(responseBody).to.deep.equal([{ success: "0" }]);
    });
  });
});
