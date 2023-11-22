import { getActionTypeFromGameAvailability } from '../../services/games.service';

const getGames = () => `
select *
from games g;
`;

const getGameById = (id: string) => `
select *
from games
where id = '${id}'
;
`;

const getGameHistory = (gameId: string) => `
select ug.action_date, ug.action_type, g.name as game_name, u.id as user_id, u.firstname as user_firstname, u.lastname as user_lastname
from users_games ug
inner join users u on ug.user_id = u.id
inner join games g on ug.game_id = g.id
where game_id = ${gameId}
order by ug.action_date desc;
`;

const postGameBorrowing = (userId: string, gameId: string, isAvailable: boolean) => `
insert into users_games(user_id, game_id, action_date, action_type)
values(${userId}, ${gameId}, now(), '${getActionTypeFromGameAvailability(isAvailable)}')
returning id, user_id, game_id, action_date, action_type;
`;

export default {
	getGames,
	getGameById,
	getGameHistory,
	postGameBorrowing
}