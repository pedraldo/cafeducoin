import { GameActionType } from "types/shared/shared.types"

const getActionTypeFromGameAvailability = (isAvailable: boolean): GameActionType => {
	return isAvailable ? 'BORROWING' : 'RETURN';
}

export {
	getActionTypeFromGameAvailability
}