export interface Sender {
	image: string
	is_kyc_verified: boolean
	self: boolean
	user_id: string
}

export interface ChatMessage {
	id: string
	message: string
	sender: Sender
	time: string
}

export interface APIResponse {
	chats: ChatMessage[]
	from: string
	message: string
	name: string
	status: string
	to: string
}
