import { useState, useEffect, useRef } from 'react'
import clsx from 'clsx'
import { APIResponse, ChatMessage } from '@/lib/types'

const ChatMessages: React.FC = () => {
	const [messages, setMessages] = useState<ChatMessage[]>([])
	const [page, setPage] = useState<number>(0)
	const [loading, setLoading] = useState<boolean>(false)
	const observerTarget = useRef<HTMLDivElement | null>(null)
	const containerRef = useRef<HTMLDivElement | null>(null)

	const fetchMessages = async () => {
		setLoading(true)
		try {
			const response = await fetch(
				`https://qa.corider.in/assignment/chat?page=${page}`
			)
			const data: APIResponse = await response.json()
			setMessages((prevMessages) => [...prevMessages, ...data.chats])
		} catch (error) {
			console.error('Failed to fetch messages:', error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0] && entries[0].isIntersecting) {
					setPage((prevPage) => prevPage + 1)
				}
			},
			{ root: containerRef.current }
		)

		if (observerTarget.current) {
			observer.observe(observerTarget.current)
		}

		return () => {
			if (observerTarget.current) {
				observer.unobserve(observerTarget.current)
			}
		}
	}, [observerTarget.current])

	useEffect(() => {
		fetchMessages()
	}, [page])

	return (
		<div
			ref={containerRef}
			style={{
				display: 'flex',
				flexDirection: 'column-reverse',
				overflow: 'auto',
				overflowAnchor: 'none',
				position: 'sticky',
			}}
			className='px-4 flex-grow'
		>
			{messages.map((message: ChatMessage) => (
				<div
					key={message.id}
					className={clsx('flex gap-x-2', {
						'justify-end': message.sender.self,
					})}
				>
					{!message.sender.self && (
						<img
							src={message.sender.image}
							alt='Sender'
							className='w-6 h-6 rounded-full'
						/>
					)}
					<div
						className={clsx(
							'w-3/4 rounded-xl p-2 text-sm shadow-md mb-4 font-normal',
							{
								'bg-[#1C63D5] text-white rounded-br-none': message.sender.self,
								'bg-white rounded-tl-none text-[#606060]': !message.sender.self,
							}
						)}
					>
						<p>{message.message}</p>
					</div>
				</div>
			))}
			<div ref={observerTarget}></div>
			{loading && (
				<div className='min-h-6 w-6 animate-spin border-t-gray-800 border-2 rounded-full my-4 self-center'></div>
			)}
		</div>
	)
}

export default ChatMessages
