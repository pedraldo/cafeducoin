const getUsers = () => `
select id, email, firstname, lastname
from users;
`;

const getUserById = (userId: string) => `
select id, email, firstname, lastname
from users
where id = '${userId}'
`;

const getUserByEmail = (email: string) => `
select id, email, firstname, lastname
from users
where email = '${email}'
`;

const getUserDataWithPasswordByEmail = (email: string) => `
select *
from users
where email = '${email}'
`;

const createUser = (user: any) => `
insert into users(firstname, lastname, email, password)
values('${user.firstname}', '${user.lastname}', '${user.email}', '${user.password}')
returning id, firstname, lastname, email;
`;


export default {
	getUsers,
	getUserById,
	getUserByEmail,
	getUserDataWithPasswordByEmail,
	createUser
}