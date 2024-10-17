export default function HikeMessage({ message, userId }) {
  return (
    <div className={ `flex flex-col gap-y-1 p-3 rounded-xl text-sm  max-w-[300px] ${message.sender.id === userId ? 'self-end bg-green-700 text-white' : 'self-start bg-gray-100 text-black'}` }>
      <p className='font-semibold'>{ message.sender.firstName.concat(' '.concat(message.sender.lastName)) }</p>
      <p className=''>{ message.text }</p>
    </div>
  )
}
