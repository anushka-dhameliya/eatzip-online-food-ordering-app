import React from 'react'

const UnauthorizedPage = () => {
    return (
        <div className='flex flex-row ml-48 text-center'>
            <section className=''>
                <img className='w-[35rem] h-[35rem]'
                    src="https://img.freepik.com/premium-vector/error-403-character-illustration_854078-605.jpg?size=626&ext=jpg&ga=GA1.1.539807931.1728920501&semt=ais_hybrid-rr-similar"
                />
            </section>
            <section className=''>
                <div className='pt-[15rem] text-center pl-10'>
                    <p className='italic text-6xl'>Sorry!!</p>
                    <p className='pt-5'>
                        You are not authorized to access this page.
                    </p>
                </div>
            </section>
        </div>
    )
}

export default UnauthorizedPage