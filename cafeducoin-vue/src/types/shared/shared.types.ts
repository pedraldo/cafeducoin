export type GameActionType = 'BORROWING' | 'RETURN';

export interface UserEmail { email: string; }
export interface UserPassword { password: string; }

export interface UserCredentials extends UserEmail, UserPassword {}

export interface UserNames {
	firstname: string;
	lastname: string;
}

export interface UserRegisterInfos extends UserCredentials, UserNames {}

export interface User extends UserNames, UserEmail {
	id: string;
}

export interface UserWithToken extends User {
	token: string;
}

export interface UserWithPassword extends User, UserPassword {}

export interface Game {
	id: string;
	name: string;
}

export interface GameListItem extends Game {
	is_borrowed: boolean;
}

export interface GameHistoryItem {
	game_name: string;
	user_id: string;
	user_firstname: string;
	user_lastname: string;
	action_type: GameActionType;
	action_date: Date;
}

export interface GameBorrowingData {
	user_id: string;
	game_id: string;
}

export interface UserGame {
	id: string;
	user_id: string;
	game_id: string;
	action_type: GameActionType;
	action_date: Date; 
}




export interface GameAvailabality {
	value: boolean;
	label: string;
}