import { usePrepareContractWrite, useContractWrite, useWaitForTransaction, useContractEvent } from 'wagmi'
import type { WriteContractResult, WatchContractEventCallback } from '@wagmi/core'

type UseContractProps = {
  address?: `0x${string}`
  abi?: any[]
  functionName?: string
  value?: bigint
  args?: any[]
  eventName?: string
  listener?: WatchContractEventCallback<any[], string>
}
type ReturnValueProps = {
  write: (() => void) | undefined
  data: WriteContractResult | undefined
  isSuccess: boolean
  isFetching: boolean
  unwatch: (() => void) | undefined
}

const useContract = ({
  address,
  abi,
  functionName,
  value,
  args,
  eventName,
  listener = () => {
    console.log('listening...')
  },
}: UseContractProps): ReturnValueProps => {
  const { config } = usePrepareContractWrite({
    address,
    abi,
    functionName,
    args,
    value,
  })
  const { write, data } = useContractWrite(config)
  const { isSuccess, isFetching } = useWaitForTransaction({ hash: data?.hash })
  const unwatch = useContractEvent({ address, abi, eventName, listener })
  return { write, data, isSuccess, isFetching, unwatch }
}
export default useContract
