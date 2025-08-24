describe("Hospital App E2E", () => {
  it("should allow booking an appointment and show confirmation popup", () => {
    // 1. Visit homepage
    cy.visit("http://localhost:3000/");

    // 2. Doctor list should load
    cy.contains("Dr. Sarah Johnson", {timeout : 30000}).should("be.visible");

    // 3. Click "Book Appointment" for first doctor
    cy.contains("Book Appointment").first().click();

    // 4. Form should appear
    cy.get("[data-testid='appointment-form']").should("be.visible");

    // 👉 Register intercept BEFORE form submission
    cy.intercept("POST", "**/api/appointments").as("createAppointment");

    // 5. Fill form fields
    cy.get("select[name='doctorId']").select("Dr. Sarah Johnson - Cardiologist");
    cy.get("input[name='patientName']").type("Keertana");
    cy.get("input[name='phone']").type("7204593889");
    cy.get("input[name='patientEmail']").type("keertanareddypatil@gmail.com");
    cy.get("input[name='date']").type("2025-08-28");
    cy.get("select[name='time']").select("4:30 PM");
    cy.get("textarea[name='reason']").type("Regular health checkup");

    // 6. Submit the form
    cy.get("form").within(() => {
      cy.contains("Book Appointment").click();
    });

    // 7. Wait for backend response
    cy.wait("@createAppointment").its("response.statusCode").should("eq", 201);

    // 8. Check confirmation popup
    cy.get("[data-testid='confirmation-popup']", { timeout: 10000 })
      .should("be.visible")
      .within(() => {
        cy.contains("Appointment Confirmed!");
        cy.contains("Dr. Sarah Johnson");
        cy.contains("8/28/2025");
        cy.contains("4:30 PM");
        cy.contains("Keertana");
        cy.contains("keertanareddypatil@gmail.com");
        cy.contains("Book Another Appointment");
        cy.contains("Back to Home");
      });
  });
});
