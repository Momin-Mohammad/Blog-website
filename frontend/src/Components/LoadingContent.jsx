import { Skeleton, Stack } from '@chakra-ui/react'

function LoadingContent() {
  return (
    <Stack gap={1}>
        <div>
        <Skeleton height='100px' width={'95%'} m={5} />
        </div>
        <div>
        <Skeleton height='100px' width={'95%'} m={5} />
        </div>
        <div>
        <Skeleton height='100px' width={'95%'} m={5} />
        </div>
        <div>
        <Skeleton height='100px' width={'95%'} m={5} />
        </div>
  </Stack>
  )
}

export default LoadingContent