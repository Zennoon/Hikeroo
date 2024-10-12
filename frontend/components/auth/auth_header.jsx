const AuthHeader = ({ label, title }) => {
  return (
    <div className='w-full flex flex-col gap-y-2 justify-center items-center'>
      <h1 className='text-xl font-semibold'>{ title }</h1>
    </div>
  )
}

export default AuthHeader;
