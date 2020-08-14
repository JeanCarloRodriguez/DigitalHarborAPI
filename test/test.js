const superagent = require('superagent');
const expect = require('chai').expect

const apiServer = "https://reqres.in/api/"
let expectedEmail = "michael.lawson@reqres.in";
let expectedPage = 2;

describe('Digital Harbor Tests', () => {
    it(`This email ${expectedEmail} should be in the page 2 await`, async () => {

        let request = await superagent.get(apiServer + `users?page=${expectedPage}`)
        let page = request.body.page;
        let data = request.body.data
        let emails = []
        expect(page).to.equal(expectedPage)

        for (item of data) {
            emails.push(item.email)
        }

        let emailExists = emails.includes(expectedEmail)

        expect(emailExists).to.be.true;
    });

    it(`This email ${expectedEmail} should be in the page 2 Promise`, () => {

        return superagent.get(apiServer + `users?page=${expectedPage}`)
            .then(request => {
                let page = request.body.page;
                expect(page).to.equal(expectedPage)
                return request.body.data
            }).then(data => {
                for (item of data) {
                    if (item.email === expectedEmail) {
                        return true;
                    }
                }
                return false
            }).then(isEmailInData => expect(isEmailInData).to.be.true);
    });
});