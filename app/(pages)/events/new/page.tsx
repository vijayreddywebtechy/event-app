import MainLayout from '@/components/layout/MainLayout'
import NewEventForm from '@/components/dynamic/NewEventForm'

type Props = {}

function page({}: Props) {
  return (
        <MainLayout>
          <NewEventForm />
        </MainLayout>
  )
}

export default page