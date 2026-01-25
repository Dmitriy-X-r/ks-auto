import Header from './Header'
import { getHeaderMenu } from '@/lib/api/headerMenu'
import { mapHeaderMenu } from '@/lib/mappers/mapHeaderMenu'

export default async function HeaderServer() {
    const data = await getHeaderMenu()
    const catalogsData = data.result.map(mapHeaderMenu)

    return <Header catalogsData={catalogsData} />
}