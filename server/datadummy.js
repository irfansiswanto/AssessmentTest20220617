const { faker } = require('@faker-js/faker');
let db = { users: [], employees: [], groups: [], status: []};
const groups = ['GROUP A','GROUP B','GROUP C','GROUP D','GROUP E','GROUP F','GROUP G','GROUP H','GROUP I','GROUP J'];
const status = ['Aktif', 'Non Aktif'];
const row = 100;
for (let i = 1; i<= row; i++) {
    db.employees.push({
        username: faker.internet.userName(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        birthDate: faker.date.birthdate(),
        basicSalary: faker.datatype.number({ min: 1000000 }),
        status: status[Math.floor(Math.random() * status.length)],
        group: groups[Math.floor(Math.random() * groups.length)],
        description: faker.lorem.words(50),
        id: i
    });
}

db.users.push({
    username: 'admin',
    password: 'admin',
    id: 1
});

groups.forEach(element => {
    db.groups.push({
        name: element,
        value: element
    });
});
status.forEach(element => {
    db.status.push({
        name: element,
        value: element
    });
});


console.log(JSON.stringify(db));