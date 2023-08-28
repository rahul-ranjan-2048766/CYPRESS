/// <reference types="Cypress"/>


let AccessToken = "Bearer 806521cdfd30ce815d1da2168c5d2bebcbac939207a1f82aec3bc8c6c734fd7e";

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
        .replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
}


describe('API Automation', () => {

    /* API Intercepts */

    it('API Intercept For Users', () => {

        cy.visit("https://gorest.co.in")

        cy.intercept({
            method: 'GET',
            url: 'public/v2/users'
        }).as("users")

        cy.get('a[href="https://gorest.co.in/public/v2/users"]').click({ force: true, multiple: true })

        cy.wait("@users").then((response) => {
            expect(response.response.statusCode).equal(200)
        })

    })

    it('API Intercept For Posts', () => {

        cy.visit("https://gorest.co.in")

        cy.intercept({
            method: 'GET',
            url: '/public/v2/posts'
        }).as("posts")

        cy.get('a[href="https://gorest.co.in/public/v2/posts"]').click({ force: true, multiple: true })

        cy.wait("@posts").then((response) => {
            expect(response.response.statusCode).equal(200)
        })

    })

    it('API Intercept For Comments', () => {

        cy.visit("https://gorest.co.in")

        cy.intercept({
            method: 'GET',
            url: '/public/v2/comments'
        }).as("comments")

        cy.get('a[href="https://gorest.co.in/public/v2/comments"]').click({ force: true, multiple: true })

        cy.wait("@comments").then((response) => {
            expect(response.response.statusCode).equal(200)
        })

    })

    it('API Intercept For Todos', () => {

        cy.visit('https://gorest.co.in')

        cy.intercept({
            method: 'GET',
            url: '/public/v2/todos'
        }).as("todos")

        cy.get('a[href="https://gorest.co.in/public/v2/todos"]').click({ force: true, multiple: true })

        cy.wait("@todos").then((response) => {
            expect(response.response.statusCode).equal(200)
        })

    })


    /* Get All API Methods */

    it('Get Users', () => {

        cy.request({
            method: 'GET',
            url: 'https://gorest.co.in/public/v2/users'
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.length).to.eq(10)
        })

    })

    it('Get Posts', () => {

        cy.request({
            method: 'GET',
            url: 'https://gorest.co.in/public/v2/posts'
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.length).to.eq(10)
        })

    })

    it('Get Comments', () => {

        cy.request({
            method: 'GET',
            url: 'https://gorest.co.in/public/v2/comments'
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.length).to.eq(10)
        })

    })

    it('Get Todos', () => {

        cy.request({
            method: 'GET',
            url: 'https://gorest.co.in/public/v2/todos'
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.length).to.eq(10)
        })

    })


     /* Get(id) Methods */ 

    it('Get User by id', () => {
        const id = 4606775;

        cy.fixture('user').then((payLoad) => {

            cy.request({
                method: 'GET',
                url: 'https://gorest.co.in/public/v2/users/' + id
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).property('id').to.eq(id)
                expect(response.body).has.property('name', payLoad.name)
                expect(response.body).to.have.property('email', payLoad.email)
                expect(response.body).to.have.property('gender', payLoad.gender)
                expect(response.body).has.property('status', payLoad.status)
            })

        })

    })

    it('Get Post by id', () => {
        const id = 64382;

        cy.fixture('post').then((payLoad) => {

            cy.request({
                method: 'GET',
                url: 'https://gorest.co.in/public/v2/posts/' + id
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).has.property('id', id)
                expect(response.body).has.property('user_id', payLoad.user_id)
                expect(response.body).has.property('title', payLoad.title)
                expect(response.body).has.property('body', payLoad.body)
            })

        })
    })

    it('Get Comment by id', () => {
        const id = 52540;

        cy.fixture('comment').then((payLoad) => {

            cy.request({
                method: 'GET',
                url: 'https://gorest.co.in/public/v2/comments/' + id
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).has.property('id', id)
                expect(response.body).to.have.property('post_id', payLoad.post_id)
                expect(response.body).to.have.property('name', payLoad.name)
                expect(response.body).to.have.property('email', payLoad.email)
                expect(response.body).to.have.property('body', payLoad.body)
            })

        })
    })

    it('Get Todo by id', () => {
        const id = 24662;

        cy.fixture('todo').then((payLoad) => {

            cy.request({
                method: 'GET',
                url: 'https://gorest.co.in/public/v2/todos/' + id
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).has.property('id', id)
                expect(response.body).has.property('user_id', payLoad.user_id)
                expect(response.body).has.property('title', payLoad.title)
                expect(response.body).has.property('due_on', payLoad.due_on)
                expect(response.body).has.property('status', payLoad.status)
            })

        })

    })


    /* Post Methods */

    it('Post method for users', () => {
        var email = uuidv4() + "@gmail.com";

        cy.fixture('user').then((payLoad) => {

            cy.request({
                method: 'POST',
                url: 'https://gorest.co.in/public/v2/users',
                headers: {
                    'authorization': AccessToken
                },
                body: {
                    'id': 0,
                    'name': payLoad.name,
                    'email': email,
                    'gender': payLoad.gender,
                    'status': payLoad.status
                }
            }).then((response) => {
                expect(response.status).equal(201)
                expect(response.body).property('name').to.eq(payLoad.name)
                expect(response.body).to.have.property('email', email)
                expect(response.body).has.property('gender', payLoad.gender)
                expect(response.body).property('status').to.eq(payLoad.status)
            })

        })

    })

    it('Post Method for posts', () => {

        cy.fixture('post').then((payLoad) => {
            cy.request({
                method: 'POST',
                url: 'https://gorest.co.in/public/v2/posts',
                headers: {
                    'authorization': AccessToken
                },
                body: {
                    'id': 0,
                    'user_id': payLoad.user_id,
                    'title': payLoad.title,
                    'body': payLoad.body
                }
            }).then((response) => {
                expect(response.status).to.eq(201)
                expect(response.body).has.property('user_id', payLoad.user_id)
                expect(response.body).has.property('title', payLoad.title)
                expect(response.body).has.property('body', payLoad.body)
            })
        })

    })

    it('Post Method for comments', () => {

        cy.fixture('comment').then((payLoad) => {

            cy.request({
                method: 'POST',
                url: 'https://gorest.co.in/public/v2/comments',
                headers: {
                    'authorization': AccessToken
                },
                body: {
                    'id': 0,
                    'post_id': payLoad.post_id,
                    'name': payLoad.name,
                    'email': payLoad.email,
                    'body': payLoad.body
                }
            }).then((response) => {
                expect(response.status).to.eq(201)
                expect(response.body).to.have.property('post_id', payLoad.post_id)
                expect(response.body).to.have.property('name', payLoad.name)
                expect(response.body).to.have.property('email', payLoad.email)
                expect(response.body).to.have.property('body', payLoad.body)
            })

        })

    })

    it('Post Method for todos', () => {

        cy.fixture('todo').then((payLoad) => {

            cy.request({
                method: 'POST',
                url: 'https://gorest.co.in/public/v2/todos',
                headers: {
                    'authorization': AccessToken
                },
                body: {
                    'id': 0,
                    'user_id': payLoad.user_id,
                    'title': payLoad.title,
                    'due_on': payLoad.due_on,
                    'status': payLoad.status
                }
            }).then((response) => {
                expect(response.status).to.eq(201)
                expect(response.body).has.property('user_id', payLoad.user_id)
                expect(response.body).has.property('title', payLoad.title)
                expect(response.body).has.property('due_on', payLoad.due_on)
                expect(response.body).has.property('status', payLoad.status)
            })

        })

    })


    /* Put Methods */

    it('Put Method for user', () => {
        const id = 4606775;

        cy.fixture('user').then((payLoad) => {

            cy.request({
                method: 'PUT',
                url: 'https://gorest.co.in/public/v2/users/' + id,
                headers: {
                    'authorization': AccessToken
                },
                body: {
                    'id': id,
                    'name': payLoad.name,
                    'email': payLoad.email,
                    'gender': payLoad.gender,
                    'status': payLoad.status
                }
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('id', id)
                expect(response.body).to.have.property('name', payLoad.name)
                expect(response.body).to.have.property('email', payLoad.email)
                expect(response.body).to.have.property('gender', payLoad.gender)
                expect(response.body).to.have.property('status', payLoad.status)
            })

        })

    })

    it('Put Method for post', () => {
        const id = 64611;

        cy.fixture('post').then((payLoad) => {

            cy.request({
                method: 'PUT',
                url: 'https://gorest.co.in/public/v2/posts/' + id,
                headers: {
                    'authorization': AccessToken
                },
                body: {
                    'id': id,
                    'user_id': payLoad.user_id,
                    'title': payLoad.title,
                    'body': payLoad.body
                }
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).has.property('id', id)
                expect(response.body).has.property('user_id', payLoad.user_id)
                expect(response.body).has.property('title', payLoad.title)
                expect(response.body).has.property('body', payLoad.body)
            })

        })


    })

    it('Put Method for comment', () => {
        const id = 52656;

        cy.fixture('comment').then((payLoad) => {

            cy.request({
                method: 'PUT',
                url: 'https://gorest.co.in/public/v2/comments/' + id,
                headers: {
                    'authorization': AccessToken
                },
                body: {
                    'id': id,
                    'post_id': payLoad.post_id,
                    'name': payLoad.name,
                    'email': payLoad.email,
                    'body': payLoad.body
                }
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).property('id').to.eq(id)
                expect(response.body).property('post_id').to.eq(payLoad.post_id)
                expect(response.body).property('name').to.eq(payLoad.name)
                expect(response.body).property('email').to.eq(payLoad.email)
                expect(response.body).property('body').to.eq(payLoad.body)
            })

        })

    })

    it('Put Method for todo', () => {
        const id = 24706;

        cy.fixture('todo').then((payLoad) => {

            cy.request({
                method: 'PUT',
                url: 'https://gorest.co.in/public/v2/todos/' + id,
                headers: {
                    'authorization': AccessToken
                },
                body: {
                    'id': id,
                    'user_id': payLoad.user_id,
                    'title': payLoad.title,
                    'due_on': payLoad.due_on,
                    'status': payLoad.status
                }
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).property('id').to.eq(id)
                expect(response.body).property('user_id').to.eq(payLoad.user_id)
                expect(response.body).property('title').to.eq(payLoad.title)
                expect(response.body).property('due_on').to.eq(payLoad.due_on)
                expect(response.body).property('status').to.eq(payLoad.status)
            })

        })

    })


    /* Delete Methods */

    it('Delete Method for user', () => {

        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users',
            headers: {
                'authorization': AccessToken
            },
            body: {
                "id": 0,
                "name": "Test Name",
                "email": "testname@outlook.com",
                "gender": "male",
                "status": "active"
            }
        }).then((response) => {
            expect(response.status).to.eq(201)
            var id = response.body['id'];

            cy.request({
                method: 'DELETE',
                url: 'https://gorest.co.in/public/v2/users/' + id,
                headers: {
                    'authorization': AccessToken
                }
            }).then((response) => {
                expect(response.status).to.eq(204)
            })
        })

    })

    it('Delete Method for post', () => {
        
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/posts',
            headers: {
                'authorization': AccessToken
            },
            body: {
                "id": 0,
                "user_id": 4711760,
                "title": "testing data",
                "body": "testing data"
            }
        }).then((response) => {
            expect(response.status).to.eq(201)
            var id = response.body['id'];

            cy.request({
                method: 'DELETE',
                url: 'https://gorest.co.in/public/v2/posts/' + id,
                headers: {
                    'authorization': AccessToken
                }
            }).then((response) => {
                expect(response.status).to.eq(204)
            })
        })

    })

    it('Delete Method for comment', () => {

        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/comments',
            headers: {
                'authorization': AccessToken
            },
            body: {
                "id": 0,
                "post_id": 64390,
                "name": "Bhagvan Embranthiri",
                "email": "testingemail_@outlook.com",
                "body": "Testing"
            }
        }).then((response) => {
            expect(response.status).to.eq(201)
            var id = response.body['id'];

            cy.request({
                method: 'DELETE',
                url: 'https://gorest.co.in/public/v2/comments/' + id,
                headers: {
                    'authorization': AccessToken
                }
            }).then((response) => {
                expect(response.status).to.eq(204)
            })
        })

    })

    it('Delete Method for todo', () => {

        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/todos',
            headers: {
                'authorization': AccessToken
            },
            body: {
                "id": 0,
                "user_id": 4689025,
                "title": "Wizard Rasputin",
                "due_on": "2023-09-20T00:00:00.000+05:30",
                "status": "completed"
            }
        }).then((response) => {
            expect(response.status).to.eq(201)
            var id = response.body['id'];

            cy.request({
                method: 'DELETE',
                url: 'https://gorest.co.in/public/v2/todos/' + id,
                headers: {
                    'authorization': AccessToken
                }
            }).then((response) => {
                expect(response.status).to.eq(204)
            })
        })

    })

})