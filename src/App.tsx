import { useEffect, useState } from 'react'

//components
import ChatMessages from './components/ChatMessages'

// icons
import ThreeDotsicon from '@/assets/threedots.svg?react'
import BackIcon from '@/assets/back.svg?react'
import EditIcon from '@/assets/edit.svg?react'
import UsersIcon from '@/assets/users.svg?react'
import TelephoneIcon from '@/assets/telephone.svg?react'
import MessageXIcon from '@/assets/messagex.svg?react'
import PaperClipIcon from '@/assets/paperclip.svg?react'
import SendIcon from '@/assets/send.svg?react'
import CameraIcon from '@/assets/camera.svg?react'
import VideoIcon from '@/assets/video.svg?react'
import DocumentIcon from '@/assets/document.svg?react'

//assets
import profile1 from '../src/assets/profile1.jpeg'
import profile2 from '../src/assets/profile2.jpeg'
import profile3 from '../src/assets/profile3.jpeg'
import profile4 from '../src/assets/profile4.jpeg'

//shadcn
import { Separator } from '@/components/ui/separator'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'

//types
import { APIResponse } from './lib/types'

function App() {
	const [fromLocation, setFromLocation] = useState('')
	const [toLocation, setToLocation] = useState('')
	const [tripName, setTripName] = useState('')
	const [loading, setLoading] = useState(false)

	const fetchTripDetails = async () => {
		setLoading(true)
		try {
			const response = await fetch(
				`https://qa.corider.in/assignment/chat?page=0`
			)
			const data: APIResponse = await response.json()
			setFromLocation(data.from)
			setToLocation(data.to)
			setTripName(data.name)
		} catch (error) {
			console.error('Failed to fetch messages:', error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchTripDetails()
	}, [])

	return (
		<div className='font-mulish flex flex-col py-5 bg-[#FAF9F4] h-screen'>
			<div className='mx-4 flex items-center gap-x-3'>
				<BackIcon className='cursor-pointer' />
				<h1 className='font-bold text-2xl'>
					{loading ? 'Loading...' : tripName}
				</h1>
				<EditIcon className='ml-auto cursor-pointer' />
			</div>
			<div className='mx-4 flex items-center gap-x-4 mt-4'>
				<div className='w-12 h-12 rounded-full border grid grid-cols-2 overflow-hidden'>
					<img src={profile1} alt='profile 1' className='w-6 h-6' />
					<img src={profile2} alt='profile 2' className='w-6 h-6' />
					<img src={profile3} alt='profile 3' className='w-6 h-6' />
					<img src={profile4} alt='profile 4' className='w-6 h-6' />
				</div>
				<div className='text-lg'>
					<div>
						From{' '}
						<span className='font-bold'>
							{loading ? 'Loading...' : fromLocation}
						</span>
					</div>
					<div>
						To{' '}
						<span className='font-bold'>
							{loading ? 'Loading' : toLocation}
						</span>
					</div>
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger className='ml-auto cursor-pointer'>
						<ThreeDotsicon className='w-4 h-4' />
					</DropdownMenuTrigger>
					<DropdownMenuContent className='mr-4 p-0 text-sm'>
						<DropdownMenuItem className='py-2 px-3 gap-x-3 cursor-pointer'>
							<UsersIcon />
							Members
						</DropdownMenuItem>
						<DropdownMenuSeparator className='m-0' />
						<DropdownMenuItem className='py-2 px-3 gap-x-3 cursor-pointer'>
							<TelephoneIcon />
							Share Number
						</DropdownMenuItem>
						<DropdownMenuSeparator className='m-0' />
						<DropdownMenuItem className='py-2 px-3 gap-x-3 cursor-pointer'>
							<MessageXIcon />
							Report
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			<Separator className='bg-neutral-200 mt-4' />

			<ChatMessages />

			<div className='mx-4 flex bg-white items-center gap-x-4 p-3 rounded-lg shadow-md'>
				<input
					className='outline-none text-sm placeholder:text-sm placeholder:text-[#B7B7B7] w-full'
					placeholder='Reply to @Rohit Yadav'
				/>
				<Popover>
					<PopoverTrigger>
						<PaperClipIcon />
					</PopoverTrigger>
					<PopoverContent className='flex mb-2 relative gap-x-4 rounded-l-full justify-center rounded-r-full px-4 py-3 items-center w-fit bg-[#008000] text-white'>
						<CameraIcon className='cursor-pointer' />
						<VideoIcon className='cursor-pointer' />
						<DocumentIcon className='cursor-pointer' />
						<div className='bg-[#008000] w-5 h-5 rotate-45 absolute bottom-0 -z-10'></div>
					</PopoverContent>
				</Popover>
				<SendIcon className='w-6 cursor-pointer' />
			</div>
		</div>
	)
}

export default App
