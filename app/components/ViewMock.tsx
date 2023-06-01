'use client'

import useSWR from 'swr'
import { mock } from '../utils/mock'
import Image from 'next/image'

const ViewMock = () => {
  const { data, error } = useSWR('https://dog.ceo/api/breeds/image/random', mock)

  if (error) return <>Error</>
  return <Image src={data?.message || ''} alt='mock' width={300} height={300} />
}
export default ViewMock
