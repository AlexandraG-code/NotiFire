export enum AuthMethod {
	GetStateInstance = 'getStateInstance'
}

/** Состояние инстанса, которое возвращает getStateInstance. */
export enum StateInstance {
	NotAuthorized = 'notAuthorized',
	Authorized = 'authorized',
	Blocked = 'blocked',
	SleepMode = 'sleepMode',
	Starting = 'starting',
	YellowCard = 'yellowCard'
}
