describe('Los estudiantes under monkeys', function() {
    it('visits los estudiantes and survives monkeys', function() {
        cy.visit('https://losestudiantes.co');
        cy.contains('Cerrar').click();
        cy.wait(1000);
        //cy.contains('Ingresar').click();
        eventExec(10);
    })
})

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function randomLink() {
    cy.get('a').then($links => {
        if ($links.length > 0) {
            var randomLink = $links.get(getRandomInt(0, $links.length));
            if (!Cypress.dom.isHidden(randomLink)) {
                cy.wrap(randomLink).click({ force: true });
            }
            cy.wait(1000);
        }
    });
}

function randomInputText() {
    cy.get('input').then($input => {
        if ($input.length > 0) {
            var randomInput = $input.get(getRandomInt(0, $input.length));
            if (!Cypress.dom.isHidden(randomInput) && (randomInput.type == '' || randomInput.type != 'checkbox')) {
                cy.wrap(randomInput).type("texto prueba", { force: true });
                cy.wait(1000);
            }

        }
    });
}

function eventExec(monkeysLeft) {
    var monkeysLeft = monkeysLeft;
    if (monkeysLeft > 0) {
        var events = [
            randomLink,
            randomInputText
        ]

        events[getRandomInt(0, events.length)]();
        monkeysLeft = monkeysLeft - 1;

        cy.wait(1000);
        eventExec(monkeysLeft);

    }




}