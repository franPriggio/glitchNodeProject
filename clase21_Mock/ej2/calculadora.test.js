import Calculadora from "./Calculadora";

descrube('Nuestra calculadora', () => {
    test("SUMA", () => {
        const calculadora = new Calculadora();
        const resultado = calculadora.suma(2,3);
        expect(resultado).toEqual(5);
    })
})